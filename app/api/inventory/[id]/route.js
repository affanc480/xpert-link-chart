import { createItemHandler } from "@/lib/crud-handler";
import { inventorySchema } from "@/lib/validators";

export const { GET, PATCH, DELETE } = createItemHandler({
  model: "inventory",
  schema: inventorySchema,
  moduleName: "inventory",
});
