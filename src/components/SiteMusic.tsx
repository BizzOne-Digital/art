"use client";

import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import {
  registerMusicPlay,
  setMusicReady,
  unregisterMusicPlay,
} from "@/lib/music-events";

const DEFAULT_MUSIC =
  "https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3";

/** Always start at 1:00 */
const MUSIC_START_SECONDS = 60;
const LOCAL_MUSIC = "/music/site-track.mp3";

/** Official music video matching the Spotify track */
const YOUTUBE_VIDEO_ID = "HoFizLtAZMo";

type YTPlayer = {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  unMute: () => void;
  mute: () => void;
  setVolume: (n: number) => void;
  getPlayerState: () => number;
  getCurrentTime: () => number;
  loadVideoById: (opts: {
    videoId: string;
    startSeconds?: number;
    endSeconds?: number;
  }) => void;
  destroy: () => void;
};

type YTNamespace = {
  Player: new (
    el: HTMLElement | string,
    opts: Record<string, unknown>
  ) => YTPlayer;
  PlayerState: { ENDED: number; PLAYING: number; PAUSED: number; CUED: number };
};

declare global {
  interface Window {
    YT?: YTNamespace;
    onYouTubeIframeAPIReady?: () => void;
  }
}

function isSpotifyUrl(url: string) {
  return /open\.spotify\.com|spotify:track/i.test(url);
}

function loadYouTubeApi(): Promise<YTNamespace> {
  if (window.YT?.Player) return Promise.resolve(window.YT);

  return new Promise((resolve) => {
    const prev = window.onYouTubeIframeAPIReady;
    window.onYouTubeIframeAPIReady = () => {
      prev?.();
      if (window.YT) resolve(window.YT);
    };

    if (!document.querySelector("script[data-yt-api]")) {
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      script.async = true;
      script.dataset.ytApi = "1";
      document.body.appendChild(script);
    }
  });
}

async function localTrackExists() {
  try {
    const res = await fetch(LOCAL_MUSIC, { method: "HEAD", cache: "no-store" });
    return res.ok;
  } catch {
    return false;
  }
}

function startYtFromOneMinute(player: YTPlayer) {
  player.unMute();
  player.setVolume(70);
  // loadVideoById with startSeconds is the reliable way (seekTo alone often fails)
  player.loadVideoById({
    videoId: YOUTUBE_VIDEO_ID,
    startSeconds: MUSIC_START_SECONDS,
  });
}

