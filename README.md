# 🐚 Shell-y: Visual Shell Script Builder

Transform shell scripting from code-heavy text editing to intuitive visual drag-and-drop design.

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)]()
[![License](https://img.shields.io/badge/license-MIT-blue)]()
[![React](https://img.shields.io/badge/React-19.2-blue)](https://react.dev)

## ✨ Features

- **🎨 Visual Drag-and-Drop**: Build scripts without typing shell syntax
- **📚 25+ Commands**: Pre-built blocks for common shell operations
- **⚙️ Smart Configuration**: Auto-generate correct syntax with visual forms
- **🔄 Undo/Redo**: Full history support with keyboard shortcuts
- **📝 Real-time Preview**: See your script update instantly as you build
- **💾 Export Options**: Download as .sh, save layout, generate docs
- **🔀 Control Flow**: Visual if/else and loop blocks
- **🌍 Network Commands**: curl, wget, ssh, scp support
- **📊 Data Flow**: Clear visualization of command piping
- **⌨️ Keyboard Shortcuts**: Ctrl+Z, Ctrl+Y, and more

## 🚀 Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
# Opens at http://localhost:5174
```

### Production Build
```bash
npm run build
```

## 📖 How to Use

### 1. Search for a Command
- Type in the search box to find commands
- Or click category headers to explore

### 2. Drag to Canvas
- Drag any command from the sidebar to the canvas
- It automatically creates a configuration node

### 3. Configure Parameters
- Click any node to open its configuration panel
- Fill in required parameters
- See the script preview update in real-time

### 4. Connect Commands
- Drag from the output port (right) of one node
- Connect to the input port (left) of another
- Visual lines show the data flow

### 5. Set Script Options
- Click the ⚙️ button for script-level settings
- Choose shebang (bash/sh/zsh)
- Configure error handling
- Add metadata

### 6. Export Your Script
- **Copy to Clipboard**: 📋 button in preview
- **Download**: 📥 to save as .sh file
- **Save Layout**: 💾 to save for later editing
- **Generate Docs**: 📚 to create README

## 🛠️ Architecture

### Command Categories

#### Text Processing
`grep` • `sed` • `awk` • `cut` • `sort` • `uniq` • `tr`

#### File Operations
`find` • `ls` • `cp` • `mv` • `rm` • `chmod`

#### Network
`curl` • `wget` • `ssh` • `scp`

#### System
`ps` • `top` • `df` • `du`

#### Control Flow
`if/then/else` • `for` • `while`

## 📋 Example: Create a Log Analyzer

1. Input File (`app.log`)
2. grep: Find "error" pattern (-i flag)
3. sed: Replace "error" with "ERROR"
4. sort: Sort results (-u for unique)
5. Output File (`errors.txt`)

**Generated Script:**
```bash
#!/bin/bash
set -euo pipefail

cat "app.log" | grep -i "error" | sed 's/error/ERROR/g' | sort -u > "errors.txt"
```

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Z` / `Cmd+Z` | Undo |
| `Ctrl+Y` / `Cmd+Y` | Redo |
| Drag & Drop | Move nodes |
| Scroll | Zoom canvas |
| Right-click | Context menu |

## 🎯 Use Cases

- **DevOps Engineers**: Quickly prototype deployment scripts
- **System Administrators**: Create system maintenance scripts
- **Developers**: Generate shell scripts for build processes
- **Learning**: Understand shell scripting syntax visually
- **Teams**: Standardize script creation across skill levels

## 📦 Tech Stack

- **React 19**: User interface
- **ReactFlow 11**: Canvas and node system
- **TypeScript**: Type safety
- **Vite**: Build tool
- **CSS**: Styling

## 🔧 Development

### Project Structure
```
src/
├── App.tsx              # Main application
├── Canvas.tsx           # Main visual canvas
├── Sidebar.tsx          # Command library
├── CommandBlock.tsx     # Command nodes
├── ConfigPanel.tsx      # Configuration UI
├── scriptGenerator.ts   # Script generation logic
├── commandDefinitions.ts # Command metadata
└── components/          # UI components
```

### Building a Production Bundle
```bash
npm run build
# Output in dist/
```

### Linting
```bash
npm run lint
```

## 📚 Documentation

- **[FEATURES.md](FEATURES.md)** - Detailed feature documentation
- **[IMPLEMENTATION.md](IMPLEMENTATION.md)** - Technical implementation details

## 🎨 Design Philosophy

- **Visual First**: See your script as you build it
- **No Syntax Errors**: Impossible to write invalid shell syntax
- **Progressive Disclosure**: Basic options visible, advanced hidden
- **Learning Tool**: Understand how commands work together
- **Production Ready**: Export immediately usable scripts

## 🐛 Known Limitations

- Currently supports linear pipelines
- ShellCheck integration coming soon
- Template library coming in Phase 2

## 🚀 Roadmap

### Phase 1 ✅ Complete
- Core visual builder
- Command library
- Configuration panels
- Export functionality
- Undo/redo support

### Phase 2 (Coming Soon)
- Variable management
- Template system
- ShellCheck integration
- Advanced control flow

### Phase 3 (Future)
- Collaborative editing
- Cloud storage
- Template marketplace
- Custom commands

## 💬 Feedback

Found a bug? Have a feature request? 
Open an issue or start a discussion!

## 📄 License

MIT License - feel free to use in your projects!

---

**Made with ❤️ for developers who want to love shell scripting**
