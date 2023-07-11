import { db } from "@/database";
import type { NextApiRequest, NextApiResponse } from "next";


type Data = {
  message: string;
  time: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await db.query("SELECT NOW()");
  console.log(response.rows);

  res.status(200).json({ message: "Pong!", time: response.rows[0].now });
}
/*
const handlers = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => await loginAuth(req, res),
};
export default async function authorsController(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const handler = handlers[method as keyof typeof handlers] || notAllowedResponse;
    return await handler(req, res);
}
*/