import { Test, TestingModule } from '@nestjs/testing';
import { DisponibilityController } from '../controllers/disponibility.controller';

describe('DisponibilityController', () => {
  let controller: DisponibilityController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DisponibilityController],
    }).compile();

    controller = module.get<DisponibilityController>(DisponibilityController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
