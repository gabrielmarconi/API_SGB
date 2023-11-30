import { HttpStatus, Type, applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiResponse, getSchemaPath } from "@nestjs/swagger";

interface IDataResponseDecorator<T> {
    type: Type<any | T>
    isArray?: boolean
    status?: HttpStatus;
    isBoolean?: boolean
}

export const ApiDataResponse = <TModel extends Type<any>>(
    options: IDataResponseDecorator<any | TModel>
) => {
    const status = options.status ?? HttpStatus.OK;
    let response = ApiResponse({
        status: status,
        schema: {
            properties: {
                data: {
                    $ref: getSchemaPath(options.type),
                },
            },
        },
    });
    if (options.isArray === true) {
        response = ApiResponse({
            status: status,
            schema: {
                properties: {
                    data: {
                        type: 'array',
                        items: { $ref: getSchemaPath(options.type) },
                    },
                },
            },
        });
    } else if (options.isBoolean === true) {
        response = ApiResponse({
            status: status,
            schema: {
                properties: {
                    data: {
                        type: 'boolean',
                    },
                },
            },
        });
    }

    return applyDecorators(ApiExtraModels(options.type), response);
}