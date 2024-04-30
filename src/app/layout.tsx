import type { ReactNode } from "react";
import { globalStyles } from "./global-styles.css";
import { cn } from "@/utils/cn";
import { CookiesBanner } from "@/components/cookies-banner";
import { cookies } from "next/headers";
import { LoginButton } from "@/components/login-button";
const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="en">
      <body className={cn(globalStyles)}>
        {cookies().get("yes-cookies")?.value !== "1" && <CookiesBanner />}
        <LoginButton />
        <img
          height="50"
          width="50"
          src={`${env.appUrl}/assets/user-profile`}
          alt="testing"
        />
        {children}
      </body>
    </html>
  );
};

export default Layout;
