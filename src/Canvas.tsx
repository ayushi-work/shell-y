import ReactFlow, {
  addEdge,
  Background,
  Controls,
  MiniMap,
  useReactFlow
} from "reactflow";
import "reactflow/dist/style.css";
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
    <div style={{ flex: 1, display: "flex", gap: 0, background: "#000", position: "relative" }}>
      {/* Main Canvas Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
        {/* Toolbar */}
        <div style={{ 
          display: "flex", 
          gap: 8, 
          alignItems: "center", 
          padding: "12px 16px",
          background: "#000",
          borderBottom: "1px solid #333"
        }}>
          <ScriptConfigPanel config={scriptConfig} onChange={setScriptConfig} />
          <div style={{ display: "flex", gap: 4, marginLeft: "auto" }}>
            <button
              onClick={undo}
              disabled={historyIndex <= 0}
              title="Undo (Ctrl+Z)"
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid #333",
                background: historyIndex <= 0 ? "#111" : "#000",
                color: "white",
                cursor: historyIndex <= 0 ? "not-allowed" : "pointer",
                fontSize: 12,
                opacity: historyIndex <= 0 ? 0.5 : 1,
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => historyIndex > 0 && (e.currentTarget.style.borderColor = "#666")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#333")}
            >
              ↶ Undo
            </button>
            <button
              onClick={redo}
              disabled={historyIndex >= history.length - 1}
              title="Redo (Ctrl+Y)"
              style={{
                padding: "6px 12px",
                borderRadius: 6,
                border: "1px solid #333",
                background: historyIndex >= history.length - 1 ? "#111" : "#000",
                color: "white",
                cursor: historyIndex >= history.length - 1 ? "not-allowed" : "pointer",
                fontSize: 12,
                opacity: historyIndex >= history.length - 1 ? 0.5 : 1,
                transition: "all 0.2s"
              }}
              onMouseEnter={(e) => historyIndex < history.length - 1 && (e.currentTarget.style.borderColor = "#666")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#333")}
            >
              ↷ Redo
            </button>
          </div>
        </div>

        {/* Canvas */}
        <div 
          style={{ 
            position: "absolute",
            top: 53,
            left: 0,
            right: 0,
            bottom: 0
          }} 
          onDrop={onDrop} 
          onDragOver={(e) => { e.preventDefault(); e.dataTransfer.dropEffect = "move"; }}
        >
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
            onEdgesChange={(changes) => {
              // Handle edge changes
              setEdges((eds) => {
                const newEdges = [...eds];
                changes.forEach((change: any) => {
                  if (change.type === "remove") {
                    const index = newEdges.findIndex(e => e.id === change.id);
                    if (index !== -1) newEdges.splice(index, 1);
                  }
                });
                return newEdges;
              });
            }}
            defaultEdgeOptions={{
              style: { stroke: "#666", strokeWidth: 2 },
              type: "smoothstep"
            }}
            nodesDraggable={true}
            nodesConnectable={true}
            elementsSelectable={true}
            fitView
            fitViewOptions={{ padding: 0.2 }}
          >
            <Background color="#222" gap={20} size={1} />
            <Controls />
            <MiniMap 
              nodeColor={() => "#fff"}
              maskColor="rgba(0, 0, 0, 0.8)"
            />
          </ReactFlow>
        </div>
      </div>

      {/* Right Sidebar - Config & Preview */}
      <div style={{ 
        width: 340, 
        display: "flex", 
        flexDirection: "column", 
        gap: 0,
        borderLeft: "1px solid #333",
        background: "#000",
        overflow: "hidden"
      }}>
        {selected && (
          <div style={{
            borderBottom: "1px solid #333",
            maxHeight: "50%",
            overflowY: "auto"
          }}>
            <ConfigPanel
              node={selected}
              onChange={(data: any) => {
                const newNodes = nodes.map((n) =>
                  n.id === selected?.id ? { ...n, data } : n
                );
                updateNodesAndEdges(newNodes, edges);
              }}
            />
          </div>
        )}
        
        <ScriptPreview
          script={generateScript(nodes, edges, scriptConfig)}
          nodes={nodes}
          edges={edges}
        />
      </div>
    </div>
  );
}
