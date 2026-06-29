import React from 'react'
// Breadcrumb component for FlowForge AI
interface BreadcrumbProps {
  className?: string
  children?: React.ReactNode
}
export function Breadcrumb(props: BreadcrumbProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default Breadcrumb
