import React from 'react';
import {
    View,
    Text,
    Image,
    TextInput
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    useSharedValue
} from 'react-native-reanimated';

import {
    TextButton,
    CategoryCard,
    LineDivider
} from "../../components";
import { useState, useEffect } from 'react';
import { COLORS, FONTS, SIZES, icons, dummyData } from '../../constants';
import { collection, query, where, getDocs } from "firebase/firestore";
import {auth, db} from '../../services/firebase'
import { VerticalCourseCard } from '../../components';

function Search({navigation}){

    const [searchText, setSearchText] = useState('')
    const [searchedCourses, setSearchedCourses] = useState([])

    const scrollViewRef = React.useRef()

    const scrollY = useSharedValue(0);
    const onScroll = useAnimatedScrollHandler((event) => {
        scrollY.value = event.contentOffset.y;
    });

    

    useEffect(async () => {
        if (searchText !=''){
            const courseRef  = collection(db, 'courses')
            const findQuery = query(courseRef, where("title", '>=', searchText))
            const querySnapshot = await getDocs(findQuery);
            setSearchedCourses(querySnapshot.docs.map((doc) => ({
                id: doc.id,
                title: doc.data().title,
                duration: doc.data().duration,
                thumbnail: doc.data().thumbnail,
                videoLink: doc.data().videoLink
            })));

        }

    }, [searchText])

    function renderSearchBar() {
        const inputRange = [0, 55];
        
        const searchBarAnimatedStyle = useAnimatedStyle(() => {
            return {
                height: interpolate(scrollY.value, inputRange, [55, 0], Extrapolate.CLAMP),
                opacity: interpolate(scrollY.value, inputRange, [1, 0], Extrapolate.CLAMP),
            };
        });

        return (
            <Animated.View
                style={[{
                    position: 'absolute',
                    top: 50,
                    left: 0,
                    right: 0,
                    paddingHorizontal: SIZES.padding
                }, searchBarAnimatedStyle]}
            >
                <Shadow>
                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            width: SIZES.width - (SIZES.padding * 2),
                            paddingHorizontal: SIZES.radius,
                            borderRadius: SIZES.radius,
                            backgroundColor: COLORS.white
                        }}
                    >
                        <Image
                            source={icons.search}
                            style={{
                                width: 25,
                                height: 25,
                                tintColor: COLORS.gray40
                            }}
                        />

                        <TextInput
                            style={{
                                flex: 1,
                                marginLeft: SIZES.base,
                                ...FONTS.h4,
                            }}
                            value={searchText}
                            onChangeText={(text) => setSearchText(text)}
                            placeholder="Search for Topics, Courses & Educators"
                            placeholderTextColor={COLORS.gray}

                        //onChangeText={(text) => onChange(text)}
                        />
                    </View>
                </Shadow>
            </Animated.View>
        )
    }

    function renderTopSearches() {
        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                <Text
                    style={{
                        marginHorizontal: SIZES.padding,
                        ...FONTS.h2
                    }}
                >
                    Top Searches
                </Text>

                <FlatList
                    horizontal
                    data={dummyData.top_searches}
                    listKey="TopSearches"
                    keyExtractor={item => `TopSearches-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.radius
                    }}
                    renderItem={({ item, index }) => (
                        <TextButton
                            label={item.label}
                            contentContainerStyle={{
                                paddingVertical: SIZES.radius,
                                paddingHorizontal: SIZES.padding,
                                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                                marginRight: index == dummyData.top_searches.length - 1 ? SIZES.padding : 0,
                                borderRadius: SIZES.radius,
                                backgroundColor: COLORS.gray10
                            }}
                            labelStyle={{
                                color: COLORS.gray50,
                                ...FONTS.h3
                            }}
                        />
                    )}
                />
            </View>
        )
    }
    function renderCourseCard({item, index}){
        return (
            <TouchableOpacity onPress={() => navigation.navigate("VideoScreen", {videoList: item.videoLink})}>
                <VerticalCourseCard
                    containerStyle={{
                        marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                        marginRight: index == searchedCourses.length - 1 ? SIZES.padding : 0
                    }}
                    course={item}
                    
                />
            </TouchableOpacity>

        )
        
    }

    function renderBrowseCategories() {

        if (searchText != ''){
            return (
                <View 
        style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}
        >
           
            <FlatList
                horizontal={false}
                data={searchedCourses}
                listKey="Courses"
                keyExtractor={item => `Courses-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: SIZES.padding
                }}
                renderItem={renderCourseCard}
                ItemSeparatorComponent={() => (
                    <LineDivider
                        lineStyle={{
                            backgroundColor: COLORS.gray20
                        }}
                    />
                )}
            />
        </View>
            )
        }



        return (
            <View
                style={{
                    marginTop: SIZES.padding
                }}
            >
                <Text
                    style={{
                        marginHorizontal: SIZES.padding,
                        ...FONTS.h2
                    }}
                >
                    Browse Categories
                </Text>

                <FlatList
                    data={dummyData.categories}
                    numColumns={2}
                    scrollEnabled={false}
                    listKey="BrowseCategories"
                    keyExtractor={item => `BrowseCategories-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.radius
                    }}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("CourseCatScreen", {topicTitle: item.title})}>
                            <CategoryCard
                                category={item}
                                containerStyle={{
                                    height: 130,
                                    width: (SIZES.width - (SIZES.padding * 2) - SIZES.radius) / 2,
                                    marginTop: SIZES.radius,
                                    marginLeft: (index + 1) % 2 == 0 ? SIZES.radius : SIZES.padding
                                }}
                            />
                        </TouchableOpacity>
                    )}
                />
            </View>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            <Animated.ScrollView
                ref={scrollViewRef}
                contentContainerStyle={{
                    marginTop: 100,
                    paddingBottom: 300
                }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
                keyboardDismissMode="on-drag"
                onScroll={onScroll}
                onScrollEndDrag={(event) => {
                    if (event.nativeEvent.contentOffset.y > 10 && event.nativeEvent.contentOffset.y < 50) {
                        scrollViewRef.current?.scrollTo({
                            x: 0,
                            y: 60,
                            animated: true
                        })
                    }
                }}
            >
                {renderTopSearches()}

                {renderBrowseCategories()}
            </Animated.ScrollView>

            {renderSearchBar()}
        </View>
    )
}

export default Search;