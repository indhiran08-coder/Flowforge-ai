/**
 * Resolves template expressions like {{$input.field}} or {{$input.nested.value}}
 * against a data context.
 */
export function resolveTemplate(
  template: string,
  inputData: Record<string, unknown>,
  allOutputs: Record<string, Record<string, unknown>> = {}
): string {
  if (!template || typeof template !== "string") return template;

  return template.replace(/\{\{([^}]+)\}\}/g, (_, expr: string) => {
    const parts = expr.trim().split(".");
    const root = parts[0];

    let value: unknown;

    if (root === "$input" || root === "input") {
      value = inputData;
      for (const part of parts.slice(1)) {
        if (value === null || value === undefined) break;
        value = (value as Record<string, unknown>)[part];
      }
    } else if (root.startsWith("$node[")) {
      // $node['Node Name'].output.field
      const match = root.match(/\$node\['(.+?)'\]/);
      if (match) {
        const nodeName = match[1];
        const nodeOutput = Object.values(allOutputs).find(
          (o) => (o as Record<string, unknown>).__label === nodeName
        );
        value = nodeOutput;
        for (const part of parts.slice(1)) {
          if (value === null || value === undefined) break;
          value = (value as Record<string, unknown>)[part];
        }
      }
    } else {
      // Direct field reference
      value = inputData;
      for (const part of parts) {
        if (value === null || value === undefined) break;
        value = (value as Record<string, unknown>)[part.replace(/^\$/, "")];
      }
    }

    if (value === undefined || value === null) return "";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  });
}

/**
 * Resolves all string values in an object recursively.
 */
export function resolveObject(
  obj: Record<string, unknown>,
  inputData: Record<string, unknown>,
  allOutputs: Record<string, Record<string, unknown>> = {}
): Record<string, unknown> {
  const result: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "string") {
      result[key] = resolveTemplate(value, inputData, allOutputs);
    } else if (typeof value === "object" && value !== null && !Array.isArray(value)) {
      result[key] = resolveObject(value as Record<string, unknown>, inputData, allOutputs);
    } else {
      result[key] = value;
    }
  }
  return result;
}
