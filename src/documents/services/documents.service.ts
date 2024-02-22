import { Injectable } from '@nestjs/common';

@Injectable()
export class DocumentsService {
  findDossier(id: string) {
    return `This action returns a #${id} dossier`;
  }
}
