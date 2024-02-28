import {
  Controller,
  Req,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DocumentsService } from '../services/documents.service';
import { SupabaseGuard } from 'src/auth/guards/supabase.guard';
@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}
  @Get('/dossier/:id')
  @UseGuards(SupabaseGuard)
  findDossier(@Param('id') id: string) {
    return this.documentsService.findDossier(id);
  }
}
