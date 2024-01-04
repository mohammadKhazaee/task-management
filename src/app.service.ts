import { Injectable, NotFoundException } from '@nestjs/common';
import { join } from 'path';
import { UserRepository } from './auth/user.repository';
import { FileHelper } from './utils/file.helper';
import { Observable, of } from 'rxjs';

@Injectable()
export class AppService {
  constructor(private userRepository: UserRepository) {}

  async getUserPhoto(id: string, res): Promise<Observable<object>> {
    const user = await this.userRepository.findOneBy({ id });

    if (!user || (user && !user.imageUrl))
      throw new NotFoundException('Photo not found!');

    return of(res.sendFile(join(FileHelper.dirname, 'uploads', user.imageUrl)));
  }
}
