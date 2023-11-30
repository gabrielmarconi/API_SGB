import { HttpStatus, applyDecorators } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";

export const ApiErrorResponse = () => {
    return applyDecorators(
        ApiResponse({
            status: HttpStatus.BAD_REQUEST,
            description: 'Invalid parameters',
            schema: {
                properties: {
                    statusCode: {
                        type: "number",
                        default: HttpStatus.BAD_REQUEST
                    },
                    message: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    error: {
                        type: "string"
                    }
                },
            },
        }),
        ApiResponse({
            status: HttpStatus.UNAUTHORIZED,
            description: 'Unauthorized',
            schema: {
                properties: {
                    statusCode: {
                        type: "number",
                        default: HttpStatus.UNAUTHORIZED
                    },
                    message: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    error: {
                        type: "string"
                    }
                },
            },
        }),
        ApiResponse({
            status: HttpStatus.UNPROCESSABLE_ENTITY,
            description: 'Bussiness rule',
            schema: {
                properties: {
                    statusCode: {
                        type: "number",
                        default: HttpStatus.UNPROCESSABLE_ENTITY
                    },
                    message: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    error: {
                        type: "string"
                    }
                },
            },
        }),
        ApiResponse({
            status: HttpStatus.FORBIDDEN,
            description: 'Forbidden',
            schema: {
                properties: {
                    statusCode: {
                        type: "number",
                        default: HttpStatus.FORBIDDEN
                    },
                    message: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    error: {
                        type: "string"
                    }
                },
            },
        }),
        ApiResponse({
            status: HttpStatus.INTERNAL_SERVER_ERROR,
            description: 'Internal server error',
            schema: {
                properties: {
                    statusCode: {
                        type: "number",
                        default: HttpStatus.INTERNAL_SERVER_ERROR
                    },
                    message: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    error: {
                        type: "string"
                    }
                },
            },
        }),
        ApiResponse({
            status: HttpStatus.BAD_GATEWAY,
            description: 'Invalid response',
            schema: {
                properties: {
                    statusCode: {
                        type: "number",
                        default: HttpStatus.BAD_GATEWAY
                    },
                    message: {
                        type: "array",
                        items: {
                            type: "string"
                        }
                    },
                    error: {
                        type: "string"
                    }
                },
            },
        }),
    );
};
