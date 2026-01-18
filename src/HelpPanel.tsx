export default function HelpPanel() {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 20,
        left: 280,
        width: 300,
        padding: 16,
        borderRadius: 12,
        border: "1px solid #1e293b",
        background: "#0f172a",
        fontSize: 12,
        opacity: 0.95,
        zIndex: 100,
        boxShadow: "0 4px 20px rgba(0,0,0,0.3)"
      }}
    >
      <h4 style={{ margin: "0 0 10px 0", fontSize: 13 }}>💡 Tips</h4>
      <ul style={{ margin: 0, paddingLeft: 16, lineHeight: 1.6, opacity: 0.7 }}>
        <li>Drag commands from the sidebar to the canvas</li>
        <li>Connect blocks by dragging from output → input ports</li>
        <li>Click any block to configure its parameters</li>
        <li>Use Ctrl+Z to undo, Ctrl+Y to redo</li>
        <li>Script updates in real-time as you build</li>
        <li>Click ⚙️ to configure script-level settings</li>
      </ul>
    </div>
  );
}
