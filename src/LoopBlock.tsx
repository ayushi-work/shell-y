import { Handle, Position } from "reactflow";

export default function LoopBlock({ data }: any) {
  const loopType = data.loopType || "for";
  const variable = data.params?.variable || "";
  const values = data.params?.values || "";
  return (
    <div style={card}>
      <Handle
        type="target"
        position={Position.Left}
        style={handleStyle}
      />
      <div style={title}>{loopType}</div>
      {variable && (
        <div style={loopStyle}>
          {variable} in {truncate(values, 14)}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Right}
        id="body"
        style={handleStyle}
      />
      <div style={hint}>do</div>
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
  border: "2px solid #0891b2",
  minWidth: 170,
  maxWidth: 240,
  boxShadow: "0 4px 12px rgba(0,0,0,0.4)",
  cursor: "pointer",
};

const title: React.CSSProperties = {
  fontFamily: "Instrument Serif, serif",
  fontSize: 16,
  textAlign: "center" as const,
  color: "#67e8f9",
  marginBottom: 4,
};

const loopStyle: React.CSSProperties = {
  fontFamily: "monospace",
  fontSize: 12,
  textAlign: "center" as const,
  color: "#22d3ee",
  fontWeight: 500,
  marginBottom: 4,
};

const hint: React.CSSProperties = {
  fontSize: 10,
  textAlign: "center" as const,
  color: "#155e75",
  marginTop: 2,
};

const handleStyle: React.CSSProperties = {
  background: "#06b6d4",
  border: "2px solid #0a0a0a",
  width: 10,
  height: 10,
};
