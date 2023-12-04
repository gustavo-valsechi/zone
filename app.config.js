import "dotenv/config"

export default {
  "expo": {
    "name": "zone",
    "slug": "zone",
    "version": "41.0.0",
    "orientation": "portrait",
    "icon": "./src/assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./src/assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#FFFFFF"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "android": {
      "runtimeVersion": "41.0.0",
      "adaptiveIcon": {
        "foregroundImage": "./src/assets/adaptive-icon.png",
        "backgroundColor": "#4B3CA7"
      },
      "permissions": [
        "android.permission.RECORD_AUDIO",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.ACCESS_FINE_LOCATION",
        "android.permission.FOREGROUND_SERVICE"
      ]
    },
    "web": {
      "favicon": "./src/assets/favicon.png"
    },
    "plugins": [
      [
        "expo-image-picker",
        {
          "photosPermission": "The app accesses your photos to let you share them with your friends."
        }
      ],
      [
        "expo-location",
        {
          "locationAlwaysAndWhenInUsePermission": "Allow $(PRODUCT_NAME) to use your location."
        }
      ]
    ],
  }
}