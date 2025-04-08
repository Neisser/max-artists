import { ContentfulStatusCode } from "hono/utils/http-status"

export const newError = (message: string, status: ContentfulStatusCode) => {
    return {
        message,
        status
    }
}

