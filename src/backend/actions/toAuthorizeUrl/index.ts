"use server";

import { z } from "zod";
import { publicProcedure } from "../publicAction";
import { github, google } from "@/backend/auth/providers";
import { generateCodeVerifier, generateState } from "arctic";
import { cookies } from "next/headers";
import { match } from "ts-pattern";

export const generateOauth2AuthUrl = (
  provider: "google" | "github",
  { state, codeVerifier }: { state: string; codeVerifier: string }
) => {
  return match(provider)
    .with("google", () => {
      return google.createAuthorizationURL(state, codeVerifier, {
        scopes: ["profile", "email"]
      });
    })
    .with("github", () => {
      return github.createAuthorizationURL(state, {
        scopes: ["profile", "email"]
      });
    })
    .exhaustive();
};

export const loginOauth2 = publicProcedure(
  z.enum(["google"]),
  async provider => {
    const state = generateState();
    const codeVerifier = generateCodeVerifier();
    cookies().set("state", state);
    cookies().set("verifier", codeVerifier);

    const url = await generateOauth2AuthUrl(provider, { state, codeVerifier });

    return url.toString();
  }
);
