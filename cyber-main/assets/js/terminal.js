document.addEventListener("DOMContentLoaded", () => {
  const inputField = document.getElementById("terminal-input");
  const historyDiv = document.getElementById("terminal-history");

  if (!inputField || !historyDiv) return;

  // Virtual File System State
  let currentDir = "/root";
  const fileSystem = {
    "/root": ["flag.txt", "passwords.txt", "scripts"],
    "/root/scripts": ["recon.sh", "exploit.py"],
    "/etc": ["passwd", "shadow", "hosts"]
  };

  // Commands Implementation
  const commands = {
    help: () => `Available commands: 
  help    - show this message
  clear   - clear the terminal screen
  whoami  - print effective userid
  ls      - list directory contents
  pwd     - print name of current/working directory
  cd      - change the working directory
  cat     - concatenate files and print on the standard output
  echo    - display a line of text
  date    - print the system date and time`,
    
    whoami: () => "root",
    
    pwd: () => currentDir,
    
    ls: (args) => {
      let targetDir = currentDir;
      if (args.length > 0) {
        // Very basic path resolution
        if (args[0] === "/") targetDir = "/";
        else if (args[0].startsWith("/")) targetDir = args[0];
        else targetDir = currentDir === "/" ? "/" + args[0] : currentDir + "/" + args[0];
      }
      
      if (fileSystem[targetDir]) {
        return `<span style="color: #00ffae;">` + fileSystem[targetDir].join("  ") + `</span>`;
      } else if (targetDir === "/") {
        return `<span style="color: #00ffae;">root  etc  var  bin  usr</span>`;
      } else {
        return `ls: cannot access '${args[0]}': No such file or directory`;
      }
    },
    
    cd: (args) => {
      if (args.length === 0 || args[0] === "~") {
        currentDir = "/root";
        return "";
      }
      
      let targetDir = args[0];
      if (targetDir === "..") {
        if (currentDir === "/") return "";
        let parts = currentDir.split("/");
        parts.pop();
        currentDir = parts.join("/") || "/";
        return "";
      }
      
      if (!targetDir.startsWith("/")) {
        targetDir = currentDir === "/" ? "/" + targetDir : currentDir + "/" + targetDir;
      }
      
      if (fileSystem[targetDir] || targetDir === "/") {
        currentDir = targetDir;
        return "";
      } else {
        return `-bash: cd: ${args[0]}: No such file or directory`;
      }
    },
    
    cat: (args) => {
      if (args.length === 0) return "cat: missing file operand";
      const file = args[0];
      
      // Hardcoded files
      if (currentDir === "/root" && file === "flag.txt") return "FLAG{h4ckth3pl4n3t_0x99}";
      if (currentDir === "/root" && file === "passwords.txt") return "admin:P@ssw0rd123!<br>user:letmein99";
      if (currentDir === "/etc" && file === "passwd") return "root:x:0:0:root:/root:/bin/bash<br>daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin";
      
      return `cat: ${file}: No such file or directory`;
    },
    
    echo: (args) => {
      return args.join(" ");
    },
    
    date: () => {
      return new Date().toString();
    },
    
    sudo: () => "User 'root' is already running with elevated privileges.",
    
    clear: () => {
      historyDiv.innerHTML = "";
      return null;
    }
  };

  function processCommand(rawCmd) {
    const trimmed = rawCmd.trim();
    if (trimmed === "") return null;
    
    const parts = trimmed.split(" ");
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);
    
    if (commands[cmd]) {
      return commands[cmd](args);
    } else {
      return `-bash: ${cmd}: command not found`;
    }
  }

  inputField.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const command = inputField.value;
      
      // Echo the command back
      const cmdElement = document.createElement("p");
      cmdElement.innerHTML = `<span class="prompt">root@redspecter:${currentDir === '/root' ? '~' : currentDir}#</span> ${command}`;
      historyDiv.appendChild(cmdElement);
      
      // Process it
      const output = processCommand(command);
      if (output !== null && output !== "") {
        const outElement = document.createElement("p");
        outElement.innerHTML = output;
        outElement.style.color = "#ccc";
        historyDiv.appendChild(outElement);
      }
      
      // Update prompt dir
      document.querySelector(".interactive-terminal .prompt").innerText = `root@redspecter:${currentDir === '/root' ? '~' : currentDir}#`;
      
      // Clear input and scroll down
      inputField.value = "";
      const terminalBody = document.getElementById("interactive-terminal-body");
      terminalBody.scrollTop = terminalBody.scrollHeight;
    }
  });

  // Keep focus on terminal click
  document.getElementById("interactive-terminal-body").addEventListener("click", () => {
    inputField.focus();
  });
});
