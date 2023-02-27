import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Map from '../screens/Map';
import RegisterScreen from '../screens/RegisterScreen';
import LoginScreen from '../screens/LoginScreen';
const Stack = createNativeStackNavigator();
const RootStack = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {/* <Stack.Screen name='Home' component={Home} /> */}
                <Stack.Screen name='Register' component={RegisterScreen} />
                <Stack.Screen name='LoginScreen' component={LoginScreen} />
                {/* <Stack.Screen name='Map' component={Map} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default RootStack