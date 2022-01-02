
import { auth, db } from "../services/firebase"
import { useState, useEffect } from "react"
const categories = [
    {
        id: 0,
        title: "Coding/Software development",
        thumbnail: require("../assets/images/bg_1.png")
    },
    {
        id: 1,
        title: "Engineering",
        thumbnail: require("../assets/images/bg_2.png")
    },
    {
        id: 2,
        title: "Economics",
        thumbnail: require("../assets/images/bg_3.png")
    },
    {
        id: 3,
        title: "Social Sciences",
        thumbnail: require("../assets/images/bg_4.png")
    },
    {
        id: 4,
        title: "medicine",
        thumbnail: require("../assets/images/bg_5.png")
    },
    {
        id: 5,
        title: "General Science",
        thumbnail: require("../assets/images/bg_6.png")
    }
]

function courses_list_1(){
    const [courseList, setCourseList] = useState([])

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

    return courseList

}

/*
const courses_list_1 = [
    {
        id: 0,
        title: "The Complete Rocket Science course",
        duration: "1h 30m",
        thumbnail: {uri: "https://www.nasa.gov/sites/default/files/images/rocketScience_xxltn.jpg"}
    },
    {
        id: 1,
        title: "Introduction to Artifical Inteligence and Neural Networks",
        duration: "2h 30m",
        thumbnail: {uri: "https://media.istockphoto.com/photos/illustration-wireframe-human-ai-system-and-infographic-information-picture-id1271150287?b=1&k=20&m=1271150287&s=170667a&w=0&h=5ScGDWQojNi54r1TJd7X1aK8Eh_DeuAAdl1xE0D00Bk="}
    }
]
*/

const courses_list_2 = [
    {
        id: 0,
        title: "The Ultimate Ui/Ux Course Beginner to Advanced",
        duration: "2h 30m",
        instructor: "James Morris",
        ratings: 4.9,
        price: 75,
        is_favourite: true,
        thumbnail: require("../assets/images/thumbnail_1.png")
    },
    {
        id: 1,
        title: "The Ultimate Ui/Ux Course Beginner to Advanced",
        duration: "2h 30m",
        instructor: "James Morris",
        ratings: 4.9,
        price: 75,
        is_favourite: false,
        thumbnail: require("../assets/images/thumbnail_2.png")
    },
    {
        id: 2,
        title: "The Ultimate Ui/Ux Course Beginner to Advanced",
        duration: "2h 30m",
        instructor: "James Morris",
        ratings: 4.9,
        price: 75,
        is_favourite: true,
        thumbnail: require("../assets/images/thumbnail_3.png")
    },
    {
        id: 3,
        title: "The Ultimate Ui/Ux Course Beginner to Advanced",
        duration: "2h 30m",
        instructor: "James Morris",
        ratings: 4.9,
        price: 75,
        is_favourite: false,
        thumbnail: require("../assets/images/thumbnail_4.png")
    }
]

const top_searches = [
    {
        id: 0,
        label: "Coding/Software Development"
    },
    {
        id: 1,
        label: "Engineering"
    },
    {
        id: 2,
        label: "Physics"
    },
    {
        id: 3,
        label: "Politics"
    },
    {
        id: 4,
        label: "Bussiness/finance"
    },
    {
        id: 5,
        label: "economics"
    },
]

export default {
    categories,
    courses_list_1,
    courses_list_2,
    top_searches
}