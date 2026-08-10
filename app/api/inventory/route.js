import { createListCreateHandler } from "@/lib/crud-handler";
import { inventorySchema } from "@/lib/validators";

export const { GET, POST } = createListCreateHandler({
  model: "inventory",
  schema: inventorySchema,
  searchFields: ["sku", "name", "warehouse"],
  moduleName: "inventory",
});
