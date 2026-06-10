import { Handle, Position } from "reactflow";

export default function OutputBlock({ data }: any) {
  return (
    <div style={card}>
      <Handle
        type="target"
        position={Position.Left}
        style={handleStyle}
      />
      <div style={icon}>📄</div>
      <div style={title}>Output</div>
      <div style={path}>
        {data.append ? ">> " : "> "}{data.path || "out.txt"}
      </div>
    </div>
  );
}

const card: React.CSSProperties = {
  background: "#0a0a0a",
  padding: "12px 18px",
  borderRadius: 8,
  border: "2px solid #166534",
  minWidth: 160,
  maxWidth: 240,
  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  cursor: "pointer",
  transition: "all 0.15s",
};

const icon: React.CSSProperties = {
  textAlign: "center" as const,
  fontSize: 14,
  marginBottom: 2,
};

const title: React.CSSProperties = {
  fontFamily: "Instrument Serif, serif",
  fontSize: 15,
  textAlign: "center" as const,
  color: "#4ade80",
  marginBottom: 2,
};

const path: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: 12,
  textAlign: "center" as const,
  color: "#86efac",
  fontWeight: 500,
  wordBreak: "break-word" as const,
};

const handleStyle: React.CSSProperties = {
  background: "#22c55e",
  border: "2px solid #0a0a0a",
  width: 10,
  height: 10,
};
