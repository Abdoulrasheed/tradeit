import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from "react-native";
import Carousel from "react-native-snap-carousel";
import { Image } from "react-native-expo-image-cache";

import colors from "../config/colors";
import ContactSellerForm from "../components/ContactSellerForm";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import thousandSep from "../utility/number";
import listingApi from "../api/listings"
import cartApi from "../api/cart"
import useAuth from "../auth/useAuth";
import { isLiked } from "../utility/shortcuts";

const dim = Dimensions.get("window");

function ListingDetailsScreen({ route }) {
  const listing = route.params;
  
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(listing.likes);
  const { user } = useAuth()

  const full = {
    height: dim.height,
    width: dim.width,
    alignItems: 'stretch',
  }

  const [fullscreen, setFullscreen] = useState(null);

  useEffect(() => {
    const l = isLiked(listing.id, user.profile.likedListings)
    setLiked(l)
  }, []);

  const handleLike = async () => {
    const like = liked ? -1 : 1
    setLiked(!liked)
    const newLikes = await listingApi.likeListing(listing.id, like, user.profile.id)
    setLikes(newLikes)
  }

  const handleCart = async () => {
    const cart = await cartApi.addToCart(listing.id, user.profile.id)
  }

  const iconSize = fullscreen ? 40 : 20
  const likeIcon = liked ? <Ionicons name="md-heart" size={iconSize} color={colors.primary} onPress={handleLike} /> :
    <Ionicons name="ios-heart-empty" size={iconSize} color={colors.primary} onPress={handleLike}  />

  
  const renderItem = ({ item, index }) => {
    return <TouchableOpacity
      style={fullscreen || {}}
      onPress={() => setFullscreen(full)}
    >
      <>
        <Image
          style={[styles.image, fullscreen && {flex: 1}]}
          preview={{ uri: item.url }}
          tint="light"
          uri={item.url}
        />
        {
          fullscreen && <View style={styles.fullscreenOptions}>
            <Ionicons
              name="ios-close-circle"
              size={40}
              color={colors.light}
              style={styles.icon}
              onPress={() => setFullscreen(null)}
            />
            {likeIcon}
          </View>
        }
      </>
    </TouchableOpacity>
  };

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <Carousel
        autoplay={true}
        autoplayDelay={1000}
        autoplayInterval={2000}
        containerStyle={styles.slider}
        data={listing.images}
        firstItem={1}
        itemWidth={dim.width}
        layout={'stack'}
        renderItem={renderItem}
        sliderWidth={dim.width}
      />
      
      <View style={styles.detailsContainer}>
        <View style={styles.detail}>
          <View>
            <Text style={styles.title}>{listing.title}</Text>
            <Text style={styles.price}>{"\u20A6 " + thousandSep(listing.price)}</Text>
          </View>
          <View style={styles.cartContainer}>
            <Ionicons name="ios-cart" size={20} color={colors.primary} onPress={handleCart} />
            <Text style={styles.iconText}>Add to cart</Text>
          </View>
          <TouchableOpacity onPress={handleLike}>
            <View style={styles.likesContainer}>
              {likeIcon}
              <Text style={styles.likes}>{likes}</Text>
            </View>
            <Text style={styles.iconText}>{liked ? "Unlike" : "Like"}</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.userContainer}>
          <ListItem
            image={require("../assets/mosh.jpg")}
            title="Mosh Hamedani"
            subTitle="5 Listings"
          />
        </View>
        <ContactSellerForm listing={listing} />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  iconText: {
    fontSize: 10
  },
  cartContainer: {
    alignItems: "center"
  },
  detailsContainer: {
    padding: 20,
  },
  detail: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  image: {
    width: "100%",
    height: 300,
  },
  fullscreenOptions: {
    bottom: 200,
    flexDirection: "row",
    justifyContent: "center",
    position: "absolute",
    width: dim.width
  },
  icon: {
    marginHorizontal: 10
  },
  likesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: 50
  },
  likes: {
    fontSize: 12,
    marginTop: 2,
    marginRight: 10,
    marginLeft: 5,
    color: colors.medium,
  },
  price: {
    color: colors.dark,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  slider: {
    marginTop: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    flexWrap: 'wrap',
    width: 200
  },
  userContainer: {
    marginVertical: 40,
  },
});

export default ListingDetailsScreen;
