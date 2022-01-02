import React, {useState, useEffect} from 'react';
import {
    View,
    Text,
    ImageBackground,
    Image,
    ScrollView,
} from 'react-native';
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";

import {
    IconButton,
    TextButton,
    VerticalCourseCard,
    HorizontalCourseCard,
    LineDivider,
    CategoryCard
} from "../../components";
import { COLORS, FONTS, SIZES, icons, images, dummyData } from '../../constants';
import {auth, db} from '../../services/firebase'

function Section({ containerStyle, title, onPress, children }){

    

    return (
        <View
            style={{
                ...containerStyle
            }}
        >
            <View
                style={{
                    flexDirection: 'row',
                    paddingHorizontal: SIZES.padding
                }}
            >
                <Text style={{ flex: 1, ...FONTS.h2 }}>{title}</Text>

                <TextButton
                    contentContainerStyle={{
                        width: 80,
                        borderRadius: 30,
                        backgroundColor: COLORS.primary
                    }}
                    label="See All"
                    onPress={onPress}
                />
            </View>

            {children}
        </View>
    )
}


function Home({navigation}){
    const getCurrentDate=()=>{

        var date = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
  
        //Alert.alert(date + '-' + month + '-' + year);
        // You can turn it in to your desired format
        return date + '-' + month + '-' + year;//format: dd-mm-yyyy;
    }

    function renderHeader() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    marginTop: 40,
                    marginBottom: 10,
                    paddingHorizontal: SIZES.padding,
                    alignItems: 'center'
                }}
            >
                {/* Greetings */}
                <View
                    style={{
                        flex: 1
                    }}
                >
                    <Text style={{ ...FONTS.h2 }}>Hello, {auth.currentUser.displayName}!</Text>
                    <Text
                        style={{
                            color: COLORS.gray50,
                            ...FONTS.body3
                        }}
                    >
                        {getCurrentDate()}
                    </Text>
                </View>

                {/* Notification */}
                <IconButton
                    icon={icons.notification}
                    iconStyle={{
                        tintColor: COLORS.black
                    }}
                />
            </View>
        )
    }

    function renderStartLearning() {
        return (
            <ImageBackground
                source={images.featured_bg_image}
                style={{
                    alignItems: 'flex-start',
                    marginTop: SIZES.padding,
                    marginHorizontal: SIZES.padding,
                    padding: 15
                }}
                imageStyle={{
                    borderRadius: SIZES.radius
                }}
            >
                {/* Info */}
               

                {/* Image */}
                

                {/* Button */}
                <TextButton
                    label="Start Learning"
                    contentContainerStyle={{
                        height: 40,
                        paddingHorizontal: SIZES.padding,
                        borderRadius: 20,
                        backgroundColor: COLORS.white
                    }}
                    labelStyle={{
                        color: COLORS.black
                    }}
                />
            </ImageBackground>
        )
    }

    function renderCourses() {
        const [courses_list_1, setCourseList] = useState([])

        useEffect(() => {
            const unsubscribe = db.collection('courses')
                                .onSnapshot((snapshot) => setCourseList(snapshot.docs.map(doc => ({
                                    id: doc.id,
                                    title: doc.data().title,
                                    duration: doc.data().duration,
                                    thumbnail: doc.data().thumbnail,
                                    videoLink: doc.data().videoLink
                                }))))

            return unsubscribe;
        })

        return (
            <FlatList
                horizontal={true}
                data={courses_list_1}
                listKey="Courses"
                keyExtractor={item => `Courses-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: SIZES.padding
                }}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => navigation.navigate("VideoScreen", {videoList: item.videoLink, title: item.title})}>
                        <VerticalCourseCard
                            containerStyle={{
                                marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                                marginRight: index == courses_list_1.length - 1 ? SIZES.padding : 0
                            }}
                            course={item}
                            
                        />
                    </TouchableOpacity>
                )}
            />
        )
    }

    function renderCategories() {
        return (
            <Section
                title="Categories"
            >
                <FlatList
                    horizontal={true}
                    data={dummyData.categories}
                    listKey="Categories"
                    keyExtractor={item => `Categories-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.radius
                    }}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("CourseCatScreen", {topicTitle: item.title})}>
                            <CategoryCard
                                category={item}
                                containerStyle={{
                                    marginLeft: index == 0 ? SIZES.padding : SIZES.base,
                                    marginRight: index == dummyData.categories.length - 1 ? SIZES.padding : 0
                                }}
                            />
                        </TouchableOpacity>
                    )}
                />
            </Section>
        )
    }

    function renderPopularCourses() {
        const [courses_list_1, setCourseList] = useState([])

        useEffect(() => {
            const unsubscribe = db.collection('courses')
                                .onSnapshot((snapshot) => setCourseList(snapshot.docs.map(doc => ({
                                    id: doc.id,
                                    title: doc.data().title,
                                    duration: doc.data().duration,
                                    thumbnail: doc.data().thumbnail,
                                    videoLink: doc.data().videoLink
                                }))))

            return unsubscribe;
        })

        return (
            <Section
                title="Popular Courses"
                containerStyle={{
                    marginTop: 30
                }}
            >
                <FlatList
                    data={courses_list_1}
                    listKey="PopularCourses"
                    scrollEnabled={false}
                    keyExtractor={item => `PopularCourses-${item.id}`}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={{
                        marginTop: SIZES.radius,
                        paddingHorizontal: SIZES.padding
                    }}
                    renderItem={({ item, index }) => (
                        <TouchableOpacity onPress={() => navigation.navigate("VideoScreen", {videoList: item.videoLink, title: item.title})}>
                            <HorizontalCourseCard
                                course={item}
                                containerStyle={{
                                    marginVertical: SIZES.padding,
                                    marginTop: index == 0 ? SIZES.radius : SIZES.padding
                                }}
                            />
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={() => (
                        <LineDivider
                            lineStyle={{
                                backgroundColor: COLORS.gray20
                            }}
                        />
                    )}
                />
            </Section>
        )
    }

    return (
        <View
            style={{
                flex: 1,
                backgroundColor: COLORS.white
            }}
        >
            {renderHeader()}

            <ScrollView
                contentContainerStyle={{
                    paddingBottom: 150
                }}
                showsVerticalScrollIndicator={false}
            >
                {/* Start Learning */}
                {renderStartLearning()}

                {/* Courses */}
                {renderCourses()}

                <LineDivider
                    lineStyle={{
                        marginVertical: SIZES.padding
                    }}
                />

                {/* Categories */}
                {renderCategories()}

                {/* Popular Courses */}
                {renderPopularCourses()}
            </ScrollView>
        </View>
    )
}

export default Home;