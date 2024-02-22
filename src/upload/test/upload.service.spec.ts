import { Test, TestingModule } from '@nestjs/testing';
import { UploadService } from '../services/upload.service';
import { SupabaseService } from 'src/auth/supabase.service';

describe('UploadService', () => {
  let service: UploadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UploadService, SupabaseService],
    }).compile();

    service = module.get<UploadService>(UploadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
