import { Handle, Position } from "reactflow";

export default function ConditionalBlock({ data }: any) {
  return (
    <div style={card}>
      <Handle type="target" position={Position.Left} />
      <div style={title}>if</div>
      {data.params?.condition && (
        <div style={meta}>{truncate(data.params.condition, 20)}</div>
      )}
      <Handle type="source" position={Position.Right} id="then" />
      <div style={{ fontSize: 9, opacity: 0.5, marginTop: 4 }}>then ↘</div>
    </div>
  );
}

function truncate(str: string, len: number) {
  return str.length > len ? str.substring(0, len) + "…" : str;
}

const card = {
  background: "#1a1f35",
  padding: "14px 18px",
  borderRadius: 16,
  border: "2px solid #7c3aed",
  minWidth: 180,
  boxShadow: "0 10px 30px rgba(124,58,237,0.2)",
  cursor: "pointer"
};

const title = {
  fontFamily: "Instrument Serif",
  fontSize: 16,
  textAlign: "center" as const,
  marginBottom: 6,
  color: "#a78bfa"
};

const meta = { 
  fontSize: 11, 
  opacity: 0.7,
  whiteSpace: "nowrap" as const,
  overflow: "hidden",
  textOverflow: "ellipsis"
};
