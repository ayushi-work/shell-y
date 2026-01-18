import { Handle, Position } from "reactflow";

export default function InputBlock({ data }: any) {
  return (
    <div style={card}>
      <div style={title}>📁 Input</div>
      <div style={meta}>{data.path || "file.txt"}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const card = {
  background: "linear-gradient(135deg, #1a2835 0%, #1a1f35 100%)",
  padding: "14px 18px",
  borderRadius: 16,
  border: "2px solid #06b6d4",
  minWidth: 180,
  boxShadow: "0 10px 30px rgba(6,182,212,0.15)",
  cursor: "pointer",
  transition: "all 0.2s"
};

const title = { 
  fontFamily: "Instrument Serif", 
  fontSize: 15,
  color: "#67e8f9",
  marginBottom: 4
};

const meta = { 
  fontSize: 11, 
  opacity: 0.7,
  whiteSpace: "nowrap" as const,
  overflow: "hidden",
  textOverflow: "ellipsis"
};
