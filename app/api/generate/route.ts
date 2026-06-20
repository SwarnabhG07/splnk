import clientPromise from "@/lib/mongodb";
import { error } from "console";
import { success } from "zod";  

export async function POST(request: Request) {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("splnk");
    const collection = db.collection("url");

    const result = await collection.insertOne({
        url: body.url,
        shorturl: body.shorturl
    });

    return Response.json({success: true , error: false, message: 'URL GENERATED SUCCESFULLY' });
}