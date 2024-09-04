import { Body, Controller, Get } from '@nestjs/common';
import { MailService } from './mail.service';

import { User } from '../users/entities/user.entity';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  @Get()
  sendMail(@Body() user: User) {
    return this.mailService.sendAlertMail(user, 'One of your plants');
  }
}
