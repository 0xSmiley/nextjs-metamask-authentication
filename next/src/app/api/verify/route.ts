import { IronSessionData, getIronSession } from "iron-session";
import { ironOption } from "@/config/lib";
import { NextApiRequest, NextApiResponse } from "next";
import { SiweMessage } from "siwe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let res = new NextResponse();
  const session = await getIronSession<IronSessionData>(
    req as unknown as NextApiRequest,
    {
      ...res,
      getHeader: (name: string) => res.headers?.get(name),
      setHeader: (name: string, value: string) => res.headers?.set(name, value),
    } as unknown as NextApiResponse,
    ironOption
  );
  try {
    const request = await req.json();

    const message = request.message;
    const signature = request.signature;
    const siweMessage = new SiweMessage(message);

    const fields = await siweMessage.verify({ signature });

    if (fields.data.nonce !== session.nonce) {
      return NextResponse.json({ message: "Invalid nonce." }, { status: 422 });
    }

    session.siwe = fields.data;

    await session.save();

    res = NextResponse.json(
      { ok: true },
      { status: res.status, headers: res.headers }
    );
    return res;
  } catch (_error) {

    return NextResponse.json({ ok: false });
  }
}


