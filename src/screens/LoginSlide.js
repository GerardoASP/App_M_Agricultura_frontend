import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const LoginSlide = () => {
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 100, marginBottom: 50, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Inicio de Sesión</Text>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TextInput
                style={styles.input}
                placeholder="Telefono"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
            />
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                <TouchableOpacity style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                    <Text style={{ color: '#FFF',fontWeight: 'bold'}}>Aceptar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold'}}>
                    <Text style={{ color: '#FFF',fontWeight: 'bold'}}>Cancelar</Text>
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
    }
})

export default LoginSlide
