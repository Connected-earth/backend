import { Test, TestingModule } from '@nestjs/testing';
import { MailController } from './mail.controller';
import { MailerService } from '@nestjs-modules/mailer';
import { MailService } from './mail.service';

describe('MailController', () => {
  let controller: MailController;
  let mailerService: MailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MailController],
      providers: [
        MailService,
        {
          provide: MailerService,
          useValue: {
            sendMail: jest.fn().mockResolvedValue('Email sent successfully'),
          },
        },
      ],
    }).compile();

    controller = module.get<MailController>(MailController);
    mailerService = module.get<MailerService>(MailerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
