// workflow validator for FlowForge AI
export function validate_workflow(data) {
  if (!data) return { success: false, error: 'Required' }
  return { success: true, data }
}
export function is_valid_workflow(data) {
  return validate_workflow(data).success
}
