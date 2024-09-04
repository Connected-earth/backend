import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/user.entity';
import { UpdateUserDto } from '../users/dto/update-user.dto';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendAlertMail(user: User) {
    await this.mailerService
      .sendMail({
        to: user.email,
        subject: 'One of your plants need attention!',
        template: 'alertEmail',
        context: {
          code: user.id,
          username: user.username,
        },
      })
      .then((success) => {
        console.log(success);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
