export function generateScript(nodes: any[], edges: any[]) {
  if (!nodes.length) return "";

  const start = nodes.filter(
    (n) => !edges.some((e) => e.target === n.id)
  );

  if (start.length !== 1) {
    return "# ❌ Invalid pipeline";
  }

  const ordered: any[] = [];
  let current = start[0];

  while (current) {
    ordered.push(current);
    const edge = edges.find((e) => e.source === current.id);
    current = edge
      ? nodes.find((n) => n.id === edge.target)
      : null;
  }

  if (ordered.length !== nodes.length) {
    return "# ❌ Disconnected pipeline";
  }

  const cmds = ordered.map((n) => {
    if (n.type === "input") return `cat "${n.data.path}"`;
    if (n.type === "output")
      return `${n.data.append ? ">>" : ">"} "${n.data.path}"`;

    if (n.data.label === "grep") {
      let c = "grep";
      if (n.data.params?.ignoreCase) c += " -i";
      if (n.data.params?.pattern)
        c += ` "${n.data.params.pattern}"`;
      return c;
    }
    return "";
  });

  return `#!/bin/bash
set -euo pipefail

${cmds.join(" | ")}
`;
}
