import { getWorkflows } from "@/features/workflows/get-workflows";
import { WorkflowList } from "@/components/workflow/workflow-list";

export default async function WorkflowsPage() {
  const workflows = await getWorkflows();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <WorkflowList workflows={workflows as any} />;
}
