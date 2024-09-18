import { useState, useEffect } from "react";

const SoundPlay = (soundUrl: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (soundUrl) {
      const audioElement = new Audio(soundUrl);
      setAudio(audioElement);
    }
  }, [soundUrl]);

  const playSound = () => {
    if (audio) {
      audio.play();
    }
  };

  return { playSound };
};

export default SoundPlay;
