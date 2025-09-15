#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

function processFile(filePath, yeahPercent = 0) {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    //🎵"HELPER FUNCTION TO ADD RANDOM YEAH!"🎵
    const addYeah = (text) => {
      if (Math.random() * 100 < yeahPercent) {
        const yeahs = ["Yeah!", "Oh yeah!"];
        const randomYeah = yeahs[Math.floor(Math.random() * yeahs.length)];
        return `${text} ${randomYeah}`;
      }
      return text;
    };

    //🎵"PROCESS DIFFERENT COMMENT STYLES!"🎵
    let processed = content
      //🎵"SINGLE LINE COMMENTS: SLASH SLASH COMMENT TO HYPED FORMAT!"🎵
      .replace(
        /\/\/\s*(.*)/g,
        (match, p1) => {
          const text = p1.trim().toUpperCase().replace(/\.$/, '');
          const finalText = addYeah(`"${text}!"`);
          return `//🎵${finalText}🎵`;
        }
      )
      //🎵"MULTI-LINE C-STYLE COMMENTS: SLASH STAR TO HYPED FORMAT!"🎵
      .replace(
        /\/\*\s*([\s\S]*?)\s*\*\//g,
        (match, p1) => {
          const text = p1.trim().toUpperCase().replace(/\.$/, '');
          const finalText = addYeah(`"${text}!"`);
          return `/*🎵${finalText}🎵*/`;
        }
      )
      //🎵"PYTHON SHELL RUBY COMMENTS: HASH TO HYPED FORMAT!"🎵
      .replace(/#\s*(.*)/g, (match, p1) => {
        const text = p1.trim().toUpperCase().replace(/\.$/, '');
        const finalText = addYeah(`"${text}!"`);
        return `#🎵${finalText}🎵`;
      })
      //🎵"RUBY MULTI-LINE COMMENTS: EQUALS BEGIN TO HYPED FORMAT!"🎵
      .replace(
        /=begin\s*([\s\S]*?)\s*=end/g,
        (match, p1) => {
          const text = p1.trim().toUpperCase().replace(/\.$/, '');
          const finalText = addYeah(`"${text}!"`);
          return `=begin\n🎵${finalText}🎵\n=end`;
        }
      )
      //🎵"HTML COMMENTS: ANGLE BRACKET TO HYPED FORMAT!"🎵
      .replace(
        /<!--\s*([\s\S]*?)\s*-->/g,
        (match, p1) => {
          const text = p1.trim().toUpperCase().replace(/\.$/, '');
          const finalText = addYeah(`"${text}!"`);
          return `<!--🎵${finalText}🎵-->`;
        }
      );

    fs.writeFileSync(filePath, processed);
    console.log(`✨ Hyped up: ${filePath}`);
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
  }
}

function processDirectory(dirPath, extensions = [], yeahPercent = 0) {
  try {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        //🎵"SKIP NODE MODULES GIT AND OTHER COMMON DIRECTORIES!"🎵
        if (
          !["node_modules", ".git", ".vscode", "dist", "build"].includes(item)
        ) {
          processDirectory(fullPath, extensions, yeahPercent);
        }
      } else if (stat.isFile()) {
        const ext = path.extname(fullPath).toLowerCase();
        if (extensions.length === 0 || extensions.includes(ext)) {
          processFile(fullPath, yeahPercent);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error processing directory ${dirPath}:`, error.message);
  }
}

function showHelp() {
  console.log(`
🎵 HYPE - Make your comments more hype! 🎵

Usage:
  node hype.js <file>                    Process a single file
  node hype.js <directory>               Process all files in directory
  node hype.js <directory> --ext .js     Process only specific extensions
  node hype.js <file> --yeah 25          Add "Yeah!" or "Oh yeah!" 25% of the time
  node hype.js --help                    Show this help

Examples:
  node hype.js script.js
  node hype.js ./src
  node hype.js ./src --ext .js,.ts,.py
  node hype.js ./src --yeah 50

Supported comment formats:
  // Single line comments (JS, C, C++, Java, etc.)
  /* Multi-line comments */ (JS, C, C++, Java, etc.)
  # Single line comments (Python, Shell, Ruby, etc.)
  =begin...=end (Ruby multi-line comments)
  <!-- HTML comments -->
`);
}

//🎵"PARSE COMMAND LINE ARGUMENTS!"🎵
const args = process.argv.slice(2);

if (args.length === 0 || args.includes("--help")) {
  showHelp();
  process.exit(0);
}

const target = args[0];
const extIndex = args.indexOf("--ext");
const yeahIndex = args.indexOf("--yeah");
let extensions = [];
let yeahPercent = 0;

if (extIndex !== -1 && args[extIndex + 1]) {
  extensions = args[extIndex + 1].split(",").map((ext) => ext.trim());
}

if (yeahIndex !== -1 && args[yeahIndex + 1]) {
  yeahPercent = parseInt(args[yeahIndex + 1], 10);
  if (isNaN(yeahPercent) || yeahPercent < 0 || yeahPercent > 100) {
    console.error(`❌ Yeah percent must be a number between 0 and 100`);
    process.exit(1);
  }
}

if (!fs.existsSync(target)) {
  console.error(`❌ Path does not exist: ${target}`);
  process.exit(1);
}

const stat = fs.statSync(target);

if (stat.isFile()) {
  processFile(target, yeahPercent);
} else if (stat.isDirectory()) {
  console.log(`🎵 Getting hyped in: ${target}`);
  processDirectory(target, extensions, yeahPercent);
} else {
  console.error(`❌ Invalid target: ${target}`);
  process.exit(1);
}

console.log("🎉 Hype complete!");
