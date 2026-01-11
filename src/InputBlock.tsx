import { Handle, Position } from "reactflow";

export default function InputBlock({ data }: any) {
  return (
    <div style={card}>
      <div style={title}>Input</div>
      <div style={meta}>{data.path || "file.txt"}</div>
      <Handle type="source" position={Position.Right} />
    </div>
  );
}

const card = {
  background: "#020617",
  padding: "14px 18px",
  borderRadius: 16,
  border: "1px solid #334155",
  minWidth: 180,
  boxShadow: "0 10px 30px rgba(0,0,0,0.35)"
};


const title = { fontFamily: "Instrument Serif", fontSize: 15 };
const meta = { fontSize: 12, opacity: 0.7 };
