import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useReactFlow
} from "reactflow";
import type { Edge, Connection } from "reactflow";
import { useCallback, useState } from "react";
import { v4 as uuid } from "uuid";

import CommandBlock from "./CommandBlock";
import InputBlock from "./InputBlock";
import OutputBlock from "./OutputBlock";
import ConfigPanel from "./ConfigPanel";
import ScriptPreview from "./ScriptPreview";
import { generateScript } from "./scriptGenerator";

const nodeTypes = {
  command: CommandBlock,
  input: InputBlock,
  output: OutputBlock
};

export default function Canvas() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const { screenToFlowPosition } = useReactFlow();

  const onDrop = useCallback((e: any) => {
    const payload = JSON.parse(
      e.dataTransfer.getData("application/reactflow")
    );
    const position = screenToFlowPosition({
      x: e.clientX,
      y: e.clientY
    });

    setNodes((n) => [
      ...n,
      {
        id: uuid(),
        type: payload.type,
        position,
        data:
          payload.type === "input"
            ? { path: "" }
            : payload.type === "output"
            ? { path: "", append: false }
            : { label: payload.label }
      }
    ]);
  }, []);

  return (
    <div style={{flex: 1, background: "radial-gradient(circle at 1px 1px, #1e293b 1px, transparent 0)", backgroundSize: "20px 20px", borderRadius: 16, padding: 12}}>
      <div style={{ flex: 1 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onDrop={onDrop}
          onDragOver={(e) => e.preventDefault()}
          onConnect={(c: Connection) =>
            setEdges((e) => addEdge(c, e))
          }
          onNodeClick={(_, n) => setSelected(n)}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      <ConfigPanel
        node={selected}
        onChange={(data) =>
          setNodes((ns) =>
            ns.map((n) =>
              n.id === selected?.id ? { ...n, data } : n
            )
          )
        }
      />

      <ScriptPreview
        script={generateScript(nodes, edges)}
      />
    </div>
  );
}
