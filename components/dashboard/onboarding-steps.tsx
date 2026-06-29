import React from 'react'
// OnboardingSteps dashboard component
interface OnboardingStepsProps {
  className?: string
}
export function OnboardingSteps(props: OnboardingStepsProps) {
  return React.createElement('div', { className: props.className }, 'OnboardingSteps')
}
