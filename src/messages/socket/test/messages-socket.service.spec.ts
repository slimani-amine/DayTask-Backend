import { Test, TestingModule } from '@nestjs/testing';
import { MessagesSocketService } from '../messages-socket.service';

describe('MessagesSocketService', () => {
  let service: MessagesSocketService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MessagesSocketService],
    }).compile();

    service = module.get<MessagesSocketService>(MessagesSocketService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
