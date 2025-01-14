const IS_DEV = process.env.APP_VARIANT === "development";
const IS_PREVIEW = process.env.APP_VARIANT === "preview";

const getUniqueIdentifier = () => {
  if (IS_DEV) {
    return "com.imadtg.deki.dev";
  }

  if (IS_PREVIEW) {
    return "com.imadtg.deki.preview";
  }

  return "com.imadtg.deki";
};

const getAppName = () => {
  if (IS_DEV) {
    return "Deki (Dev)";
  }

  if (IS_PREVIEW) {
    return "Deki (Preview)";
  }

  return "Deki";
};

export default {
  name: getAppName(),
  slug: "deki",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/images/icon.png",
  scheme: "myapp",
  userInterfaceStyle: "automatic",
  splash: {
    image: "./assets/images/splash.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    bundleIdentifier: getUniqueIdentifier(),
    supportsTablet: true,
  },
  android: {
    package: getUniqueIdentifier(),
    adaptiveIcon: {
      foregroundImage: "./assets/images/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
  },
  web: {
    bundler: "metro",
    output: "static",
    favicon: "./assets/images/favicon.png",
  },
  plugins: ["expo-router"],
  experiments: {
    typedRoutes: true,
  },
  extra: {
    router: {
      origin: false,
    },
    eas: {
      projectId: "25acda50-3eea-473a-94b4-4c72a9cbe86a",
    },
  },
  owner: "imadtg",
  updates: {
    url: "https://u.expo.dev/25acda50-3eea-473a-94b4-4c72a9cbe86a",
  },
  runtimeVersion: {
    policy: "appVersion",
  },
  expo: {
    android: {
      permissions: ["READ_EXTERNAL_STORAGE", "WRITE_EXTERNAL_STORAGE"],
    },
  },
};
