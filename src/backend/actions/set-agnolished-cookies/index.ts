"use server";

import { cookies } from "next/headers";

export const setYesCookies = async () => {
  console.log("testing");

  cookies().set("yes-cookies", "1");
}