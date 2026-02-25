import { useState, useMemo } from "react";
import { COMMANDS_BY_CATEGORY, CATEGORY_LABELS } from "./commandDefinitions";

export default function Sidebar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    text: true,
    files: true,
    network: false,
    system: false,
    control: false
  });

  const drag = (payload: any) => (e: React.DragEvent) => {
    e.dataTransfer.setData(
      "application/reactflow",
      JSON.stringify(payload)
    );
    e.dataTransfer.effectAllowed = "move";
  };

  const filteredCommands = useMemo(() => {
    if (!searchTerm) return COMMANDS_BY_CATEGORY;
    
    const term = searchTerm.toLowerCase();
    const filtered: Record<string, any[]> = {
      text: [],
      files: [],
      network: [],
      system: [],
      control: []
    };

    Object.entries(COMMANDS_BY_CATEGORY).forEach(([category, commands]) => {
      filtered[category as keyof typeof filtered] = commands.filter(cmd =>
        cmd.label.includes(term) || cmd.description.includes(term)
      );
    });

    return filtered;
  }, [searchTerm]);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const sectionTitle = {
    fontSize: 12,
    letterSpacing: 0.8,
    opacity: 0.5,
    marginBottom: 8,
    marginTop: 16,
    textTransform: "uppercase",
    fontWeight: 600
  };

  const item = {
    padding: "10px 14px",
    borderRadius: 6,
    border: "1px solid #333",
    cursor: "grab",
    fontSize: 13,
    transition: "all 0.2s",
    background: "#000"
  };

  const categoryHeader = {
    fontSize: 13,
    fontWeight: 600,
    opacity: 0.8,
    marginBottom: 8,
    marginTop: 16,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 8,
    userSelect: "none" as const,
    padding: "4px 0"
  };

  const searchInputStyle = {
    width: "100%",
    padding: "10px 12px",
    borderRadius: 6,
    border: "1px solid #333",
    background: "#000",
    color: "white",
    fontSize: 13,
    marginBottom: 16,
    boxSizing: "border-box" as const,
    outline: "none",
    transition: "border-color 0.2s"
  };

  return (
    <div
      style={{
        width: 280,
        padding: 16,
        borderRight: "1px solid #333",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        overflowY: "auto",
        background: "#000"
      }}
    >
      <input
        type="text"
        placeholder="🔍 Search commands..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={searchInputStyle as any}
      />

      {/* Sources */}
      <div>
        <div style={sectionTitle}>SOURCES</div>
        <div 
          draggable 
          onDragStart={drag({ type: "input" })} 
          style={item}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#06b6d4";
            e.currentTarget.style.background = "#0a1929";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#333";
            e.currentTarget.style.background = "#000";
          }}
        >
          📁 Input file
        </div>
      </div>

      {/* Commands by Category */}
      {Object.entries(filteredCommands).map(([category, commands]) => {
        if (commands.length === 0) return null;
        const isExpanded = expandedCategories[category];

        return (
          <div key={category}>
            <div
              style={categoryHeader}
              onClick={() => toggleCategory(category)}
            >
              <span>{isExpanded ? "▼" : "▶"}</span>
              <span>{CATEGORY_LABELS[category]}</span>
            </div>

            {isExpanded && (
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {commands.map((cmd) => (
                  <div
                    key={cmd.id}
                    draggable
                    onDragStart={drag({
                      type: "command",
                      commandId: cmd.id,
                      label: cmd.label
                    })}
                    title={cmd.description}
                    style={{
                      ...item,
                      opacity: 0.9,
                      fontSize: 12
                    } as any}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#666";
                      e.currentTarget.style.background = "#111";
                      e.currentTarget.style.opacity = "1";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#333";
                      e.currentTarget.style.background = "#000";
                      e.currentTarget.style.opacity = "0.9";
                    }}
                  >
                    {cmd.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        );
      })}

      {/* Destinations */}
      <div style={{ marginTop: 12 }}>
        <div style={sectionTitle}>DESTINATIONS</div>
        <div 
          draggable 
          onDragStart={drag({ type: "output" })} 
          style={item}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "#666";
            e.currentTarget.style.background = "#111";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "#333";
            e.currentTarget.style.background = "#000";
          }}
        >
          📄 Output file
        </div>
      </div>
      {/* Control Flow */}
      <div style={{ marginTop: 12 }}>
        <div
          style={categoryHeader}
          onClick={() => toggleCategory("control")}
        >
          <span>{expandedCategories.control ? "▼" : "▶"}</span>
          <span>Control Flow</span>
        </div>

        {expandedCategories.control && (
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div
              draggable
              onDragStart={drag({
                type: "conditional",
                label: "if/then/else"
              })}
              style={{ ...item, fontSize: 12 } as any}
              title="Conditional branch"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#666";
                e.currentTarget.style.background = "#111";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#333";
                e.currentTarget.style.background = "#000";
              }}
            >
              🔀 if/then/else
            </div>
            <div
              draggable
              onDragStart={drag({
                type: "loop",
                loopType: "for",
                label: "for loop"
              })}
              style={{ ...item, fontSize: 12 } as any}
              title="For loop"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#06b6d4";
                e.currentTarget.style.background = "#0a1929";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1e293b";
                e.currentTarget.style.background = "#0f172a";
              }}
            >
              🔄 for loop
            </div>
            <div
              draggable
              onDragStart={drag({
                type: "loop",
                loopType: "while",
                label: "while loop"
              })}
              style={{ ...item, fontSize: 12 } as any}
              title="While loop"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "#06b6d4";
                e.currentTarget.style.background = "#0a1929";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "#1e293b";
                e.currentTarget.style.background = "#0f172a";
              }}
            >
              🔄 while loop
            </div>
          </div>
        )}
      </div>    </div>
  );
}
