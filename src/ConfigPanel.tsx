export default function ConfigPanel({ node, onChange }: any) {
  if (!node) return null;

  const panelStyle = {
    width: 280,
    padding: 20,
    borderRadius: 14,
    border: "1px solid #1e293b",
    display: "flex",
    flexDirection: "column",
    gap: 12
  };

  const inputStyle = {
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #1e293b",
    background: "#020617",
    color: "white"
  };

  if (node.type === "input") {
    return (
      <div style={panelStyle}>
        <h3>Input file</h3>
        <input
          value={node.data.path || ""}
          placeholder="app.log"
          onChange={(e) => onChange({ path: e.target.value })}
          style={inputStyle}
        />
      </div>
    );
  }

  if (node.type === "output") {
    return (
      <div style={panelStyle}>
        <h3>Output file</h3>
        <input
          value={node.data.path || ""}
          placeholder="out.txt"
          onChange={(e) =>
            onChange({ ...node.data, path: e.target.value })
          }
          style={inputStyle}
        />
        <label style={{ fontSize: 12 }}>
          <input
            type="checkbox"
            checked={node.data.append || false}
            onChange={(e) =>
              onChange({
                ...node.data,
                append: e.target.checked
              })
            }
          />{" "}
          Append (&gt;&gt;)
        </label>
      </div>
    );
  }

  const p = node.data.params || {};
  return (
    <div style={panelStyle}>
      <h3>{node.data.label}</h3>
      <input
        value={p.pattern || ""}
        placeholder="pattern"
        onChange={(e) =>
          onChange({ ...p, pattern: e.target.value })
        }
        style={inputStyle}
      />
      <label style={{ fontSize: 12 }}>
        <input
          type="checkbox"
          checked={p.ignoreCase || false}
          onChange={(e) =>
            onChange({ ...p, ignoreCase: e.target.checked })
          }
        />{" "}
        Ignore case (-i)
      </label>
    </div>
  );
}
