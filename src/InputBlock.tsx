import { Handle, Position } from "reactflow";

export default function InputBlock({ data }: any) {
  return (
    <div style={card}>
      <div style={title}>📁 Input</div>
      <div style={meta}>{data.path || "file.txt"}</div>
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
  fontSize: 15,
  color: "#fff",
  marginBottom: 4
};

const meta = { 
  fontSize: 11, 
  opacity: 0.6,
  whiteSpace: "nowrap" as const,
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: "#999"
};
