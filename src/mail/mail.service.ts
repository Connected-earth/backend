import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from '../users/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  public async sendAlertMail(user: User, plantName: string) {
    await this.mailerService
      .sendMail({
        to: user.email,
        subject: `${plantName} needs attention!`,
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
