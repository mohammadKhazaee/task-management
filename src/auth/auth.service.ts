import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UserRepository } from './user.repository';
import { SigninDto } from './dto/signin.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { FileHelper } from 'src/utils/file.helper';

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

    const user = await this.userRepository.findOneBy({ username });

    if (
      !(
        user &&
        (await bcrypt.compare(password, user.password)) &&
        user.role === (isAdmin === 'true' ? 'ADMIN' : 'USER')
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
