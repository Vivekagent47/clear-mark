import { db } from "@/drizzle/db";
import { UserTable } from "@/drizzle/schema";
import {
  CACHE_TAGS,
  dbCache,
  getUserTag,
  revalidateDbCache,
} from "@/lib/cache";
import { eq } from "drizzle-orm";

export async function deleteUser(clerkUserId: string) {
  const [user] = await db.batch([
    db
      .delete(UserTable)
      .where(eq(UserTable.clerkUserId, clerkUserId))
      .returning({
        id: UserTable.id,
      }),
  ]);

  user.forEach((sub) => {
    revalidateDbCache({
      tag: CACHE_TAGS.user,
      id: sub.id,
      userId: clerkUserId,
    });
  });

  return [user];
}

export async function createUser(data: typeof UserTable.$inferInsert) {
  const [newUser] = await db
    .insert(UserTable)
    .values(data)
    .onConflictDoNothing({
      target: UserTable.clerkUserId,
    })
    .returning({
      id: UserTable.id,
      userId: UserTable.clerkUserId,
    });

  if (newUser != null) {
    revalidateDbCache({
      tag: CACHE_TAGS.user,
      id: newUser.id,
      userId: newUser.userId,
    });
  }

  return newUser;
}

export function getUser(userId: string) {
  const cacheFn = dbCache(getUserSubscriptionInternal, {
    tags: [getUserTag(userId, CACHE_TAGS.user)],
  });

  return cacheFn(userId);
}

function getUserSubscriptionInternal(userId: string) {
  return db.query.UserTable.findFirst({
    where: ({ clerkUserId }, { eq }) => eq(clerkUserId, userId),
  });
}
