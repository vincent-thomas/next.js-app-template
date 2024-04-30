import { github, google } from "@/backend/auth/providers";
import { db } from "@/backend/db";
import { userTable } from "@/backend/db/schema";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod";
import {SignJWT} from "jose";

const googleUserInterface = z.object({
  sub: z.string(),
  name: z.string(),
  given_name: z.string(),
  picture: z.string().url().optional(),
  email: z.string().email(),
  locale: z.string()
})

const myUserInterface = z.object({
  userId: z.string(),
  name: z.string(),
  picture: z.string().url().optional(),
  email: z.string().email()
})

export const GET = async (req: NextRequest, {params: { provider }}: {params: {provider: string}}) => {
  const code = z.string().parse(req.nextUrl.searchParams.get("code"));
  const state = z.string().parse(req.nextUrl.searchParams.get("state"));

  if (state !== cookies().get("state")?.value) {
    return NextResponse.json({no: "no"}, {status: 400})
  }

  let user: z.infer<typeof myUserInterface>;

  switch (provider) {
    // case "github": {
    //   const tokens = await github.validateAuthorizationCode(code);
    //   const _accessToken = tokens.accessToken;

    //   const result = await fetch(`https://api.github.com/user`, {
    //     headers: {
    //       authorization: `Bearer ${_accessToken}`
    //     },
    //     method: "GET",
    //   }).then(v=>v.json())
    //   console.log(result);

    //   break;
    // }
    case "google": {
      const verifier = cookies().get("verifier")?.value;

      if (verifier === undefined) {
        return NextResponse.json({no: "no"})
      }

      const tokens = await google.validateAuthorizationCode(code, verifier)

      const response = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
        headers: {
          Authorization: `Bearer ${tokens.accessToken}`
        }
      }).then(v=>v.json());

      const result = googleUserInterface.safeParse(response);

      if (!result.success) {
        return NextResponse.json({no: "no"}, {status: 500})
      }

      user = {
        userId: result.data.sub,
        email: result.data.email,
        name: result.data.name, 
        picture: result.data.picture
      } 
      break;
    }
    default: {
      throw new Error("Whhahhat")
    }
  }

  const userId = `${provider}|${user.userId}`;

  const existingUser = await db.select().from(userTable).where(and(eq(userTable.userId, userId))).then(v=>v?.[0]);

  if (existingUser === undefined) {
    await db.insert(userTable).values({
      email: user.email,
      name: user.name,
      userId,
      picture: user.picture
    });
  }

  const jwt = await new SignJWT().setSubject(userId).setProtectedHeader({alg: "HS256"}).setIssuedAt(new Date()).sign(new TextEncoder().encode(env.jwtSecret));

  cookies().set("token", jwt);

  cookies().delete("state")
  cookies().delete("verifier")

  return NextResponse.redirect(`${env.appUrl}`)
}