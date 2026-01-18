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
        width: 340,
        maxHeight: "90vh",
        overflowY: "auto",
        padding: 20,
        borderRadius: 14,
        border: "1px solid #1e293b",
        fontFamily: "monospace",
        fontSize: 11,
        background: "#0f172a"
      }}
    >
      <h3 style={{ marginTop: 0 }}>📜 Script Preview</h3>
      <pre
        style={{
          background: "#020617",
          padding: 12,
          borderRadius: 8,
          overflow: "auto",
          maxHeight: 400,
          border: "1px solid #1e293b"
        }}
      >
        {script || "# build a pipeline…"}
      </pre>
      <button
        onClick={copyToClipboard}
        style={{
          width: "100%",
          marginTop: 8,
          padding: "8px 12px",
          borderRadius: 8,
          border: "1px solid #1e293b",
          background: "#020617",
          color: "white",
          cursor: "pointer",
          fontSize: 12,
          transition: "all 0.2s"
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#7c3aed")}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#1e293b")}
      >
        {copied ? "✓ Copied!" : "📋 Copy"}
      </button>

      <ExportPanel script={script} nodes={nodes} edges={edges} />
    </div>
  );
}
