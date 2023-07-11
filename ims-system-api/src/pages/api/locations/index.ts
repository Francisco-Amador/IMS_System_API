import { db } from "@/database/db";
import { notAllowedResponse } from "@/root";
import { Locations } from "@/root/types";
import { NextApiRequest, NextApiResponse } from "next";



export async function createLocation(req: NextApiRequest, res: NextApiResponse) {
    try {
        const location = req.body as Locations;
        const query = "INSERT INTO ims_locations (location_name) VALUES ($1) RETURNING *";
        const values = [location.name];
        const response = await db.query(query, values);
        res.status(200).json(response.rows[0]);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the location" });
    }
}



export async function getLocations( res: NextApiResponse) {
    try {
        const query = "SELECT * FROM ims_locations";
        const response = await db.query(query);
        res.status(200).json(response.rows);
    } catch (error) {
        res.status(500).json({ error: "An error occurred while creating the location" });
    }
}







const handlers = {
    POST: async (req: NextApiRequest, res: NextApiResponse) => await createLocation(req, res),
    GET: async (req: NextApiRequest, res: NextApiResponse) => await getLocations( res)
};
export default async function authorsController(req: NextApiRequest, res: NextApiResponse) {
    const { method } = req;
    const handler = handlers[method as keyof typeof handlers] || notAllowedResponse;
    return await handler(req, res);
}


