import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data: any) => {
        if (data && data.payload) {
          return {
            isSuccessfully: data.isSuccessfully,
            payload: Array.isArray(data.payload)
              ? data.payload.map((item: any): any => this.transformKeys(item))
              : this.transformKeys(data.payload)
          };
        }
        return this.transformKeys(data);
      }),
    );
  }

  private transformKeys(obj: any) {
    if (!obj) return obj;
    const newObj = {};
    Object.keys(obj).forEach((key: string) => {
      const newKey = this.toCamelCase(key);
      newObj[newKey] = obj[key];
    });
    return newObj;
  }

  private toCamelCase(str: string): string {
    return str.toLowerCase().replace(/_([a-z])/g, g  => g[1].toUpperCase());
  }
}
