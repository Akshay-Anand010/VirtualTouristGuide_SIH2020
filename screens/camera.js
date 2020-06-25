import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  Alert,
} from "react-native";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay";
import Constants from "expo-constants";

const cloudVisionKey = "AIzaSyBSX6fMXZO2dEnsZmwMaK05_S-SrOQO-Ho";
const cloudVision =
  "https://vision.googleapis.com/v1/images:annotate?key=" + cloudVisionKey;

export default class camera extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      captureText: null,
      showLoader: false,
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
    };
    this.toggleLoader = this.toggleLoader.bind(this);
    this.showAlert = this.showAlert.bind(this);
  }

  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === "granted",
    });
  }

  toggleLoader() {
    this.setState({
      showLoader: !this.state.showLoader,
    });
  }

  showAlert(title, message) {
    this.toggleLoader();
    setTimeout(() => {
      Alert.alert(title, message, [
        { text: "Retake", onPress: () => console.log("OK Pressed") },
      ]);
    }, 100);
  }

  _takeImage() {
    if (this.camera) {
      let _this = this;
      this.toggleLoader();
      this.camera
        .takePictureAsync({ base64: true })
        .then((data) => {
          axios
            .post(cloudVision, {
              requests: [
                {
                  image: {
                    content: data.base64,
                  },
                  features: [
                    {
                      type: "TEXT_DETECTION",
                      maxResults: 5,
                    },
                  ],
                },
              ],
            })
            .then(function (response) {
              if (response.data.responses[0].textAnnotations == undefined) {
                _this.showAlert(
                  "Notice",
                  "There is no character on image or you need to take photo more clearly"
                );
              } else {
                let textAnnotations =
                  response.data.responses[0].textAnnotations[0];
                let textContent = textAnnotations.description;
                _this.showAlert("Success", textContent);
              }
            })
            .catch(function (error) {
              _this.showAlert(
                "Error",
                "Error occured!. It's related with OCR or Network connection problem. Please check and try it again"
              );
            });
        })
        .catch((err) => console.error(err));
    }
  }

  render() {
    const { hasCameraPermission, showLoader } = this.state;
    if (hasCameraPermission === null) {
      return <View />;
    } else if (hasCameraPermission === false) {
      return <Text>No access to Camera</Text>;
    } else {
      return (
        <View style={styles.container}>
          <Camera
            ref={(ref) => {
              this.camera = ref;
            }}
            style={styles.camera}
            type={this.state.type}
          >
            <Spinner visible={showLoader} />
            <Image source={require("../assets/mask.png")} style={styles.mask} />
            <View style={styles.bottom}>
              <TouchableOpacity onPress={this._takeImage.bind(this)}>
                <Image
                  source={require("../assets/take.png")}
                  style={styles.take}
                />
              </TouchableOpacity>
              <View style={styles.rebase}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back,
                    });
                  }}
                >
                  <Image
                    source={require("../assets/cycle.png")}
                    style={styles.rebaseImage}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </Camera>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  camera: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  mask: {
    width: Dimensions.get("window").width - 50,
    height: Dimensions.get("window").width - 50,
  },
  bottom: {
    width: Dimensions.get("window").width,
    position: "absolute",
    flexDirection: "row",
    bottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  take: {
    width: 80,
    height: 80,
  },
  rebase: {
    position: "absolute",
    right: 10,
    // marginRight: 10,
  },
  rebaseImage: {
    width: 40,
    resizeMode: "contain",
  },
});
