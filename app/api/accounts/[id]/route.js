import { createItemHandler } from "@/lib/crud-handler";
import { accountSchema } from "@/lib/validators";

export const { GET, PATCH, DELETE } = createItemHandler({
  model: "account",
  schema: accountSchema,
  moduleName: "accounts",
});
