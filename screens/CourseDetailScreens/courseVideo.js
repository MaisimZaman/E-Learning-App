import React, { useState, useEffect } from 'react';

import { StyleSheet, View, Platform, Button, StatusBar, SafeAreaView, Text, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
import { CheckBox } from 'react-native-elements'

export default function VideoScreen(props){

    
    const {width, height} = Dimensions.get("screen");
    

    const {videoList, title} = props.route.params;

    const [playingVideo, setPlayingVideo] = useState(videoList[0])

    function renderVideoBox({ item }){
        function youtube_parser(url){
            var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
            var match = url.match(regExp);
            return (match&&match[7].length==11)? match[7] : false;
        }

        

        return(
            <View key = { item } style = { styles.CheckBox }> 
             <CheckBox
                title = { youtube_parser(item) }
                iconRight
                containerStyle = { styles.checkBox }
                textStyle = { styles.text }
                checkedColor = 'blue'
                checked = { item == playingVideo ? true : false }
                onPress = { () => setPlayingVideo(item) }
              />
            </View>
        ) 

        
        
    }

    return (
        <>
            <Text>{title}</Text>

            <View style={{width:'100%',height:height/3,alignItems:'center'}}>
                <WebView
                style={{ marginTop: 20, width: 330, height: 230 }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
            
                allowsFullscreenVideo={true}
                source={{ uri: playingVideo}}
        />
            </View>

            <FlatList  
                style={{marginTop: 50}}
                data={videoList}
                keyExtractor={item => item}
                renderItem={renderVideoBox}


            ></FlatList>

        </>


      );
    
  
    
  
}

const styles = StyleSheet.create({

    WebViewContainer: {

    marginTop: 200,

  },
    
    item: {
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
    },
    title: {
      fontSize: 32,
    },
    CheckBox: {
        borderBottomWidth: 0.3,
        borderBottomColor: 'gray'
      },
      checkBox : {
        backgroundColor: "#ffffff",
        borderWidth: 0
      },
      text: {
        flex: 0.95,
        backgroundColor: "#ffffff"
      }
  
  
});