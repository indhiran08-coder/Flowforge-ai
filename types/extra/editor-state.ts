// editor-state types for FlowForge AI
export interface EditorState {
  id: string
  createdAt: Date
  updatedAt: Date
  metadata: Record<string, unknown>
}
export type EditorStateList = EditorState[]
export type CreateEditorState = Omit<EditorState, 'id' | 'createdAt' | 'updatedAt'>
