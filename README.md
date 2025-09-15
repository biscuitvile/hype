# Hype

Functionally useless software that makes your comments look more hype.

## Usage

```bash
node hype.js <file>                    # Process a single file
node hype.js <directory>               # Process all files in directory
node hype.js <directory> --ext .js,.py # Process only specific extensions
node hype.js <file> --yeah 25          # Add "Yeah!" or "Oh yeah!" 25% of the time
node hype.js --help                    # Show help
```

## Examples

**Before:**

```javascript
// This is a comment
/* Multi-line comment */
```

**After:**

```javascript
//🎵"THIS IS A COMMENT!"🎵
/*🎵"MULTI-LINE COMMENT!"🎵*/
```

## Supported Languages

- **JavaScript/TypeScript/C/C++/Java**: `//` and `/* */` comments
- **Python/Shell/Ruby**: `#` comments
- **Ruby**: `=begin...=end` multi-line comments
- **HTML**: `<!-- -->` comments

## Testing

Run the test suite:

```bash
./test.sh
```
