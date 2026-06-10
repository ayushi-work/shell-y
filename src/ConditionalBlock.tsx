import { Handle, Position } from "reactflow";

export default function ConditionalBlock({ data }: any) {
  const cond = data.params?.condition || "";
  return (
    <div style={card}>
      <Handle
        type="target"
        position={Position.Left}
        style={handleStyle}
      />
      <div style={title}>if</div>
      {cond && <div style={condStyle}>{truncate(cond, 24)}</div>}
      <Handle
        type="source"
        position={Position.Right}
        id="then"
        style={handleStyle}
      />
      <div style={hint}>then</div>
    </div>
  );
}

function truncate(str: string, len: number) {
  return str.length > len ? str.substring(0, len) + "…" : str;
}

const card: React.CSSProperties = {
  background: "#0a0a0a",
  padding: "12px 18px",
  borderRadius: 8,
  border: "2px solid #7c3aed",
  minWidth: 170,
  maxWidth: 240,
  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  cursor: "pointer",
};

const title: React.CSSProperties = {
  fontFamily: "Instrument Serif, serif",
  fontSize: 16,
  textAlign: "center" as const,
  color: "#c4b5fd",
  marginBottom: 4,
};

const condStyle: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: 12,
  textAlign: "center" as const,
  color: "#a78bfa",
  fontWeight: 500,
  marginBottom: 4,
};

const hint: React.CSSProperties = {
  fontSize: 10,
  textAlign: "center" as const,
  color: "#6b21a8",
  marginTop: 2,
};

const handleStyle: React.CSSProperties = {
  background: "#7c3aed",
  border: "2px solid #0a0a0a",
  width: 10,
  height: 10,
};
