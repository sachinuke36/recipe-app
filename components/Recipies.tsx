import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import MasonryList from "@react-native-seoul/masonry-list";
import Animated, { FadeInDown } from "react-native-reanimated";
import { categoryProps, mealsProps } from "@/app/home";
import Loading from "./Loading";
import { CachedImage } from "@/helpers/images";
import { NavigationProp, useNavigation } from "@react-navigation/native";

const Recipies = ({ categories, recipes }: {categories:categoryProps[], recipes: mealsProps[]}) => {
  const navigation = useNavigation();

  return (
    <View className="mx-4 my-3 ">
      <Text
        style={{ fontSize: hp(3) }}
        className="font-semibold text-neutral-600"
      >
        Recipies
      </Text>
      <View>
        {categories.length == 0 || recipes.length==0 ? <Loading size='large' className="mt-20 "/> : (
          <MasonryList
            data={recipes}
            keyExtractor={(item: mealsProps) => item.idMeal}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, i }:{item: any, i:number}) => <CardItem navigation={navigation} index={i} item={item} />}
            onEndReachedThreshold={0.1}
          ></MasonryList>
        )}
      </View>
    </View>
  );
};

export default Recipies;

const CardItem = ({ item, index, navigation }: {item: mealsProps, index: number, navigation:any}) => {
  const isEven = index % 2 == 0;

  return (
    <Animated.View
      entering={FadeInDown.delay(index * 100)
        .duration(600)
        .springify()
        .damping(20)}
    >
      <Pressable
        style={{
          width: "100%",
          paddingLeft: isEven ? 0 : 8,
          paddingRight: isEven ? 8 : 0,
        }}
        onPress={()=>navigation.navigate('recipeDetails',{...item})}
        className="flex justify-center mb-4 my-1"
      >
        <Image
          source={{ uri: item.strMealThumb }}
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
        />

        {/* <CachedImage
           uri={ item.strMealThumb }
          style={{
            width: "100%",
            height: index % 3 == 0 ? hp(25) : hp(35),
            borderRadius: 35,
          }}
          className="bg-black/5"
         /> */}
        <Text
          style={{ fontSize: hp(1.5) }}
          className="font-semibold ml-2 text-neutral-600"
        >
          {item.strMeal.length > 20 ? item.strMeal.slice(0, 20) + "..." : item.strMeal}
        </Text>
      </Pressable>
    </Animated.View>
  );
};

const styles = StyleSheet.create({});
