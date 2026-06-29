import React from 'react'
// WorkflowHeader dashboard component
interface WorkflowHeaderProps {
  className?: string
}
export function WorkflowHeader(props: WorkflowHeaderProps) {
  return React.createElement('div', { className: props.className }, 'WorkflowHeader')
}
