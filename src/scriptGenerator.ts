import { COMMAND_DEFINITIONS } from "./commandDefinitions";

interface CommandNode {
  id: string;
  type: string;
  data: any;
}

interface Edge {
  source: string;
  target: string;
}

export function generateScript(nodes: CommandNode[], edges: Edge[], config?: any) {
  if (!nodes.length) return "#!/bin/bash\n# Empty script\n";

  // Find start nodes (no incoming edges)
  const startNodes = nodes.filter(
    (n) => !edges.some((e) => e.target === n.id)
  );

  if (startNodes.length === 0) {
    return "# ❌ Error: No start node (cyclic pipeline or orphaned nodes)";
  }

  // Check for cycles
  if (hasCycle(nodes, edges)) {
    return "# ❌ Error: Circular dependency detected";
  }

  // Build execution order
  const ordered = topologicalSort(nodes, edges);
  
  if (ordered.length !== nodes.length) {
    return "# ❌ Error: Disconnected pipeline";
  }

  // Generate commands
  const commands: string[] = [];

  for (const node of ordered) {
    const cmd = generateNodeCommand(node);
    if (!cmd) continue;

    // Check if next node expects piped input
    const nextEdge = edges.find((e) => e.source === node.id);
    const nextNode = nextEdge ? nodes.find((n) => n.id === nextEdge.target) : null;
    
    const nextNeedsInput = nextNode && COMMAND_DEFINITIONS[nextNode.data.commandId || nextNode.data.label]?.acceptsInput;

    // Handle different connection types
    if (nextEdge && nextNode) {
      if (nextNode.type === "output") {
        commands.push(cmd + (nextNode.data.append ? " >> " : " > ") + `"${nextNode.data.path}"`);
      } else if (nextNeedsInput) {
        commands.push(cmd);
      } else {
        commands.push(cmd);
      }
    } else {
      commands.push(cmd);
    }
  }

  return buildFinalScript(commands, {}, config);
}

function generateNodeCommand(node: CommandNode): string {
  if (node.type === "input") {
    return `cat "${node.data.path}"`;
  }

  if (node.type === "output") {
    return ""; // Handled in main flow
  }

  const commandId = node.data.commandId || node.data.label;
  const cmd = COMMAND_DEFINITIONS[commandId];

  if (!cmd) {
    return `# Unknown command: ${commandId}`;
  }

  const params = node.data.params || {};

  switch (commandId) {
    case "grep":
      return buildGrep(params);
    case "sed":
      return buildSed(params);
    case "awk":
      return buildAwk(params);
    case "cut":
      return buildCut(params);
    case "sort":
      return buildSort(params);
    case "uniq":
      return buildUniq(params);
    case "tr":
      return buildTr(params);
    case "find":
      return buildFind(params);
    case "ls":
      return buildLs(params);
    case "cp":
      return buildCp(params);
    case "mv":
      return buildMv(params);
    case "rm":
      return buildRm(params);
    case "chmod":
      return buildChmod(params);
    case "curl":
      return buildCurl(params);
    case "wget":
      return buildWget(params);
    case "ssh":
      return buildSsh(params);
    case "scp":
      return buildScp(params);
    case "ps":
      return buildPs(params);
    case "top":
      return buildTop(params);
    case "df":
      return buildDf(params);
    case "du":
      return buildDu(params);
    case "if":
      return buildIf(params);
    case "for":
      return buildFor(params);
    case "while":
      return buildWhile(params);
    default:
      return `# ${commandId}`;
  }
}

// Command builders
function buildGrep(params: Record<string, any>): string {
  let cmd = "grep";
  if (params.ignoreCase) cmd += " -i";
  if (params.invertMatch) cmd += " -v";
  if (params.extendedRegex) cmd += " -E";
  if (params.pattern) cmd += ` "${params.pattern}"`;
  return cmd;
}

