import { useState } from "react";

export default function ScriptConfigPanel({ config, onChange }: any) {
  const [expanded, setExpanded] = useState(false);

  if (!expanded) {
    return (
      <button
        onClick={() => setExpanded(true)}
        style={{
          padding: "8px 14px",
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
        ⚙️ Script Settings
      </button>
    );
  }

  const panelStyle = {
    position: "absolute" as const,
    top: 60,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: 100,
    width: 360,
    maxHeight: "80vh",
    overflowY: "auto" as const,
    padding: 20,
    borderRadius: 8,
    border: "2px solid #333",
    display: "flex",
    flexDirection: "column" as const,
    gap: 12,
    background: "#000",
    boxShadow: "0 20px 60px rgba(0,0,0,0.8)"
  };

  const inputStyle = {
    padding: "8px 10px",
    borderRadius: 6,
    border: "1px solid #333",
    background: "#000",
    color: "white",
    fontSize: 12,
    boxSizing: "border-box" as const,
    width: "100%"
  };

  const labelStyle = {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 4
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "rgba(0,0,0,0.5)",
          zIndex: 99
        }}
        onClick={() => setExpanded(false)}
      />
      
      <div style={panelStyle}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3 style={{ margin: 0 }}>⚙️ Script Settings</h3>
        <button
          onClick={() => setExpanded(false)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontSize: 16
          }}
        >
          ✕
        </button>
      </div>

      {/* Shebang */}
      <div>
        <label style={labelStyle}>Shebang (#!/...)</label>
        <select
          value={config.shebang}
          onChange={(e) => onChange({ ...config, shebang: e.target.value })}
          style={inputStyle as any}
        >
          <option value="bash">#!/bin/bash</option>
          <option value="sh">#!/bin/sh</option>
          <option value="zsh">#!/bin/zsh</option>
        </select>
      </div>

      {/* Error Handling */}
      <div style={{ borderTop: "1px solid #333", paddingTop: 12 }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", opacity: 0.5, marginBottom: 8 }}>
          Error Handling
        </div>
        <label style={{ fontSize: 12, display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
          <input
            type="checkbox"
            checked={config.setE}
            onChange={(e) => onChange({ ...config, setE: e.target.checked })}
          />
          set -e (exit on error)
        </label>
        <label style={{ fontSize: 12, display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
          <input
            type="checkbox"
            checked={config.setU}
            onChange={(e) => onChange({ ...config, setU: e.target.checked })}
          />
          set -u (error on undefined)
        </label>
        <label style={{ fontSize: 12, display: "flex", gap: 6, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={config.setPipefail}
            onChange={(e) => onChange({ ...config, setPipefail: e.target.checked })}
          />
          set -o pipefail
        </label>
      </div>

      {/* Debug */}
      <div style={{ borderTop: "1px solid #333", paddingTop: 12 }}>
        <label style={{ fontSize: 12, display: "flex", gap: 6, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={config.debug}
            onChange={(e) => onChange({ ...config, debug: e.target.checked })}
          />
          Debug mode (set -x)
        </label>
      </div>

      {/* Metadata */}
      <div style={{ borderTop: "1px solid #333", paddingTop: 12 }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", opacity: 0.5, marginBottom: 8 }}>
          Metadata
        </div>
        
        <div>
          <label style={labelStyle}>Description</label>
          <input
            type="text"
            value={config.description}
            placeholder="What does this script do?"
            onChange={(e) => onChange({ ...config, description: e.target.value })}
            style={inputStyle as any}
          />
        </div>

        <div>
          <label style={labelStyle}>Author</label>
          <input
            type="text"
            value={config.author}
            placeholder="Your name"
            onChange={(e) => onChange({ ...config, author: e.target.value })}
            style={inputStyle as any}
          />
        </div>

        <div>
          <label style={labelStyle}>Version</label>
          <input
            type="text"
            value={config.version}
            placeholder="1.0.0"
            onChange={(e) => onChange({ ...config, version: e.target.value })}
            style={inputStyle as any}
          />
        </div>
      </div>
      </div>
    </>
  );
}
