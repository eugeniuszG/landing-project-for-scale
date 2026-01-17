#!/bin/bash
# Generate PNG favicons from SVG
# Requires: ImageMagick (brew install imagemagick)

cd "$(dirname "$0")/../public/assets"

# Check if ImageMagick is installed
if ! command -v convert &> /dev/null; then
    echo "ImageMagick not found. Install with: brew install imagemagick"
    exit 1
fi

# Generate PNG favicons from SVG
echo "Generating favicons..."

convert -background none favicon.svg -resize 16x16 favicon-16.png
convert -background none favicon.svg -resize 32x32 favicon-32.png
convert -background none favicon.svg -resize 180x180 apple-touch-icon.png

echo "Done! Generated:"
echo "  - favicon-16.png (16x16)"
echo "  - favicon-32.png (32x32)"  
echo "  - apple-touch-icon.png (180x180)"
