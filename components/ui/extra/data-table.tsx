import React from 'react'
// DataTable component for FlowForge AI
interface DataTableProps {
  className?: string
  children?: React.ReactNode
}
export function DataTable(props: DataTableProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default DataTable
