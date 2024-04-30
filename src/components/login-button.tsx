"use client";

import { loginOauth2 } from "@/backend/actions/toAuthorizeUrl";
import { Button } from "@ariakit/react";
import { z } from "zod";

export const LoginButton = () => {
  return <Button onClick={async () => {
    const result = await loginOauth2("github");
    window.location.href = z.string().parse(result.data)
  }}>Login</Button>
}