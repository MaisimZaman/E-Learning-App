import React, {useEffect, useState} from 'react';
import {View,Text,Image,TextInput} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { auth } from '../../../services/firebase';
import WebView from 'react-native-webview';

export default function Feed({navigation}){

    const [searchText, setSearchText] = useState('')
    const [jobLook, setJobLook] = useState(false)
    

    if (jobLook){
        return (
            <WebView
                source={{ uri: `https://www.google.com/search?q=${searchText}+jobs&oq=${searchText}+jobs&aqs=chrome..69i57.2157j0j4&client=ms-android-samsung-ss&sourceid=chrome-mobile&ie=UTF-8#fpstate=tlexp&htiq=${searchText}%20jobs` }}
                originWhitelist={['https://www.google.com/search?*']}
                style={{ marginTop: 20 }}
            />
        )

    }

    return(
        <ScrollView style={{
            backgroundColor:"#F8F8F8",
            paddingHorizontal:20,
        }}>
            <Text style={{
                color:"#B0B0B0",
                marginTop:40,
                fontFamily:"Bold"
            }}>Hello {auth.currentUser.displayName}</Text>
            
            <Text style={{
                fontFamily:"ExtraBold",
                fontSize:18,
                marginTop:13
            }}>Find your best jobs</Text>

            <View style={{
                backgroundColor:"#FFF",
                borderRadius:5,
                padding:5,
                flexDirection:"row",
                alignItems:"center",
                marginTop:20
            }}>
                <TextInput
                    placeholder="What are you looking for?"
                    placeholderTextColor="#B0B0B0"
                    value={searchText}
                    onChangeText={(text) => setSearchText(text)}
                    style={{
                        fontFamily:"Medium",
                        paddingHorizontal:20
                    }}
                    onSubmitEditing={() => setJobLook(true)}
                />
                <View style={{
                    backgroundColor:"#000000",
                    width:30,
                    height:30,
                    borderRadius:8,
                    marginLeft:80,
                    alignItems:"center",
                    justifyContent:"center"
                }}> 
                <TouchableOpacity onPress={() => setJobLook(true)}>
                    <Image source={{uri: "https://raw.githubusercontent.com/Minte-grace/Job_Finding/master/src/images/searc.png"}}/>
                </TouchableOpacity>
                </View>
                
            </View>
            <Text style={{
                    fontFamily:"ExtraBold",
                    marginTop:20,
                    fontSize:15
                }}>Most Popular</Text>
            
            
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>

                    <View style={{
                        backgroundColor:"#FFF",
                        height:200,
                        width:150,
                        borderRadius:20,
                        marginTop:35
                    }}>
                        <Image source={{uri: "https://raw.githubusercontent.com/Minte-grace/Job_Finding/master/src/images/dev.png"}} style={{width:150,height:150}}/>
                        <TouchableOpacity 
                        
                        onPress={()=>navigation.navigate('JobDetails')}
                        
                        style={{
                            backgroundColor:"#000",
                            height:60,
                            borderRadius:20,
                            marginTop:-10,
                            paddingHorizontal:8,
                            paddingVertical:8
                        }}>
                            <Text style={{
                                color:"#FFF",
                                fontFamily:"SemiBold",
                                fontSize:13,
                            }}>Software Developer</Text>

                            <View style={{flexDirection:"row",marginTop:4}}>
                              <View style={{
                                  backgroundColor:"#3E3C3C",
                                  paddingHorizontal:5,
                                  alignItems:"center",
                                  justifyContent:"center",
                                  borderRadius:5
                                  }}>
                                <Text style={{
                                    color:"#B0B0B0",
                                    fontFamily:"Bold",
                                    fontSize:13
                                    }}>Full time</Text>
                                </View>

                                <Text style={{
                                    color:"#B0B0B0",
                                    fontFamily:"Bold",
                                    fontSize:13,
                                    marginLeft:25
                                    }}>$50/h</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{
                        backgroundColor:"#FFF",
                        height:200,
                        width:150,
                        borderRadius:20,
                        marginTop:35,
                        marginHorizontal:30
                    }}>
                        <Image source={{uri: "https://raw.githubusercontent.com/Minte-grace/Job_Finding/master/src/images/accountant.png"}} style={{width:150,height:150}}/>
                        <View style={{
                            backgroundColor:"#FFF",
                            height:60,
                            borderRadius:20,
                            marginTop:-10,
                            paddingHorizontal:8,
                            paddingVertical:8
                        }}>
                              
                            <Text style={{
                                color:"#000",
                                fontFamily:"SemiBold",
                                fontSize:13,
                            }}>Accountant</Text>
                            

                            <View style={{flexDirection:"row",marginTop:4}}>
                            <View style={{
                                  backgroundColor:"#DFDFDF",
                                  paddingHorizontal:5,
                                  alignItems:"center",
                                  justifyContent:"center",
                                  borderRadius:5
                                  }}>
                                <Text style={{
                                    color:"#B0B0B0",
                                    fontFamily:"Bold",
                                    fontSize:13
                                    }}>Full time</Text>
                            </View>
                                <Text style={{
                                    color:"#B0B0B0",
                                    fontFamily:"Bold",
                                    fontSize:13,
                                    marginLeft:25
                                    }}>$50/h</Text>
                            </View>
                        </View>
                    </View>

                    <View style={{
                        backgroundColor:"#FFF",
                        height:200,
                        width:150,
                        borderRadius:20,
                        marginTop:35,
                        
                    }}>
                        <Image source={{uri: "https://raw.githubusercontent.com/Minte-grace/Job_Finding/master/src/images/driver.png"}} style={{width:150,height:150}}/>
                        <View style={{
                            backgroundColor:"#FFF",
                            height:60,
                            borderRadius:20,
                            marginTop:-10,
                            paddingHorizontal:8,
                            paddingVertical:8
                        }}>
                              
                            <Text style={{
                                color:"#000",
                                fontFamily:"SemiBold",
                                fontSize:13,
                            }}>Car driver</Text>
                            

                            <View style={{flexDirection:"row",marginTop:4}}>
                            <View style={{
                                  backgroundColor:"#DFDFDF",
                                  paddingHorizontal:5,
                                  alignItems:"center",
                                  justifyContent:"center",
                                  borderRadius:5
                                  }}>
                                <Text style={{
                                    color:"#B0B0B0",
                                    fontFamily:"Bold",
                                    fontSize:13
                                    }}>Full time</Text>
                            </View>
                                <Text style={{
                                    color:"#B0B0B0",
                                    fontFamily:"Bold",
                                    fontSize:13,
                                    marginLeft:25
                                    }}>$50/h</Text>
                            </View>
                        </View>
                    </View>
            </ScrollView>
            <Text style={{
                fontFamily:"ExtraBold",
                marginVertical:20,
                fontSize:15
            }}>Nearby jobs</Text>

                    <View style={{
                        backgroundColor:"#FFF",
                        marginTop:10,
                        flexDirection:"row",
                        borderRadius:10,
                        height:60,
                        alignItems:"center",
                        paddingHorizontal:20
                    }}>
                            <View style={{
                                backgroundColor:"#DFDFDF",
                                borderRadius:5,
                                height:40,
                                width:40,
                                alignItems:"center",
                                justifyContent:"center"
                            }}>
                                <Image source={{uri: "https://raw.githubusercontent.com/Minte-grace/Job_Finding/master/src/images/pentool.png"}} style={{width:40,height:40}}/>
                            </View>

                            <View style={{
                                paddingHorizontal:20
                            }}>
                                <Text style={{
                                    fontFamily:"ExtraBold",
                                    fontSize:13
                                }}>Graphic Designer</Text>
                                <View style={{
                                    backgroundColor:"#DFDFDF",
                                    borderRadius:5,
                                    width:70,
                                    alignItems:"center",
                                    marginVertical:5
                                }}>
                                    <Text style={{fontFamily:"Medium",color:"#000",opacity:0.5}}>Part time</Text>
                                </View>

                              
                            </View>
                            <Text style={{
                                fontFamily:"ExtraBold",
                                fontSize:18,
                                marginLeft:40,
                                marginTop:10
                                }}>$5/h</Text>
                    </View>



                    <View style={{
                        backgroundColor:"#FFF",
                        marginTop:10,
                        flexDirection:"row",
                        borderRadius:10,
                        height:60,
                        alignItems:"center",
                        paddingHorizontal:20
                    }}>
                            <View style={{
                                backgroundColor:"#DFDFDF",
                                borderRadius:5,
                                height:40,
                                width:40,
                                alignItems:"center",
                                justifyContent:"center"
                            }}>
                                <Image source={{uri: "https://raw.githubusercontent.com/Minte-grace/Job_Finding/master/src/images/add.png"}} style={{width:25,height:25}}/>
                            </View>

                            <View style={{
                                paddingHorizontal:20
                            }}>
                                <Text style={{
                                    fontFamily:"ExtraBold",
                                    fontSize:13
                                }}>Nurse</Text>
                                <View style={{
                                    backgroundColor:"#DFDFDF",
                                    borderRadius:5,
                                    width:70,
                                    alignItems:"center",
                                    marginVertical:5
                                }}>
                                    <Text style={{fontFamily:"Medium",color:"#000",opacity:0.5}}>Part time</Text>
                                </View>

                              
                            </View>
                            <Text style={{
                                fontFamily:"ExtraBold",
                                fontSize:18,
                                marginLeft:90,
                                marginTop:10
                                }}>$5/h</Text>
                    </View>

                    <View style={{
                        backgroundColor:"#FFF",
                        marginTop:10,
                        flexDirection:"row",
                        borderRadius:10,
                        height:60,
                        alignItems:"center",
                        paddingHorizontal:20
                    }}>
                            <View style={{
                                backgroundColor:"#DFDFDF",
                                borderRadius:5,
                                height:40,
                                width:40,
                                alignItems:"center",
                                justifyContent:"center"
                            }}>
                                <Image source={{uri: "https://raw.githubusercontent.com/Minte-grace/Job_Finding/master/src/images/dine.png"}} style={{width:20,height:20}}/>
                            </View>

                            <View style={{
                                paddingHorizontal:20
                            }}>
                                <Text style={{
                                    fontFamily:"ExtraBold",
                                    fontSize:13
                                }}>Sheff</Text>
                                <View style={{
                                    backgroundColor:"#DFDFDF",
                                    borderRadius:5,
                                    width:70,
                                    alignItems:"center",
                                    marginVertical:5
                                }}>
                                    <Text style={{fontFamily:"Medium",color:"#000",opacity:0.5}}>Part time</Text>
                                </View>

                              
                            </View>
                            <Text style={{
                                fontFamily:"ExtraBold",
                                fontSize:18,
                                marginLeft:90,
                                marginTop:10
                                }}>$5/h</Text>
                    </View>


                    <View style={{
                        backgroundColor:"#FFF",
                        marginTop:10,
                        flexDirection:"row",
                        borderRadius:10,
                        height:60,
                        alignItems:"center",
                        paddingHorizontal:20
                    }}>
                            <View style={{
                                backgroundColor:"#DFDFDF",
                                borderRadius:5,
                                height:40,
                                width:40,
                                alignItems:"center",
                                justifyContent:"center"
                            }}>
                                <Image source={{uri: "https://raw.githubusercontent.com/Minte-grace/Job_Finding/master/src/images/sitter.png"}} style={{width:30,height:30}}/>
                            </View>

                            <View style={{
                                paddingHorizontal:20
                            }}>
                                <Text style={{
                                    fontFamily:"ExtraBold",
                                    fontSize:13
                                }}>Baby Sitter</Text>
                                <View style={{
                                    backgroundColor:"#DFDFDF",
                                    borderRadius:5,
                                    width:70,
                                    alignItems:"center",
                                    marginVertical:5
                                }}>
                                    <Text style={{fontFamily:"Medium",color:"#000",opacity:0.5}}>Part time</Text>
                                </View>

                              
                            </View>
                            <Text style={{
                                fontFamily:"ExtraBold",
                                fontSize:18,
                                marginLeft:85,
                                marginTop:10
                                }}>$5/h</Text>
                    </View>
        </ScrollView>
    )
    
}