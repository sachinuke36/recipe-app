import { ActivityIndicator, ActivityIndicatorProps, StyleSheet, Text, View } from 'react-native'
import React from 'react'

type Props = {}

const Loading = (props: ActivityIndicatorProps) => {
  return (
    <View className='flex-1 flex justify-center items-center'>
        <ActivityIndicator {...props} />
    </View>
  )
}

export default Loading

const styles = StyleSheet.create({})