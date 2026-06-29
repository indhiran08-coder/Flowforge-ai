// api-request validator for FlowForge AI
export function validate_api_request(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_api_request(data) {
  return validate_api_request(data).success
}
