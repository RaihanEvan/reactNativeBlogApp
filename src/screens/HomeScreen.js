import React, { useState, useEffect } from "react";
import { View,StyleSheet, ActivityIndicator, TextInput} from "react-native";
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
import {getUsers} from "./../requests/Users";  

import {storeDataJSON} from "../functions/AsyncStorageFunctions";
import {getDataJSON} from "../functions/AsyncStorageFunctions";

const HomeScreen = (props) => {
  const [posts, setPosts] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [abc, setabc] = useState(0);

  const [data, setData] = useState("");

  const loadPosts = async () => {
    setLoading(true);
    const response = await getPosts();
    if (response.ok) {
      //setPosts(response.data);
    }
  };

  const loadUsers = async () => {
    const response = await getUsers();
    if (response.ok) {
      setUsers(response.data);
    }
    setLoading(false);
  };
  const getName = (id) => {
    let Name = "";
    users.forEach((element) => {
      if (element.id == id) Name = element.name;
    });
    return Name;
  };

  useEffect(() => {
    loadPosts();
    loadUsers();
  }, []);

  if (!loading) {
    return (
      <AuthContext.Consumer>
        {(auth) => (
          <View style={styles.viewStyle}>
            <Header
              leftComponent={{
                icon: "menu",
                color: "#fff",
                onPress: function () {
                  props.navigation.toggleDrawer();
                },
              }}
              centerComponent={{ text: "The Office", style: { color: "#fff" } }}
              rightComponent={{
                icon: "lock-outline",
                color: "#fff",
                onPress: function () {
                  auth.setIsLoggedIn(false);
                  auth.setCurrentUser({});
                },
              }}
            />
            <Card>
            
              <Input
                multiline
                placeholder="What's On Your Mind?"
                onChangeText={
                  function(currentInput){
                      setPosts(currentInput)
  
                  }
              }
                leftIcon={<Entypo name="pencil" size={24} color="black" />}
              />
              <Button title="Post" type="outline" onPress={function () {
                    let userPost = {
                      user: auth.CurrentUser.Email,
                      post: posts,
                    };
                    
                    setData({posts});
                    //auth.CurrentUser.post=posts;
                    auth.CurrentUser.post=posts;
                    storeDataJSON(auth.CurrentUser.Email, auth.CurrentUser);
                    console.log(auth.CurrentUser);
                    setabc(1);
                    const showPost = ()=>{
                      console.log("Inside showPost");
                      return( 
                       
                        <Card>
                          <PostCard
                          author={auth.CurrentUser.name}
                          //title={item.title} 
                          shouldpost={abc}
                          body={auth.CurrentUser.post}
                          
                          />
                        </Card>
                        
                      );
                    }
                    //console.log(showPost());
                    showPost();
                    
              }} />
            </Card>
            
            
            <Card>
              <PostCard
              author={auth.CurrentUser.name}
              //title={item.title} 
              body={auth.CurrentUser.post}
              shouldpost={abc}
              />
            </Card>
            
            

            
          </View>
        )}
      </AuthContext.Consumer>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#338AFF" animating={true} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  textStyle: {
    fontSize: 30,
    color: "blue",
  },
  viewStyle: {
    flex: 1,
  },
});

export default HomeScreen;