import React from 'react'
// WorkflowCard dashboard component
interface WorkflowCardProps {
  className?: string
}
export function WorkflowCard(props: WorkflowCardProps) {
  return React.createElement('div', { className: props.className }, 'WorkflowCard')
}
