import * as z from "zod";
import { writeFile } from "node:fs/promises";
import { QuizSchema } from "@/types/quiz";

async function main() {
  const jsonSchema = z.toJSONSchema(QuizSchema);

  await writeFile(
    "content/quiz.schema.json",
    JSON.stringify(jsonSchema, null, 2),
  );

  console.log("Generated quiz.schema.json");
}

main();
