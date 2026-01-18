import { Handle, Position } from "reactflow";

export default function OutputBlock({ data }: any) {
  return (
    <div style={card}>
      <Handle type="target" position={Position.Left} />
      <div style={title}>📄 Output</div>
      <div style={meta}>
        {data.append ? ">>" : ">"} {data.path || "out.txt"}
      </div>
    </div>
  );
}

const card = {
  background: "linear-gradient(135deg, #1a2a1a 0%, #1a1f35 100%)",
  padding: "14px 18px",
  borderRadius: 16,
  border: "2px solid #10b981",
  minWidth: 180,
  boxShadow: "0 10px 30px rgba(16,185,129,0.15)",
  cursor: "pointer",
  transition: "all 0.2s"
};

const title = { 
  fontFamily: "Instrument Serif", 
  fontSize: 15,
  color: "#6ee7b7",
  marginBottom: 4
};

const meta = { 
  fontSize: 11, 
  opacity: 0.7,
  whiteSpace: "nowrap" as const,
  overflow: "hidden",
  textOverflow: "ellipsis"
};
