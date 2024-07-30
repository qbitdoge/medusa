/**
 * @oas [get] /admin/fulfillment-providers
 * operationId: GetFulfillmentProviders
 * summary: List Fulfillment Providers
 * description: Retrieve a list of fulfillment providers. The fulfillment providers
 *   can be filtered by fields such as `id`. The fulfillment providers can also be
 *   sorted or paginated.
 * x-authenticated: true
 * parameters:
 *   - name: expand
 *     in: query
 *     description: Comma-separated relations that should be expanded in the returned data.
 *     required: false
 *     schema:
 *       type: string
 *       title: expand
 *       description: Comma-separated relations that should be expanded in the returned data.
 *   - name: fields
 *     in: query
 *     description: Comma-separated fields that should be included in the returned
 *       data. if a field is prefixed with `+` it will be added to the default
 *       fields, using `-` will remove it from the default fields. without prefix
 *       it will replace the entire default fields.
 *     required: false
 *     schema:
 *       type: string
 *       title: fields
 *       description: Comma-separated fields that should be included in the returned
 *         data. if a field is prefixed with `+` it will be added to the default
 *         fields, using `-` will remove it from the default fields. without prefix
 *         it will replace the entire default fields.
 *   - name: offset
 *     in: query
 *     description: The number of items to skip when retrieving a list.
 *     required: false
 *     schema:
 *       type: number
 *       title: offset
 *       description: The number of items to skip when retrieving a list.
 *   - name: limit
 *     in: query
 *     description: Limit the number of items returned in the list.
 *     required: false
 *     schema:
 *       type: number
 *       title: limit
 *       description: Limit the number of items returned in the list.
 *   - name: order
 *     in: query
 *     description: The field to sort the data by. By default, the sort order is
 *       ascending. To change the order to descending, prefix the field name with
 *       `-`.
 *     required: false
 *     schema:
 *       type: string
 *       title: order
 *       description: The field to sort the data by. By default, the sort order is
 *         ascending. To change the order to descending, prefix the field name with
 *         `-`.
 *   - name: id
 *     in: query
 *     required: false
 *     schema:
 *       oneOf:
 *         - type: string
 *           title: id
 *           description: The fulfillment provider's ID.
 *         - type: array
 *           description: The fulfillment provider's ID.
 *           items:
 *             type: string
 *             title: id
 *             description: The id's ID.
 *   - name: is_enabled
 *     in: query
 *     description: The fulfillment provider's is enabled.
 *     required: true
 *     schema:
 *       type: boolean
 *       title: is_enabled
 *       description: The fulfillment provider's is enabled.
 *   - name: q
 *     in: query
 *     description: The fulfillment provider's q.
 *     required: false
 *     schema:
 *       type: string
 *       title: q
 *       description: The fulfillment provider's q.
 *   - name: stock_location_id
 *     in: query
 *     required: false
 *     schema:
 *       oneOf:
 *         - type: string
 *           title: stock_location_id
 *           description: The fulfillment provider's stock location id.
 *         - type: array
 *           description: The fulfillment provider's stock location id.
 *           items:
 *             type: string
 *             title: stock_location_id
 *             description: The stock location id's details.
 * security:
 *   - api_token: []
 *   - cookie_auth: []
 *   - jwt_token: []
 * x-codeSamples:
 *   - lang: Shell
 *     label: cURL
 *     source: |-
 *       curl '{backend_url}/admin/fulfillment-providers' \
 *       -H 'x-medusa-access-token: {api_token}'
 * tags:
 *   - Fulfillment Providers
 * responses:
 *   "400":
 *     $ref: "#/components/responses/400_error"
 *   "401":
 *     $ref: "#/components/responses/unauthorized"
 *   "404":
 *     $ref: "#/components/responses/not_found_error"
 *   "409":
 *     $ref: "#/components/responses/invalid_state_error"
 *   "422":
 *     $ref: "#/components/responses/invalid_request_error"
 *   "500":
 *     $ref: "#/components/responses/500_error"
 * 
*/

