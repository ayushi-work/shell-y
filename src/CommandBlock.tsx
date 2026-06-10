import { Handle, Position } from "reactflow";
import { COMMAND_DEFINITIONS } from "./commandDefinitions";

export default function CommandBlock({ data }: any) {
  const cmd = COMMAND_DEFINITIONS[data.commandId || data.label];

  if (!cmd) {
    return (
      <div style={card}>
        <Handle
          type="target"
          position={Position.Left}
          style={handleStyle}
        />
        <div style={title}>{data.label || "Unknown"}</div>
        <Handle
          type="source"
          position={Position.Right}
          style={handleStyle}
        />
      </div>
    );
  }

  const params = data.params || {};

  // Find the primary display value
  const primaryKey = cmd.primaryDisplay;
  const primaryValue = primaryKey ? params[primaryKey] : null;

  // Gather boolean flags
  const activeFlags: string[] = [];
  for (const p of cmd.params) {
    if (p.type === "boolean" && params[p.name]) {
      // Extract flag from label like "Ignore case (-i)" → "-i"
      const flagMatch = p.label.match(/\(-([a-zA-Z]+)\)/);
      activeFlags.push(flagMatch ? `-${flagMatch[1]}` : p.label);
    }
  }

  // Extra params (non-boolean, non-primary)
  const extraParams = Object.entries(params)
    .filter(([key]) => {
      const def = cmd.params.find(p => p.name === key);
      return def && def.type !== "boolean" && key !== primaryKey;
    })
    .slice(0, 2);

  return (
    <div style={card}>
      <Handle
        type="target"
        position={Position.Left}
        style={handleStyle}
      />
      <div style={title}>{cmd.label}</div>

      {primaryValue && (
        <div style={primaryLine}>{truncate(String(primaryValue), 28)}</div>
      )}

      {activeFlags.length > 0 && (
        <div style={flagRow}>{activeFlags.join(" ")}</div>
      )}

      {!primaryValue && activeFlags.length === 0 && extraParams.length > 0 && (
        <div style={primaryLine}>{truncate(String(extraParams[0][1]), 28)}</div>
      )}

      {extraParams.length > 0 && (
        <div style={extraRow}>
          {extraParams.map(([key, val]) => {
            const def = cmd.params.find(p => p.name === key);
            return (
              <span key={key} style={extraChip}>
                {def?.label?.split(" (")[0]}: {truncate(String(val), 12)}
              </span>
            );
          })}
        </div>
      )}

      <Handle
        type="source"
        position={Position.Right}
        style={handleStyle}
      />
    </div>
  );
}

function truncate(str: string, len: number) {
  return str.length > len ? str.substring(0, len) + "…" : str;
}

// Styles
const card: React.CSSProperties = {
  background: "#0a0a0a",
  padding: "12px 18px",
  borderRadius: 8,
  border: "2px solid #333",
  minWidth: 180,
  maxWidth: 260,
  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  cursor: "pointer",
  transition: "all 0.15s",
};

const title: React.CSSProperties = {
  fontFamily: "Instrument Serif, serif",
  fontSize: 16,
  textAlign: "center" as const,
  color: "#fff",
  marginBottom: 4,
};

const primaryLine: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: 13,
  textAlign: "center" as const,
  color: "#4ade80",
  fontWeight: 500,
  marginBottom: 4,
  wordBreak: "break-word" as const,
};

const flagRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: 4,
  flexWrap: "wrap" as const,
  marginBottom: 4,
  fontSize: 11,
  color: "#94a3b8",
  fontFamily: "monospace",
};

const extraRow: React.CSSProperties = {
  display: "flex",
  justifyContent: "center",
  gap: 4,
  flexWrap: "wrap" as const,
  marginTop: 2,
};

const extraChip: React.CSSProperties = {
  fontSize: 10,
  color: "#666",
  background: "#111",
  padding: "1px 6px",
  borderRadius: 3,
  whiteSpace: "nowrap" as const,
};

const handleStyle: React.CSSProperties = {
  background: "#555",
  border: "2px solid #0a0a0a",
  width: 10,
  height: 10,
};
