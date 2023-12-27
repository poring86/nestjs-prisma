import { Test, TestingModule } from '@nestjs/testing';

import { FileService } from './file.service';
import { getPhoto } from 'src/mocks/getPhotoMock';

describe('FileService', () => {
  let fileService: FileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FileService],
    }).compile();

    fileService = module.get<FileService>(FileService);
  });

  test('Validar a definição', () => {
    expect(fileService).toBeDefined();
  });

  describe('Teste do File Service', () => {
    test('upload method', async () => {
      const photo = await getPhoto();
      const filename = 'photo-test.jpg';
      fileService.upload(photo, filename);
    });
  });
});
