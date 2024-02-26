import { StyleSheet, Text, View } from 'react-native';
//Importando la clase createStachNavigator para navegar entre pantallas (app movil)
import { createStackNavigator } from '@react-navigation/stack';
//
import { NavigationContainer } from '@react-navigation/native';
import OptionsProductSlide from './src/screens/OptionsProductSlide';






//Instanciando el objeto de la clase createStachNavigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="OptionsProductSlide">
        <Stack.Screen name = "OptionsProductSlide" component={OptionsProductSlide} options={{ headerShown: false }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
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
