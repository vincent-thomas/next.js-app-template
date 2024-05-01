import { generateCodeVerifier, generateState } from "@/backend/auth/utils";
import { generateOauth2AuthUrl } from ".";
import { parse, string, url } from "valibot";

test("testign", async () => {
  const state = generateState();
  const verifier = generateCodeVerifier();
  const result = await generateOauth2AuthUrl("google", {
    state,
    codeVerifier: verifier
  });

  expect(
    parse.bind(undefined, string([url()]), result?.toString())
  ).not.toThrowError();
});
