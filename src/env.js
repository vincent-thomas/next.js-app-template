import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    nodeEnv: z.enum(["development", "test", "production"]),
    githubOauth2AppId: z.string(),
    githubOauth2Secret: z.string(),
    databaseUrl: z.string().url(),
    databaseToken: z.string(),
    googleOauth2AppId: z.string(),
    googleOauth2Secret: z.string(),
    jwtSecret: z.string(),
    stripeApiKey: z.string(),
    stripeWebhookSecret: z.string()
  },
  runtimeEnv: {
    nodeEnv: process.env.NODE_ENV,
    githubOauth2AppId: process.env.AUTH_GITHUB_APP,
    githubOauth2Secret: process.env.AUTH_GITHUB_SECRET,
    googleOauth2AppId: process.env.AUTH_GOOGLE_APP,
    googleOauth2Secret: process.env.AUTH_GOOGLE_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    databaseToken: process.env.DATABASE_TOKEN,
    jwtSecret: process.env.JWT_SECRET,
    appUrl: process.env.NEXT_PUBLIC_APP_URL,
    stripeApiKey: process.env.STRIPE_API_KEY,
    stripeWebhookSecret: process.env.STRIPE_WEBHOOK_SECRET
  },
  client: {
    appUrl: z.string().url()
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true
});
