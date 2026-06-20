import { redirect } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function Page({
  params,
}: {
  params: Promise<{ shorturl: string }>
}) {
  const { shorturl } = await params;
  
  const client = await clientPromise;
  const db = client.db("splnk");
  const collection = db.collection("url");
  
  const doc = await collection.findOne({
    shorturl: shorturl
  });

  if (doc && doc.url) {
    redirect(doc.url);
  } else {
    redirect(`${process.env.NEXT_PUBLIC_HOST || '/'}`);
  }
}
