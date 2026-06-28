import type { NodeExecutor } from "../types";
import { resolveTemplate } from "../template";

export const filterExecutor: NodeExecutor = async ({ node, inputData, allOutputs }) => {
  const data = node.data as Record<string, unknown>;
  const field = resolveTemplate((data.field as string) ?? "", inputData, allOutputs);
  const operator = (data.operator as string) ?? "exists";
  const value = resolveTemplate((data.value as string) ?? "", inputData, allOutputs);

  const items = Array.isArray(inputData.items) ? inputData.items : [inputData];

  const filtered = items.filter((item: unknown) => {
    const rec = item as Record<string, unknown>;
    const fieldVal = String(rec[field] ?? "");
    switch (operator) {
      case "equals":      return fieldVal === value;
      case "notEquals":   return fieldVal !== value;
      case "contains":    return fieldVal.includes(value);
      case "exists":      return fieldVal !== "" && fieldVal !== "undefined";
      case "greaterThan": return parseFloat(fieldVal) > parseFloat(value);
      case "lessThan":    return parseFloat(fieldVal) < parseFloat(value);
      default: return true;
    }
  });

  return {
    success: true,
    data: { items: filtered, count: filtered.length, originalCount: items.length },
  };
};
