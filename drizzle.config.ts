import type { Config } from "drizzle-kit";

export default {
  dialect: "postgresql",
  schema: "./db/schema.ts",
  dbCredentials: {
    url: `postgres://postgres:du3xqByjI2f8drBZ7nr5LuOz853L3aAq@que.sg:5432/postgres`,
  },
  verbose: true,
} satisfies Config;
