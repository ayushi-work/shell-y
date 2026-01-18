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
    fontSize: 11,
    letterSpacing: 0.6,
    opacity: 0.6,
    marginBottom: 6,
    marginTop: 12,
    textTransform: "uppercase"
  };

  const item = {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid #1e293b",
    cursor: "grab",
    fontSize: 13,
    transition: "border-color 0.2s"
  };

  const categoryHeader = {
    fontSize: 12,
    opacity: 0.7,
    marginBottom: 8,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: 6,
    userSelect: "none" as const
  };

  const searchInputStyle = {
    width: "100%",
    padding: "8px 10px",
    borderRadius: 8,
    border: "1px solid #1e293b",
    background: "#020617",
    color: "white",
    fontSize: 12,
    marginBottom: 12,
    boxSizing: "border-box" as const
  };

  return (
    <div
      style={{
        width: 260,
        padding: 20,
        borderRight: "1px solid #1e293b",
        display: "flex",
        flexDirection: "column",
        gap: 8,
        overflowY: "auto",
        background: "#0f172a"
      }}
    >
      <div style={{ marginBottom: 12 }}>
        <h1 style={{ fontSize: 22, marginBottom: 4 }}>Shell-y</h1>
        <div style={{ fontSize: 11, opacity: 0.6 }}>
          Visual shell builder
        </div>
      </div>

      <input
        type="text"
        placeholder="Search commands..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={searchInputStyle as any}
      />

      {/* Sources */}
      <div>
        <div style={sectionTitle}>Sources</div>
        <div draggable onDragStart={drag({ type: "input" })} style={item}>
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
        <div style={sectionTitle}>Destinations</div>
        <div draggable onDragStart={drag({ type: "output" })} style={item}>
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
            >
              🔄 while loop
            </div>
          </div>
        )}
      </div>    </div>
  );
}
