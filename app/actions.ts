// app/actions.ts
"use server";
import { neon } from "@neondatabase/serverless";

const dbUrl = process.env.DATABASE_URL!; // <-- the “!” asserts it’s not undefined

export async function getData() {
  const sql = neon(dbUrl);
  const data = await sql`...`;

  return data;
}
