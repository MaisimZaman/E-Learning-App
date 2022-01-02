import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import { SIZES, COLORS } from '../../constants';
import { VerticalCourseCard, LineDivider } from '../../components';
import { auth,db } from '../../services/firebase';
import { collection, query, where, getDocs } from "firebase/firestore";


export default function CourseCat(props) {

    const [courses, setCourses] = useState([]);

    const {topicTitle} = props.route.params;

    useEffect(async ()  => {
        const courseRef  = collection(db, 'courses')
        const findQuery = query(courseRef, where("Topic", '==',topicTitle))
        const querySnapshot = await getDocs(findQuery);
        setCourses(querySnapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            duration: doc.data().duration,
            thumbnail: doc.data().thumbnail,
            videoLink: doc.data().videoLink
        })));

       
    }, [])



    function renderCourseCard({item, index}){
        return (
            <TouchableOpacity onPress={() => props.navigation.navigate("VideoScreen", {videoList: item.videoLink})}>
                <VerticalCourseCard
                    containerStyle={{
                        marginLeft: index == 0 ? SIZES.padding : SIZES.radius,
                        marginRight: index == courses.length - 1 ? SIZES.padding : 0
                    }}
                    course={item}
                    
                />
            </TouchableOpacity>

        )
        
    }


    if (courses.length == 0){
        return (
            <Text>No course on this topic yet</Text>
        )
    }
    
    

    return (
        <View 
        style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}
        >
           
            <FlatList
                horizontal={false}
                data={courses}
                listKey="Courses"
                keyExtractor={item => `Courses-${item.id}`}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    marginTop: SIZES.padding,
                    marginLeft: 18
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

const styles = StyleSheet.create({})
