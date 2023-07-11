import { notAllowedResponse } from "@/root/api";
import { NextApiRequest, NextApiResponse } from "next";


export function createGoods(req: NextApiRequest, res: NextApiResponse) {
}

export function getGoods(req: NextApiRequest, res: NextApiResponse) {
}



const handlers = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => await createGoods(req, res),
    GET: async (req:NextApiRequest, res:  NextApiResponse) => await getGoods(req,res)
};
export default async function authorsController(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const handler = handlers[method as keyof typeof handlers] || notAllowedResponse;
    return await handler(req, res);
}
