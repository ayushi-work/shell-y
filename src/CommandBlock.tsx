import { Handle, Position } from "reactflow";

export default function CommandBlock({ data }: any) {
  return (
    <div style={card}>
      <Handle type="target" position={Position.Left} />
      <div style={title}>{data.label}</div>

      {data.params?.pattern && (
        <div style={meta}>"{data.params.pattern}"</div>
      )}
      {data.params?.ignoreCase && <div style={meta}>-i</div>}

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

const title = {
  fontFamily: "Instrument Serif",
  fontSize: 16,
  textAlign: "center"
};

const meta = { fontSize: 11, opacity: 0.7 };
