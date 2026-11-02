type PlayHandler = () => boolean | void;

let playHandler: PlayHandler | null = null;
let readyHandler: ((ready: boolean) => void) | null = null;
let musicReady = false;

export function registerMusicPlay(handler: PlayHandler) {
  playHandler = handler;
}

export function unregisterMusicPlay(handler: PlayHandler) {
  if (playHandler === handler) playHandler = null;
}

export function registerMusicReady(handler: (ready: boolean) => void) {
  readyHandler = handler;
  handler(musicReady);
  return () => {
    if (readyHandler === handler) readyHandler = null;
  };
}

export function setMusicReady(ready: boolean) {
  musicReady = ready;
  readyHandler?.(ready);
}

/** Must be called synchronously inside a user click/tap handler. */
export function playMusicFromGesture() {
  return playHandler?.() ?? false;
}

export function isMusicReady() {
  return musicReady;
}
