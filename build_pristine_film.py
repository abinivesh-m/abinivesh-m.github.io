import subprocess, time, sys

print("Starting Pristine 1080p Film Compilation (Clip 5 Trimmed, Zero Distortion, Watermark-Free)...")
t0 = time.time()

# High-fidelity filter chain:
# - Clip 5 trimmed to 4.0s to cleanly eliminate the last 2 seconds of AI face drift
# - Lanczos 7% scale & crop (2064:1161 -> 1920:1080) for 100% watermark elimination
# - Subtle CAS (0.30) for natural, high-definition clarity without noise halos
# - Seamless crossfades at exact mathematical offsets
filter_str = (
    "[0:v]scale=2064:1161:flags=lanczos,crop=1920:1080:(in_w-1920)/2:0,cas=strength=0.30,fps=24,format=yuv420p[v0];"
    "[1:v]scale=2064:1161:flags=lanczos,crop=1920:1080:(in_w-1920)/2:0,cas=strength=0.30,fps=24,format=yuv420p[v1];"
    "[2:v]scale=2064:1161:flags=lanczos,crop=1920:1080:(in_w-1920)/2:0,cas=strength=0.30,fps=24,format=yuv420p[v2];"
    "[3:v]scale=2064:1161:flags=lanczos,crop=1920:1080:(in_w-1920)/2:0,cas=strength=0.30,fps=24,format=yuv420p[v3];"
    "[4:v]trim=duration=4.0,setpts=PTS-STARTPTS,scale=2064:1161:flags=lanczos,crop=1920:1080:(in_w-1920)/2:0,cas=strength=0.30,fps=24,format=yuv420p[v4];"
    "[5:v]scale=2064:1161:flags=lanczos,crop=1920:1080:(in_w-1920)/2:0,cas=strength=0.30,fps=24,format=yuv420p[v5];"
    "[v0][v1]xfade=transition=fade:duration=0.25:offset=5.38[x01];"
    "[x01][v2]xfade=transition=fade:duration=0.25:offset=10.76[x02];"
    "[x02][v3]xfade=transition=fade:duration=0.25:offset=18.55[x03];"
    "[x03][v4]xfade=transition=fade:duration=0.25:offset=26.34[x04];"
    "[x04][v5]xfade=transition=fade:duration=0.25:offset=30.09[outv]"
)

cmd_master = [
    "ffmpeg", "-y",
    "-i", "clips/clip1.mp4",
    "-i", "clips/clip2.mp4",
    "-i", "clips/clip3.mp4",
    "-i", "clips/clip4.mp4",
    "-i", "clips/clip5.mp4",
    "-i", "clips/clip6.mp4",
    "-filter_complex", filter_str,
    "-map", "[outv]",
    "-an",
    "-c:v", "libx264",
    "-crf", "15",
    "-preset", "slow",
    "-g", "1",
    "-keyint_min", "1",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "site/media/film.mp4"
]

print("Executing FFmpeg compile for site/media/film.mp4...")
subprocess.run(cmd_master, cwd="C:/Users/abini/Desktop/portfolio", check=True)

# Generate mobile version at 960x540 for fast loading on phones
cmd_mobile = [
    "ffmpeg", "-y",
    "-i", "site/media/film.mp4",
    "-vf", "scale=960:540:flags=lanczos",
    "-an",
    "-c:v", "libx264",
    "-crf", "18",
    "-preset", "slow",
    "-g", "1",
    "-keyint_min", "1",
    "-pix_fmt", "yuv420p",
    "-movflags", "+faststart",
    "site/media/film_mobile.mp4"
]
print("Executing mobile encode for site/media/film_mobile.mp4...")
subprocess.run(cmd_mobile, cwd="C:/Users/abini/Desktop/portfolio", check=True)

# Export poster frame
cmd_poster = [
    "ffmpeg", "-y",
    "-ss", "00:00:00.5",
    "-i", "site/media/film.mp4",
    "-vframes", "1",
    "-q:v", "2",
    "site/media/poster.jpg"
]
print("Exporting poster...")
subprocess.run(cmd_poster, cwd="C:/Users/abini/Desktop/portfolio", check=True)

t1 = time.time()
print(f"SUCCESS! Finished pristine film compilation in {t1 - t0:.1f}s")
