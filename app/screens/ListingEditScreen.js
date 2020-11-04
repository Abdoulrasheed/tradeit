import React, { useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";

import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";

import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import listingsApi from "../api/listings";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import useListing from "../auth/useListing";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(50000000).label("Price"),
  quantity: Yup.number().required().min(1).label("Quantity"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array().max(10, "You cannot add more than 10 pictures, click one to remove it").min(1, "Please select at least one image."),
});

const categories = [
  {
    backgroundColor: "#fc5c65",
    icon: "floor-lamp",
    label: "Furniture",
    value: 1,
  },
  {
    backgroundColor: "#fd9644",
    icon: "car",
    label: "Cars",
    value: 2,
  },
  {
    backgroundColor: "#fed330",
    icon: "camera",
    label: "Cameras",
    value: 3,
  },
  {
    backgroundColor: "#26de81",
    icon: "cards",
    label: "Games",
    value: 4,
  },
  {
    backgroundColor: "#2bcbba",
    icon: "shoe-heel",
    label: "Clothing",
    value: 5,
  },
  {
    backgroundColor: "#45aaf2",
    icon: "basketball",
    label: "Sports",
    value: 6,
  },
  {
    backgroundColor: "#4b7bec",
    icon: "headphones",
    label: "Movies & Music",
    value: 7,
  },
  {
    backgroundColor: "#a55eea",
    icon: "book-open-variant",
    label: "Books",
    value: 8,
  },
  {
    backgroundColor: "#778ca3",
    icon: "application",
    label: "Other",
    value: 9,
  },
];

function ListingEditScreen() {
  const location = useLocation();
  const listingApi = useApi(listingsApi.addListing)
  const [progress, setProgress] = useState(0);
  const { user } = useAuth()
  const { api } = useListing()
  
  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    await listingApi.request(
      { ...listing, userID: user.profile.id, location },
        (progress) => setProgress(progress)
      );
    resetForm();
   api.refresh()
  };

  return (
    <Screen style={styles.container}>
        <UploadScreen
          onDone={() => listingApi.setLoading(false)}
          progress={progress}
          visible={listingApi.loading}
        />
        <Form
            initialValues={{
              title: "",
              price: "",
              description: "",
              category: null,
              images: [],
              quantity: ""
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
      >
        <ScrollView>
          <FormImagePicker name="images" />
          <FormField maxLength={255} name="title" placeholder="Title" />
          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
            width="50%"
            />
          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="quantity"
            placeholder="Quantity in store"
            width="50%"
          />
          <Picker
            items={categories}
            name="category"
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Category"
            width="50%"
          />
          <FormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="Description"
          />
          </ScrollView>
          <SubmitButton title="Post" />
          </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
