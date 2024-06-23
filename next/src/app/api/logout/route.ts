import { IronSessionData, getIronSession } from "iron-session";
import { ironOption } from "@/config/lib";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
  const session = await getIronSession<IronSessionData>(req, res, ironOption);
  const { method } = req;
  switch (method) {
    case "GET":
      session.destroy();
      return NextResponse.json({ ok: true });
    default:
      return NextResponse.json({ data: "Failed" }, { status: 500 });
  }
}
