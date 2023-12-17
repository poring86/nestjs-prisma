import { BadRequestException, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response, Request } from 'express';

export class UserIdCheckMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    console.log('UserIdCheckMiddleware', 'antes');

    if (isNaN(Number(req.params.id)) || Number(req.params.id) <= 0) {
      throw new BadRequestException('ID Inválido!');
    }

    console.log('UserIdCheckMiddleware', 'depois');

    next();
  }
}
