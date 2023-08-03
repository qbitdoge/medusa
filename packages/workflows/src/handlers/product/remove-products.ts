import { ProductTypes } from "@medusajs/types"
import { WorkflowArguments } from "../../helper"

export const removeProductsInputAlias = "removeProducts"

export async function removeProducts({
  container,
  data,
}: Omit<WorkflowArguments, "data"> & {
  data: {
    removeProducts: ProductTypes.ProductDTO[]
  }
}): Promise<void> {
  const data_ = data.removeProducts
  if (!data_.length) {
    return
  }

  const productModuleService: ProductTypes.IProductModuleService =
    container.resolve("productModuleService")

  await productModuleService.softDelete(data_.map((p) => p.id))
}

removeProducts.aliases = {
  removeProductsInputAlias: "removeProducts",
}
