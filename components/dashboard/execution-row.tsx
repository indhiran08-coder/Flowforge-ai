import React from 'react'
// ExecutionRow dashboard component
interface ExecutionRowProps {
  className?: string
}
export function ExecutionRow(props: ExecutionRowProps) {
  return React.createElement('div', { className: props.className }, 'ExecutionRow')
}
