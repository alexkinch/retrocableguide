# Mosaic Page Design

## Goal

Add a separate mosaic page that displays a 720x576 PAL-style multichannel mosaic using live Dispatcharr TS streams, without disturbing the approved retro guide page.

## Route Shape

- `/` keeps the existing retro guide
- `/mosaic` renders the new mosaic page

This will be handled with a small pathname switch in `src/main.jsx` rather than a router dependency.

## Layout

The mosaic page uses a fixed `720x576` container with:

- black background
- absolute positioning
- no scrollbars
- no decorative effects

Tile geometry:

- 12 small tiles at `180x144`
- 1 center promo tile at `360x288`

Positions:

- Row 1: `(0,0)`, `(180,0)`, `(360,0)`, `(540,0)`
- Row 2: `(0,144)`, promo at `(180,144)`, `(540,144)`
- Row 3: `(0,288)`, promo continues, `(540,288)`
- Row 4: `(0,432)`, `(180,432)`, `(360,432)`, `(540,432)`

The center tile is a duplicate promo view of one selected channel. The outer 12 tiles remain stable and do not get reflowed during rotation.

## Channel Selection

The mosaic gets its own config:

- `mosaicChannels`
- `mosaicCycleSeconds`
- `mosaicAudioUrl`

`mosaicChannels` is an ordered list of channel numbers. The page resolves these against the same normalized guide payload already used by the main guide.

## Playback

Each visible tile uses the existing stream-capable browser playback path:

- TS via `mpegts.js`
- HLS via `hls.js`
- native playback otherwise

Outer tiles:

- muted
- black on failure

Promo tile:

- visually plays the currently promoted channel
- audio is decoupled from the visible promo tile

## Audio Model

A hidden audio-capable player is used for page audio:

- if `mosaicAudioUrl` is set, use that
- otherwise, use the current promo channel stream

This allows the center tile video and page audio to diverge when needed.

## Rotation

The promo channel rotates every `mosaicCycleSeconds`, default `30`.

Rotation only changes:

- which configured channel is shown in the center promo tile
- which stream is used for fallback promo audio when `mosaicAudioUrl` is blank

The outer 12 tile positions stay fixed.

## Failure Handling

- Missing tile stream: black tile, label still visible
- Missing promo stream: black center promo tile, rotation continues
- Missing audio source: silence only
- Missing configured channel number: skipped if unavailable

## Non-Goals

- No CRT effects
- No animated tile reshuffling
- No responsive redesign
- No changes to the existing guide layout logic
