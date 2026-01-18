import { Handle, Position } from "reactflow";

export default function LoopBlock({ data }: any) {
  return (
    <div style={card}>
      <Handle type="target" position={Position.Left} />
      <div style={title}>{data.loopType || "for"}</div>
      {data.params?.variable && (
        <div style={meta}>{data.params.variable} in {truncate(data.params.values, 12)}</div>
      )}
      <Handle type="source" position={Position.Right} id="body" />
      <div style={{ fontSize: 9, opacity: 0.5, marginTop: 4 }}>loop ↘</div>
    </div>
  );
}

function truncate(str: string, len: number) {
  return str.length > len ? str.substring(0, len) + "…" : str;
}

const card = {
  background: "#1a2835",
  padding: "14px 18px",
  borderRadius: 16,
  border: "2px solid #06b6d4",
  minWidth: 180,
  boxShadow: "0 10px 30px rgba(6,182,212,0.2)",
  cursor: "pointer"
};

const title = {
  fontFamily: "Instrument Serif",
  fontSize: 16,
  textAlign: "center" as const,
  marginBottom: 6,
  color: "#67e8f9"
};

const meta = { 
  fontSize: 11, 
  opacity: 0.7,
  whiteSpace: "nowrap" as const,
  overflow: "hidden",
  textOverflow: "ellipsis"
};
