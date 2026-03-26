import React from "react";
import { Image, useWindowDimensions } from "react-native";

export default function BusinessImage() {
  const { width } = useWindowDimensions();
  const imageSize = Math.min(width / 1.5, 400);
  //require is needed because when the app gets bundled only the files that have require would be included.
  return (
    <Image
      source={require("@/assets/leaf-icon.png")}
      style={{ width: imageSize, height: imageSize }}
    />
  );
}
