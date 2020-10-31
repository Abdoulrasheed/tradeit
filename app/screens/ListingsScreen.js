import React, { useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import Carousel from "react-native-snap-carousel";

import ActivityIndicator from "../components/ActivityIndicator";
import Button from "../components/Button";
import Card from "../components/Card";
import colors from "../config/colors";
import listingsApi from "../api/listings";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import Text from "../components/Text";
import useApi from "../hooks/useApi";
import { Dimensions } from "react-native";
import SliderEntry from "../components/SlideItem";

const windowWidth = Dimensions.get("window").width;

function ListingsScreen({ navigation }) {
  const getListingsApi = useApi(listingsApi.getListings);

  useEffect(() => {
    getListingsApi.request();
  }, []);

  const renderItem = ({ item, index }) => {
    return (
      <View style={styles.slide}>
        <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
      </View>
    );
  };

  return (
    <>
      <ActivityIndicator visible={getListingsApi.loading} />
      <Screen style={styles.screen}>
        {getListingsApi.error && (
          <>
            <Text>Couldn't retrieve the listings.</Text>
            <Button title="Retry" onPress={getListingsApi.request} />
          </>
        )}

        {/* <Carousel
          data={getListingsApi.data}
          renderItem={renderItem}
          sliderWidth={50}
          itemWidth={150}
        /> */}

        <FlatList
          contentContainerStyle={styles.cardContainer}
          data={getListingsApi.data}
          keyExtractor={(listing) => listing.id.toString()}
          numColumns={2}
          renderItem={({ item }) => (
            <Card
              title={item.title}
              subTitle={"$" + item.price}
              style={styles.card}
              imageUrl={item.images[0].url}
              onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
              thumbnailUrl={item.images[0].thumbnailUrl}
            />
          )}
        />
      </Screen>
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    padding: 5,
    marginHorizontal: 5,
  },
  card: {
    width: windowWidth / 2.2,
    marginHorizontal: 4,
  },
  screen: {
    backgroundColor: colors.light,
  },
});

export default ListingsScreen;
