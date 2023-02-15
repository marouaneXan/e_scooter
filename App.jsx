import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux'
import { store } from './app/store';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootStack from './navigatores';

export default function App() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <RootStack />
      </SafeAreaProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});