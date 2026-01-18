// Complete command library for Shell-y
export interface CommandParam {
  name: string;
  type: "text" | "number" | "boolean" | "select" | "file";
  label: string;
  placeholder?: string;
  options?: string[];
  default?: any;
  description?: string;
  advanced?: boolean;
}

export interface CommandDefinition {
  id: string;
  label: string;
  category: "text" | "files" | "network" | "system" | "control" | "variable";
  description: string;
  params: CommandParam[];
  examples?: string[];
  minInputs?: number;
  maxInputs?: number;
  acceptsInput?: boolean; // Can receive piped input
  producesOutput?: boolean; // Produces output to pipe
  allowsRedirect?: boolean;
}

export const COMMAND_DEFINITIONS: Record<string, CommandDefinition> = {
  // Text Processing
  grep: {
    id: "grep",
    label: "grep",
    category: "text",
    description: "Search for patterns in text",
    params: [
      {
        name: "pattern",
        type: "text",
        label: "Pattern",
        placeholder: "search term",
        description: "Regular expression or literal string to search for"
      },
      {
        name: "ignoreCase",
        type: "boolean",
        label: "Ignore case (-i)"
      },
      {
        name: "invertMatch",
        type: "boolean",
        label: "Invert match (-v)",
        description: "Select non-matching lines"
      },
      {
        name: "extendedRegex",
        type: "boolean",
        label: "Extended regex (-E)"
      }
    ],
    examples: ["grep 'error' log.txt", "grep -i 'warning' file.log"],
    acceptsInput: true,
    producesOutput: true
  },

  sed: {
    id: "sed",
    label: "sed",
    category: "text",
    description: "Stream editor for filtering and transforming text",
    params: [
      {
        name: "expression",
        type: "text",
        label: "Expression",
        placeholder: "s/old/new/g",
        description: "sed command expression"
      },
      {
        name: "inPlace",
        type: "boolean",
        label: "In-place edit (-i)",
        description: "Edit file in place",
        advanced: true
      }
    ],
    examples: ["sed 's/error/ERROR/g'"],
    acceptsInput: true,
    producesOutput: true
  },

  awk: {
    id: "awk",
    label: "awk",
    category: "text",
    description: "Pattern-directed scanning and processing language",
    params: [
      {
        name: "program",
        type: "text",
        label: "Program",
        placeholder: "{print $1}",
        description: "awk program or script"
      },
      {
        name: "fieldSeparator",
        type: "text",
        label: "Field separator (-F)",
        placeholder: ":",
        advanced: true
      }
    ],
    examples: ["awk '{print $1}'", "awk -F: '{print $1}'"],
    acceptsInput: true,
    producesOutput: true
  },

  cut: {
    id: "cut",
    label: "cut",
    category: "text",
    description: "Remove sections from each line of files",
    params: [
      {
        name: "fields",
        type: "text",
        label: "Fields",
        placeholder: "1,3,5",
        description: "Field range or comma-separated list"
      },
      {
        name: "delimiter",
        type: "text",
        label: "Delimiter (-d)",
        placeholder: ":",
        default: "\t"
      }
    ],
    examples: ["cut -d: -f1,3", "cut -c1-10"],
    acceptsInput: true,
    producesOutput: true
  },

  sort: {
    id: "sort",
    label: "sort",
    category: "text",
    description: "Sort lines of text files",
    params: [
      {
        name: "reverse",
        type: "boolean",
        label: "Reverse (-r)"
      },
      {
        name: "unique",
        type: "boolean",
        label: "Unique (-u)"
      },
      {
        name: "numeric",
        type: "boolean",
        label: "Numeric sort (-n)"
      }
    ],
    examples: ["sort file.txt", "sort -rn numbers.txt"],
    acceptsInput: true,
    producesOutput: true
  },

  uniq: {
    id: "uniq",
    label: "uniq",
    category: "text",
    description: "Report or omit repeated lines",
    params: [
      {
        name: "count",
        type: "boolean",
        label: "Count occurrences (-c)"
      },
      {
        name: "duplicates",
        type: "boolean",
        label: "Only duplicates (-d)"
      }
    ],
    examples: ["uniq file.txt", "uniq -c file.txt"],
    acceptsInput: true,
    producesOutput: true
  },

  tr: {
    id: "tr",
    label: "tr",
    category: "text",
    description: "Translate or delete characters",
    params: [
      {
        name: "set1",
        type: "text",
        label: "Replace from",
        placeholder: "a-z"
      },
      {
        name: "set2",
        type: "text",
        label: "Replace to",
        placeholder: "A-Z"
      }
    ],
    examples: ["tr 'a-z' 'A-Z'", "tr -d ' '"],
    acceptsInput: true,
    producesOutput: true
  },

  // File Operations
  find: {
    id: "find",
    label: "find",
    category: "files",
    description: "Search for files in a directory hierarchy",
    params: [
      {
        name: "path",
        type: "file",
        label: "Start path",
        placeholder: ".",
        default: "."
      },
      {
        name: "name",
        type: "text",
        label: "Name pattern",
        placeholder: "*.txt"
      },
      {
        name: "type",
        type: "select",
        label: "Type (-type)",
        options: ["f", "d", "l"],
        description: "file, directory, or symlink",
        advanced: true
      }
    ],
    examples: ["find . -name '*.log'", "find /home -type f -name 'test*'"],
    producesOutput: true
  },

  ls: {
    id: "ls",
    label: "ls",
    category: "files",
    description: "List directory contents",
    params: [
      {
        name: "path",
        type: "file",
        label: "Directory",
        placeholder: ".",
        default: "."
      },
      {
        name: "long",
        type: "boolean",
        label: "Long format (-l)"
      },
      {
        name: "all",
        type: "boolean",
        label: "Show hidden (-a)"
      },
      {
        name: "recursive",
        type: "boolean",
        label: "Recursive (-R)"
      }
    ],
    examples: ["ls -la", "ls -R /path"],
    producesOutput: true
  },

  cp: {
    id: "cp",
    label: "cp",
    category: "files",
    description: "Copy files or directories",
    params: [
      {
        name: "source",
        type: "file",
        label: "Source"
      },
      {
        name: "destination",
        type: "file",
        label: "Destination"
      },
      {
        name: "recursive",
        type: "boolean",
        label: "Recursive (-r)"
      }
    ],
    examples: ["cp file.txt backup.txt", "cp -r dir/ backup/"],
    acceptsInput: false,
    producesOutput: false
  },

  mv: {
    id: "mv",
    label: "mv",
    category: "files",
    description: "Move or rename files",
    params: [
      {
        name: "source",
        type: "file",
        label: "Source"
      },
      {
        name: "destination",
        type: "file",
        label: "Destination"
      },
      {
        name: "force",
        type: "boolean",
        label: "Force (-f)"
      }
    ],
    examples: ["mv old.txt new.txt", "mv file.txt /archive/"],
    acceptsInput: false,
    producesOutput: false
  },

  rm: {
    id: "rm",
    label: "rm",
    category: "files",
    description: "Remove files or directories",
    params: [
      {
        name: "target",
        type: "file",
        label: "Target file/directory"
      },
      {
        name: "recursive",
        type: "boolean",
        label: "Recursive (-r)"
      },
      {
        name: "force",
        type: "boolean",
        label: "Force (-f)"
      }
    ],
    examples: ["rm file.txt", "rm -rf directory/"],
    acceptsInput: false,
    producesOutput: false
  },

  chmod: {
    id: "chmod",
    label: "chmod",
    category: "files",
    description: "Change file mode bits",
    params: [
      {
        name: "mode",
        type: "text",
        label: "Mode",
        placeholder: "755"
      },
      {
        name: "target",
        type: "file",
        label: "Target"
      }
    ],
    examples: ["chmod 755 script.sh", "chmod +x file.sh"],
    acceptsInput: false,
    producesOutput: false
  },

  // Network
  curl: {
    id: "curl",
    label: "curl",
    category: "network",
    description: "Transfer data from or to a server",
    params: [
      {
        name: "url",
        type: "text",
        label: "URL",
        placeholder: "https://example.com"
      },
      {
        name: "method",
        type: "select",
        label: "Method (-X)",
        options: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        default: "GET"
      },
      {
        name: "headers",
        type: "text",
        label: "Headers (-H)",
        placeholder: "Content-Type: application/json",
        advanced: true
      },
      {
        name: "data",
        type: "text",
        label: "Data (-d)",
        advanced: true
      }
    ],
    examples: ["curl https://api.example.com", "curl -X POST -d '{}'"],
    producesOutput: true
  },

  wget: {
    id: "wget",
    label: "wget",
    category: "network",
    description: "Download files from the web",
    params: [
      {
        name: "url",
        type: "text",
        label: "URL"
      },
      {
        name: "output",
        type: "file",
        label: "Output file (-O)",
        advanced: true
      }
    ],
    examples: ["wget https://example.com/file.zip"],
    producesOutput: true
  },

  ssh: {
    id: "ssh",
    label: "ssh",
    category: "network",
    description: "Secure shell remote login",
    params: [
      {
        name: "host",
        type: "text",
        label: "Host",
        placeholder: "user@hostname"
      },
      {
        name: "command",
        type: "text",
        label: "Command",
        advanced: true
      }
    ],
    examples: ["ssh user@host", "ssh user@host 'ls /home'"],
    acceptsInput: false,
    producesOutput: true
  },

  scp: {
    id: "scp",
    label: "scp",
    category: "network",
    description: "Secure copy (remote file copy program)",
    params: [
      {
        name: "source",
        type: "text",
        label: "Source"
      },
      {
        name: "destination",
        type: "text",
        label: "Destination"
      }
    ],
    examples: ["scp file.txt user@host:/path/", "scp -r dir/ user@host:"],
    acceptsInput: false,
    producesOutput: false
  },

  // System
  ps: {
    id: "ps",
    label: "ps",
    category: "system",
    description: "Report a snapshot of current processes",
    params: [
      {
        name: "aux",
        type: "boolean",
        label: "Show all (-aux)"
      }
    ],
    examples: ["ps aux", "ps aux | grep java"],
    producesOutput: true
  },

  top: {
    id: "top",
    label: "top",
    category: "system",
    description: "Display Linux processes",
    params: [
      {
        name: "batch",
        type: "boolean",
        label: "Batch mode (-b)",
        advanced: true
      }
    ],
    examples: ["top -b"],
    producesOutput: true
  },

  df: {
    id: "df",
    label: "df",
    category: "system",
    description: "Report file system disk space usage",
    params: [
      {
        name: "human",
        type: "boolean",
        label: "Human readable (-h)"
      }
    ],
    examples: ["df -h"],
    producesOutput: true
  },

  du: {
    id: "du",
    label: "du",
    category: "system",
    description: "Estimate file space usage",
    params: [
      {
        name: "human",
        type: "boolean",
        label: "Human readable (-h)"
      },
      {
        name: "summarize",
        type: "boolean",
        label: "Summarize (-s)"
      }
    ],
    examples: ["du -sh /home", "du -h /path"],
    producesOutput: true
  },

  // Control Flow
  if: {
    id: "if",
    label: "if/then/else",
    category: "control",
    description: "Conditional block",
    params: [
      {
        name: "condition",
        type: "text",
        label: "Condition",
        placeholder: "[ -f file.txt ]"
      }
    ],
    examples: ["[ -f file.txt ]", "[ $var -eq 0 ]"],
    acceptsInput: false,
    producesOutput: false,
    allowsRedirect: false
  },

  for: {
    id: "for",
    label: "for loop",
    category: "control",
    description: "Loop over values",
    params: [
      {
        name: "variable",
        type: "text",
        label: "Variable",
        placeholder: "i"
      },
      {
        name: "values",
        type: "text",
        label: "Values/Range",
        placeholder: "1 2 3 or {1..10}"
      }
    ],
    examples: ["for i in 1 2 3", "for file in *.txt"],
    acceptsInput: false,
    producesOutput: false
  },

  while: {
    id: "while",
    label: "while loop",
    category: "control",
    description: "Loop while condition is true",
    params: [
      {
        name: "condition",
        type: "text",
        label: "Condition",
        placeholder: "[ $i -lt 10 ]"
      }
    ],
    examples: ["[ $i -lt 10 ]"],
    acceptsInput: false,
    producesOutput: false
  }
};

export const COMMANDS_BY_CATEGORY = {
  text: Object.values(COMMAND_DEFINITIONS).filter(c => c.category === "text"),
  files: Object.values(COMMAND_DEFINITIONS).filter(c => c.category === "files"),
  network: Object.values(COMMAND_DEFINITIONS).filter(c => c.category === "network"),
  system: Object.values(COMMAND_DEFINITIONS).filter(c => c.category === "system"),
  control: Object.values(COMMAND_DEFINITIONS).filter(c => c.category === "control")
};

export const CATEGORY_LABELS: Record<string, string> = {
  text: "Text Processing",
  files: "File Operations",
  network: "Network",
  system: "System",
  control: "Control Flow"
};
