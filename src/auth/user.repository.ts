import { DataSource, Repository } from 'typeorm';
import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateAccountDto } from './dto/create-account.dto';
import * as bcrypt from 'bcrypt';
import { UserRole } from './user-role.enum';
import { UserQueryDto } from 'src/admin/dto/user-query.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async getUsers(userQueryDto: UserQueryDto, admin: User): Promise<User[]> {
    const { search, sortType, page } = userQueryDto,
      USER_PER_PAGE = 4;

    const query = this.createQueryBuilder('user')
      .select(['username', 'role', 'createdDate'])
      .where('id != :adminId', {
        adminId: admin.id,
      });

    if (search)
      query.andWhere('username LIKE :search', { search: `%${search}%` });

    if (sortType) {
      const sortData: string[] = sortType.toString().split('_');
      query.orderBy(sortData[0], sortData[1] === 'ASC' ? 'ASC' : 'DESC');
    }

    if (page) query.skip((parseInt(page) - 1) * USER_PER_PAGE);

    return query.take(USER_PER_PAGE).getMany();
  }

  async createUser(
    createAccountDto: CreateAccountDto,
    image: Express.Multer.File,
  ): Promise<void> {
    const { username, password, isAdmin } = createAccountDto;
    try {
      const hashedPass = await bcrypt.hash(password, 12);
      const user = this.create({
        username,
        password: hashedPass,
        role: isAdmin === 'true' ? UserRole.ADMIN : UserRole.USER,
      });
      user.imageUrl = image ? image.originalname : user.imageUrl;
      await this.save(user);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY')
        throw new ConflictException('Username already exists');
      else throw new InternalServerErrorException();
    }
  }

  async getUser(id: string): Promise<User> {
    const user = await this.findOneBy({ id });
    if (!user) throw new NotFoundException();
    return user;
  }
}
