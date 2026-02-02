import os
import glob
import subprocess

# Crea cartella output
output_dir = 'assets_no_audio'
os.makedirs(output_dir, exist_ok=True)

# Verifica che la cartella assets esista
if not os.path.exists('assets'):
    print("ERRORE: La cartella 'assets' non esiste!")
    print("Crea la cartella 'assets' e metti i tuoi video .mp4 lì dentro.")
    exit(1)

# Trova tutti i .mp4
video_files = glob.glob('assets/*.mp4')

if len(video_files) == 0:
    print("ERRORE: Nessun file .mp4 trovato nella cartella 'assets'")
    exit(1)

print(f"Trovati {len(video_files)} video da processare:")
for video in video_files:
    print(f"  - {video}")

for video in video_files:
    if os.path.isfile(video):
        base_name = os.path.splitext(os.path.basename(video))[0]
        output = os.path.join(output_dir, f'{base_name}_noaudio.mp4')
        print(f"Processando: {video} -> {output}")
        # FFmpeg: no audio, copia video, sovrascrivi
        subprocess.call([
            'ffmpeg', '-i', video, '-an', '-c:v', 'copy', '-y', output
        ])

print("Fatto! File in assets_no_audio/")
