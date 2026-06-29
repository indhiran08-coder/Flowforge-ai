import React from 'react'
// Pill component for FlowForge AI
interface PillProps {
  className?: string
  children?: React.ReactNode
}
export function Pill(props: PillProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default Pill
