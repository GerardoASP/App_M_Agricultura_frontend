import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Alert, Text, TouchableOpacity, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const LoginSlide = () => {
  const navigation = useNavigation();

  const [newUser, setNewUser] = useState({
    phone: "",
    password: "",
  });

  const handleCancel = () => {
    navigation.navigate('WelcomeSlide');
  };
  
  const handleLogin = async () => {
    try {
      const { phone, password } = newUser;
  
      if (!phone || !password) {
        Alert.alert("Error", "El telefono y la contraseña son obligatorios.");
        return;
      }
  
      console.log(newUser);
  
      const response = await axios.post("http:///192.168.1.4:3000/api/v1/auth/login", newUser);
  
      console.log(response.data);
  
      const { accessToken, refreshToken,verifyCode } = response.data;
  
      // Almacena los tokens de acceso y refresco
      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);
      await AsyncStorage.setItem("verifyCode",verifyCode);
      
      Alert.alert("Inicio de sesión exitoso", "¡Bienvenido! Por favor, dale OK para continuar.");
      navigation.navigate("HomeSlide");
    } catch (error) {
      console.error("Error de inicio de sesión:", error);

      if (error.response) {
        // El servidor devolvió una respuesta con un código de estado que no es 2xx
        Alert.alert("Error", `Error del servidor: ${error.response.data.msg}`);
      } else if (error.request) {
        // La solicitud fue realizada pero no se recibió respuesta
        Alert.alert("Error", "No se recibió respuesta del servidor. Por favor, inténtalo de nuevo.");
      } else {
        // Error al configurar la solicitud o durante la configuración
        Alert.alert("Error", "Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo.");
      }
  
      navigation.navigate("WelcomeSlide");
    }
  };

  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 100, marginBottom: 50, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Inicio de Sesión</Text>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TextInput
                style={styles.input}
                placeholder="Telefono"
                onChangeText={(phone_text) =>{
                    console.log("Telefono ",phone_text);
                    setNewUser({...newUser, phone: phone_text});
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                onChangeText={(password_text) =>{
                    console.log("Contraseña ",password_text);
                    setNewUser({...newUser, password: password_text});
                }}
            />
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                <TouchableOpacity onPress={handleLogin} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                    <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold'}}>
                    <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Regresar</Text>
                </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 30,
        paddingVertical: 5,
        paddingHorizontal: 60,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3,
        fontSize:25
    }
})

export default LoginSlide
