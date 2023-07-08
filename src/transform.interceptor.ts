import {
  NestInterceptor,
  ExecutionContext,
  Injectable,
  CallHandler,
} from '@nestjs/common';

import { map } from 'rxjs/operators';
import { User } from './auth/user.entity';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler<any>) {
    return next.handle().pipe(
      map((data: User) => {
        const res = {
          ...data,
        };

        delete res.password;

        return res;
      }),
    );
  }
}
