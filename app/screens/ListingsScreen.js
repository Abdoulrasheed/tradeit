import React, { useEffect, useRef, useState } from "react";
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
import useListing from "../auth/useListing";
import useAuth from "../auth/useAuth";
import { isLiked } from "../utility/shortcuts"
import PermissionModal from "../components/PermissionModal";
import { showToast } from "../utility/toast";
import storage from "../api/storage";

const windowWidth = Dimensions.get("window").width;

const MINIMUM_RANGE = 5000 // 5KM
const MAXIMUM_RANGE = 100000 // 100KM

function ListingsScreen({ navigation }) {
  const [activeSlide, setActiveSlide] = useState(1);
  const [refreshing, setRefreshing] = useState();
  const [modalVisible, setmodalVisible] = useState(false);
  const [permission, askForPermission] = usePermissions(Permissions.LOCATION);
  const [meters, setMeters] = useState(10000);
  const [location, setLocation] = useState();
  const [requestOpenLocation, setRequestOpenLocation] = useState(false);
  const sliderRef = useRef()
  const { api } = useListing()
  const { user } = useAuth()

  useEffect(() => {
    if (!permission || permission.status !== 'granted') {
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

  const handleSliderRelease = async () => {
    setRefreshing(true)
    await api.refresh(location, meters[0])
    setRefreshing(false)
  }

  const recheckLocationService = async () => {
    const locEnabled = await Location.hasServicesEnabledAsync()
    setRequestOpenLocation(!locEnabled)
    if (!locEnabled) {
      showToast("Please turn on location")
    } else {
      const {
        coords: { latitude, longitude },
      } = await Location.getLastKnownPositionAsync();
      setLocation({ latitude, longitude })
      storage.set("location", { latitude, longitude })
      handleSliderRelease()
    }
  }

  const renderItem = ({ item }) => {
    return <CarouselItem
      item={item}
      onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
    />;
  };

  const handleLoadMore = () => {
    if (api.nextToken)
      api.loadMore(api.nextToken, location, meters[0])
  }

  const handleRefresh = async () => {
    setRefreshing(true)
    await api.refresh(location, meters[0])
    setRefreshing(false)
  }

  const carousel = <View style={styles.carouselContainer}>
    <Carousel
      autoplay={true}
      autoplayDelay={3000}
      autoplayInterval={3000}
      loop
      containerStyle={styles.slider}
      data={api.listings.slice(0, 8)}
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
      dotsLength={api.listings.slice(0, 8).length}
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
    <>
      <ActivityIndicator visible={api.loading} />
      <Screen style={styles.screen}>
        {api.error && (
          <>
            <Text style={styles.errorText}>Couldn't retrieve the listings.</Text>
            <Button title="Retry" onPress={api.refresh} />
          </>
        )}
        {api.listings.length == 0 && <Text
          style={styles.errorText}>loading nearest listings</Text>
        }
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
            onSlidingComplete={handleSliderRelease}
          />
        </View>
        
        <FlatList
          contentContainerStyle={styles.cardContainer}
          data={api.listings}
          keyExtractor={(listing) => listing.id.toString()}
          ListHeaderComponent={carousel}
          ListFooterComponent={api.loadingMore && <Loader color={colors.light} count={10} size={60} />}
          ListFooterComponentStyle={styles.cardsFooter}
          numColumns={2}
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
          refreshControl={
            <RefreshControl
              colors={[colors.primary, colors.secondary, "blue"]}
              refreshing={refreshing}
              onRefresh={handleRefresh}
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
              liked={isLiked(item.id, user.profile.likedListings)}
            />
          )}
        />
      </Screen>
      
      <PermissionModal
        buttonText={modalVisible ? "ALLOW" : requestOpenLocation ? "I'M DONE" : ""}
        description={
          modalVisible ? "Tradeit would like to use your device location in order to show nearby listings." :
            requestOpenLocation ? "Your location service is turned off, please turn it on" : false}
        onPress={modalVisible ? requestPermission : requestOpenLocation ? recheckLocationService : {}}
        visible={modalVisible || requestOpenLocation}
      />
    </>
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
  locationDetail: {
    flexDirection: "row",
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
