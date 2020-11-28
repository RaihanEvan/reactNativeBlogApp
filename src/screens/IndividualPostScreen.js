import React, { useState, useEffect } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import {
  Card,
  Button,
  Text,
  Avatar,
  Input,
  Header,
} from "react-native-elements";
import PostCard from "./../components/PostCard";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { AuthContext } from "../providers/AuthProvider";
import { getPosts } from "./../requests/Posts";
import { getUsers } from "./../requests/Users";
import { storeDataJSON } from "../functions/AsyncStorageFunctions";


const IndividualPostScreen = ()=>{
    const [posts, setPosts] = useState("");
    return(
        <View>
            <FlatList
              data={posts}
              renderItem={function ({ item }) {
                return (
                  <PostCard
                    author={auth.CurrentUser.name}
                    title={item.title}
                    body={auth.CurrentUser.post}
                  />
                );
              }}
            />
        </View>
    );
}
export default IndividualPostScreen;