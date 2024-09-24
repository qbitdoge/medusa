/**
 * @schema AdminPostOrderEditsReqSchema
 * type: object
 * description: The order edit's details.
 * x-schemaName: AdminPostOrderEditsReqSchema
 * required:
 *   - order_id
 * properties:
 *   order_id:
 *     type: string
 *     title: order_id
 *     description: The ID of the order this edit is for.
 *   description:
 *     type: string
 *     title: description
 *     description: The order edit's description.
 *   internal_note:
 *     type: string
 *     title: internal_note
 *     description: A note viewed only by admin users.
 *   metadata:
 *     type: object
 *     description: The order edit's metadata, can hold custom key-value pairs.
 * 
*/
