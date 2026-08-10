import { createItemHandler } from "@/lib/crud-handler";
import { chartMainSchema } from "@/lib/validators";

export const { GET, PATCH, DELETE } = createItemHandler({
  model: "chartOfAccountMain",
  schema: chartMainSchema,
  moduleName: "chart-of-account-main",
  // The code is permanent once a row is created — edits can never change it.
  immutableFields: ["code"],
});
