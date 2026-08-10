import { createListCreateHandler } from "@/lib/crud-handler";
import { chartMainSchema } from "@/lib/validators";

export const { GET, POST } = createListCreateHandler({
  model: "chartOfAccountMain",
  schema: chartMainSchema,
  searchFields: ["code", "title"],
  moduleName: "chart-of-account-main",
});
