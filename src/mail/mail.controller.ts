import { Body, Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UpdateUserDto } from '../users/dto/update-user.dto';
import { User } from '../users/entities/user.entity';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  sendMail(@Body() user: User) {
    return this.mailService.sendAlertMail(user);
  }
}
