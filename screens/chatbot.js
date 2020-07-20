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
    message: "hello, May I know your name",
    trigger: "2",
  },
  {
    id: "2",
    user: true,
    trigger: "3",
  },
  {
    id: "3",
    message: "hello {previousValue},Glad to know!!",
    trigger: "4",
  },
  {
    id: "4",
    message: "How many days are you planning to spend time in goa?",
    trigger: "5",
  },
  {
    id: "5",
    options: [
      { value: "2-3", label: "2-3", trigger: "6" },
      { value: "4-5", label: "4-5", trigger: "7" },
      { value: "week", label: "week", trigger: "8" },
    ],
  },
  //places
  {
    id: "6",
    message: "The best places that can be covered in 2 to 3 days in Goa are:",
    trigger: "9",
  },
  {
    id: "9",
    message:
      "1.Baga Beach, 2.Fort Aguada, 3.Reis Magos Fort, 4.Anjuna Beach, 5.Basilica of Bom Jesus, 6.Se Cathedral",
    trigger: "12",
  },
  {
    id: "7",
    message: "The best places that can be covered in 4 to 5 days in Goa are:",
    trigger: "10",
  },
  {
    id: "10",
    message:
      "1.Anjuna Beach, 2.Fort Aguada, 3.Baga Beach, 4.Dudhdagar waterfalls, 5.Basilica of Bom Jesus, 6.Se Cathedral, 7.Casino pride, 8.Candolim Beach, 9.Palolem Beach, 10.Mangeshi Temple, 11.Alex Church, 12.Colva Beach",
    trigger: "12",
  },
  {
    id: "8",
    message: "The best places that can be covered over a week in Goa are:",
    trigger: "11",
  },
  {
    id: "11",
    message:
      "1.Anjuna Beach, 2.Fort Aguada, 3.Baga Beach, 4.Dudhdagar waterfalls, 5.Basilica of Bom Jesus, 6.Se Cathedral, 7.Casino pride, 8.Candolim Beach, 9.Museum of christian Art, 10.Mangeshi Temple, 11.Houses of Goa Museum, 12.Colva Beach, 13.Palolem Beach, 14.Alex Church, 15.Big Foot Museum, 16.Galgibaga beach",
    trigger: "12",
  },
  {
    id: "12",
    message: "How may I help you!",
    trigger: "13",
  },
  {
    id: "13",
    options: [
      { value: "food", label: "Food", trigger: "14" },
      { value: "Hotels", label: "Hotels", trigger: "15" },
      { value: "others", label: "others", trigger: "others" },
    ],
  },
  //restaurants
  {
    id: "14",
    message: "1.A Reverie (098231 74927)",
    trigger: "16",
  },
  {
    id: "16",
    component: (
      <Image
        style={{ width: 300, height: 300 }}
        source={{
          uri:
            "https://im.whatshot.in/venue/2015/Dec/1450856156-6a094add-60b4-4cb6-8b59-b402c2e58ebf.jpg",
        }}
      />
    ),
    trigger: "17",
  },
  {
    id: "17",
    message: "2.La Plage (099906 68989)",
    trigger: "18",
  },
  {
    id: "18",
    component: (
      <Image
        style={{ width: 300, height: 300 }}
        source={{
          uri:
            "https://media-cdn.tripadvisor.com/media/photo-s/16/1e/33/dc/our-beach-club.jpg",
        }}
      />
    ),
    trigger: "19",
  },
  {
    id: "19",
    message: "3.Waterfront Terrace And Bar – The Marriott (0832 246 3333)",
    trigger: "20",
  },
  {
    id: "20",
    component: (
      <Image
        style={{ width: 300, height: 300 }}
        source={{
          uri: "https://img4.nbstatic.in/tr:w-500/56cc2ac80b04511bf2638c03.jpg",
        }}
      />
    ),
    trigger: "12",
  },
  //hotels
  {
    id: "15",
    options: [
      { value: "5-star", label: "5-star", trigger: "21" },
      { value: "3-star", label: "3-star", trigger: "22" },
      { value: "regular", label: "regular", trigger: "regular" },
    ],
  },
  // 5-star hotels
  {
    id: "21",
    message: "1.Doubletree by hilton goa - panaji (0832 249 1900)",
    trigger: "23",
  },
  {
    id: "23",
    component: (
      <Image
        style={{ width: 300, height: 300 }}
        source={{
          uri:
            "https://r-cf.bstatic.com/images/hotel/max1024x768/221/22106167.jpg",
        }}
      />
    ),
    trigger: "24",
  },
  {
    id: "24",
    message: "2.Grand Hyatt Goa (0832 664 1234)",
    trigger: "25",
  },
  {
    id: "25",
    component: (
      <Image
        style={{ width: 300, height: 300 }}
        source={{
          uri:
            "https://assets.hyatt.com/content/dam/hyatt/hyattdam/images/2015/04/27/1126/Grand-Hyatt-Goa-P348-Aerial-Overview-Outdoor-Pool.jpg/Grand-Hyatt-Goa-P348-Aerial-Overview-Outdoor-Pool.16x9.jpg",
        }}
      />
    ),
    trigger: "26",
  },
  {
    id: "26",
    message: "Would you like to explore more on Hotels",
    trigger: "27",
  },
  {
    id: "27",
    options: [
      { value: "yes", label: "yes", trigger: "15" },
      { value: "no", label: "no", trigger: "13" },
    ],
  },
  //3-star hotels
  {
    id: "22",
    message: "1.Ginger Goa (0832 664 3333)",
    trigger: "28",
  },
  {
    id: "28",
    component: (
      <Image
        style={{ width: 300, height: 300 }}
        source={{
          uri:
            "https://r2imghtlak.mmtcdn.com/r2-mmt-htl-image/htl-imgs/201803011440148714-549f995e3e6c11ea9d1e0242ac110003.jpg?&output-quality=75&downsize=520:350&crop=520:350;51,0&output-format=jpg",
        }}
      />
    ),
    trigger: "29",
  },
  {
    id: "29",
    message: "2.Pinto Rosario Square Resort and Spa (077760 55552)",
    trigger: "30",
  },
  {
    id: "30",
    component: (
      <Image
        style={{ width: 300, height: 300 }}
        source={{
          uri:
            "https://r-cf.bstatic.com/images/hotel/max1280x900/108/108026316.jpg",
        }}
      />
    ),
    trigger: "26",
  },
  //Regular hotels
  {
    id: "regular",
    message: "1.Old Goa Residency (0832 228 5327)",
    trigger: "31",
  },
  {
    id: "31",
    component: (
      <Image
        style={{ width: 300, height: 300 }}
        source={{
          uri:
            "https://r1imghtlak.mmtcdn.com/08s5jvu5bh1916gfo4lsottr0073.jpg?&output-quality=75&downsize=520:350&crop=520:350;51,0&output-format=jpg",
        }}
      />
    ),
    trigger: "32",
  },
  {
    id: "32",
    message: "2.Urja Resort (091582 16661)",
    trigger: "33",
  },
  {
    id: "33",
    component: (
      <Image
        style={{ width: 300, height: 300 }}
        source={{
          uri:
            "https://media-cdn.tripadvisor.com/media/photo-s/13/da/ac/01/urja-resorts.jpg",
        }}
      />
    ),
    trigger: "34",
  },
  {
    id: "34",
    message: "3.vinsons cottages (098228 96802)",
    trigger: "35",
  },
  {
    id: "35",
    component: (
      <Image
        style={{ width: 300, height: 300 }}
        source={{
          uri:
            "https://q-xx.bstatic.com/xdata/images/hotel/840x460/257228591.jpg?k=07fa8353491e4dfc7660acef934be2a40f985445d4be1b26094bc48db71146bd&o=",
        }}
      />
    ),
    trigger: "12",
  },
  //others
  {
    id: "others",
    options: [
      { value: "Shopping", label: "Shopping", trigger: "36" },
      { value: "hiring vehicles", label: "hiring vehicles", trigger: "37" },
      { value: "Guides", label: "Guides", trigger: "38" },
    ],
  },
  //Shopping
  {
    id: "36",
    message: "1.Flea market at Anjuna Beach",
    trigger: "39",
  },
  {
    id: "39",
    component: (
      <Image
        style={{ width: 300, height: 300 }}
        source={{
          uri:
            "https://static-blog.treebo.com/wp-content/uploads/2018/06/The-Anjuna-flea-market-1-1.jpg",
        }}
      />
    ),
    trigger: "40",
  },
  {
    id: "40",
    message: "2.Night market at Arpora",
    trigger: "41",
  },
  {
    id: "41",
    component: (
      <Image
        style={{ width: 300, height: 300 }}
        source={{
          uri:
            "https://static-blog.treebo.com/wp-content/uploads/2018/06/The-Arpora-night-market-.jpg",
        }}
      />
    ),
    trigger: "42",
  },
  {
    id: "42",
    message: "3.Mackie’s Night Bazaar",
    trigger: "43",
  },
  {
    id: "43",
    component: (
      <Image
        style={{ width: 300, height: 300 }}
        source={{
          uri:
            "https://static-blog.treebo.com/wp-content/uploads/2018/06/Mackie%E2%80%99s-Night-Bazaar.jpg",
        }}
      />
    ),
    trigger: "13",
  },
  //hiring vehicles
  {
    id: "37",
    message: "1.GOGOA Carrentals (9923 668 188)",
    trigger: "44",
  },
  {
    id: "44",
    message: "https://gogoacarrentals.com/self-drive-car-rental-goa/",
    trigger: "45",
  },
  {
    id: "45",
    message: "2.URBAN DRIVE (9773 881 881)",
    trigger: "46",
  },
  {
    id: "46",
    message: "https://www.urbandrive.co.in/bikerental/goa",
    trigger: "13",
  },
  //guides
  {
    id: "38",
    message: "1.Thrillophilia (80470 96516)",
    trigger: "47",
  },
  {
    id: "47",
    message: "https://www.thrillophilia.com/tours/hire-a-guide-in-goa",
    trigger: "48",
  },
  {
    id: "48",
    message: "2.Soul Travelling (73783 01863)",
    trigger: "49",
  },
  {
    id: "49",
    message: "https://www.soultravelling.in/",
    trigger: "50",
  },
  {
    id: "50",
    message: "Would You like to explore more",
    trigger: "51",
  },
  {
    id: "51",
    options: [
      { value: "yes", label: "yes", trigger: "12" },
      { value: "no", label: "no", trigger: "52" },
    ],
  },
  {
    id: "52",
    message: "Have a great day!",
    trigger: "53",
  },
  {
    id: "53",
    message: "Thanks for using Virtual Tourist Guide!!",
    end: true,
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
