import { OgImage, ogContentType, ogSize } from "@/lib/og";

export const alt = "WREI Connected, a national network of women's real estate investing meetups";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return OgImage({
    kicker: "Women's real estate investing",
    title: "Local meetups. National network.",
    subtitle: "WREI Connected",
  });
}
