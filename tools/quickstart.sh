#!/bin/bash

# Quick Start Script for Website Generators
# Usage: ./quickstart.sh [command] [options]

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

show_help() {
  cat << EOF
🚀 Website Generator Quick Start

USAGE:
  ./quickstart.sh [command] [options]

COMMANDS:
  endless             Start the endless generator (runs until Ctrl+C)
  batch [N]           Generate N websites (default: 10)
  help                Show this help message

EXAMPLES:
  ./quickstart.sh endless        # Generate websites forever
  ./quickstart.sh batch 20       # Generate exactly 20 websites
  ./quickstart.sh batch          # Generate 10 websites (default)

WHAT IT DOES:
  ✅ Generates realistic business websites
  ✅ Creates unique names, descriptions, and content
  ✅ Saves to catalogue automatically
  ✅ Includes 10 business categories
  ✅ Multiple styles and themes
  ✅ Full HTML preview pages

STOP ENDLESS GENERATION:
  Press Ctrl+C to stop safely

LOGS:
  Check generation-log.txt for activity history

For detailed documentation:
  See tools/README-GENERATOR.md
EOF
}

case "$1" in
  endless)
    echo "🚀 Starting endless generator..."
    echo "Press Ctrl+C to stop"
    echo ""
    cd "$SCRIPT_DIR" && node endless-generator.mjs
    ;;
  batch)
    COUNT=${2:-10}
    echo "🚀 Generating $COUNT websites..."
    echo ""
    cd "$SCRIPT_DIR" && node batch-generator.mjs "$COUNT"
    ;;
  help|--help|-h|"")
    show_help
    ;;
  *)
    echo "❌ Unknown command: $1"
    echo ""
    show_help
    exit 1
    ;;
esac
