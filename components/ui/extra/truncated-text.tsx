import React from 'react'
// TruncatedText component for FlowForge AI
interface TruncatedTextProps {
  className?: string
  children?: React.ReactNode
}
export function TruncatedText(props: TruncatedTextProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default TruncatedText
