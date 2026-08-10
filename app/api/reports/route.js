import { createListCreateHandler } from "@/lib/crud-handler";
import { reportSchema } from "@/lib/validators";

export const { GET, POST } = createListCreateHandler({
  model: "report",
  schema: reportSchema,
  searchFields: ["title", "type"],
  moduleName: "reports",
});
