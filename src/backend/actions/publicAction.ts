"use server";

import { createSafeActionClient } from "next-safe-action";
import { getSession } from "./getUser";

export const publicProcedure = createSafeActionClient();

export const protectedProcedure = createSafeActionClient({
  async middleware() {
    const user = await getSession();

    if (user === null) {
      throw new Error("Session not found");
    }

    return user;
  },
  handleReturnedServerError(e) {
    return e.message;
  }
});
