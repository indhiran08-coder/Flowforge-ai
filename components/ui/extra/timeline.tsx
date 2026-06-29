import React from 'react'
// Timeline component for FlowForge AI
interface TimelineProps {
  className?: string
  children?: React.ReactNode
}
export function Timeline(props: TimelineProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default Timeline
