import React, { useRef, useState } from "react";
import { FlatList, StyleSheet, RefreshControl, View } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { WaveIndicator as Loader } from 'react-native-indicators';


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

const windowWidth = Dimensions.get("window").width;

function ListingsScreen({ navigation }) {
  const [activeSlide, setActiveSlide] = useState(1);
  const [refreshing, setRefreshing] = useState();
  const sliderRef = useRef()
  const { api } = useListing()
  const { user, logIn: updateProfile } = useAuth()

  const renderItem = ({ item }) => {
    return <CarouselItem
      item={item}
      onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
    />;
  };

  const handleLoadMore = () => {
    if (api.nextToken)
      api.loadMore(api.nextToken)
  }

  const handleRefresh = () => {
    api.refresh()
  }

  const carousel = <View style={styles.carouselContainer}>
    <Carousel
      autoplay={true}
      autoplayDelay={8000}
      autoplayInterval={3000}
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
        {api.listings.length == 0 && <Text style={styles.errorText}>loading nearest listings</Text>}

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
              profileID={user.sub}
              liked={isLiked(item.id, user.profile.likedListings)}
            />
          )}
        />
        </Screen>
      </>
  );
}

const styles = StyleSheet.create({
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
});

export default ListingsScreen;
