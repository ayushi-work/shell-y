import { useCallback, useState } from "react";
import ExportPanel from "./ExportPanel";

export default function ScriptPreview({ script, nodes, edges }: any) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [script]);

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        padding: 16,
        fontFamily: "monospace",
        fontSize: 11,
        background: "#000",
        overflow: "hidden"
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: 12 }}>📜 Script Preview</h3>
      <pre
        style={{
          background: "#111",
          padding: 12,
          borderRadius: 6,
          overflow: "auto",
          flex: 1,
          border: "1px solid #333",
          margin: 0
        }}
      >
        {script || "# Drag commands to canvas to build your script..."}
      </pre>
      <button
        onClick={copyToClipboard}
        style={{
          width: "100%",
          marginTop: 8,
          padding: "8px 12px",
          borderRadius: 6,
          border: "1px solid #333",
          background: "#000",
          color: "white",
          cursor: "pointer",
          fontSize: 12,
          transition: "all 0.2s"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#666")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#333")}
      >
        {copied ? "✓ Copied!" : "📋 Copy"}
      </button>

      <ExportPanel script={script} nodes={nodes} edges={edges} />
    </div>
  );
}
