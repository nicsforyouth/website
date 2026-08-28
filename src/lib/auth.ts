import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "./db";
import { account as accountTable, members } from "@/lib/schema";
import { and, eq } from "drizzle-orm";
import * as schema from "@/lib/schema";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID!,
      clientSecret: process.env.DISCORD_CLIENT_SECRET!,
    },
  },
  databaseHooks: {
    user: {
      create: {
        after: async (user) => {
          const [acc] = await db
            .select()
            .from(accountTable)
            .where(
              and(
                eq(accountTable.userId, user.id),
                eq(accountTable.providerId, "discord"),
              ),
            );

          if (!acc) return; // shouldn't happen, but better to stay safe lol

          await db
            .insert(members)
            .values({
              discordId: acc.accountId,
              username: user.name,
              avatarUrl: user.image,
              email: user.email,
              registeredVia: "web",
            })
            .onConflictDoNothing({ target: members.discordId });
        },
      },
    },
  },
});
