import clientPromise from "@/lib/mongodb";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate URL protocol
        const allowed = ["http:", "https:"];
        const parsed = new URL(body.url);
        if (!allowed.includes(parsed.protocol)) {
            return Response.json({ error: true, success: false, message: "Only HTTP/HTTPS URLs allowed." }, { status: 400 });
        }

        // Block internal IPs
        const blocked = ["localhost", "127.0.0.1", "0.0.0.0", "::1"];
        if (blocked.some(b => parsed.hostname.includes(b))) {
            return Response.json({ error: true, success: false, message: "Invalid URL." }, { status: 400 });
        }

        const client = await clientPromise;
        const db = client.db("splnk");
        const collection = db.collection("url");

        const doc = await collection.findOne({
            shorturl: body.shorturl
        });
        if (doc) {
            return Response.json({
                success: false,
                error: true,
                message: 'URL already exists'
            });
        }

        await collection.insertOne({
            url: body.url,
            shorturl: body.shorturl
        });

        return Response.json({ success: true, error: false, message: 'URL GENERATED SUCCESFULLY' });
    } catch (error: any) {
        console.error("API Error:", error);
        return Response.json({
            success: false,
            error: true,
            message: error.message || 'Internal Server Error'
        }, { status: 500 });
    }
}