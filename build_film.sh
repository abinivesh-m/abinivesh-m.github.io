#!/usr/bin/env bash
set -e

echo "========================================================"
echo "  CINEMATIC AI CHARACTER PORTFOLIO — FILM BUILDER"
echo "========================================================"

mkdir -p site/media

if [ ! -f "clips/clip1.mp4" ]; then
    echo "[ERROR] clips/clip1.mp4 not found! Place clip1.mp4 to clip6.mp4 in clips/"
    exit 1
fi

echo "[1/3] Joining clips with 0.25s crossfade and pure black levels..."
ffmpeg -y -i clips/clip1.mp4 -i clips/clip2.mp4 -i clips/clip3.mp4 -i clips/clip4.mp4 -i clips/clip5.mp4 -i clips/clip6.mp4 \
-filter_complex \
"[0:v][1:v]xfade=transition=fade:duration=0.25:offset=7.75[v01]; \
 [v01][2:v]xfade=transition=fade:duration=0.25:offset=15.25[v02]; \
 [v02][3:v]xfade=transition=fade:duration=0.25:offset=22.75[v03]; \
 [v03][4:v]xfade=transition=fade:duration=0.25:offset=30.25[v04]; \
 [v04][5:v]xfade=transition=fade:duration=0.25:offset=37.75[vjoined]; \
 [vjoined]colorlevels=rimin=0.045:gimin=0.045:bimin=0.045[vblack]" \
-map "[vblack]" -an -c:v libx264 -crf 17 -preset slow film_master.mp4

echo "[2/3] Encoding Desktop Web Version (1280px, -g 1 keyframe)..."
ffmpeg -y -i film_master.mp4 -vf "scale=1280:-2" -c:v libx264 -g 1 -crf 27 -movflags +faststart -an site/media/film.mp4

echo "[3/3] Encoding Mobile Web Version (854px, -g 1 keyframe)..."
ffmpeg -y -i film_master.mp4 -vf "scale=854:-2" -c:v libx264 -g 1 -crf 28 -movflags +faststart -an site/media/film_mobile.mp4

echo "[4/4] Extracting poster frame..."
ffmpeg -y -i site/media/film.mp4 -vframes 1 -q:v 2 site/media/poster.jpg

echo "Film build complete! Files saved to site/media/"
