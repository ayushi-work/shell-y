import { ReactFlowProvider } from "reactflow";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";

export default function App() {
  return (
    <ReactFlowProvider>
      <div style={{ display: "flex", height: "100vh", flexDirection: "column" }}>
        {/* Header */}
        <div style={{
          background: "linear-gradient(135deg, #1a1f35 0%, #0f172a 100%)",
          borderBottom: "1px solid #1e293b",
          padding: "12px 20px",
          display: "flex",
          alignItems: "center",
          gap: 12
        }}>
          <h1 style={{ margin: 0, fontSize: 20, fontWeight: 600 }}>
            🐚 Shell-y
          </h1>
          <span style={{ fontSize: 12, opacity: 0.6 }}>
            Visual Shell Script Builder
          </span>
        </div>

        {/* Main Content */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <Sidebar />
          <Canvas />
        </div>
      </div>
    </ReactFlowProvider>
  );
}
