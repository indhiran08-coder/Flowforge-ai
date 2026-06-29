import React from 'react'
// ProgressBar component for FlowForge AI
interface ProgressBarProps {
  className?: string
  children?: React.ReactNode
}
export function ProgressBar(props: ProgressBarProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default ProgressBar
