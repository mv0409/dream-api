export interface HttpResponse {
    headers: any,
    statusCode: number,
    payload?: {
        success?: boolean,
        error?: string,
        data?: any,
        message?: string
        pagination?: any
    },
    cookie?: string,
    clearCookie?: string
}