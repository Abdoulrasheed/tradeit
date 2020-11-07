import React, { useEffect, useState, useContext } from "react";
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { Dimensions } from "react-native";
import Card from "../components/Card";
import Carousel from "react-native-snap-carousel";
import { Image } from "react-native-expo-image-cache";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

import colors from "../config/colors";
import ContactSellerForm from "../components/ContactSellerForm";
import ListItem from "../components/lists/ListItem";
import Text from "../components/Text";
import thousandSep from "../utility/number";
import listingApi from "../api/listings"
import cartApi from "../api/cart"
import useAuth from "../auth/useAuth";
import { isLiked, isInCart } from "../utility/shortcuts";
import { showToast } from "../utility/toast";
import routes from "../navigation/routes";
import { ListingContext } from "../auth/context";
import { SET_CART_ITEMS, SET_LIKED_LISTINGS } from "../state/actions";
import MAP_STYLE from "../config/map";

const dim = Dimensions.get("window");

function ListingDetailsScreen({ navigation, route }) {
  const listing = route.params;
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(listing.likes);
  const [inCart, setInCart] = useState(false);
  const { user, logIn: updateProfile } = useAuth()
  const [state, dispatch] = useContext(ListingContext);

  const full = {
    height: dim.height,
    width: dim.width,
    alignItems: 'stretch',
  }

  const [fullscreen, setFullscreen] = useState(null);

  useEffect(() => {
    const like = isLiked(listing.id, state.likedListings)
    const cart = isInCart(listing.id, state.carts)
    setLiked(like)
    setInCart(cart)
  }, []);

  const handleLike = async () => {
    const like = liked ? -1 : 1
    setLiked(!liked)
    liked ? setLikes(likes - 1) : setLikes(likes + 1)
    const data = await listingApi.likeListing(listing.id, like, user.profile.id)
    setLikes(data.likes)

    dispatch({ type: SET_LIKED_LISTINGS, payload: data.likedListings });
  }

  const handleCart = async () => {
    setInCart(true)
    showToast("Successfully added to cart")
    
    const carts = await cartApi.addToCart(listing.id, user.profile.id)
    dispatch({type: SET_CART_ITEMS, payload: carts})
  }

  const getOwnerItems = () => {
    if (listing.owner) {
      const listings = state.listings.filter((item) => item.owner.id === listing.owner.id)
      return listings.filter((item) => item.id !== listing.id)
    }

    return []
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

  const header = <View>
    <Carousel
      autoplay={true}
      autoplayDelay={3000}
      autoplayInterval={2500}
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
          <View style={styles.subDetail}>
            <MaterialCommunityIcons name="store" size={24} color={colors.primary} />
            <Text style={styles.quantity}>{listing.quantity} in store</Text>
          </View>
        </View>
        <View style={styles.cartContainer}>
          {
            inCart ? <Ionicons
            name="md-checkmark-circle"
            size={20}
            color={colors.secondary}
          />:  <Ionicons
            name="ios-cart"
            size={20}
            color={colors.primary}
            onPress={handleCart}
          />
          }
          <Text style={styles.iconText}>{inCart ? "Added" : "Add to cart"}</Text>
        </View>
        <TouchableOpacity onPress={handleLike}>
          <View style={styles.likesContainer}>
            {likeIcon}
            <Text style={styles.likes}>{likes}</Text>
          </View>
          <Text style={styles.iconText}>{liked ? "Unlike" : "Like"}</Text>
        </TouchableOpacity>
      </View>
    </View>
    <View style={styles.userContainer}>
      <ListItem
        image={user.profile.picture}
        defaultPicture={require("../assets/person.jpg")}
        title={user.profile.fullname}
        subTitle={`${user.profile.listings.items.length} Listing(s)`}
      />
    </View>
    <View>
      <Text style={styles.mapText}>Item Location</Text>
      <MapView
        customMapStyle={MAP_STYLE}
        style={{ width: dim.width, height: 200 }}
        initialRegion={{
          latitude: listing.location.lat,
          longitude: listing.location.lon,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        <Marker
          coordinate={{ latitude: listing.location.lat, longitude: listing.location.lon }}
          title="Pickup Location"
          description={`This is the location of ${listing.title}`}
          image={require('../assets/package.png')}
        />
      </MapView>
    </View>
    <ContactSellerForm listing={listing} />
    <Text style={styles.otherListings}>Other listings from {user.profile.fullname} </Text>
  </View>

  return (
    <KeyboardAvoidingView
      behavior="position"
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
    >
      <FlatList
        contentContainerStyle={styles.cardContainer}
        data={getOwnerItems()}
        keyExtractor={(listing) => listing.id.toString()}
        ListHeaderComponent={header}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"\u20A6 " + item.price}
            style={styles.card}
            image={item.images[0].url}
            thumb={item.images[0].url}
            onPress={() => navigation.push(routes.LISTING_DETAILS, item)}
            likes={item.likes}
            listingID={item.id}
            profileID={user.profile.id}
            liked={isLiked(item.id, user.profile.likedListings)}
          />
        )}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  iconText: {
    fontSize: 10
  },
  cartContainer: {
    alignItems: "center",
  },
  card: {
    alignSelf: "center",
    width: dim.width - 20,
  },
  cardContainer: {
    padding: 5,
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
  mapText: {
    fontWeight: "bold",
    marginLeft: 10
  },
  otherListings: {
    fontSize: 15,
    fontWeight: "bold",
    margin: 10
  },
  price: {
    color: colors.primary,
    fontWeight: "bold",
    fontSize: 20,
    marginVertical: 10,
  },
  slider: {
    marginTop: 15,
  },
  subDetail: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: -2,
  },
  title: {
    fontSize: 24,
    fontWeight: "500",
    flexWrap: 'wrap',
    width: 200
  },
  userContainer: {
    marginVertical: 10,
  },
  quantity: {
    fontSize: 13,
    textAlign: "center",
    marginLeft: 5
  }
});

export default ListingDetailsScreen;
