import React from 'react'
// ColorDot component for FlowForge AI
interface ColorDotProps {
  className?: string
  children?: React.ReactNode
}
export function ColorDot(props: ColorDotProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default ColorDot
