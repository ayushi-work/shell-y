import { ReactFlowProvider } from "reactflow";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";

export default function App() {
  return (
    <ReactFlowProvider>
      <div style={{ display: "flex", height: "100vh", flexDirection: "column", background: "#000" }}>
        {/* Header */}
        <div style={{
          background: "#000",
          borderBottom: "2px solid #333",
          padding: "16px 24px",
          display: "flex",
          alignItems: "center",
          gap: 12
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 28 }}>🐚</span>
            <div>
              <h1 style={{ margin: 0, fontSize: 22, fontWeight: 600, letterSpacing: "-0.5px" }}>
                Shell-y
              </h1>
              <span style={{ fontSize: 11, opacity: 0.5 }}>
                Visual Shell Script Builder
              </span>
            </div>
          </div>
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
