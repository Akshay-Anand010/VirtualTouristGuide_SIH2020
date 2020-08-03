import React, { Component } from "react";
import { WebView } from "react-native-webview";

export default class MyWeb extends Component {
  render() {
    return (
      <WebView
        source={{
          uri: "https://sruja08.github.io/useful_tips_goa/tips.html",
        }}
        style={{ marginTop: 20 }}
      />
    );
  }
}
