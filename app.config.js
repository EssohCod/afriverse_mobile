import dotenv from 'dotenv';
dotenv.config();


export default {
  expo: {
    name: "Afriverse Foods",
    slug: "afriverse-foods",
    extra: {
      SHOPIFY_DOMAIN: process.env.SHOPIFY_DOMAIN,
      SHOPIFY_STOREFRONT_ACCESS_TOKEN: process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      eas: {
        projectId: "3cf5bcd9-7836-4c5c-92aa-39f4478bac87",
      },
    },
    android: {
      package: "com.afriversefoods.mobileapp",
      // versionCode: 12,
    },
    ios: {
      "infoPlist": {
      "ITSAppUsesNonExemptEncryption": false
    },
      bundleIdentifier: "com.afriversefoods.mobileapp",
      buildNumber: "1.0.0",
    },
    "plugins": ["expo-font"],
  },
};
