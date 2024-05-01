import { env } from "@/env";
import { GitHub, Google } from "arctic";

export const github = new GitHub(
  env.githubOauth2AppId,
  env.githubOauth2Secret,
  {
    // biome-ignore lint/style/useNamingConvention: <explanation>
    redirectURI: `${env.appUrl}/auth/github`
  }
);

export const google = new Google(
  env.googleOauth2AppId,
  env.googleOauth2Secret,
  `${env.appUrl}/auth/google`
);
