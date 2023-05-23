interface IApplicationErrorOptions {
    data: Record<string, unknown>;
}
export default class ApplicationError extends Error {
    data?: IApplicationErrorOptions['data'];
    constructor(message: string, options?: IApplicationErrorOptions);
}
export declare class UnprocessableEntry extends ApplicationError {
    data?: IApplicationErrorOptions['data'];
    constructor(message: string, options?: IApplicationErrorOptions);
}
export {};
