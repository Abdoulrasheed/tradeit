import React, { useContext, useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, RefreshControl, View, Alert } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { WaveIndicator as Loader } from 'react-native-indicators';
import { usePermissions } from "expo-permissions";
import * as Permissions from 'expo-permissions';
import { Slider } from "@miblanchard/react-native-slider";
import { FontAwesome5 } from '@expo/vector-icons';
import * as Location from 'expo-location';

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import Text from "../components/Text";
import { Dimensions } from "react-native";
import CarouselItem from "../components/CarouselItem";
import useAuth from "../auth/useAuth";
import { isLiked } from "../utility/shortcuts"
import PermissionModal from "../components/PermissionModal";
import { showToast } from "../utility/toast";
import storage from "../api/storage";
import { CATEGORIES } from "../utility/constants";
import Pill from "../components/Pill";
import listingsApi from "../api/listings"
import { SET_LISTINGS } from "../state/actions";
import { ListingContext } from "../auth/context";

const windowWidth = Dimensions.get("window").width;

const MINIMUM_RANGE = 5000 // 5KM
const MAXIMUM_RANGE = 100000 // 100KM

function ListingsScreen({ navigation }) {
  const [activeSlide, setActiveSlide] = useState(1);
  const [loading, setLoading] = useState();
  const [modalVisible, setmodalVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState();
  const [permission, askForPermission] = usePermissions(Permissions.LOCATION);
  const [meters, setMeters] = useState(10000);
  const [location, setLocation] = useState();
  const [requestOpenLocation, setRequestOpenLocation] = useState(false);
  const [nextToken, setNextToken] = useState();
  const [loadingMore, setLoadingMore] = useState();
  const [error, setError] = useState();
  const sliderRef = useRef()
  const { user } = useAuth()
  const [allListings, setAllListings] = useState();
  const [state, dispatch] = useContext(ListingContext);

  useEffect(() => {
    if (permission && permission.status !== 'granted') {
      setmodalVisible(true)
    } else {
      setmodalVisible(false)
      recheckLocationService()
     }
  }, [permission]);

  const requestPermission = async () => {
    askForPermission()
    if (permission.status !== 'granted') {
      const locEnabled = await Location.hasServicesEnabledAsync()
      if (!locEnabled) {
        setRequestOpenLocation(true)
      }
    }
  }

  const recheckLocationService = async () => {
    const locEnabled = await Location.hasServicesEnabledAsync()
    setRequestOpenLocation(!locEnabled)
    if (!locEnabled) {
      showToast("Please turn on location")
    } else {
      try {
        const {
          coords: { latitude, longitude },
        } = await Location.getLastKnownPositionAsync();
        setLocation({ latitude, longitude })
        storage.set("location", { latitude, longitude })
        getListings({coords: {latitude, longitude}})
      } catch (error) {
        console.log("error loc", error);
      }
    }
  }

  const loadMore = async () => {
    if (nextToken) {
      try {
        setLoadingMore(true)
        const newListings = await listingsApi.getListings({ nextToken, coords: location, meters: meters[0] })
        const lists = state.listings.concat(newListings.data.nearbyListings.items)
        setNextToken(newListings.data.nearbyListings.nextToken)

        if (activeCategory) {
          setListings(lists.filter((item) => item.categoryId == activeCategory))
        } else {
          setListings(lists)
        }
        setLoadingMore(false)
      } catch (error) {
        console.log("error loading more", error);
      }
    }
  }

  const getListings = async ({ coords }) => {
    setLoading(true)
    coords = coords || location
    if (!coords) {
      const loc = await storage.get("location")
      coords = loc.value
    }

    const meters = isNaN(meters) ? meters : meters[0]

    try {
      const listings = await listingsApi.getListings({ coords, meters })
      setNextToken(listings.data.nearbyListings.nextToken)
      setListings(listings.data.nearbyListings.items)
      setAllListings(listings.data.nearbyListings.items)
      setError(false)
    } catch (error) {
      setError(true)
      console.log("error getting listings", error);
    }
    setLoading(false)
    setLoadingMore(false)
    setActiveCategory(null)
  }

  const filterListings = (cat) => {
    if (cat) {
      setActiveCategory(cat);
      const data = allListings.filter((item) => item.categoryId == cat)
      setListings(data);
      return
    }
    setListings(allListings)
  }
  
  const renderItem = ({ item }) => {
    return <CarouselItem
      item={item}
      onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
    />;
  };

  const setListings = (data) => {
     dispatch({
      type: SET_LISTINGS,
      payload: data,
    });
  }

  const carousel = <View style={styles.carouselContainer}>
    <Carousel
      autoplay={true}
      autoplayDelay={3000}
      autoplayInterval={3000}
      loop
      containerStyle={styles.slider}
      data={state.listings.slice(0, 8)}
      firstItem={1}
      itemWidth={windowWidth}
      onSnapToItem={(index) => setActiveSlide( index) }
      renderItem={renderItem}
      ref={sliderRef}
      sliderWidth={windowWidth}
      layout={'stack'}
      layoutCardOffset={15}
    />
    <Pagination
      dotsLength={state.listings.slice(0, 8).length}
      activeDotIndex={activeSlide}
      containerStyle={styles.paginationContainer}
      dotColor={colors.light}
      dotStyle={styles.paginationDot}
      inactiveDotColor={colors.black}
      inactiveDotOpacity={0.4}
      inactiveDotScale={0.6}
      carouselRef={sliderRef}
      tappableDots={!!sliderRef}
    />
  </View>

  return (
    <Screen style={styles.screen}>
        {error && (
          <>
            <Text style={styles.errorText}>Couldn't retrieve listings.</Text>
            <Button title="Retry" onPress={getListings} />
          </>
        )}
      {loading && (
        <View style={styles.loadingMessage}>
          <Text
            style={styles.errorText}>loading listings {meters / 1000}km away from you
          </Text>
          <Loader style={styles.loadingLocation} color={colors.light} count={10} size={60} />
        </View>)}
        <View style={styles.sliderContainer}>
          <View style={styles.locationDetail}>
            <Text
              style={styles.distanceText}>
              Distance Range : {meters / 1000} km
            </Text>
          </View>
          <Slider
            minimumValue={MINIMUM_RANGE}
            maximumValue={MAXIMUM_RANGE}
            value={meters}
            trackStyle={styles.sliderTrack}
            minimumTrackTintColor="#212121"
            renderThumbComponent={()=> <FontAwesome5
              name="map-marker"
              size={25}
              color="#ffd903"
            />}
            step={100} // step by half KM
            onValueChange={(val) => setMeters(val)}
            onSlidingComplete={getListings}
          />
        </View>

        <FlatList
          contentContainerStyle={styles.categoriesContainer}
          data={CATEGORIES}
          keyExtractor={(item) => item.label}
          horizontal
          renderItem={({item}) => (
            <Pill
              item={item}
              activeItem={activeCategory}
              onPress={(val) => filterListings(val)}
            />
          )}
      />
      <FlatList
        contentContainerStyle={styles.cardContainer}
        data={state.listings}
        keyExtractor={(listing) => listing.id.toString()}
        ListHeaderComponent={carousel}
        ListFooterComponent={loadingMore && <Loader color={colors.light} count={10} size={60} />}
        ListFooterComponentStyle={styles.cardsFooter}
        ListEmptyComponent={<Text style={styles.noListingText}>No Listings found in the selected range and filter</Text>}
        numColumns={2}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
        refreshControl={
            <RefreshControl
              colors={[colors.primary, colors.secondary, "blue"]}
              refreshing={loading}
              onRefresh={() => getListings(location)}
            />
          }
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"\u20A6 " + item.price}
              style={styles.card}
              image={item.images[0].url}
              thumb={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              likes={item.likes}
              listingID={item.id}
              profileID={user.profile.id}
              liked={isLiked(item.id, state.likedListings)}
            />
          )}
        />
      <PermissionModal
        buttonText={modalVisible ? "ALLOW" : requestOpenLocation ? "I'M DONE" : ""}
        description={
          modalVisible ? "Tradeit would like to use your device location in order to show nearby listings." :
            requestOpenLocation ? "Your location service is turned off, please turn it on" : false}
        onPress={modalVisible ? requestPermission : requestOpenLocation ? recheckLocationService : {}}
        visible={modalVisible || requestOpenLocation}
      />
      </Screen>
  );
}

