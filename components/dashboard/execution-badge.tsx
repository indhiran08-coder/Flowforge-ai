import React from 'react'
// ExecutionBadge dashboard component
interface ExecutionBadgeProps {
  className?: string
}
export function ExecutionBadge(props: ExecutionBadgeProps) {
  return React.createElement('div', { className: props.className }, 'ExecutionBadge')
}
