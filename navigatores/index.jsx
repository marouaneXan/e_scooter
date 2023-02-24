import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Map from '../screens/Map';
const Stack = createNativeStackNavigator();
const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name='Home' component={Home} />
                {/* <Stack.Screen name='Map' component={Map} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default RootStack