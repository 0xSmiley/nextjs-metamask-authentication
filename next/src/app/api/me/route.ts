import { IronSessionData, getIronSession } from "iron-session";
import { ironOption } from "@/config/lib";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest, res: NextResponse) {
  const session = await getIronSession<IronSessionData>(
    request as unknown as NextApiRequest,
    {
      ...res,
      getHeader: (name: string) => res.headers?.get(name),
      setHeader: (name: string, value: string) => res.headers?.set(name, value),
    } as unknown as NextApiResponse,
    ironOption
  );
  const { method } = request;
  switch (method) {
    case "GET":
      console.log("/me ", session);
      return NextResponse.json({ address: session.siwe?.address });

    default:
      return NextResponse.json({ data: "Failed" }, { status: 500 });
  }
}
