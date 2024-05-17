import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list';
import { TextInput } from 'react-native-gesture-handler'
import axios from 'axios';

const RegisterSlide = () => {
  //Código Adicional
  const navigation = useNavigation();
  const [selected,setSelected] = useState("");
  const data = [
    {key:'1',value:'C.C'},
    {key:'2',value:'C.E'},
    {key:'3',value:'T.I'}
  ]
  const [newUser, setNewUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    password: "",
    document_type: "",
    document: "",
  });

  
  const handleCancel = () => {
    navigation.navigate('WelcomeSlide');
  };

  const handleSubmit = async () =>{
    try{
        console.log(newUser);
        const response = await axios.post('https://appmagriculturabackend-production.up.railway.app/api/v1/auth/register', newUser);
        console.log(response.data);
        navigation.navigate('LoginSlide');
    }catch(error){
        console.error(error);
    }
  }
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
                onChangeText={(name_text) =>{
                    console.log("Nombre ",name_text);
                    setNewUser({...newUser, firstname: name_text});
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Apellido(s)"
                onChangeText={(lastname_text) =>{
                    console.log("Apellido ",lastname_text);
                    setNewUser({...newUser, lastname: lastname_text});
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="email"
                onChangeText={(email_text) =>{
                    console.log("Email ",email_text);
                    setNewUser({...newUser, email: email_text});
                }}
            />
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
            <SelectList 
                setSelected={(val) => {
                    setSelected(val); // Actualiza el estado con el valor seleccionado
                    console.log("Valor seleccionado:", val); // Imprime el valor seleccionado por consola
                    setNewUser({...newUser, document_type: val});
                }} 
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
                onChangeText={(document_text) =>{
                    console.log("Documento",document_text);
                    setNewUser({...newUser, document: document_text});
                }}
            />
             <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                <TouchableOpacity onPress={handleSubmit} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                    <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Crear Cuenta</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleCancel} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold'}}>
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
