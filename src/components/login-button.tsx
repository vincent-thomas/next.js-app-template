"use client";

import { loginOauth2 } from "@/backend/actions/toAuthorizeUrl";
import { Button } from "@ariakit/react";
import { parse, string } from "valibot";

export const LoginButton = () => {
  return (
    <Button
      onClick={async () => {
        const result = await loginOauth2("google");
        window.location.href = parse(string(), result.data);
      }}
    >
      Login
    </Button>
  );
};
