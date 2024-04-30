import { google } from "@/backend/auth/providers";
import { email, object, optional, safeParse, string, url } from "valibot";

const googleUserInterface = object({
  sub: string(),
  name: string(),
  // biome-ignore lint/style/useNamingConvention: Kommer från google
  given_name: string(),
  picture: optional(string([url()])),
  email: string([email()]),
  locale: string()
});

export const processGoogleCode = async ({
  code,
  verifier
}: { code: string; verifier: string }) => {
  if (verifier === undefined) {
    return undefined;
  }

  const tokens = await google.validateAuthorizationCode(code, verifier);

  const response = await fetch(
    "https://openidconnect.googleapis.com/v1/userinfo",
    {
      headers: {
        authorization: `Bearer ${tokens.accessToken}`
      }
    }
  ).then(v => v.json());

  const result = safeParse(googleUserInterface, response);

  if (!result.success) {
    return undefined;
  }

  return {
    userId: result.output.sub,
    email: result.output.email,
    name: result.output.name,
    picture: result.output.picture
  };
};
