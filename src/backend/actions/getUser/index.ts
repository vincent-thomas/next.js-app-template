"use server";

import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import { number, parse, string } from "valibot";

export const getSession = async () => {
  const token = cookies().get("token")?.value;

  if (token === undefined) {
    return null;
  }
  const validatedToken = await jwtVerify(
    token,
    new TextEncoder().encode(env.jwtSecret)
  );

  const payload = validatedToken.payload;
  const userId = parse(string(), payload.sub);
  const validBefore = parse(number(), payload.iat);

  return { userId, validBefore };
};
