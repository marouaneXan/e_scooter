import { View } from 'react-native'
import React, { useEffect, useState } from "react";
import { Marker } from "react-native-maps";
import Constants from "expo-constants";

const Scooter = () => {
    const [scooters, setScooters] = useState([]);
    const [id, setId] = useState(null);
    const apiUrl = Constants.expoConfig.extra.apiUrl;
    useEffect(() => {
        fetch('http://localhost:5000/client/allScooters')
            .then(response => response.json())
            .then(data => {
                setScooters(data);
                setId(data._id);
            })
            .catch(error => console.log("error " + error));
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