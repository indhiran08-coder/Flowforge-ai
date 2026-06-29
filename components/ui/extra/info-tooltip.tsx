import React from 'react'
// InfoTooltip component for FlowForge AI
interface InfoTooltipProps {
  className?: string
  children?: React.ReactNode
}
export function InfoTooltip(props: InfoTooltipProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default InfoTooltip