export function SiteMusic({ src }: { src?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const ytRef = useRef<YTPlayer | null>(null);
  const ytMountRef = useRef<HTMLDivElement | null>(null);
  const playHandlerRef = useRef<() => boolean>(() => false);
  const modeRef = useRef<"audio" | "youtube">("audio");
  const enforceStartRef = useRef(true);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);
  const [showYt, setShowYt] = useState(false);
  const musicSrc = (src || DEFAULT_MUSIC).trim();

  useEffect(() => {
    let cancelled = false;
    let enforceTimer: number | undefined;

    const playFromGesture = () => playHandlerRef.current();
    registerMusicPlay(playFromGesture);

    async function setup() {
      const hasLocal = await localTrackExists();
      if (cancelled) return;

      const useYoutube = !hasLocal && isSpotifyUrl(musicSrc);

      if (useYoutube) {
        modeRef.current = "youtube";
        setShowYt(true);

        await new Promise((r) => requestAnimationFrame(() => r(null)));
        if (cancelled || !ytMountRef.current) return;

        ytMountRef.current.innerHTML = "";
        const host = document.createElement("div");
        host.id = "ebfp-yt-player";
        ytMountRef.current.appendChild(host);

        const YT = await loadYouTubeApi();
        if (cancelled) return;

        new YT.Player(host, {
          width: 320,
          height: 180,
          videoId: YOUTUBE_VIDEO_ID,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            start: MUSIC_START_SECONDS,
            origin: window.location.origin,
          },
          events: {
            onReady: (e: { target: YTPlayer }) => {
              if (cancelled) return;
              ytRef.current = e.target;
              e.target.setVolume(70);

              playHandlerRef.current = () => {
                try {
                  enforceStartRef.current = true;
                  startYtFromOneMinute(e.target);
                  setPlaying(true);
                  return true;
                } catch {
                  return false;
                }
              };

              setReady(true);
              setMusicReady(true);
            },
            onStateChange: (e: { data: number }) => {
              if (!window.YT) return;
              const p = ytRef.current;
              if (!p) return;

              if (e.data === window.YT.PlayerState.ENDED) {
                enforceStartRef.current = true;
                startYtFromOneMinute(p);
                return;
              }

              if (e.data === window.YT.PlayerState.PLAYING) {
                setPlaying(true);
                // Force 1:00 if YouTube drifted back to the intro
                if (enforceStartRef.current) {
                  window.clearTimeout(enforceTimer);
                  enforceTimer = window.setTimeout(() => {
                    try {
                      const t = p.getCurrentTime();
                      if (t < MUSIC_START_SECONDS - 0.5) {
                        p.seekTo(MUSIC_START_SECONDS, true);
                      } else {
                        enforceStartRef.current = false;
                      }
                    } catch {
                      /* ignore */
                    }
                  }, 400);
                }
              }

              if (e.data === window.YT.PlayerState.PAUSED) setPlaying(false);
            },
          },
        });
        return;
      }

      modeRef.current = "audio";
      setShowYt(false);
      const audioUrl = hasLocal
        ? LOCAL_MUSIC
        : isSpotifyUrl(musicSrc)
          ? DEFAULT_MUSIC
          : musicSrc;
      const audio = new Audio(audioUrl);
      audio.preload = "auto";
      audio.volume = 0.45;
      audioRef.current = audio;

      const jumpToStart = () => {
        if (
          Number.isFinite(audio.duration) &&
          audio.duration > MUSIC_START_SECONDS + 5
        ) {
          audio.currentTime = MUSIC_START_SECONDS;
        }
      };

      audio.addEventListener("loadedmetadata", jumpToStart);
      audio.addEventListener("ended", () => {
        jumpToStart();
        void audio.play().catch(() => undefined);
      });

      playHandlerRef.current = () => {
        try {
          jumpToStart();
          void audio.play().then(() => {
            jumpToStart();
            setPlaying(true);
          });
          setPlaying(true);
          return true;
        } catch {
          return false;
        }
      };

      setReady(true);
      setMusicReady(true);
    }

    void setup();

    return () => {
      cancelled = true;
      window.clearTimeout(enforceTimer);
      unregisterMusicPlay(playFromGesture);
      setMusicReady(false);
      try {
        ytRef.current?.destroy();
      } catch {
        /* ignore */
      }
      ytRef.current = null;
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [musicSrc]);

  function toggle() {
    if (modeRef.current === "youtube") {
      const yt = ytRef.current;
      if (!yt) return;
      if (playing) {
        yt.pauseVideo();
        setPlaying(false);
      } else {
        enforceStartRef.current = true;
        startYtFromOneMinute(yt);
        setPlaying(true);
      }
      return;
    }

    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      if (
        Number.isFinite(audio.duration) &&
        audio.duration > MUSIC_START_SECONDS + 5
      ) {
        audio.currentTime = MUSIC_START_SECONDS;
      }
      void audio.play().then(() => setPlaying(true));
    }
  }

  return (
    <>
      {showYt && (
        <div
          ref={ytMountRef}
          aria-hidden="true"
          className="pointer-events-none fixed bottom-4 left-4 z-[60] overflow-hidden"
          style={{ width: 320, height: 180, opacity: 0.01 }}
        />
      )}

      {ready && (
        <button
          type="button"
          onClick={toggle}
          className="safe-fixed-br fixed z-[70] inline-flex h-11 w-11 items-center justify-center border border-[var(--line)] bg-[rgba(5,7,12,0.92)] text-[var(--neon)] shadow-[0_0_24px_rgba(0,180,255,0.3)] backdrop-blur-md sm:h-12 sm:w-12"
          aria-label={playing ? "Mute music" : "Play music"}
          title={playing ? "Mute music" : "Play music"}
        >
          {playing ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      )}
    </>
  );
}
