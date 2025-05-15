import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { BellIcon, MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from "@/components/Categories";
import Recipies from "@/components/Recipies";

export type categoryProps = {
    idCategory:string,
    strCategory: string,
    strCategoryThumb: string,
    strCategoryDescription: string
};

export type mealsProps = {
    strMeal: string,
    strMealThumb: string,
    idMeal: string
}


const Home = () => {
    const [activeCategory, setActiveCategory] = useState('Beef');
    const [categories, setCategories] = useState<categoryProps[]>([]);
    const [recipes, setRecipes] = useState<mealsProps[]>([]);

    React.useEffect(()=>{
        getCategories();
        getRecipes();
    },[]);

    const handleChangeCategory=(category: string)=>{
        getRecipes(category);
        setActiveCategory(category);
        setRecipes([]);
    }
    
    const getCategories = async()=>{
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php',{
                method: "GET"
            });
            // console.log(response)
            if(response.ok){
                const data = await response.json();
                setCategories(data.categories);
                // console.log(data);
            }
        } catch (error: any) {
            console.log("Error: " + error.message)
        }
    }
    const getRecipes = async(category="Beef")=>{
        try {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`,{
                method: "GET"
            });
            // console.log(response)
            if(response.ok){
                const data = await response.json();
                setRecipes(data.meals);
                // console.log(data);
            }
        } catch (error: any) {
            console.log("Error: " + error.message)
        }
    }

  return (
    <View className="flex-1 bg-white ">
      <StatusBar barStyle={"dark-content"} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
        className="gap-5 flex-col pt-14"
      >
        {/* avatar and bell icon */}
        <View className="mx-4 flex-row justify-between items-center mb-2">
          <Image
            source={require("@/assets/images/my-photo.jpg")}
            className="rounded-full"
            style={{ height: hp(5), width: hp(5) }}
          />
          <BellIcon size={hp(4)} color={"gray"} />
        </View>

        {/* greeting and punchline */}
        <View className="mx-4 my-2 gap-3 mb-2">
          <Text className="text-neutral-600" style={{ fontSize: hp(1.7) }}>
            Hello, Sachin!
          </Text>
          <View>
            <Text
              style={{ fontSize: hp(3.8) }}
              className="font-semibold text-neutral-600"
            >
              Make your own food!
            </Text>
          </View>
          <Text
            style={{ fontSize: hp(3.8) }}
            className="font-semibold text-neutral-600"
          >
            Stay at <Text className="text-amber-400">home</Text>
          </Text>
        </View>

        {/* search bar */}
        <View className="mx-4 my-6 flex-row items-center rounded-full bg-black/5 p-[6px]">
          <TextInput
            placeholder="Search any recipe"
            placeholderTextColor={"gray"}
            style={{ fontSize: hp(1.7) }}
            className="flex-1 text-base mb-1 pl-3 tracking wider"
          />
          <View className="bg-white rounded-full p-3">
            <MagnifyingGlassIcon
              size={hp(2.5)}
              strokeWidth={3}
              color={"gray"}
            />
          </View>
        </View>

        {/* Categories */}
        <View>
            {
            categories?.length > 0 &&
          <Categories activeCategory={activeCategory} categories={categories} handleChangeCategory={handleChangeCategory} />
            }
        </View>

        {/* recipies */}
        <View>
            <Recipies recipes={recipes}  categories={categories}/>
        </View>
      </ScrollView>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
