import React from "react";
import { Image, useWindowDimensions } from "react-native";

type Props = {
  size?: number;
};

export default function BusinessImage({ size }: Props) {
  const { width } = useWindowDimensions();
  const imageSize = size ?? Math.min(width / 1.5, 400);
  //require is needed because when the app gets bundled only the files that have require would be included.
  return (
    <Image
      source={require("@/assets/leaf-icon.png")}
      style={{ width: imageSize, height: imageSize }}
    />
  );
}
