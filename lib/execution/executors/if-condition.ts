import type { NodeExecutor, IfConditionNodeData } from "../types";
import { resolveTemplate } from "../template";

export const ifConditionExecutor: NodeExecutor = async ({ node, inputData, allOutputs }) => {
  const data = node.data as IfConditionNodeData;

  const left = resolveTemplate(data.leftValue ?? "", inputData, allOutputs);
  const right = resolveTemplate(data.rightValue ?? "", inputData, allOutputs);
  const operator = data.operator ?? "equals";

  let conditionResult: boolean;

  switch (operator) {
    case "equals":
      conditionResult = left === right;
      break;
    case "notEquals":
      conditionResult = left !== right;
      break;
    case "contains":
      conditionResult = left.includes(right);
      break;
    case "greaterThan":
      conditionResult = parseFloat(left) > parseFloat(right);
      break;
    case "lessThan":
      conditionResult = parseFloat(left) < parseFloat(right);
      break;
    case "exists":
      conditionResult = left !== "" && left !== "undefined" && left !== "null";
      break;
    default:
      conditionResult = false;
  }

  return {
    success: true,
    branch: conditionResult ? "true" : "false",
    data: {
      condition: conditionResult,
      branch: conditionResult ? "true" : "false",
      left,
      operator,
      right,
      ...inputData,
    },
  };
};
