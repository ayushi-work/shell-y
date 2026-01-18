# 🎓 Shell-y Complete User & Developer Guide

## Table of Contents
1. [Getting Started](#getting-started)
2. [User Guide](#user-guide)
3. [Developer Guide](#developer-guide)
4. [API Reference](#api-reference)
5. [Troubleshooting](#troubleshooting)

---

## 🚀 Getting Started

### Requirements
- Node.js 16.x or higher
- npm or yarn package manager
- Modern web browser (Chrome, Firefox, Safari, Edge)

### Installation & Setup

```bash
# Clone or navigate to the project
cd shell-y

# Install dependencies
npm install

# Start development server
npm run dev
# Opens at http://localhost:5174

# Build for production
npm run build

# Run linter
npm run lint
```

### Directory Structure
```
shell-y/
├── src/
│   ├── App.tsx                      # Main app entry
│   ├── Canvas.tsx                   # Visual canvas with undo/redo
│   ├── Sidebar.tsx                  # Command library
│   ├── commandDefinitions.ts        # Command metadata (25+ commands)
│   ├── scriptGenerator.ts           # Script generation engine
│   ├── Components/
│   │   ├── CommandBlock.tsx         # Command node
│   │   ├── InputBlock.tsx           # Input file node
│   │   ├── OutputBlock.tsx          # Output file node
│   │   ├── ConditionalBlock.tsx     # If/else node
│   │   ├── LoopBlock.tsx            # For/while node
│   │   ├── ConfigPanel.tsx          # Node configuration
│   │   ├── ScriptConfigPanel.tsx    # Script settings
│   │   ├── ScriptPreview.tsx        # Script preview
│   │   ├── ExportPanel.tsx          # Export options
│   │   └── HelpPanel.tsx            # Help tips
│   ├── main.tsx                     # React entry point
│   ├── index.css                    # Global styles
│   └── App.css                      # App styles
├── public/                          # Static assets
├── dist/                            # Build output
├── package.json                     # Dependencies
├── tsconfig.json                    # TypeScript config
├── vite.config.ts                   # Vite config
└── README.md                        # This file
```

---

## 👤 User Guide

### 1. Understanding the Interface

**Left Sidebar (Command Library)**
- Search bar for finding commands
- Expandable command categories:
  - Text Processing
  - File Operations
  - Network
  - System
  - Control Flow
- Sources (Input File)
- Destinations (Output File)

**Center Canvas**
- Main visual editing area
- Drag-and-drop commands
- Connect nodes with lines
- Zoom and pan controls
- MiniMap in bottom right

**Right Panel (Script Preview)**
- Real-time script preview
- Copy to clipboard button
- Export options:
  - Download as .sh
  - Save layout as JSON
  - Generate README.md

**Top Button (⚙️ Script Settings)**
- Configure shebang
- Error handling options
- Debug mode
- Metadata (author, version)

### 2. Basic Workflow

#### Step 1: Create Input
```
Sidebar → Drag "Input File" to Canvas
↓
Click to configure the file path
↓
Enter: "data.log"
```

#### Step 2: Add Processing
```
Sidebar → Search "grep"
↓
Drag "grep" command to Canvas
↓
Connect Input → grep
↓
Click grep node and configure:
   - Pattern: "error"
   - Ignore case: checked
```

#### Step 3: Add Output
```
Sidebar → Drag "Output File" to Canvas
↓
Connect grep → Output
↓
Click Output and set path: "errors.txt"
```

#### Step 4: Export
```
Script Preview → Click "📥 Script"
↓
Browser downloads "script.sh"
↓
chmod +x script.sh
./script.sh
```

### 3. Command Categories Guide

#### Text Processing
Best for: Filtering, transforming, and extracting text

| Command | Purpose | Example |
|---------|---------|---------|
| **grep** | Search text patterns | Find all "error" lines |
| **sed** | Stream editing | Replace "old" with "new" |
| **awk** | Extract fields | Get 1st column from CSV |
| **cut** | Column extraction | Extract columns by position |
| **sort** | Sort lines | Sort alphabetically or numerically |
| **uniq** | Deduplicate | Remove duplicate lines |
| **tr** | Character translation | Convert lowercase to uppercase |

#### File Operations
Best for: Managing files and directories

| Command | Purpose | Example |
|---------|---------|---------|
| **find** | Search files | Find all .log files |
| **ls** | List contents | List directory contents |
| **cp** | Copy files | Backup a file |
| **mv** | Move/rename | Rename or relocate file |
| **rm** | Delete files | Remove unwanted files |
| **chmod** | Change permissions | Make script executable |

#### Network
Best for: Remote operations and data transfer

| Command | Purpose | Example |
|---------|---------|---------|
| **curl** | HTTP requests | Fetch from API |
| **wget** | Download files | Download from URL |
| **ssh** | Remote shell | Run command on server |
| **scp** | Secure copy | Copy file to remote server |

#### System
Best for: Monitoring and reporting

| Command | Purpose | Example |
|---------|---------|---------|
| **ps** | List processes | Find running Java |
| **top** | Monitor processes | Check CPU usage |
| **df** | Disk usage | Check free space |
| **du** | Directory size | Size of /home |

#### Control Flow
Best for: Logic and iteration

| Block | Purpose | Example |
|-------|---------|---------|
| **if/then/else** | Conditional | Run different commands based on condition |
| **for** | Loop over values | Process each file in directory |
| **while** | Conditional loop | Repeat while condition true |

### 4. Configuration Tips

**Text Input Parameters**
- Type patterns, commands, or file paths
- Use quotes for multi-word values
- Regular expressions supported in grep/sed

**Boolean (Checkbox) Parameters**
- Toggle to enable/disable flags
- -i for case-insensitive
- -r for recursive
- -v for invert match

**Select Dropdowns**
- Choose from predefined options
- Set request method (GET, POST)
- Select file type (file, directory)

**Advanced Options**
- Click "⚙️ Advanced options" to expand
- Hidden by default to reduce clutter
- For power users and edge cases

### 5. Script Settings (⚙️)

**Shebang**
- Choose: bash, sh, zsh
- First line of script: `#!/bin/...`

**Error Handling**
- `set -e`: Exit on any error
- `set -u`: Error on undefined variables
- `set -o pipefail`: Error if pipe command fails
- These prevent silent failures

**Debug Mode**
- Enable `set -x`
- Shows each command before execution
- Useful for troubleshooting

**Metadata**
- Description: What the script does
- Author: Who wrote it
- Version: Script version number
- Added as comments at top

### 6. Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Z` or `Cmd+Z` | Undo last action |
| `Ctrl+Y` or `Cmd+Y` | Redo undone action |
| Click + Drag | Move node around |
| Scroll | Zoom in/out |

### 7. Exporting Scripts

**Option 1: Download as .sh**
```
Script Preview → Click "📥 Script"
→ Save to file
→ chmod +x script.sh
→ ./script.sh
```

**Option 2: Copy to Clipboard**
```
Script Preview → Click "📋 Copy"
→ Paste anywhere (terminal, editor, email)
```

**Option 3: Save Layout**
```
Script Preview → Click "💾 Layout"
→ Save as shell-y-layout.json
→ Import later to continue editing
```

**Option 4: Generate Documentation**
```
Script Preview → Click "📚 Docs"
→ Generates README.md with usage info
```

### 8. Common Patterns

#### Pattern 1: Log Analysis
```
Input: app.log
→ grep: Find "error" lines (-i)
→ sed: Highlight matches
→ sort: Sort by frequency (-u)
→ Output: errors.txt
```

#### Pattern 2: File Processing
```
find: Find all .txt files
→ grep: Search for pattern
→ wc: Count matches
→ Output: report.txt
```

#### Pattern 3: Conditional Execution
```
if: Check file exists
→ then: Process file
→ else: Display message
```

#### Pattern 4: Batch Processing
```
for: Loop over files
→ inside: Process each file
→ done
→ Output: results.txt
```

---

## 👨‍💻 Developer Guide

### Architecture Overview

**Data Flow**
```
User Action → Canvas State Update → Script Regeneration → Preview Update
     ↓
  History Update (for undo/redo)
```

**Component Hierarchy**
```
App
├── Header
├── Sidebar (Command Search & Library)
└── Canvas
    ├── ReactFlow (Visual Canvas)
    ├── ScriptConfigPanel (⚙️)
    ├── ConfigPanel (Node Config)
    └── ScriptPreview (Right Panel)
```

### Key Data Structures

**Command Definition**
```typescript
interface CommandDefinition {
  id: string;
  label: string;
  category: "text" | "files" | "network" | "system" | "control";
  description: string;
  params: CommandParam[];
  examples?: string[];
  acceptsInput?: boolean;
  producesOutput?: boolean;
}
```

**Node Data**
```typescript
// Command Node
{
  id: "unique-id",
  type: "command",
  position: { x: 0, y: 0 },
  data: {
    commandId: "grep",
    label: "grep",
    params: { pattern: "error", ignoreCase: true }
  }
}

// Input Node
{
  id: "input-1",
  type: "input",
  data: { path: "app.log" }
}

// Control Flow Node
{
  id: "if-1",
  type: "conditional",
  data: { params: { condition: "[ -f file.txt ]" } }
}
```

**Edge Data**
```typescript
{
  source: "input-1",
  target: "grep-1",
  id: "edge-1"
}
```

### Script Generation Algorithm

1. **Validation Phase**
   - Detect cycles with DFS
   - Check for orphaned nodes
   - Validate pipeline structure

2. **Ordering Phase**
   - Topological sort for execution
   - Ensure dependency resolution

3. **Command Building Phase**
   - Generate command-specific syntax
   - Apply user parameters
   - Handle special cases

4. **Assembly Phase**
   - Add shebang
   - Include metadata
   - Join with pipes
   - Format output

### Extending with New Commands

**Add to commandDefinitions.ts**
```typescript
export const COMMAND_DEFINITIONS: Record<string, CommandDefinition> = {
  mycommand: {
    id: "mycommand",
    label: "mycommand",
    category: "text",
    description: "What it does",
    params: [
      {
        name: "pattern",
        type: "text",
        label: "Pattern",
        description: "Search for..."
      }
    ],
    examples: ["mycommand 'pattern'"],
    acceptsInput: true,
    producesOutput: true
  }
};
```

**Add to scriptGenerator.ts**
```typescript
case "mycommand":
  return buildMycommand(params);

function buildMycommand(params: Record<string, any>): string {
  let cmd = "mycommand";
  if (params.pattern) cmd += ` "${params.pattern}"`;
  return cmd;
}
```

### State Management

**Canvas State**
```typescript
const [nodes, setNodes] = useState<any[]>([]);
const [edges, setEdges] = useState<Edge[]>([]);
const [selected, setSelected] = useState<any>(null);
const [history, setHistory] = useState([]);
const [historyIndex, setHistoryIndex] = useState(-1);
const [scriptConfig, setScriptConfig] = useState({
  shebang: "bash",
  setE: true,
  setU: true,
  setPipefail: true,
  debug: false,
  description: "",
  author: "",
  version: "1.0.0"
});
```

### Undo/Redo Implementation

```typescript
const updateNodesAndEdges = (newNodes, newEdges) => {
  setNodes(newNodes);
  setEdges(newEdges);
  
  // Add to history
  setHistory(prev => {
    const newHistory = prev.slice(0, historyIndex + 1);
    newHistory.push({ nodes: newNodes, edges: newEdges });
    return newHistory;
  });
  setHistoryIndex(prev => prev + 1);
};

const undo = () => {
  if (historyIndex > 0) {
    const newIndex = historyIndex - 1;
    const { nodes: prevNodes, edges: prevEdges } = history[newIndex];
    setNodes(prevNodes);
    setEdges(prevEdges);
    setHistoryIndex(newIndex);
  }
};
```

### Adding UI Components

1. **Create Component File**
   ```typescript
   // src/components/MyComponent.tsx
   export default function MyComponent({ prop }: any) {
     return <div>...</div>;
   }
   ```

2. **Import in Canvas or App**
   ```typescript
   import MyComponent from "./components/MyComponent";
   ```

3. **Use in JSX**
   ```typescript
   <MyComponent prop={value} />
   ```

---

## 📚 API Reference

### Canvas Props & Methods

**State**
- `nodes`: Array of node objects
- `edges`: Array of edge objects
- `selected`: Currently selected node
- `history`: Array of history states
- `historyIndex`: Current position in history

**Methods**
- `updateNodesAndEdges(nodes, edges)`: Update canvas
- `undo()`: Undo last action
- `redo()`: Redo undone action

### CommandDefinition Properties

```typescript
id: string                      // Unique identifier
label: string                   // Display name
category: string               // Category type
description: string            // Description
params: CommandParam[]         // Parameters
examples?: string[]            // Usage examples
acceptsInput?: boolean        // Can receive piped input
producesOutput?: boolean      // Produces output
```

### CommandParam Properties

```typescript
name: string                   // Parameter name
type: "text" | "number" | ...  // Input type
label: string                  // Display label
placeholder?: string           // Input placeholder
options?: string[]             // Select options
default?: any                  // Default value
description?: string           // Help text
advanced?: boolean             // Show in advanced
```

### Script Generation

**generateScript(nodes, edges, config?)**
```typescript
nodes: CommandNode[]  // Array of nodes
edges: Edge[]         // Array of edges
config?: {
  shebang: "bash" | "sh" | "zsh"
  setE: boolean
  setU: boolean
  setPipefail: boolean
  debug: boolean
  description: string
  author: string
  version: string
}

Returns: string (generated shell script)
```

---

## 🐛 Troubleshooting

### Common Issues

**Issue: Script Preview is Empty**
- Check that you have at least one node
- Ensure nodes are connected
- Click on a node to configure it

**Issue: Undo/Redo Not Working**
- Check keyboard layout (Cmd+Z on Mac)
- Verify browser supports keyboard events
- Check browser console for errors

**Issue: Commands Not Found in Search**
- Check spelling of command name
- Search works on command name and description
- Try category filter instead

**Issue: Export Not Working**
- Check browser allows file downloads
- Ensure script is not empty
- Try different export format

**Issue: Performance Slow**
- Close other browser tabs
- Clear browser cache
- Reduce number of nodes (100+)

### Debug Mode

**Enable Debug in Browser Console**
```javascript
localStorage.debug = 'shell-y:*'
```

**Check TypeScript Errors**
```bash
npm run build
```

**Check for ESLint Issues**
```bash
npm run lint
```

### Performance Tips

1. **Limit nodes**: Keep under 50 for smooth experience
2. **Simple connections**: Avoid complex pipelines
3. **Close panels**: Only open when needed
4. **Clear history**: History stored in memory

---

## 🔗 Resources

- [ReactFlow Documentation](https://reactflow.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Handbook](https://www.typescriptlang.org/)
- [Bash Manual](https://www.gnu.org/software/bash/manual/)
- [Shell Scripting Guide](https://www.shellscript.sh/)

---

## 📞 Support

- **Report Bugs**: Open an issue
- **Feature Requests**: Create a discussion
- **Questions**: Check documentation first
- **Contribute**: Pull requests welcome

---

**Happy Script Building! 🚀**
