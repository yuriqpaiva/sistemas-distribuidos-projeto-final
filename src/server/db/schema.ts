import {
  mysqlTable, varchar,
  serial,
  date,
  timestamp
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("user", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 256 }).notNull().unique(),
  username: varchar("username", { length: 256 }).notNull(),
  password: varchar("password", { length: 256 }).notNull(),
});

export const logs = mysqlTable("logs", {
  id: serial("id").primaryKey(),
  ip: varchar("ip", { length: 256 }).notNull(),
  pathname: varchar("pathname", { length: 256 }).notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(), 
  statusReq: varchar("status_req", { length: 256 }).notNull(),
  dataLength: varchar("data_length", { length: 256 })
});
