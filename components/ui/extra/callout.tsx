import React from 'react'
// Callout component for FlowForge AI
interface CalloutProps {
  className?: string
  children?: React.ReactNode
}
export function Callout(props: CalloutProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default Callout
