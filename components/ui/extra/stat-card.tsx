import React from 'react'
// StatCard component for FlowForge AI
interface StatCardProps {
  className?: string
  children?: React.ReactNode
}
export function StatCard(props: StatCardProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default StatCard
