import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  uniqueIndex,
  serial,
  uuid,
  integer,
} from "drizzle-orm/pg-core";

export const progress = pgTable(
  "progress",
  {
    id: serial("id").primaryKey(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    moduleId: text("module_id").notNull(), // e.g. "html-basics", "python-intro"
    status: text("status").notNull().default("not_started"), // not_started | in_progress | done
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (table) => ({
    userModuleUnique: uniqueIndex("user_module_idx").on(
      table.userId,
      table.moduleId,
    ),
  }),
);

export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),
  discordId: text("discord_id").notNull().unique(),
  username: text("username").notNull(),
  avatarUrl: text("avatar_url"),
  email: text("email"),
  registeredVia: text("registered_via").notNull(), // "web" | "bot"
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    issuer: text("issuer").notNull(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("account_issuer_accountId_uidx").on(
      table.issuer,
      table.accountId,
    ),
    index("account_userId_idx").on(table.userId),
  ],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

export const workshops = pgTable("workshops", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description"),
  activity: text("activity").notNull(), // "active", "passive", "expired"
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  workshopId: integer("workshop_id")
    .notNull()
    .references(() => workshops.id),
  slug: text("slug").notNull(),
  title: text("title").notNull(),
  order: integer("order").notNull(),
});

export const steps = pgTable("steps", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id")
    .notNull()
    .references(() => modules.id),
  order: integer("order").notNull(),
  type: text("type").notNull(), // "article" | "video" | "quiz"
  title: text("title").notNull(),
  url: text("url"),
  quizId: text("quiz_id"),
  passingScore: integer("passing_score"),
});

export const enrollments = pgTable("enrollments", {
  id: serial("id").primaryKey(),
  memberId: uuid("member_id")
    .notNull()
    .references(() => members.id, { onDelete: "cascade" }),
  workshopId: integer("workshop_id")
    .notNull()
    .references(() => workshops.id),
  enrolledAt: timestamp("enrolled_at").notNull().defaultNow(),
});

export const stepProgress = pgTable("step_progress", {
  id: serial("id").primaryKey(),
  memberId: uuid("member_id")
    .notNull()
    .references(() => members.id, { onDelete: "cascade" }),
  stepId: integer("step_id")
    .notNull()
    .references(() => steps.id),
  completed: boolean("completed").notNull().default(false),
  completedAt: timestamp("completed_at"),
});

export const finalProjects = pgTable("final_projects", {
  id: serial("id").primaryKey(),
  memberId: uuid("member_id")
    .notNull()
    .references(() => members.id, { onDelete: "cascade" }),
  workshopId: integer("workshop_id")
    .notNull()
    .references(() => workshops.id),
  submissionUrl: text("submission_url").notNull(),
  submittedAt: timestamp("submitted_at").notNull().defaultNow(),
});

export const certificates = pgTable("certificates", {
  id: serial("id").primaryKey(),
  memberId: uuid("member_id")
    .notNull()
    .references(() => members.id, { onDelete: "cascade" }),
  workshopId: integer("workshop_id")
    .notNull()
    .references(() => workshops.id),
  certificateUrl: text("certificate_url"),
  issuedAt: timestamp("issued_at").notNull().defaultNow(),
});
