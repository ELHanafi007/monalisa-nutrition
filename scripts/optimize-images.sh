#!/bin/bash

# Script to optimize large hero images in public/images/hero/ and public/tt/
# using the macOS native 'sips' command-line tool.

MAX_WIDTH=1920
QUALITY=75

optimize_image() {
  local img="$1"
  if [ -f "$img" ]; then
    echo "Optimizing: $img"
    # Get current dimensions
    local width=$(sips -g pixelWidth "$img" | awk '/pixelWidth/ {print $2}')
    local height=$(sips -g pixelHeight "$img" | awk '/pixelHeight/ {print $2}')
    local size_before=$(wc -c <"$img")
    
    echo "  Current size: $((size_before / 1024)) KB ($width x $height)"
    
    if [ "$width" -gt "$MAX_WIDTH" ]; then
      echo "  Rescaling width to $MAX_WIDTH..."
      sips --resampleWidth "$MAX_WIDTH" -s formatOptions "$QUALITY" "$img" > /dev/null
    else
      echo "  Width is less than $MAX_WIDTH. Compressing without scaling..."
      sips -s formatOptions "$QUALITY" "$img" > /dev/null
    fi
    
    local size_after=$(wc -c <"$img")
    echo "  New size: $((size_after / 1024)) KB"
  fi
}

echo "Starting image optimization..."

# Optimize public/images/hero images
if [ -d "public/images/hero" ]; then
  for file in public/images/hero/*.jpg public/images/hero/*.jpeg; do
    optimize_image "$file"
  done
fi

# Optimize public/tt hero images
if [ -d "public/tt" ]; then
  for file in public/tt/hero-*.jpg public/tt/hero-*.jpeg; do
    optimize_image "$file"
    if command -v cwebp >/dev/null 2>&1; then
      echo "  Creating WebP..."
      cwebp -q 78 "$file" -o "${file%.*}.webp" 2>/dev/null || true
    fi
  done
fi

echo "Image optimization complete!"