function buildSed(params: Record<string, any>): string {
  let cmd = "sed";
  if (params.inPlace) cmd += " -i";
  if (params.expression) cmd += ` "${params.expression}"`;
  return cmd;
}

function buildAwk(params: Record<string, any>): string {
  let cmd = "awk";
  if (params.fieldSeparator) cmd += ` -F"${params.fieldSeparator}"`;
  if (params.program) cmd += ` '${params.program}'`;
  return cmd;
}

function buildCut(params: Record<string, any>): string {
  let cmd = "cut";
  if (params.delimiter && params.delimiter !== "\t") cmd += ` -d"${params.delimiter}"`;
  if (params.fields) cmd += ` -f${params.fields}`;
  return cmd;
}

function buildSort(params: Record<string, any>): string {
  let cmd = "sort";
  if (params.reverse) cmd += " -r";
  if (params.unique) cmd += " -u";
  if (params.numeric) cmd += " -n";
  return cmd;
}

function buildUniq(params: Record<string, any>): string {
  let cmd = "uniq";
  if (params.count) cmd += " -c";
  if (params.duplicates) cmd += " -d";
  return cmd;
}

function buildTr(params: Record<string, any>): string {
  let cmd = "tr";
  if (params.set1 && params.set2) {
    cmd += ` "${params.set1}" "${params.set2}"`;
  }
  return cmd;
}

function buildFind(params: Record<string, any>): string {
  let cmd = `find ${params.path || "."}`;
  if (params.name) cmd += ` -name "${params.name}"`;
  if (params.type) cmd += ` -type ${params.type}`;
  return cmd;
}

function buildLs(params: Record<string, any>): string {
  let cmd = "ls";
  if (params.long) cmd += " -l";
  if (params.all) cmd += " -a";
  if (params.recursive) cmd += " -R";
  cmd += ` ${params.path || "."}`;
  return cmd;
}

function buildCp(params: Record<string, any>): string {
  let cmd = "cp";
  if (params.recursive) cmd += " -r";
  if (params.source) cmd += ` "${params.source}"`;
  if (params.destination) cmd += ` "${params.destination}"`;
  return cmd;
}

function buildMv(params: Record<string, any>): string {
  let cmd = "mv";
  if (params.force) cmd += " -f";
  if (params.source) cmd += ` "${params.source}"`;
  if (params.destination) cmd += ` "${params.destination}"`;
  return cmd;
}

function buildRm(params: Record<string, any>): string {
  let cmd = "rm";
  if (params.recursive) cmd += " -r";
  if (params.force) cmd += " -f";
  if (params.target) cmd += ` "${params.target}"`;
  return cmd;
}

function buildChmod(params: Record<string, any>): string {
  let cmd = "chmod";
  if (params.mode) cmd += ` ${params.mode}`;
  if (params.target) cmd += ` "${params.target}"`;
  return cmd;
}

function buildCurl(params: Record<string, any>): string {
  let cmd = "curl";
  if (params.method && params.method !== "GET") cmd += ` -X ${params.method}`;
  if (params.headers) cmd += ` -H "${params.headers}"`;
  if (params.data) cmd += ` -d '${params.data}'`;
  if (params.url) cmd += ` "${params.url}"`;
  return cmd;
}

function buildWget(params: Record<string, any>): string {
  let cmd = "wget";
  if (params.output) cmd += ` -O "${params.output}"`;
  if (params.url) cmd += ` "${params.url}"`;
  return cmd;
}

function buildSsh(params: Record<string, any>): string {
  let cmd = "ssh";
  if (params.host) cmd += ` ${params.host}`;
  if (params.command) cmd += ` '${params.command}'`;
  return cmd;
}

function buildScp(params: Record<string, any>): string {
  let cmd = "scp";
  if (params.source) cmd += ` "${params.source}"`;
  if (params.destination) cmd += ` "${params.destination}"`;
  return cmd;
}

function buildPs(params: Record<string, any>): string {
  let cmd = "ps";
  if (params.aux) cmd += " aux";
  return cmd;
}

