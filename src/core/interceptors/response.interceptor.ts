import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {

        //handle response
        return next.handle().pipe(
            map((data) => {
                if (data?.html) {
                    return data.html;
                }
                if (data?.data) {
                    return data ?? {};
                } else if (data instanceof String) {
                    data = { message: data };
                } else if (!data) {
                    return { data: {} };
                }
                return { data };
            }),
        );
    }
}