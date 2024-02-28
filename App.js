import { StyleSheet, Text, View } from 'react-native';
//Importando la clase createStachNavigator para navegar entre pantallas (app movil)
import { createStackNavigator } from '@react-navigation/stack';
//
import { NavigationContainer } from '@react-navigation/native';
import WelcomeSlide from './src/screens/WelcomeSlide';
import RegisterSlide from './src/screens/RegisterSlide';
import LoginSlide from './src/screens/LoginSlide';
import OptionsSlide from './src/screens/OptionsSlide';
import OptionsProductSlide from './src/screens/OptionsProductSlide';
import OptionsLotSlide from './src/screens/OptionsLotSlide';
import OptionsFarmSlide from './src/screens/OptionsFarmSlide';
import HomeSlide from './src/screens/HomeSlide';
import ListFarmsSlide from './src/screens/ListFarmsSlide';
import ListLotsSlide from './src/screens/ListLotsSlide';
import ListProductsSlide from './src/screens/ListProductsSlide';
import FinanceSlide from './src/screens/FinanceSlide';
import FinanceLotSlide from './src/screens/FinanceLotSlide';
import FinanceProductSlide from './src/screens/FinanceProductSlide';
import ProfileSlide from './src/screens/ProfileSlide';
import ServicesSlide from './src/screens/ServicesSlide';
import EventsSlide from './src/screens/EventsSlide';
import TutorialSlide from './src/screens/TutorialSlide';


//Instanciando el objeto de la clase createStachNavigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WelcomeSlide">
        <Stack.Screen name = "WelcomeSlide" component={WelcomeSlide} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name = "RegisterSlide" component={RegisterSlide} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name = "LoginSlide" component={LoginSlide} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name = "HomeSlide" component={HomeSlide} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name = "OptionsSlide" component={OptionsSlide} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name = "OptionsProductSlide" component={OptionsProductSlide} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name = "OptionsLotSlide" component={OptionsLotSlide} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name = "OptionsFarmSlide" component={OptionsFarmSlide} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name = "ListFarmsSlide" component={ListFarmsSlide} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name = "ListLotsSlide" component={ListLotsSlide} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name = "ListProductsSlide" component={ListProductsSlide} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name = "FinanceSlide" component={FinanceSlide} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name = "FinanceLotSlide" component={FinanceLotSlide} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name = "FinanceProductSlide" component={FinanceProductSlide} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name = "ProfileSlide" component={ProfileSlide} options={{ headerShown: false }}></Stack.Screen>
        <Stack.Screen name="ServicesSlide" component={ServicesSlide} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="EventsSlide" component={EventsSlide} options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen name="TutorialSlide" component={TutorialSlide} options={{headerShown: false}}></Stack.Screen>
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
