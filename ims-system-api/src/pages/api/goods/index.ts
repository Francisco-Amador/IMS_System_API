import { db } from "@/database";
import { notAllowedResponse } from "@/root/api";
import { Goods } from "@/root/types";
import { NextApiRequest, NextApiResponse } from "next";


export function createGoods(req: NextApiRequest, res: NextApiResponse) {
    try {
        const good = req.body as Goods;
        const query = "INSERT INTO ims_goods(goo_no, goo_description, goo_brand, goo_model, goo_series, goo_state, goo_acquisition_mode, goo_price, goo_ubi_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING *";
        const values = [good.no, good.description, good.brand, good.model, good.series, good.state, good.acquisition_mode, good.price, good.ubi_id];
        const response = db.query(query, values)
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the good" });
    }
}

export function getGoods(res: NextApiResponse) {
    try {
        const query = "SELECT * FROM ims_goods";
        const response = db.query(query);
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while get the goods" });
    }
}



const handlers = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => await createGoods(req, res),
    GET: async (req: NextApiRequest, res: NextApiResponse) => await getGoods(res)
};
export default async function authorsController(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const handler = handlers[method as keyof typeof handlers] || notAllowedResponse;
    return await handler(req, res);
}
