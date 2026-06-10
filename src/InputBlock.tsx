import { Handle, Position } from "reactflow";

export default function InputBlock({ data }: any) {
  return (
    <div style={card}>
      <div style={icon}>📁</div>
      <div style={title}>Input</div>
      <div style={path}>{data.path || "file.txt"}</div>
      <Handle
        type="source"
        position={Position.Right}
        style={handleStyle}
      />
    </div>
  );
}

const card: React.CSSProperties = {
  background: "#0a0a0a",
  padding: "12px 18px",
  borderRadius: 8,
  border: "2px solid #1e40af",
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
  color: "#60a5fa",
  marginBottom: 2,
};

const path: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: 12,
  textAlign: "center" as const,
  color: "#93c5fd",
  fontWeight: 500,
  wordBreak: "break-word" as const,
};

const handleStyle: React.CSSProperties = {
  background: "#3b82f6",
  border: "2px solid #0a0a0a",
  width: 10,
  height: 10,
};
