import React from "react";
import { View, StyleSheet, TouchableHighlight, Image as RNImage } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Image } from "react-native-expo-image-cache";

import Text from "../Text";
import colors from "../../config/colors";

function ListItem({
  title,
  subTitle,
  likes,
  defaultPicture,
  quantity,
  image,
  IconComponent,
  onPress,
  renderRightActions,
}) {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight underlayColor={colors.light} onPress={onPress}>
        <View style={styles.container}>
          {IconComponent}
          {(image || defaultPicture) && (image ?
            <Image style={styles.image} tint="light" preview={{ uri: image }} uri={image} /> : 
            <RNImage style={styles.image} tint="light" source={defaultPicture} /> 
          )}
          <View style={styles.detailsContainer}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            {subTitle ?
              <Text style={styles.subTitle} numberOfLines={2}>
                {subTitle}
              </Text>
            : null}
            {likes && <View style={styles.textContainer}>
              <Text style={styles.smallText}>{likes} likes</Text>
              <Text style={[styles.smallText, {marginLeft: 100}]}>{quantity} in store</Text>
            </View>}
          </View>
          <MaterialCommunityIcons
            color={colors.medium}
            name="chevron-right"
            size={25}
          />
        </View>
      </TouchableHighlight>
    </Swipeable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 15,
    backgroundColor: colors.white,
  },
  detailsContainer: {
    flex: 1,
    marginLeft: 10,
    justifyContent: "center",
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  smallText: {
    fontSize: 12,
    color: colors.primary
  },
  subTitle: {
    color: colors.medium,
  },
  title: {
    fontWeight: "500",
  },
  textContainer: {
    flexDirection: "row",
  }
});

export default ListItem;
