#!/usr/bin/env bash
# Extract scroll frames from video using ffmpeg
# Usage: ./scripts/extract-frames.sh /path/to/video.mp4 [fps] [output_dir]
#
# Example:
#   ./scripts/extract-frames.sh ~/Downloads/hero-reveal.mp4 24

set -euo pipefail

VIDEO="${1:?Usage: extract-frames.sh <video.mp4> [fps] [output_dir]}"
FPS="${2:-24}"
OUT_DIR="${3:-assets/images/frames}"

mkdir -p "$OUT_DIR"

echo "Extracting frames at ${FPS}fps from: $VIDEO"
echo "Output: $OUT_DIR/frame-XXXX.webp"

ffmpeg -i "$VIDEO" \
  -vf "fps=${FPS}" \
  -q:v 80 \
  "${OUT_DIR}/frame-%04d.webp"

COUNT=$(ls -1 "$OUT_DIR"/frame-*.webp 2>/dev/null | wc -l | tr -d ' ')
echo "Done. ${COUNT} frames extracted."
echo ""
echo "Next steps:"
echo "  1. Update js/hero-scroll.js:"
echo "     useFrameSequence: true"
echo "     frameCount: ${COUNT}"
echo "  2. Test locally and deploy"
