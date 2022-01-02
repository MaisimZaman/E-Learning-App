import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import { LogBox } from 'react-native';

import {
    Login,
    Register,
    Walkthrough,
    ChooseCategory,

    MainLayout,
    UpdateProfilePic,
    JobDetails,
    VideoScreen,
    CourseCat
} from "./screens";

const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

const App = () => {

    const [loaded] = useFonts({
        "Roboto-Black": require('./assets/fonts/Roboto-Black.ttf'),
        "Roboto-Bold": require('./assets/fonts/Roboto-Bold.ttf'),
        "Roboto-Regular": require('./assets/fonts/Roboto-Regular.ttf'),
    })

    if (!loaded) {
        return null;
    }

    return (
        <NavigationContainer>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false
                }}
                initialRouteName={'Login'}
            >
                <Stack.Screen
                    name="Login"
                    component={Login}
                />

                <Stack.Screen
                    name="Register"
                    component={Register}
                />

                <Stack.Screen
                    name="Walkthrough"
                    component={Walkthrough}
                />

                <Stack.Screen
                    name="ChooseCategory"
                    component={ChooseCategory}
                />

                <Stack.Screen
                    name="Dashboard"
                    component={MainLayout}
                />

                <Stack.Screen
                    name="UpdateProfilePic"
                    component={UpdateProfilePic}
                />

                <Stack.Screen
                    name="JobDetails"
                    component={JobDetails}
                />
                <Stack.Screen
                    name="VideoScreen"
                    component={VideoScreen}
                />

                <Stack.Screen
                    name="CourseCatScreen"
                    component={CourseCat}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default App