import React from 'react'
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const WelcomeSlide = () => {
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 260, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Bienvenido a _ su asistente de gestión del agro</Text>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 100, marginBottom: 30, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Servicios</Text>
            <TouchableOpacity style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold'}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold'}}>Ver Servicios</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 20, marginBottom: 30, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>¿No tienes una cuenta?</Text>
            <TouchableOpacity style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold'}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold'}}>Registrarse</Text>
            </TouchableOpacity>
        </View>
        <View>
            <Text style={{fontWeight: 'bold', fontSize: 24,  marginTop: 20, marginBottom: 30, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Si tienes cuenta</Text>
            <TouchableOpacity style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold'}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold'}}>Iniciar Sesión</Text>
            </TouchableOpacity> 
        </View>
    </View>
  )
}

export default WelcomeSlide
