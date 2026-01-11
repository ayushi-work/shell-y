export default function Sidebar() {
  const drag =
    (payload: any) => (e: React.DragEvent) => {
      e.dataTransfer.setData(
        "application/reactflow",
        JSON.stringify(payload)
      );
      e.dataTransfer.effectAllowed = "move";
    };

  const sectionTitle = {
    fontSize: 11,
    letterSpacing: 0.6,
    opacity: 0.6,
    marginBottom: 6,
    textTransform: "uppercase"
  };

  <div style={sectionTitle}>Sources</div>

    const item = {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #1e293b",
    cursor: "grab"
  };

  return (
    <div
      style={{
        width: 220,
        padding: 20,
        borderRight: "1px solid #1e293b",
        display: "flex",
        flexDirection: "column",
        gap: 16
      }}
    >
      <div>
        <h1 style={{ fontSize: 22 }}>Shell-y</h1>
        <div style={{ fontSize: 12, opacity: 0.6 }}>
          Visual shell builder
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>
          Sources
        </div>
        <div draggable onDragStart={drag({ type: "input" })} style={item}>
          Input file
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>
          Commands
        </div>
        <div
          draggable
          onDragStart={drag({ type: "command", label: "grep" })}
          style={item}
        >
          grep
        </div>
      </div>

      <div>
        <div style={{ fontSize: 12, opacity: 0.6, marginBottom: 8 }}>
          Destinations
        </div>
        <div draggable onDragStart={drag({ type: "output" })} style={item}>
          Output file
        </div>
      </div>
    </div>
  );
  
}
