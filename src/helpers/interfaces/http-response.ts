export interface HttpResponse {
    headers: any,
    statusCode: number,
    payload?: {
        success?: boolean,
        error?: string,
        data?: any,
        message?: string
    },
    cookie?: string,
    clearCookie?: string
}