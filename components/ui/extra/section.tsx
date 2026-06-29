import React from 'react'
// Section component for FlowForge AI
interface SectionProps {
  className?: string
  children?: React.ReactNode
}
export function Section(props: SectionProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default Section
