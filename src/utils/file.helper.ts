import { createWriteStream } from 'fs';
import { join } from 'path';
import { v4 as uuid } from 'uuid';

export class FileHelper {
  static dirname: string = join(process.mainModule.path, '..');

  static saveFile(file: Express.Multer.File, randomName: boolean = false) {
    const ws = createWriteStream(
      join(
        process.mainModule.path,
        '..',
        'uploads',
        randomName ? uuid() + '-' + file.originalname : file.originalname,
      ),
    );
    ws.write(file.buffer);
  }
}