const styles = StyleSheet.create({
  distanceText: {
    color: colors.white,
  },
  errorText: {
    color: colors.light,
    fontSize: 14,
    fontStyle: 'italic',
    textAlign: "center",
  },
  cardContainer: {
    padding: 5,
  },
  card: {
    width: windowWidth / 2.2,
    marginHorizontal: 4,
  },
  carouselContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  cardsFooter: {
    marginBottom: 15
  },
  categoriesContainer: {
    paddingHorizontal: 5,
    height: 90,
  },
  locationDetail: {
    flexDirection: "row",
  },
  loadingMessage: {
    marginBottom: 20
  },
  loadingLocation: {
    marginTop: 30
  },
  noListingText: {
    color: colors.light,
    fontSize: 14,
    textAlign: "center",
  },
  paginationContainer: {
    paddingVertical: 5
  },
  paginationDot: {
    width: 12,
    height: 8,
    borderRadius: 4,
  },
  screen: {
    backgroundColor: colors.primary,
  },
  slider: {
    marginTop: 15,
  },
  sliderContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    marginLeft: 5,
    marginBottom: 30,
    paddingHorizontal: 33,
    width: windowWidth
  },
  sliderTrack: {
    height: 10,
    borderRadius: 4,
    backgroundColor: 'white',
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 1,
    shadowOpacity: 0.15,
  },
});

export default ListingsScreen;
