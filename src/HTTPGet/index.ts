import * as https from "https";
import * as http from "http";

type GetRequestOptions =
{
    url: URL,
    allowedStatusCodes: number[]
    onRequestError?: (req: http.ClientRequest, err: Error) => void,
    onResponseEnd?: (res: http.IncomingMessage, rawData: string) => void
}

export function sendGetRequest(options: GetRequestOptions)
{
    const req: http.ClientRequest = https.get(options.url, (res: http.IncomingMessage) =>
    {
        const { statusCode } = res;
        let rawData: string = "";
    
        if (!statusCode || !options.allowedStatusCodes.includes(statusCode))
        {
            res.resume();

            options.onRequestError?.(req, new Error(`Invalid statusCode : ${res.statusCode}`));

            return;
        }
    
        res.on("data", (chunk: any) =>
        {
            rawData += chunk;
        })
    
        .on("end", () =>
        {
            options.onResponseEnd?.(res, rawData);
        });
    })
    .on("error", (err: Error) =>
    {
        console.error(err.message);
    });
}