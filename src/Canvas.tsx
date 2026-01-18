import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useReactFlow
} from "reactflow";
import type { Edge, Connection } from "reactflow";
import { useCallback, useState, useEffect } from "react";
import { v4 as uuid } from "uuid";

import CommandBlock from "./CommandBlock";
import InputBlock from "./InputBlock";
import OutputBlock from "./OutputBlock";
import ConditionalBlock from "./ConditionalBlock";
import LoopBlock from "./LoopBlock";
import ConfigPanel from "./ConfigPanel";
import ScriptPreview from "./ScriptPreview";
import ScriptConfigPanel from "./ScriptConfigPanel";
import { generateScript } from "./scriptGenerator";

const nodeTypes = {
  command: CommandBlock,
  input: InputBlock,
  output: OutputBlock,
  conditional: ConditionalBlock,
  loop: LoopBlock
};

export default function Canvas() {
  const [nodes, setNodes] = useState<any[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [history, setHistory] = useState<Array<{ nodes: any[]; edges: Edge[] }>>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [scriptConfig, setScriptConfig] = useState<any>({
    shebang: "bash",
    setE: true,
    setU: true,
    setPipefail: true,
    debug: false,
    description: "",
    author: "",
    version: "1.0.0"
  });
  const { screenToFlowPosition } = useReactFlow();

  const updateNodesAndEdges = useCallback((newNodes: any[], newEdges: Edge[]) => {
    setNodes(newNodes);
    setEdges(newEdges);
    
    // Add to history
    setHistory(prev => {
      const newHistory = prev.slice(0, historyIndex + 1);
      newHistory.push({ nodes: newNodes, edges: newEdges });
      return newHistory;
    });
    setHistoryIndex(prev => prev + 1);
  }, [historyIndex]);

  const undo = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      const { nodes: prevNodes, edges: prevEdges } = history[newIndex];
      setNodes(prevNodes);
      setEdges(prevEdges);
      setHistoryIndex(newIndex);
      setSelected(null);
    }
  }, [history, historyIndex]);

  const redo = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      const { nodes: nextNodes, edges: nextEdges } = history[newIndex];
      setNodes(nextNodes);
      setEdges(nextEdges);
      setHistoryIndex(newIndex);
      setSelected(null);
    }
  }, [history, historyIndex]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z" && !e.shiftKey) {
        e.preventDefault();
        undo();
      } else if ((e.ctrlKey || e.metaKey) && (e.key === "y" || (e.key === "z" && e.shiftKey))) {
        e.preventDefault();
        redo();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [undo, redo]);

  const onDrop = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      const data = e.dataTransfer.getData("application/reactflow");
      if (!data) return;

      const payload = JSON.parse(data);
      const position = screenToFlowPosition({
        x: e.clientX,
        y: e.clientY
      });

      let nodeData: any;
      
      if (payload.type === "input") {
        nodeData = { path: "" };
      } else if (payload.type === "output") {
        nodeData = { path: "", append: false };
      } else if (payload.type === "conditional") {
        nodeData = { params: { condition: "" } };
      } else if (payload.type === "loop") {
        nodeData = { loopType: payload.loopType || "for", params: { variable: "i", values: "1 2 3" } };
      } else {
        nodeData = { 
          commandId: payload.commandId || payload.label,
          label: payload.label,
          params: {}
        };
      }

      const newNodes = [
        ...nodes,
        {
          id: uuid(),
          type: payload.type || "command",
          position,
          data: nodeData
        }
      ];

      updateNodesAndEdges(newNodes, edges);
    } catch (error) {
      console.error("Error dropping node:", error);
    }
  }, [screenToFlowPosition, nodes, edges, updateNodesAndEdges]);

  return (
    <div style={{flex: 1, background: "radial-gradient(circle at 1px 1px, #1e293b 1px, transparent 0)", backgroundSize: "20px 20px", borderRadius: 16, padding: 12, position: "relative", display: "flex", flexDirection: "column"}}>
      <div style={{display: "flex", gap: 8, marginBottom: 8, alignItems: "center"}}>
        <ScriptConfigPanel config={scriptConfig} onChange={setScriptConfig} />
        <div style={{display: "flex", gap: 4, marginLeft: "auto"}}>
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            title="Undo (Ctrl+Z)"
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid #1e293b",
              background: historyIndex <= 0 ? "#1a1f35" : "#020617",
              color: "white",
              cursor: historyIndex <= 0 ? "not-allowed" : "pointer",
              fontSize: 12,
              opacity: historyIndex <= 0 ? 0.5 : 1,
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => historyIndex > 0 && (e.currentTarget.style.borderColor = "#7c3aed")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
          >
            ↶ Undo
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            title="Redo (Ctrl+Y)"
            style={{
              padding: "6px 10px",
              borderRadius: 6,
              border: "1px solid #1e293b",
              background: historyIndex >= history.length - 1 ? "#1a1f35" : "#020617",
              color: "white",
              cursor: historyIndex >= history.length - 1 ? "not-allowed" : "pointer",
              fontSize: 12,
              opacity: historyIndex >= history.length - 1 ? 0.5 : 1,
              transition: "all 0.2s"
            }}
            onMouseEnter={(e) => historyIndex < history.length - 1 && (e.currentTarget.style.borderColor = "#7c3aed")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
          >
            ↷ Redo
          </button>
        </div>
      </div>
      
      <div style={{ flex: 1, position: "relative" }} onDrop={onDrop} onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          onConnect={(c: Connection) => {
            const newEdges = addEdge(c, edges);
            updateNodesAndEdges(nodes, newEdges);
          }}
          onNodeClick={(_, n) => setSelected(n)}
          onNodesChange={(changes) => {
            // Handle node position changes for layout
            const newNodes = [...nodes];
            changes.forEach((change: any) => {
              if (change.type === "position" && change.position) {
                const nodeIndex = newNodes.findIndex(n => n.id === change.id);
                if (nodeIndex !== -1) {
                  newNodes[nodeIndex] = {
                    ...newNodes[nodeIndex],
                    position: change.position
                  };
                }
              }
            });
            setNodes(newNodes);
          }}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      <ConfigPanel
        node={selected}
        onChange={(data: any) => {
          const newNodes = nodes.map((n) =>
            n.id === selected?.id ? { ...n, data } : n
          );
          updateNodesAndEdges(newNodes, edges);
        }}
      />

      <ScriptPreview
        script={generateScript(nodes, edges, scriptConfig)}
        nodes={nodes}
        edges={edges}
      />
    </div>
  );
}
