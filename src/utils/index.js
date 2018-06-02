import chroma from "chroma-js";

export function hslToInt(h, s, l) {
  return parseInt(
    chroma
      .hsl(h, s, l)
      .hex()
      .replace(/^#/, ""),
    16
  );
}
