import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UserRepository } from './repositories/user.repository';
import { SigninDto } from './dto/signin.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { FileHelper } from 'src/utils/file.helper';
import { UserRole } from './enums/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userRepository: UserRepository,
  ) {}

  async signup(
    createAccountDto: CreateAccountDto,
    image: Express.Multer.File,
  ): Promise<void> {
    if (image) image.originalname = uuid() + '-' + image.originalname;
    await this.userRepository.createUser(createAccountDto, image);
    if (image) FileHelper.saveFile(image);
  }

  async signin(signinDto: SigninDto): Promise<{ accessToken: string }> {
    const { username, password, isAdmin } = signinDto;

    const user = await this.userRepository.findOne({
      where: { username },
      relations: ['roles'],
    });

    if (
      !(
        user &&
        (await bcrypt.compare(password, user.password)) &&
        (isAdmin === 'false' ||
          (isAdmin === 'true' &&
            !!user.roles.some((r) => r.name === ('ADMIN' as UserRole))))
      )
    )
      throw new UnauthorizedException('Username or password is invalid.');

    const payload: JwtPayload = {
      username,
      role: isAdmin === 'true' ? 'Admin' : 'User',
    };
    return { accessToken: this.jwtService.sign(payload) };
  }
}
