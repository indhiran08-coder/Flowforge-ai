import React from 'react'
// PlanBanner dashboard component
interface PlanBannerProps {
  className?: string
}
export function PlanBanner(props: PlanBannerProps) {
  return React.createElement('div', { className: props.className }, 'PlanBanner')
}
