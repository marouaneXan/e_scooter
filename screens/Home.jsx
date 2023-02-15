import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import tw from 'twrnc';

const Home = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-6`}>
        <Text style={tw`text-2xl font-bold`}>E_scooter</Text>
        <TouchableOpacity style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40 rounded-[8px]`}>
          <View>
            <Image style={{ width: 120, height: 120, resizeMode: 'contain' }} source={{ uri: 'https://links.papareact.com/3pn' }} />
            <Text style={tw`mt-2 text-lg font-semibold`}>Get a ride</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default Home