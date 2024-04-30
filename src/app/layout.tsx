import type { ReactNode } from "react"
import { globalStyles } from "./global-styles.css";
import { cn } from "@/utils/cn";
import { CookiesBanner } from "@/components/cookies-banner";
import { cookies } from "next/headers";
import {Button} from "@ariakit/react";
import { LoginButton } from "@/components/login-button";

const Layout = ({children}: {children: ReactNode}) => {
  return (
    <html>
      <body className={cn(globalStyles)}>
        {cookies().get("yes-cookies")?.value !== "1" && <CookiesBanner />}
        <LoginButton />
        {children}
      </body>
    </html>
  )
}

export default Layout;