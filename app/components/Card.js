import React, { useState } from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { Image } from "react-native-expo-image-cache";
import { Ionicons } from '@expo/vector-icons';
import listingApi from "../api/listings"

import Text from "./Text";
import colors from "../config/colors";
import thousandSep from "../utility/number";

function Card({
  image,
  liked: aliked,
  likes: currentLikes,
  listingID,
  onPress,
  profileID,
  subTitle,
  style,
  title,
  thumb,
 }) {
  const [liked, setLiked] = useState(aliked);
  const [likes, setLikes] = useState(currentLikes);
  
  const handleLike = async () => {
    const like = liked ? -1 : 1
    setLiked(!liked);
    const newLikes = await listingApi.likeListing(listingID, like, profileID);
    setLikes(newLikes);
  }

  const iconSize = 24
  const likeIcon = liked ? <Ionicons name="md-heart" size={iconSize} color={colors.primary} onPress={handleLike} /> :
    <Ionicons name="ios-heart-empty" size={iconSize} color={colors.primary} onPress={handleLike} />
  
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.card, style]}>
        <Image
          style={styles.image}
          tint="light"
          preview={{ uri: image }}
          uri={image}
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.title} numberOfLines={2}>
            {title}
          </Text>
          <View style={styles.cardLower}>
            <Text style={styles.subTitle} numberOfLines={2}>
              {thousandSep(subTitle)}
            </Text>
            <View style={styles.likesContainer}>
              {likeIcon}
              <Text style={styles.likes}>{likes}</Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: colors.white,
    marginBottom: 5,
    overflow: "hidden",
  },
  cardLower: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  detailsContainer: {
    padding: 20,
  },
  image: {
    width: "100%",
    minHeight: 150,
  },
  likesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 35
  },
  likes: {
    fontSize: 13,
    marginTop:2
  },
  subTitle: {
    color: colors.black,
    fontWeight: "bold",
    fontSize: 15,
  },
  title: {
    marginBottom: 5,
    fontSize: 12,
  },
});

export default Card;
