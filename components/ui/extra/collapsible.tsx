import React from 'react'
// Collapsible component for FlowForge AI
interface CollapsibleProps {
  className?: string
  children?: React.ReactNode
}
export function Collapsible(props: CollapsibleProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default Collapsible
