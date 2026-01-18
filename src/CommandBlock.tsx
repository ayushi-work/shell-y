import { Handle, Position } from "reactflow";
import { COMMAND_DEFINITIONS } from "./commandDefinitions";

export default function CommandBlock({ data }: any) {
  const cmd = COMMAND_DEFINITIONS[data.commandId || data.label];
  
  if (!cmd) {
    return (
      <div style={card}>
        <Handle type="target" position={Position.Left} />
        <div style={title}>{data.label || "Unknown"}</div>
        <Handle type="source" position={Position.Right} />
      </div>
    );
  }

  // Show relevant params in the block
  const visibleParams = Object.entries(data.params || {})
    .filter(([, val]) => val !== "" && val !== false)
    .slice(0, 2); // Show max 2 params inline

  return (
    <div style={card}>
      <Handle type="target" position={Position.Left} />
      <div style={title}>{cmd.label}</div>

      {visibleParams.map(([key, val]) => (
        <div key={key} style={meta}>
          {String(val).length > 15
            ? String(val).substring(0, 12) + "…"
            : String(val)}
        </div>
      ))}

      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const card = {
  background: "linear-gradient(135deg, #1a1f35 0%, #0f172a 100%)",
  padding: "14px 18px",
  borderRadius: 16,
  border: "2px solid #7c3aed",
  minWidth: 180,
  boxShadow: "0 10px 30px rgba(124,58,237,0.15)",
  cursor: "pointer",
  transition: "all 0.2s"
};

const title = {
  fontFamily: "Instrument Serif",
  fontSize: 16,
  textAlign: "center" as const,
  marginBottom: 6,
  color: "#c4b5fd"
};

const meta = { 
  fontSize: 11, 
  opacity: 0.7,
  whiteSpace: "nowrap" as const,
  overflow: "hidden",
  textOverflow: "ellipsis"
};
