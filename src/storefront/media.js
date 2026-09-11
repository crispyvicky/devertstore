/** Normalize Next/Vite static image imports to a usable URL string. */
export function mediaUrl(src) {
  if (!src) return "";
  if (typeof src === "string") return src;
  if (typeof src === "object") {
    if (typeof src.src === "string") return src.src;
    if (typeof src.default === "string") return src.default;
    if (src.default && typeof src.default.src === "string") return src.default.src;
  }
  return "";
}
