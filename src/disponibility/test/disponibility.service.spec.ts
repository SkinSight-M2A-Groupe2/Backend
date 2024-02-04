import { Test, TestingModule } from '@nestjs/testing';
import { DisponibilityService } from '../services/disponibility.service';

describe('DisponibilityService', () => {
  let service: DisponibilityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DisponibilityService],
    }).compile();

    service = module.get<DisponibilityService>(DisponibilityService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
