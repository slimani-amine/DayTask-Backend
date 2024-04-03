import { Test, TestingModule } from '@nestjs/testing';
import { MessagesSocketGateway } from '../messages-socket.gateway';
import { MessagesSocketService } from '../messages-socket.service';

describe('MessagesSocketGateway', () => {
  let gateway: MessagesSocketGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesSocketGateway, MessagesSocketService],
    }).compile();

    gateway = module.get<MessagesSocketGateway>(MessagesSocketGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
