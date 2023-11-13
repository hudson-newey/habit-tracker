export type EmptyResponse = null | undefined | {};

export interface ApiHttpResponse<T extends object> {
    data: T
    message: string;
}

export interface HttpResponse {
}
