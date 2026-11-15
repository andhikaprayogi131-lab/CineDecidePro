import wave
import math
import struct
import os

os.makedirs("assets/audio", exist_ok=True)
os.makedirs("assets/video", exist_ok=True)

# Generate a 3-second harmonic cinema chime (440Hz crescendo, 528Hz healing chord)
wav_path = "assets/audio/cinema_intro.wav"
sample_rate = 22050
duration = 3.0
num_samples = int(sample_rate * duration)

with wave.open(wav_path, "w") as wav_file:
    wav_file.setnchannels(1) # mono
    wav_file.setsampwidth(2) # 16-bit
    wav_file.setframerate(sample_rate)

    frames = bytearray()
    for i in range(num_samples):
        t = i / sample_rate
        # Envelope: rise smoothly, sustain, then decay
        if t < 0.5:
            env = t / 0.5
        elif t < 2.0:
            env = 1.0
        else:
            env = max(0.0, (duration - t) / 1.0)

        # Chime Chord (A4: 440Hz, C#5: 554Hz, E5: 659Hz, A5: 880Hz)
        s1 = math.sin(2 * math.pi * 440 * t)
        s2 = math.sin(2 * math.pi * 554.37 * t) * 0.7
        s3 = math.sin(2 * math.pi * 659.25 * t) * 0.6
        s4 = math.sin(2 * math.pi * 880 * t) * 0.4
        val = (s1 + s2 + s3 + s4) / 2.7 * env

        sample = int(val * 32767 * 0.8)
        frames.extend(struct.pack("<h", sample))

    wav_file.writeframes(frames)

print(f"Generated audio: {wav_path} ({os.path.getsize(wav_path)} bytes)")

