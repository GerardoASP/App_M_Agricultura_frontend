import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list';
import { TextInput } from 'react-native-gesture-handler'

const RegisterSlide = () => {
  //Código Adicional
  const navigation = useNavigation();
  const [selected,setSelected] = useState("");
  const data = [
    {key:'1',value:'C.C'},
    {key:'2',value:'C.E'},
    {key:'3',value:'T.I'}
  ]
  //
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 100, marginBottom: 50, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Registro</Text>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TextInput
                style={styles.input}
                placeholder="Nombre(s)"
            />
            <TextInput
                style={styles.input}
                placeholder="Apellido(s)"
            />
            <TextInput
                style={styles.input}
                placeholder="Telefono"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
            />
            <SelectList 
                setSelected={(val) => setSelected(val)} 
                data={data} 
                save="value"
                placeholder="Tipo de Documento"
            />
            <TextInput
                style = {{marginBottom: 30,
                    paddingVertical: 5,
                    paddingHorizontal: 60,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    borderRadius: 3,
                    marginVertical:25,
                    fontSize:20
                }}
                placeholder="documento"
            />
             <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("LoginSlide");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                    <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Crear Cuenta</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("WelcomeSlide");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold'}}>
                    <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Cancelar</Text>
                </TouchableOpacity>
             </View>
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
        fontSize:20
      }
})

export default RegisterSlide
