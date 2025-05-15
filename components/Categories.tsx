import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { SetStateAction } from "react";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import Animated, { FadeInDown } from "react-native-reanimated";
import { categoryProps } from "@/app/home";

type Props = {
  activeCategory: string,
  handleChangeCategory: (category: string)=>void,
  categories: categoryProps[]
};

const Categories = ({handleChangeCategory,activeCategory, categories}: Props) => {
  

  return (
    <Animated.View entering={FadeInDown.duration(500).springify()}>
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        className="gap-4"
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {categories.map((item, indx) => {
          const isActive = item.strCategory == activeCategory;
          let activeClassButton = isActive ? 'bg-amber-400' : 'bg-black/5';
         return <TouchableOpacity key={indx} 
          onPress={()=>handleChangeCategory(item.strCategory)}
          className="flex items-center gap-1">
            <View className={"rounded-full p-[6px] " + activeClassButton}>
              <Image
                source={{ uri: item.strCategoryThumb }}
                style={{ width: hp(6), height: hp(6) }}
                className="rounded-full"
                resizeMode="cover"
              />
            </View>
            <Text className="text-neutral-600" style={{ fontSize: hp(1.6) }}>
              {item.strCategory}
            </Text>
          </TouchableOpacity>
})}
      </ScrollView>
    </Animated.View>
  );
};

export default Categories;

const styles = StyleSheet.create({});
