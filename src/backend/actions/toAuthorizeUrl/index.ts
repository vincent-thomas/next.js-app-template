"use server"

import { z } from "zod";
import { publicProcedure } from "../publicAction";
import { google } from "@/backend/auth/providers";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";

export const loginOauth2 = publicProcedure(z.enum(["github"]), async () => {
  const state = generateState();
  const codeVerifier = generateCodeVerifier();

  const url = await google.createAuthorizationURL(state, codeVerifier, {
    scopes: ["profile", "email"]
  });

  cookies().set("state", state);
  cookies().set("verifier", codeVerifier);

  return url.toString();
})