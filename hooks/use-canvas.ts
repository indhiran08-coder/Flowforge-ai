'use client'
import { useCallback } from 'react'
import { useReactFlow } from '@xyflow/react'
export function useCanvasActions() {
  const { fitView, zoomIn, zoomOut, getNodes, getEdges } = useReactFlow()
  return {
    fitToScreen: useCallback(()=>fitView({padding:0.1,duration:300}),[fitView]),
    zoomIn, zoomOut,
    export: useCallback(()=>({nodes:getNodes(),edges:getEdges()}),[getNodes,getEdges]),
  }
}
