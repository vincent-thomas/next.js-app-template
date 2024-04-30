import { getSession } from "@/backend/actions/getUser";
import { db } from "@/backend/db";
import { userTable } from "@/backend/db/schema";
import { eq } from "drizzle-orm";

export const GET = async (_: Request) => {
  const session = await getSession();

  if (session === null) {
    return new Response(null, { status: 400 });
  }

  const user = await db
    .select()
    .from(userTable)
    .where(eq(userTable.userId, session.userId))
    .then(v => v?.[0]);
  if (!user.picture) {
    return new Response(null, { status: 400 });
  }

  return Response.redirect(user.picture);
};
