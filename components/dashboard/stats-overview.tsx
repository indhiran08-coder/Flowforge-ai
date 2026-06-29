import React from 'react'
// StatsOverview dashboard component
interface StatsOverviewProps {
  className?: string
}
export function StatsOverview(props: StatsOverviewProps) {
  return React.createElement('div', { className: props.className }, 'StatsOverview')
}
