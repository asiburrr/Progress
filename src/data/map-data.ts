export interface UnseenTheme {
  id: string;
  name: string;
  bg: string;
  land: string;
  stroke: string;
  v1: string;
  v2: string;
  vStroke: string;
  ink: string;
  muted: string;
  label: string;
  halo: string;
  dot: string;
  track: string;
  glow?: string;
  chipInk?: string;
}

export const UNSEEN_THEMES: UnseenTheme[] = [
  {
    id: "emerald",
    name: "পান্না (Emerald)",
    bg: "#f6f2ea",
    land: "#e3dccd",
    stroke: "#f6f2ea",
    v1: "#0f6b4f",
    v2: "#1f9a70",
    vStroke: "#f6f2ea",
    ink: "#17201c",
    muted: "#7a7f78",
    label: "#0b3d2e",
    halo: "#f6f2ea",
    dot: "#f42a41",
    track: "#e3dccd"
  },
  {
    id: "midnight",
    name: "নীল-বেগুনি (Midnight)",
    bg: "#191835",
    land: "#2a2956",
    stroke: "#191835",
    v1: "#7876FD",
    v2: "#4DB1FF",
    vStroke: "#d9ecff",
    ink: "#ffffff",
    muted: "#9aa3b5",
    label: "#ffffff",
    halo: "#191835",
    dot: "#ffffff",
    track: "#2a2956",
    glow: "rgba(120, 118, 253, 0.55)"
  },
  {
    id: "flag",
    name: "সবুজ রাত (Green Night)",
    bg: "#141518",
    land: "#2a2c33",
    stroke: "#141518",
    v1: "#3ddc97",
    v2: "#17875a",
    vStroke: "#c9f7e2",
    ink: "#ffffff",
    muted: "#7d8290",
    label: "#ffffff",
    halo: "#141518",
    dot: "#ffffff",
    track: "#2a2c33",
    glow: "rgba(47, 190, 125, 0.45)",
    chipInk: "#062a1b"
  },
  {
    id: "sunset",
    name: "গোধূলি (Sunset)",
    bg: "#fff5ee",
    land: "#f5dfd1",
    stroke: "#fff5ee",
    v1: "#ff8a3d",
    v2: "#e63971",
    vStroke: "#fff5ee",
    ink: "#3b1f23",
    muted: "#9b7b73",
    label: "#5a1428",
    halo: "#fff5ee",
    dot: "#3b1f23",
    track: "#f5dfd1"
  },
  {
    id: "ocean",
    name: "সাগর (Ocean)",
    bg: "#eef5fb",
    land: "#d5e2ee",
    stroke: "#eef5fb",
    v1: "#2356e8",
    v2: "#12b5d4",
    vStroke: "#eef5fb",
    ink: "#0f1d33",
    muted: "#6d7f96",
    label: "#0c2a66",
    halo: "#eef5fb",
    dot: "#ff5a5f",
    track: "#d5e2ee"
  }
];

export const bnNum = (n: number | string): string => {
  return String(n).replace(/\d/g, (d) => "০১২৩৪৫৬৭৮৯"[parseInt(d)]);
};

export const bnOf = (w: string): string => {
  return /[ািীুূৃেৈোৌঁ]$/.test(w)
    ? w + "র"
    : /[ওআ]$/.test(w)
    ? w + "য়ের"
    : w + "ের";
};
