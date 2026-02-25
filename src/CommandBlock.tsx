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
          style={{ background: '#fff', border: '2px solid #000' }}
        />
        <div style={title}>{data.label || "Unknown"}</div>
        <Handle 
          type="source" 
          position={Position.Right}
          style={{ background: '#fff', border: '2px solid #000' }}
        />
      </div>
    );
  }

  // Show relevant params in the block
  const visibleParams = Object.entries(data.params || {})
    .filter(([, val]) => val !== "" && val !== false)
    .slice(0, 2); // Show max 2 params inline

  return (
    <div style={card}>
      <Handle 
        type="target" 
        position={Position.Left}
        style={{ background: '#fff', border: '2px solid #000' }}
      />
      <div style={title}>{cmd.label}</div>

      {visibleParams.map(([key, val]) => (
        <div key={key} style={meta}>
          {String(val).length > 15
            ? String(val).substring(0, 12) + "…"
            : String(val)}
        </div>
      ))}

      <Handle 
        type="source" 
        position={Position.Right}
        style={{ background: '#fff', border: '2px solid #000' }}
      />
    </div>
  );
}

const card = {
  background: "#000",
  padding: "14px 18px",
  borderRadius: 8,
  border: "2px solid #fff",
  minWidth: 180,
  boxShadow: "0 4px 12px rgba(255,255,255,0.1)",
  cursor: "pointer",
  transition: "all 0.2s"
};

const title = {
  fontFamily: "Instrument Serif",
  fontSize: 16,
  textAlign: "center" as const,
  marginBottom: 6,
  color: "#fff"
};

const meta = { 
  fontSize: 11, 
  opacity: 0.6,
  whiteSpace: "nowrap" as const,
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: "#999"
};
