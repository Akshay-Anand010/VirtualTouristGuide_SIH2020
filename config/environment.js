var environments = {
  staging: {
    FIREBASE_API_KEY: "AIzaSyAhXj-CGExnz3cIk-MZ65FkbcDA8VdcXZ8",
    FIREBASE_AUTH_DOMAIN: "sih2020-cad27.firebaseapp.com",
    FIREBASE_DATABASE_URL: "https://sih2020-cad27.firebaseio.com",
    FIREBASE_PROJECT_ID: "sih2020-cad27",
    FIREBASE_STORAGE_BUCKET: "sih2020-cad27.appspot.com",
    FIREBASE_MESSAGING_SENDER_ID: "132030559274",
    GOOGLE_CLOUD_VISION_API_KEY: "AIzaSyBSX6fMXZO2dEnsZmwMaK05_S-SrOQO-Ho",
  },
  production: {
    // Warning: This file still gets included in your native binary and is not a secure way to store secrets if you build for the app stores. Details: https://github.com/expo/expo/issues/83
  },
};

function getReleaseChannel() {
  let releaseChannel = Expo.Constants.manifest.releaseChannel;
  if (releaseChannel === undefined) {
    return "staging";
  } else if (releaseChannel === "staging") {
    return "staging";
  } else {
    return "staging";
  }
}
function getEnvironment(env) {
  console.log("Release Channel: ", getReleaseChannel());
  return environments[env];
}
var Environment = getEnvironment(getReleaseChannel());
export default Environment;
