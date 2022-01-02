import React from 'react';
import {
    View,
    Text,
    Animated
} from 'react-native';

import { TextButton } from "../../components";
import { COLORS, SIZES, constants, FONTS } from "../../constants";

const Walkthrough = ({ navigation }) => {

    const flatListRef = React.useRef()
    const scrollX = React.useRef(new Animated.Value(0)).current;

    const [currentIndex, setCurrentIndex] = React.useState(0)

    const onViewChangeRef = React.useRef(({ viewableItems, changed }) => {
        setCurrentIndex(viewableItems[0].index)
    })

    const Dots = () => {
        const dotPosition = Animated.divide(scrollX, SIZES.width)

        return (
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginLeft: SIZES.padding
                }}
            >
                {
                    constants.walkthrough.map((item, index) => {
                        const dotColor = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [COLORS.gray20, COLORS.primary3, COLORS.gray20],
                            extrapolate: "clamp"
                        })

                        const dotWidth = dotPosition.interpolate({
                            inputRange: [index - 1, index, index + 1],
                            outputRange: [10, 40, 10],
                            extrapolate: "clamp"
                        })

                        return (
                            <Animated.View
                                key={`dot-${index}`}
                                style={{
                                    borderRadius: 5,
                                    marginHorizontal: 6,
                                    width: dotWidth,
                                    height: 10,
                                    backgroundColor: dotColor
                                }}
                            />
                        )
                    })
                }
            </View>
        )
    }

    function renderFooter() {
        return (
            <View
                style={{
                    position: 'absolute',
                    bottom: SIZES.height > 800 ? 50 : 10,
                    left: 0,
                    right: 0,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Dots />

                <TextButton
                    label="Next"
                    contentContainerStyle={{
                        height: 70,
                        width: 130,
                        alignItems: 'flex-start',
                        paddingLeft: 25,
                        marginRight: -30,
                        borderRadius: 35,
                        backgroundColor: COLORS.primary
                    }}
                    labelStyle={{
                        ...FONTS.h2
                    }}
                    onPress={() => {
                        if (currentIndex == constants.walkthrough.length - 1) {
                            navigation.navigate("ChooseCategory")
                        } else {
                            flatListRef?.current?.scrollToIndex({
                                index: currentIndex + 1,
                                animated: true
                            })
                        }
                    }}
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
            <Animated.FlatList
                ref={flatListRef}
                data={constants.walkthrough}
                keyExtractor={(item) => item.id}
                horizontal
                snapToInterval={SIZES.width}
                decelerationRate="fast"
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                onViewableItemsChanged={onViewChangeRef.current}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        useNativeDriver: false,
                    },
                )}
                renderItem={({ item, index }) => {

                    const inputRange = [(index - 1) * SIZES.width, index * SIZES.width, (index + 1) * SIZES.width];

                    const imageScale = scrollX.interpolate({
                        inputRange,
                        outputRange: [0.9, 1, 0.9],
                        extrapolate: 'clamp',
                    });
                    const titleTranslateX = scrollX.interpolate({
                        inputRange,
                        outputRange: [SIZES.width, 0, -SIZES.width],
                        extrapolate: 'clamp',
                    });

                    return (
                        <View
                            style={{
                                width: SIZES.width,
                                justifyContent: 'center',
                            }}
                        >
                            <Animated.Text
                                style={{
                                    marginHorizontal: SIZES.padding,
                                    transform: [{ translateX: titleTranslateX }],
                                    ...FONTS.largeTitle,
                                }}
                            >
                                {item.title}
                            </Animated.Text>
                            <Animated.Text
                                style={{
                                    marginTop: SIZES.padding,
                                    marginHorizontal: SIZES.padding,
                                    transform: [{ translateX: titleTranslateX }],
                                    ...FONTS.body3
                                }}
                            >
                                {item.sub_title}
                            </Animated.Text>

                            <Animated.Image
                                source={item.image}
                                resizeMode="contain"
                                style={{
                                    width: SIZES.width,
                                    height: SIZES.height * 0.5,
                                    transform: [
                                        {
                                            scale: imageScale
                                        }
                                    ]
                                }}
                            />
                        </View>
                    )
                }}
            />

            {/* Pagination / Dots */}
            {renderFooter()}
        </View>
    )
}

export default Walkthrough;