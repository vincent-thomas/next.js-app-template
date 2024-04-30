"use client";

import { setYesCookies } from "@/backend/actions/set-agnolished-cookies";

export const CookiesBanner = () => {
  return (
    <button
      onClick={async () => {
        await setYesCookies();
      }}
    >
      testing
    </button>
  );
};
