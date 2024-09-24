import {
  UpdatePromotionRulesWorkflowDTO,
  PromotionRuleDTO,
} from "@medusajs/types"
import {
  WorkflowData,
  WorkflowResponse,
  createWorkflow,
} from "@medusajs/workflows-sdk"
import { updatePromotionRulesStep } from "../steps"

export const updatePromotionRulesWorkflowId = "update-promotion-rules-workflow"
/**
 * This workflow updates one or more promotion rules.
 */
export const updatePromotionRulesWorkflow = createWorkflow(
  updatePromotionRulesWorkflowId,
  (
    input: WorkflowData<UpdatePromotionRulesWorkflowDTO>
  ): WorkflowResponse<PromotionRuleDTO[]> => {
    return new WorkflowResponse(updatePromotionRulesStep(input))
  }
)