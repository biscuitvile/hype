#!/bin/bash

# Hype Test Runner
echo "🎵 HYPE TEST RUNNER 🎵"
echo "======================"

# Create temporary test files with original content
echo "📁 Creating temporary test files..."

cat > temp-test.js << 'EOF'
// This is a single line comment
function hello() {
    /* This is a multi-line comment
       with multiple lines */
    return "Hello World";
}

// Another comment here
const x = 42; // End of line comment
EOF

cat > temp-test.py << 'EOF'
# This is a Python comment
def hello_world():
    # Another comment
    print("Hello World")  # End of line comment

# Final comment
EOF

cat > temp-test.html << 'EOF'
<!DOCTYPE html>
<html>
<!-- This is an HTML comment -->
<head>
    <title>Test</title>
</head>
<body>
    <!-- Another comment here -->
    <h1>Hello World</h1>
</body>
</html>
EOF

cat > temp-test.rb << 'EOF'
# This is a Ruby comment
class HelloWorld
  # Another comment
  def initialize
    @message = "Hello World"  # End of line comment
  end

=begin
This is a multi-line Ruby comment
that spans multiple lines
with various text
=end

  def greet
    puts @message
  end
end

# Final comment
EOF

echo "✅ Temporary test files created"
echo ""

# Test each file type
echo "🧪 Testing JavaScript..."
node hype.js temp-test.js
echo ""

echo "🧪 Testing Python..."
node hype.js temp-test.py
echo ""

echo "🧪 Testing HTML..."
node hype.js temp-test.html
echo ""

echo "🧪 Testing Ruby..."
node hype.js temp-test.rb
echo ""

# Show results
echo "📋 Results:"
echo "=========="
echo ""

echo "JavaScript (temp-test.js):"
echo "---------------------------"
head -5 temp-test.js
echo "..."
echo ""

echo "Python (temp-test.py):"
echo "-----------------------"
head -5 temp-test.py
echo "..."
echo ""

echo "HTML (temp-test.html):"
echo "-----------------------"
head -5 temp-test.html
echo "..."
echo ""

echo "Ruby (temp-test.rb):"
echo "--------------------"
head -5 temp-test.rb
echo "..."
echo ""

# Clean up temporary files
echo "🧹 Cleaning up temporary files..."
rm -f temp-test.js temp-test.py temp-test.html temp-test.rb
echo "✅ Cleanup complete"
echo ""

echo "🎉 All tests complete!"
echo ""
echo "💡 Tip: Run 'node hype.js --help' to see all options"
