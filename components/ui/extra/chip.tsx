import React from 'react'
// Chip component for FlowForge AI
interface ChipProps {
  className?: string
  children?: React.ReactNode
}
export function Chip(props: ChipProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default Chip
