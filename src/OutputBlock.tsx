import { Handle, Position } from "reactflow";

export default function OutputBlock({ data }: any) {
  return (
    <div style={card}>
      <Handle type="target" position={Position.Left} />
      <div style={title}>Output</div>
      <div style={meta}>
        {data.append ? ">>" : ">"} {data.path || "out.txt"}
      </div>
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
