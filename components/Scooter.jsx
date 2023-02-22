import { View, Text } from 'react-native'
import React, { useEffect, useState } from "react";
import { Marker } from "react-native-maps";
import axios from "axios";
import Constants from "expo-constants";

const Scooter = () => {
    const [scooters, setScooters] = useState([]);
    const [id, setId] = useState(null);
    const apiUrl = Constants.expoConfig.extra.apiUrl;

    useEffect(() => {
        axios
            .get(`${apiUrl}/user/allScooters`)
            .then((response) => {
                setScooters(response.data);
                setId(response.data._id);
            })
            .catch((error) => console.log("error " + error));
    }, []);
    return (
        <View>
            {scooters.map((scooter) => (
                <Marker
                    key={scooter._id}
                    coordinate={{
                        latitude: scooter.latitude,
                        longitude: scooter.longitude,
                    }}
                    onPress={() => {
                        onScooterPress(scooter), storeId(scooter._id);
                    }}
                />
            ))}
        </View>
    )
}

export default Scooter