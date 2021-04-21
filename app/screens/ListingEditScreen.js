import React, { useContext, useEffect, useState } from "react";
import { ScrollView, StyleSheet } from "react-native";
import * as Yup from "yup";
import { usePermissions } from "expo-permissions";
import * as Permissions from "expo-permissions";

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
import PermissionModal from "../components/PermissionModal";
import { CATEGORIES } from "../utility/constants";
import { ListingContext } from "../auth/context";
import { ADD_NEW_LISTING, UPDATE_MY_LISTINGS } from "../state/actions";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(50000000).label("Price"),
  quantity: Yup.number().required().min(1).label("Quantity"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  images: Yup.array()
    .max(10, "You cannot add more than 10 pictures, click one to remove it")
    .min(1, "Please select at least one image."),
});

const ListingEditScreen = () => {
  const location = useLocation();
  const listingApi = useApi(listingsApi.addListing);
  const [progress, setProgress] = useState(0);
  const [modalVisible, setmodalVisible] = useState(false);
  const [permission, askForPermission] = usePermissions(
    Permissions.CAMERA_ROLL
  );
  const { user } = useAuth();
  const [state, dispatch] = useContext(ListingContext);

  useEffect(() => {
    if (permission && permission.status !== "granted") {
      setmodalVisible(true);
    } else {
      setmodalVisible(false);
    }
  }, [permission]);

  const requestPermission = () => {
    askForPermission();
  };

  const handleSubmit = async (listing, { resetForm }) => {
    setProgress(0);
    const list = await listingApi.request(
      { ...listing, userID: user.profile.id, location },
      (progress) => setProgress(progress)
    );
    resetForm();
    dispatch({ type: ADD_NEW_LISTING, payload: list });
    dispatch({ type: UPDATE_MY_LISTINGS, payload: list });
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
          quantity: "",
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
            items={CATEGORIES}
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

      <PermissionModal
        description="Tradeit would like to access your gallary, click allow."
        onPress={requestPermission}
        visible={modalVisible}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
