import { createListCreateHandler } from "@/lib/crud-handler";
import { accountSchema } from "@/lib/validators";

export const { GET, POST } = createListCreateHandler({
  model: "account",
  schema: accountSchema,
  searchFields: ["accountName", "contactEmail"],
  moduleName: "accounts",
});
