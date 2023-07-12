import { db } from "@/database";
import { notAllowedResponse } from "@/root";
import { User } from "@/root/types/Use.type";
import { NextApiRequest, NextApiResponse } from "next";

export async function searchUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {id} = req.query;
        const query = "SELECT * FROM ims_users u where u.usu_id = $1";
        const values = [id];
        const response = await db.query(query, values);
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the user" });
    }
}

export async function updateUser(req: NextApiRequest, res: NextApiResponse) {
    try {
        const {id} = req.query;
        const user = req.body as User;
        const query = "UPDATE ims_users SET usu_admin=$1, usu_name=$2, usu_surnames=$3, usu_email=$4, usu_password=$5 WHERE usu_id=$6 RETURNING *;";
        const values = [user.admin, user.name, user.surnames, user.email, user.password, id];
        const response = await db.query(query, values);
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while updating the user"  });
    }
}

const handlers = {
    GET: async (req: NextApiRequest, res: NextApiResponse) => await searchUser(req, res),
    PUT: async (req: NextApiRequest, res: NextApiResponse) => await updateUser(req, res),
};
export default async function authorsController(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const handler = handlers[method as keyof typeof handlers] || notAllowedResponse;
    return await handler(req, res);
}