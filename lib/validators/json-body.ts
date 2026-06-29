// json-body validator for FlowForge AI
export function validate_json_body(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_json_body(data) {
  return validate_json_body(data).success
}
