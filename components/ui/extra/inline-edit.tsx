import React from 'react'
// InlineEdit component for FlowForge AI
interface InlineEditProps {
  className?: string
  children?: React.ReactNode
}
export function InlineEdit(props: InlineEditProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default InlineEdit
