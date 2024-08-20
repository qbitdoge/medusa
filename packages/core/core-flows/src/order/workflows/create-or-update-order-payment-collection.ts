import { PaymentCollectionDTO } from "@medusajs/types"
import { MedusaError, PaymentCollectionStatus } from "@medusajs/utils"
import {
  createWorkflow,
  transform,
  when,
  WorkflowData,
  WorkflowResponse,
} from "@medusajs/workflows-sdk"
import { useRemoteQueryStep } from "../../common"
import { updatePaymentCollectionStep } from "../../payment-collection"
import { createOrderPaymentCollectionWorkflow } from "./create-order-payment-collection"

export const createOrUpdateOrderPaymentCollectionWorkflowId =
  "create-or-update-order-payment-collection"
/**
 * This workflow creates or updates payment collection for an order.
 */
export const createOrUpdateOrderPaymentCollectionWorkflow = createWorkflow(
  createOrUpdateOrderPaymentCollectionWorkflowId,
  (
    input: WorkflowData<{
      order_id: string
      amount?: number
    }>
  ) => {
    const order = useRemoteQueryStep({
      entry_point: "order",
      fields: ["id", "summary", "currency_code", "region_id"],
      variables: { id: input.order_id },
      throw_if_key_not_found: true,
      list: false,
    })

    const orderPaymentCollections = useRemoteQueryStep({
      entry_point: "order_payment_collection",
      fields: ["payment_collection_id"],
      variables: { order_id: order.id },
    }).config({ name: "order-payment-collection-query" })

    const orderPaymentCollectionIds = transform(
      { orderPaymentCollections },
      ({ orderPaymentCollections }) =>
        orderPaymentCollections.map((opc) => opc.payment_collection_id)
    )

    const existingPaymentCollection = useRemoteQueryStep({
      entry_point: "payment_collection",
      fields: ["id", "status"],
      variables: {
        filters: {
          id: orderPaymentCollectionIds,
          status: [PaymentCollectionStatus.NOT_PAID],
        },
      },
      list: false,
    }).config({ name: "payment-collection-query" })

    const amountPending = transform({ order, input }, ({ order, input }) => {
      const pendingPayment = order.summary.pending_difference

      if (input.amount && input.amount > pendingPayment) {
        throw new MedusaError(
          MedusaError.Types.NOT_ALLOWED,
          `Amount cannot be greater than ${pendingPayment}`
        )
      }

      return pendingPayment
    })

    const updatedPaymentCollections = when(
      { existingPaymentCollection, amountPending },
      ({ existingPaymentCollection, amountPending }) => {
        return !!existingPaymentCollection?.id && amountPending > 0
      }
    ).then(() => {
      return updatePaymentCollectionStep({
        selector: { id: existingPaymentCollection.id },
        update: {
          amount: amountPending,
        },
      }) as PaymentCollectionDTO[]
    })

    const createdPaymentCollection = when(
      { existingPaymentCollection, amountPending },
      ({ existingPaymentCollection, amountPending }) => {
        return !!!existingPaymentCollection?.id && amountPending > 0
      }
    ).then(() => {
      return createOrderPaymentCollectionWorkflow.runAsStep({
        input: {
          order_id: order.id,
          amount: amountPending,
        },
      }) as PaymentCollectionDTO[]
    })

    const paymentCollections = transform(
      { updatedPaymentCollections, createdPaymentCollection },
      ({ updatedPaymentCollections, createdPaymentCollection }) =>
        updatedPaymentCollections || createdPaymentCollection
    )

    return new WorkflowResponse(paymentCollections)
  }
)