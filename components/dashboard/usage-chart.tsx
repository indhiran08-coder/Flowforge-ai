import React from 'react'
// UsageChart dashboard component
interface UsageChartProps {
  className?: string
}
export function UsageChart(props: UsageChartProps) {
  return React.createElement('div', { className: props.className }, 'UsageChart')
}
