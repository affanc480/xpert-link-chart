import { createItemHandler } from "@/lib/crud-handler";
import { reportSchema } from "@/lib/validators";

export const { GET, PATCH, DELETE } = createItemHandler({
  model: "report",
  schema: reportSchema,
  moduleName: "reports",
});
