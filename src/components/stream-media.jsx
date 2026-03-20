import { useEffect, useRef } from "react";

export function StreamMedia({
  url,
  muted = true,
  autoPlay = true,
  playsInline = true,
  audioOnly = false,
  fit = "cover",
  style = {},
  className = "",
}) {
  const mediaRef = useRef(null);

  useEffect(() => {
    const media = mediaRef.current;
    if (!media || !url) {
      return undefined;
    }

    const isHlsSource = /\.m3u8(?:$|\?)/i.test(url);
    const isTsSource = /\.ts(?:$|\?)/i.test(url) || /\/proxy\/ts\//i.test(url);
    const isNativeHlsSource = isHlsSource && media.canPlayType("application/vnd.apple.mpegurl");
    let cancelled = false;
    let hls = null;
    let mpegtsPlayer = null;

    const attemptPlayback = async () => {
      try {
        media.muted = muted;
        await media.play();
      } catch (error) {
        if (error?.name === "NotAllowedError" && !media.muted) {
          media.muted = true;
          await media.play();
          return;
        }

        throw error;
      }
    };

    async function attachPlayer() {
      if (isHlsSource) {
        if (isNativeHlsSource) {
          media.src = url;
          await attemptPlayback();
          return;
        }

        const { default: Hls } = await import("hls.js");
        if (cancelled || !Hls.isSupported()) {
          return;
        }

        hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(media);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          attemptPlayback().catch(() => {});
        });
        return;
      }

      if (isTsSource) {
        const { default: mpegts } = await import("mpegts.js");
        if (cancelled || !mpegts.getFeatureList().mseLivePlayback) {
          return;
        }

        mpegtsPlayer = mpegts.createPlayer({
          type: "mpegts",
          isLive: true,
          liveBufferLatencyChasing: true,
          liveBufferLatencyMaxLatency: 3,
          liveBufferLatencyMinRemain: 0.5,
          lazyLoad: false,
          url,
        });
        mpegtsPlayer.attachMediaElement(media);
        mpegtsPlayer.load();
        attemptPlayback().catch(() => {});
        return;
      }

      media.src = url;
      await attemptPlayback();
    }

    attachPlayer().catch(() => {});

    return () => {
      cancelled = true;
      if (hls) {
        hls.destroy();
      }
      if (mpegtsPlayer) {
        mpegtsPlayer.destroy();
      }
      media.pause();
      media.removeAttribute("src");
    };
  }, [url, muted]);

  useEffect(() => {
    const media = mediaRef.current;
    if (media) {
      media.muted = muted;
    }
  }, [muted]);

  const sharedProps = {
    ref: mediaRef,
    autoPlay,
    muted,
    playsInline,
    loop: true,
    className,
    style: audioOnly
      ? {
          position: "absolute",
          width: "1px",
          height: "1px",
          opacity: 0,
          pointerEvents: "none",
        }
      : {
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: fit,
          background: "#000000",
          ...style,
        },
  };

  return audioOnly ? <audio {...sharedProps} /> : <video {...sharedProps} />;
}
