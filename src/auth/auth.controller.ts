import {
  Controller,
  Post,
  Body,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { SigninDto } from './dto/signin.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  @UseInterceptors(FileInterceptor('file'))
  signup(
    @Body() createAccountDto: CreateAccountDto,
    @UploadedFile()
    image: Express.Multer.File,
  ): Promise<void> {
    return this.authService.signup(createAccountDto, image);
  }

  @Post('/signin')
  signin(@Body() signinDto: SigninDto): Promise<{ accessToken: string }> {
    return this.authService.signin(signinDto);
  }
}
