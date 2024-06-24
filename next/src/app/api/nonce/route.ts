import { IronSessionData, getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { generateNonce } from "siwe";
import { ironOption } from "@/config/lib";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  let res = new NextResponse();

  const session = await getIronSession<IronSessionData>(
    request as unknown as NextApiRequest,
    {
      ...res,
      getHeader: (name: string) => res.headers?.get(name),
      setHeader: (name: string, value: string) => res.headers?.set(name, value),
    } as unknown as NextApiResponse,
    ironOption
  );

  session.nonce = generateNonce();

  await session.save();

  res.headers.set("Content-Type", "text/plain");

  res = NextResponse.json(
    { session: session.nonce },
    { status: res.status, headers: res.headers }
  );

  return res;
}
