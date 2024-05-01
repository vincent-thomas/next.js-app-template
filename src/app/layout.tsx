import type { ReactNode } from "react";
import { globalStyles } from "./global-styles.css";
import { cn } from "@/utils/cn";
import { CookiesBanner } from "@/components/cookies-banner";
import { cookies } from "next/headers";
import { LoginButton } from "@/components/login-button";
import type { Metadata } from "next";

const APP_NAME = "Next.js Example application";
const APP_DESCRIPTION =
  "Next.js example application is a template for building powerfull applications";

// Default
export const metadata: Metadata = {
  title: APP_NAME,
  description: APP_DESCRIPTION,
  openGraph: {
    type: "website",
    title: APP_NAME,
    description: APP_DESCRIPTION
  }
};

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={cn(globalStyles)}>
        {cookies().get("yes-cookies")?.value !== "1" && <CookiesBanner />}
        <LoginButton />
        <img height="50" width="50" src="/assets/user-profile" alt="testing" />
        {children}
      </body>
    </html>
  );
};

export default Layout;
