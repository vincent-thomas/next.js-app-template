import { db } from "@/backend/db";
import { type insertUserTable, userTable } from "@/backend/db/schema";
import { and, eq } from "drizzle-orm";
import { cookies } from "next/headers";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { SignJWT } from "jose";
import { match } from "ts-pattern";
import type { Input } from "valibot";
import { processGoogleCode } from "./processProviders";

export const GET = async (
  req: NextRequest,
  { params: { provider } }: { params: { provider: "google" } }
) => {
  const code = z.string().parse(req.nextUrl.searchParams.get("code"));
  const state = z.string().parse(req.nextUrl.searchParams.get("state"));
  const verifier = cookies().get("verifier")?.value;

  if (state !== cookies().get("state")?.value ?? !verifier) {
    return Response.json({ no: "no" }, { status: 400 });
  }

  const user = await match(provider)
    .returnType<Promise<Input<typeof insertUserTable> | undefined>>()
    .with("google", () => processGoogleCode({ code, verifier }))
    .exhaustive();

  if (user === undefined) {
    return new Response(undefined, { status: 400 });
  }

  const userId = `${provider}|${user.userId}`;

  const existingUser = await db
    .select()
    .from(userTable)
    .where(and(eq(userTable.userId, userId)))
    .then(v => v?.[0]);

  if (existingUser === undefined) {
    await db.insert(userTable).values({
      email: user.email,
      name: user.name,
      userId,
      picture: user.picture
    });
  }

  const jwt = await new SignJWT()
    .setSubject(userId)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt(new Date())
    .sign(new TextEncoder().encode(env.jwtSecret));

  cookies().set("token", jwt);

  cookies().delete("state");
  cookies().delete("verifier");

  return Response.redirect(`${env.appUrl}`);
};
