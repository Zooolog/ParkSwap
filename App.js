import { Text, View, Dimensions, Pressable, Linking } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useState, useEffect } from "react";
import * as Location from "expo-location";

const parkingSpot = { longitude: 19.924544, latitude: 50.047683 };

export default function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  console.log(location);

  return (
    <>
      <MapView
        style={{
          width: Dimensions.get("window").width,
          height: Dimensions.get("window").height - 100,
        }}
      >
        <Marker
          coordinate={{
            ...(location && location.coords ? location.coords : {}),
          }}
        >
          <View
            style={{
              color: "black",
              backgroundColor: "white",
              padding: 10,
              borderRadius: 16,
              borderWidth: 4,
              borderColor: "green",
            }}
          >
            <Text>you</Text>
          </View>
        </Marker>
        <Marker coordinate={parkingSpot}>
          <View
            style={{
              color: "black",
              backgroundColor: "white",
              padding: 10,
              borderRadius: 16,
              borderWidth: 4,
              borderColor: "green",
            }}
          >
            <Text>Parking spot</Text>
          </View>
        </Marker>
      </MapView>
      <Pressable
        style={{
          position: "absolute",
          bottom: 20,
          height: 80,
          width: Dimensions.get("window").width,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => {
          const scheme = Platform.select({
            ios: "maps:0,0?q=",
            android: "geo:0,0?q=",
          });
          const latLng = `${parkingSpot.latitude},${parkingSpot.longitude}`;
          const label = "Your parking spot";
          const url = Platform.select({
            ios: `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label})`,
          });
          Linking.openURL(url);
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 24,
          }}
        >
          Navigate using Maps
        </Text>
      </Pressable>
    </>
  );
}
