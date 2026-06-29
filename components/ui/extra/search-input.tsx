import React from 'react'
// SearchInput component for FlowForge AI
interface SearchInputProps {
  className?: string
  children?: React.ReactNode
}
export function SearchInput(props: SearchInputProps) {
  return React.createElement('div', { className: props.className }, props.children)
}
export default SearchInput