function buildTop(params: Record<string, any>): string {
  let cmd = "top";
  if (params.batch) cmd += " -b";
  return cmd;
}

function buildDf(params: Record<string, any>): string {
  let cmd = "df";
  if (params.human) cmd += " -h";
  return cmd;
}

function buildDu(params: Record<string, any>): string {
  let cmd = "du";
  if (params.human) cmd += " -h";
  if (params.summarize) cmd += " -s";
  return cmd;
}

function buildIf(params: Record<string, any>): string {
  return `if ${params.condition || "[ true ]"}; then\n    # commands here\nfi`;
}

function buildFor(params: Record<string, any>): string {
  return `for ${params.variable || "i"} in ${params.values || "1 2 3"}; do\n    # commands here\ndone`;
}

function buildWhile(params: Record<string, any>): string {
  return `while ${params.condition || "[ true ]"}; do\n    # commands here\ndone`;
}

// Utility functions
function hasCycle(nodes: CommandNode[], edges: Edge[]): boolean {
  const visited = new Set<string>();
  const recStack = new Set<string>();

  function visit(id: string): boolean {
    visited.add(id);
    recStack.add(id);

    const adjacentEdges = edges.filter(e => e.source === id);
    for (const edge of adjacentEdges) {
      if (!visited.has(edge.target)) {
        if (visit(edge.target)) return true;
      } else if (recStack.has(edge.target)) {
        return true;
      }
    }

    recStack.delete(id);
    return false;
  }

  for (const node of nodes) {
    if (!visited.has(node.id)) {
      if (visit(node.id)) return true;
    }
  }

  return false;
}

function topologicalSort(nodes: CommandNode[], edges: Edge[]): CommandNode[] {
  const visited = new Set<string>();
  const stack: CommandNode[] = [];

  function visit(nodeId: string) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);

    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;

    const outgoingEdges = edges.filter(e => e.source === nodeId);
    for (const edge of outgoingEdges) {
      visit(edge.target);
    }

    stack.unshift(node);
  }

  for (const node of nodes) {
    visit(node.id);
  }

  return stack;
}

function buildFinalScript(commands: string[], variables: Record<string, string>, config?: any): string {
  const cfg = config || {};
  const shebang = `#!/bin/${cfg.shebang || "bash"}`;
  
  const scriptParts = [shebang];

  // Add metadata as comments
  if (cfg.description) {
    scriptParts.push(`# Description: ${cfg.description}`);
  }
  if (cfg.author) {
    scriptParts.push(`# Author: ${cfg.author}`);
  }
  if (cfg.version) {
    scriptParts.push(`# Version: ${cfg.version}`);
  }

  // Add error handling
  const errorHandling: string[] = [];
  if (cfg.setE !== false) errorHandling.push("e");
  if (cfg.setU !== false) errorHandling.push("u");
  if (cfg.debug) errorHandling.push("x");
  
  if (errorHandling.length > 0) {
    scriptParts.push(`set -${errorHandling.join("")}`);
  }
  
  if (cfg.setPipefail !== false) {
    scriptParts.push("set -o pipefail");
  }

  scriptParts.push("");

  if (Object.keys(variables).length > 0) {
    scriptParts.push("# Variables");
    for (const [name, value] of Object.entries(variables)) {
      scriptParts.push(`${name}="${value}"`);
    }
    scriptParts.push("");
  }

  // Join commands with pipes
  let pipedScript = "";
  for (let i = 0; i < commands.length; i++) {
    const cmd = commands[i];
    
    // Check if command contains output redirection
    if (cmd.includes(">")) {
      // Output redirection, don't add pipe
      pipedScript += cmd;
    } else if (i < commands.length - 1 && !commands[i + 1].includes(">")) {
      pipedScript += cmd + " | ";
    } else {
      pipedScript += cmd;
    }
  }

  scriptParts.push(pipedScript);

  return scriptParts.join("\n");
}
