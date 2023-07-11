import { notAllowedResponse } from "@/root";
import { NextApiRequest, NextApiResponse } from "next";






export function createRequest(req: NextApiRequest, res: NextApiResponse) {
}


export function getRequest(req: NextApiRequest, res: NextApiResponse) {
}







const handlers = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => await createRequest(req, res),
    GET: async (req:NextApiRequest, res:  NextApiResponse) => await getRequest(req,res)
};
export default async function authorsController(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const handler = handlers[method as keyof typeof handlers] || notAllowedResponse;
    return await handler(req, res);
}
