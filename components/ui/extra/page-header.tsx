import React from 'react'
// PageHeader component for FlowForge AI
interface PageHeaderProps {
  className?: string
  children?: React.ReactNode
}
export function PageHeader(props: PageHeaderProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default PageHeader
