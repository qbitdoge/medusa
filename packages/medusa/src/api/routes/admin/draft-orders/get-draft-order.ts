import { CartService, DraftOrderService } from "../../../../services"
import {
  defaultAdminDraftOrdersCartFields,
  defaultAdminDraftOrdersCartRelations,
  defaultAdminDraftOrdersFields,
  defaultAdminDraftOrdersRelations,
} from "."

import { DraftOrder } from "../../../.."

/**
 * @oas [get] /draft-orders/{id}
 * operationId: "GetDraftOrdersDraftOrder"
 * summary: "Retrieve a Draft Order"
 * description: "Retrieves a Draft Order."
 * x-authenticated: true
 * parameters:
 *   - (path) id=* {string} The ID of the Draft Order.
 * x-codeSamples:
 *   - lang: JavaScript
 *     label: JS Client
 *     source: |
 *       import Medusa from "@medusajs/medusa-js"
 *       const medusa = new Medusa({ baseUrl: MEDUSA_BACKEND_URL, maxRetries: 3 })
 *       // must be previously logged in
 *       medusa.admin.draftOrders.retrieve(draft_order_id)
 *   - lang: Shell
 *     label: cURL
 *     source: |
 *       curl --location --request GET 'localhost:9000/admin/draft-orders/{id}' \
 *       --header 'Authorization: Bearer {api_token}'
 * tags:
 *   - Draft Order
 * responses:
 *   200:
 *     description: OK
 *     content:
 *       application/json:
 *         schema:
 *           properties:
 *             draft_order:
 *               $ref: "#/components/schemas/draft-order"
 */

export default async (req, res) => {
  const { id } = req.params

  const draftOrderService: DraftOrderService =
    req.scope.resolve("draftOrderService")
  const cartService: CartService = req.scope.resolve("cartService")

  const draftOrder: DraftOrder = await draftOrderService.retrieve(id, {
    select: defaultAdminDraftOrdersFields,
    relations: defaultAdminDraftOrdersRelations,
  })

  draftOrder.cart = await cartService.retrieve(draftOrder.cart_id, {
    relations: defaultAdminDraftOrdersCartRelations,
    select: defaultAdminDraftOrdersCartFields,
  })

  res.json({ draft_order: draftOrder })
}
