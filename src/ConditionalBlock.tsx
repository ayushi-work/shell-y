import { Handle, Position } from "reactflow";

export default function ConditionalBlock({ data }: any) {
  return (
    <div style={card}>
      <Handle 
        type="target" 
        position={Position.Left}
        style={{ background: '#fff', border: '2px solid #000' }}
      />
      <div style={title}>if</div>
      {data.params?.condition && (
        <div style={meta}>{truncate(data.params.condition, 20)}</div>
      )}
      <Handle 
        type="source" 
        position={Position.Right} 
        id="then"
        style={{ background: '#fff', border: '2px solid #000' }}
      />
      <div style={{ fontSize: 9, opacity: 0.5, marginTop: 4 }}>then ↘</div>
    </div>
  );
}

function truncate(str: string, len: number) {
  return str.length > len ? str.substring(0, len) + "…" : str;
}

const card = {
  background: "#000",
  padding: "14px 18px",
  borderRadius: 8,
  border: "2px solid #fff",
  minWidth: 180,
  boxShadow: "0 4px 12px rgba(255,255,255,0.1)",
  cursor: "pointer"
};

const title = {
  fontFamily: "Instrument Serif",
  fontSize: 16,
  textAlign: "center" as const,
  marginBottom: 6,
  color: "#fff"
};

const meta = { 
  fontSize: 11, 
  opacity: 0.6,
  whiteSpace: "nowrap" as const,
  overflow: "hidden",
  textOverflow: "ellipsis",
  color: "#999"
};
