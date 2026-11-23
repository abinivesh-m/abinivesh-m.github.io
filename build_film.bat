@echo off
setlocal enabledelayedexpansion

echo ===================================================
echo BUILDING CINEMATIC SCROLL-SCRUBBABLE FILM (A4)
echo ===================================================

if not exist clips (
    mkdir clips
    echo Created 'clips' directory. Drop clip1.mp4 ... clip6.mp4 inside it.
)

if not exist clips\clip1.mp4 (
    echo Error: clips\clip1.mp4 not found.
    echo Please save your 6 clips inside the 'clips' folder as clip1.mp4 ... clip6.mp4.
    exit /b 1
)

echo [1/3] Joining clips with smooth 0.25s xfade transitions...
ffmpeg -y ^
  -i clips/clip1.mp4 -i clips/clip2.mp4 -i clips/clip3.mp4 ^
  -i clips/clip4.mp4 -i clips/clip5.mp4 -i clips/clip6.mp4 ^
  -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.25:offset=7.75[v01];[v01][2:v]xfade=transition=fade:duration=0.25:offset=15.5[v02];[v02][3:v]xfade=transition=fade:duration=0.25:offset=23.25[v03];[v03][4:v]xfade=transition=fade:duration=0.25:offset=31.0[v04];[v04][5:v]xfade=transition=fade:duration=0.25:offset=38.75[v_all];[v_all]colorlevels=rimin=0.045:gimin=0.045:bimin=0.045[v_clean]" ^
  -map "[v_clean]" -an -c:v libx264 -crf 17 -pix_fmt yuv420p film_master.mp4

echo [2/3] Encoding web scroll-scrubbing version (every frame keyframe -g 1)...
ffmpeg -y -i film_master.mp4 -vf "scale=1280:-2" -c:v libx264 -crf 26 -preset slow -g 1 -keyint_min 1 -an -movflags +faststart site/media/film.mp4
ffmpeg -y -i film_master.mp4 -vf "scale=854:-2" -c:v libx264 -crf 27 -preset slow -g 1 -keyint_min 1 -an -movflags +faststart site/media/film_mobile.mp4

echo [3/3] Exporting poster frame...
ffmpeg -y -ss 00:00:00 -i film_master.mp4 -vframes 1 -q:v 2 site/media/poster.jpg

echo.
echo ===================================================
echo SUCCESS: Film compiled to site/media/film.mp4
echo ===================================================
