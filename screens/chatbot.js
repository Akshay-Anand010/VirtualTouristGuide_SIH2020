import React, { Component } from "react";
import ChatBot from "react-native-chatbot-expo";
import { Button, View, Text, StyleSheet, Image } from "react-native";
class chatbot extends Component {
  render() {
    return (
      <View>
        <ChatBot steps={steps} />
      </View>
    );
  }
}
const steps = [
  {
    id: "0",
    message: "Welcome to Virtual Tourist Guide!",
    trigger: "1",
  },
  {
    id: "1",
    message: "How may I help you!",
    trigger: "2",
  },
  {
    id: "2",
    options: [
      { value: "hotel", label: "Hotel Booking!", trigger: "3" },
      { value: "place", label: "Near By Places!", trigger: "4" },
      { value: "others", label: "others  ", trigger: "5" },
    ],
  },
  {
    id: "3",
    component: (
      <Image
        style={{ width: 300, height: 300 }}
        source={{
          uri: "https://picsum.photos/300/300",
        }}
      />
    ),
    trigger: "6",
  },
  {
    id: "4",
    message: "let me check nearby places for you!",
    end: true,
  },
  {
    id: "5",
    message: "please call on our customer care number!",
    end: true,
  },
  {
    id: "6",
    user: true,
    trigger: "2",
  },
];
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // alignItems: "center",
    // justifyContent: "center",
  },
});

export default chatbot;
