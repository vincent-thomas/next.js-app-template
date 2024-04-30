"use server";

import { cookies } from "next/headers";

// biome-ignore lint/suspicious/useAwait: Server action
export const setYesCookies = async () => {
  cookies().set("yes-cookies", "1");
};
