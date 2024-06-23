import { SessionOptions } from "iron-session";

export const ironOption: SessionOptions = {
    cookieName: "siwe",
    password: process.env.PASSWORD_COMPRIDA!,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    },
  };
  