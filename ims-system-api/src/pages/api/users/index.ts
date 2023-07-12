import { db } from "@/database";
import { notAllowedResponse } from "@/root";
import { User } from "@/root/types/Use.type";
import { NextApiRequest, NextApiResponse } from "next";

export async function createUsers(req: NextApiRequest, res: NextApiResponse) {
    try {
        const user = req.body as User;
        const query = "INSERT INTO ims_users(usu_admin, usu_name, usu_surnames, usu_email, usu_password) VALUES ($1,$2,$3,$4,$5) RETURNING *";//TODO: Add state
        const values = [user.admin, user.name, user.surnames, user.email, user.password];
        const response = await db.query(query, values);
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the user" });
    }
}

export async function getRequest(req: NextApiRequest, res: NextApiResponse) {
    try {
        const query = "SELECT * FROM ims_users";
        const response = await db.query(query);
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while get the users" });
    }
}

const handlers = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => await createUsers(req, res),
    GET: async (req: NextApiRequest, res: NextApiResponse) => await getRequest(req, res)
};
export default async function authorsController(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const handler = handlers[method as keyof typeof handlers] || notAllowedResponse;
    return await handler(req, res);
}