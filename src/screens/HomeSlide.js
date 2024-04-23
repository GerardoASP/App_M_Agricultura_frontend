import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeSlide = () => {
  const navigation = useNavigation();

  const handleLogout = async () => {
    // Elimina el token de acceso y realiza cualquier otra lógica de cierre de sesión necesaria
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('verifyCode');
    await AsyncStorage.clear();
    navigation.navigate('WelcomeSlide'); // Redirige al usuario a la pantalla de inicio de sesión
  };
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: "center"}}>
            <TouchableOpacity onPress={handleLogout} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:120, marginRight:200}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold',fontSize:16}}>Cerrar Sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                    navigation.navigate("ProfileSlide");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold'}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:16}}>Perfil</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TouchableOpacity onPress={() => {
                    navigation.navigate("EventsSlide");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginBottom:80}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:30}}>Eventos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                    navigation.navigate("OptionsSlide");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',  marginBottom:80}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold',fontSize:30}}>Inventario</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                    navigation.navigate("FinanceSlide");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',  marginBottom:80}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold',fontSize:30}}>Finanzas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                    navigation.navigate("TutorialSlide");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',  marginBottom:80}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold',fontSize:30}}>Tutorial</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default HomeSlide
