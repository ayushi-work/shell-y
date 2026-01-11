export default function ScriptPreview({ script }: any) {
  return (
    <div
      style={{
        width: 320,
        padding: 20,
        borderRadius: 14,
        border: "1px solid #1e293b",
        fontFamily: "monospace",
        whiteSpace: "pre-wrap"
      }}
    >
      <h3>Script Preview</h3>
      <pre>{script || "# build a pipeline…"}</pre>
      <button
        style={{ marginTop: 8 }}
        onClick={() => navigator.clipboard.writeText(script)}
      >
        Copy
      </button>
    </div>
  );
}
