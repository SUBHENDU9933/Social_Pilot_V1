export type PlatformKey =
  | "facebook"
  | "instagram"
  | "linkedin"
  | "pinterest"
  | "google_business"
  | "youtube"
  | "twitter";

export const PLATFORMS: Record<
  PlatformKey,
  {
    label: string;
    color: string;
    bg: string;
    icon: string;
    charLimit: number;
    supportsImage: boolean;
    supportsVideo: boolean;
    mock: boolean;
  }
> = {
  facebook: {
    label: "Facebook",
    color: "#1877F2",
    bg: "rgba(24,119,242,0.12)",
    icon: "facebook",
    charLimit: 63206,
    supportsImage: true,
    supportsVideo: true,
    mock: false,
  },
  instagram: {
    label: "Instagram",
    color: "#E4405F",
    bg: "rgba(228,64,95,0.12)",
    icon: "instagram",
    charLimit: 2200,
    supportsImage: true,
    supportsVideo: true,
    mock: false,
  },
  linkedin: {
    label: "LinkedIn",
    color: "#0A66C2",
    bg: "rgba(10,102,194,0.12)",
    icon: "linkedin",
    charLimit: 3000,
    supportsImage: true,
    supportsVideo: true,
    mock: true,
  },
  pinterest: {
    label: "Pinterest",
    color: "#E60023",
    bg: "rgba(230,0,35,0.12)",
    icon: "image",
    charLimit: 500,
    supportsImage: true,
    supportsVideo: true,
    mock: true,
  },
  google_business: {
    label: "Google Business",
    color: "#4285F4",
    bg: "rgba(66,133,244,0.12)",
    icon: "store",
    charLimit: 1500,
    supportsImage: true,
    supportsVideo: false,
    mock: true,
  },
  youtube: {
    label: "YouTube",
    color: "#FF0000",
    bg: "rgba(255,0,0,0.12)",
    icon: "youtube",
    charLimit: 5000,
    supportsImage: false,
    supportsVideo: true,
    mock: true,
  },
  twitter: {
    label: "X / Twitter",
    color: "#0F1419",
    bg: "rgba(15,20,25,0.12)",
    icon: "twitter",
    charLimit: 280,
    supportsImage: true,
    supportsVideo: true,
    mock: true,
  },
};

export const PLATFORM_KEYS = Object.keys(PLATFORMS) as PlatformKey[];
