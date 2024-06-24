import { IronSessionData, getIronSession } from "iron-session";
import { NextApiRequest, NextApiResponse } from "next";
import { generateNonce } from "siwe";
import { ironOption } from "@/config/lib";
import { NextRequest, NextResponse } from "next/server";

type MyJsonObject = {
  [key: string]: any;
};

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

  // console.log("request", request);
  // console.log("res", res);
  // console.log("ironOption", ironOption);
  // console.log("session.siwe?.address ", session);

  const { method } = request;
  switch (method) {
    case "GET":
      session.nonce = generateNonce();

      await session.save();

      res.headers.set("Content-Type", "text/plain");

      // console.log("Nonce do server ", session.nonce)
      res = NextResponse.json(
        { session: session.nonce },
        { status: res.status, headers: res.headers }
      );
      // console.log("session dasdo server ", res)
      return res;

    default:
      return NextResponse.json({ data: "Failed" }, { status: 520 });
  }
}
// return NextResponse.json({ data: "Failed" }, { status: 501 });
