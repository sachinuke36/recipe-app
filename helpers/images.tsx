import { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Animated from "react-native-reanimated";


type imageCache= { [key: string]: string } ;


export const CachedImage = (props:any) => {
    const [cachedSource, setCachedSource] = useState<imageCache>();
    const { uri } = props;
    useEffect(()=>{
        const getCachedImage = async()=>{
            try {
                const cachedImageData = await AsyncStorage.getItem(uri);
                if(cachedImageData){
                    setCachedSource({ uri: cachedImageData});
                }else{
                    const response = await fetch(uri);
                    const imageBlob = await response.blob();
                    const base64Data:any = await new Promise((resolve)=>{
                        const reader = new FileReader();
                        reader.readAsDataURL(imageBlob);
                        reader.onloadend=()=>{
                            resolve(reader.result);
                        };
                    });
                    await AsyncStorage.setItem(uri,base64Data);
                    setCachedSource({uri: base64Data});
                }
            } catch (error:any) {
                console.log("Error in caching image: ",error.message)
            }
        }
        getCachedImage();
    },[])
    return <Animated.Image source={cachedSource} {...props}/>
};