import { COMMAND_DEFINITIONS } from "./commandDefinitions";

export default function ConfigPanel({ node, onChange }: any) {
  if (!node) return null;

  const panelStyle = {
    padding: 16,
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
    background: "#000"
  };

  const inputStyle = {
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #333",
    background: "#000",
    color: "white",
    fontSize: 12,
    boxSizing: "border-box" as const,
    width: "100%"
  };

  const labelStyle = {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4
  };

  const sectionStyle = {
    display: "flex",
    flexDirection: "column" as const,
    gap: 8,
    paddingBottom: 8,
    borderBottom: "1px solid #333"
  };

  // Input file node
  if (node.type === "input") {
    return (
      <div style={panelStyle}>
        <h3 style={{ margin: "0 0 4px 0" }}>📁 Input File</h3>
        <div style={labelStyle}>File path</div>
        <input
          value={node.data.path || ""}
          placeholder="app.log"
          onChange={(e) => onChange({ path: e.target.value })}
          style={inputStyle as any}
        />
      </div>
    );
  }

  // Output file node
  if (node.type === "output") {
    return (
      <div style={panelStyle}>
        <h3 style={{ margin: "0 0 4px 0" }}>📄 Output File</h3>
        <div style={labelStyle}>File path</div>
        <input
          value={node.data.path || ""}
          placeholder="out.txt"
          onChange={(e) =>
            onChange({ ...node.data, path: e.target.value })
          }
          style={inputStyle as any}
        />
        <label style={{ fontSize: 12, display: "flex", gap: 6, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={node.data.append || false}
            onChange={(e) =>
              onChange({
                ...node.data,
                append: e.target.checked
              })
            }
          />
          Append (&gt;&gt;)
        </label>
      </div>
    );
  }

  // Command node
  const commandId = node.data.commandId || node.data.label;
  const cmd = COMMAND_DEFINITIONS[commandId];

  if (!cmd) {
    return (
      <div style={panelStyle}>
        <h3>Unknown command</h3>
      </div>
    );
  }

  const params = node.data.params || {};
  const basicParams = cmd.params.filter(p => !p.advanced);
  const advancedParams = cmd.params.filter(p => p.advanced);

  return (
    <div style={panelStyle}>
      <div>
        <h3 style={{ margin: "0 0 4px 0" }}>{cmd.label}</h3>
        <div style={{ fontSize: 11, opacity: 0.6 }}>{cmd.description}</div>
      </div>

      {/* Basic Parameters */}
      {basicParams.length > 0 && (
        <div style={sectionStyle}>
          {basicParams.map((param) => (
            <div key={param.name}>
              <label style={labelStyle}>{param.label}</label>
              {param.type === "boolean" ? (
                <label style={{ fontSize: 12, display: "flex", gap: 6, alignItems: "center" }}>
                  <input
                    type="checkbox"
                    checked={params[param.name] || false}
                    onChange={(e) =>
                      onChange({
                        ...params,
                        [param.name]: e.target.checked
                      })
                    }
                  />
                  {param.description || param.label}
                </label>
              ) : param.type === "select" ? (
                <select
                  value={params[param.name] || param.default || ""}
                  onChange={(e) =>
                    onChange({
                      ...params,
                      [param.name]: e.target.value
                    })
                  }
                  style={inputStyle as any}
                >
                  <option value="">Select {param.label}</option>
                  {param.options?.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={param.type === "number" ? "number" : "text"}
                  value={params[param.name] || ""}
                  placeholder={param.placeholder}
                  onChange={(e) =>
                    onChange({
                      ...params,
                      [param.name]: e.target.value
                    })
                  }
                  style={inputStyle as any}
                  title={param.description}
                />
              )}
              {param.description && param.type !== "boolean" && (
                <div style={{ fontSize: 10, opacity: 0.5, marginTop: 2 }}>
                  {param.description}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Advanced Parameters */}
      {advancedParams.length > 0 && (
        <details style={{ fontSize: 12, opacity: 0.8 }}>
          <summary style={{ cursor: "pointer", marginBottom: 8 }}>
            ⚙️ Advanced options
          </summary>
          <div style={{ ...sectionStyle, paddingTop: 8, borderTop: "1px solid #333", borderBottom: "none" }}>
            {advancedParams.map((param) => (
              <div key={param.name}>
                <label style={labelStyle}>{param.label}</label>
                {param.type === "boolean" ? (
                  <label style={{ fontSize: 12, display: "flex", gap: 6, alignItems: "center" }}>
                    <input
                      type="checkbox"
                      checked={params[param.name] || false}
                      onChange={(e) =>
                        onChange({
                          ...params,
                          [param.name]: e.target.checked
                        })
                      }
                    />
                    {param.description || param.label}
                  </label>
                ) : param.type === "select" ? (
                  <select
                    value={params[param.name] || param.default || ""}
                    onChange={(e) =>
                      onChange({
                        ...params,
                        [param.name]: e.target.value
                      })
                    }
                    style={inputStyle as any}
                  >
                    <option value="">Select {param.label}</option>
                    {param.options?.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={param.type === "number" ? "number" : "text"}
                    value={params[param.name] || ""}
                    placeholder={param.placeholder}
                    onChange={(e) =>
                      onChange({
                        ...params,
                        [param.name]: e.target.value
                      })
                    }
                    style={inputStyle as any}
                    title={param.description}
                  />
                )}
              </div>
            ))}
          </div>
        </details>
      )}

      {/* Examples */}
      {cmd.examples && cmd.examples.length > 0 && (
        <details style={{ fontSize: 12, opacity: 0.8 }}>
          <summary style={{ cursor: "pointer" }}>📚 Examples</summary>
          <div style={{ marginTop: 8, fontSize: 11, fontFamily: "monospace", opacity: 0.6 }}>
            {cmd.examples.map((ex, i) => (
              <div key={i} style={{ marginBottom: 4 }}>
                {ex}
              </div>
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
