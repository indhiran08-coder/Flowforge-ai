import React from 'react'
// StepIndicator component for FlowForge AI
interface StepIndicatorProps {
  className?: string
  children?: React.ReactNode
}
export function StepIndicator(props: StepIndicatorProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default StepIndicator
