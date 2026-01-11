import { ReactFlowProvider } from "reactflow";
import Sidebar from "./Sidebar";
import Canvas from "./Canvas";

export default function App() {
  return (
    <ReactFlowProvider>
      <div style={{ display: "flex", height: "100vh" }}>
        <Sidebar />
        <Canvas />
      </div>
    </ReactFlowProvider>
  );
}
