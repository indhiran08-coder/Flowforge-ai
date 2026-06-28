'use client'
import React, { Component, ErrorInfo } from 'react'
export class ErrorBoundary extends Component<{children:React.ReactNode},{err?:Error}> {
  state={}
  static getDerivedStateFromError(err:Error){return{err}}
  componentDidCatch(e:Error,i:ErrorInfo){console.error('ErrorBoundary:',e,i)}
  render(){
    if((this.state as {err?:Error}).err)
      return <div className='p-8 text-center'><h2 className='text-xl font-semibold mb-2'>Something went wrong</h2></div>
    return this.props.children
  }
}
