'use client'
import { useState } from 'react'
export function useWorkflowEditor(initNodes=[],initEdges=[]) {
  const [nodes, setNodes] = useState(initNodes)
  const [edges, setEdges] = useState(initEdges)
  const [dirty, setDirty] = useState(false)
  const [sel, setSel] = useState<string|null>(null)
  return { nodes, edges, setNodes, setEdges, dirty, setDirty, selectedId:sel, setSelectedId:setSel }
}
