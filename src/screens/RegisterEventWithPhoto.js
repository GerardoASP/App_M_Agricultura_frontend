import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Image, ImagePickerIOS } from 'react-native';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';

const RegisterEventWithPhoto = () => {
  const navigation = useNavigation();
  const [selected,setSelected] = useState("");
  const [userData,setUserData]=useState("");
  const [image, setImage] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    description: "",
    typePublication: "",
    author: "",
    avatar:""
  });
  const data = [
    {key:'1',value:'Mercado'},
    {key:'2',value:'Capacitacion'}
  ]
  useEffect(()=>{
    const fetchDataUserByType = async () => {
    try {
        const verifyCode =  await AsyncStorage.getItem('verifyCode');
        //console.log(verifyCode);
        const response = await fetch(`https://appmagriculturabackend-production.up.railway.app/api/v1/users/get-user-by-verify-code/${verifyCode}`);
        const jsonData = await response.json();
        setUserData(jsonData);
        //console.log(userData._id);
    } catch (error) {
        console.error('Error fetching data2:', error);
    }
    };
    fetchDataUserByType();
    // Establecer un temporizador para actualizar automáticamente cada 1 segundo
    const intervalId = setInterval(() => {
    fetchDataUserByType();
    //console.log(userData)
    }, 1000); // 1 segundos

    // Limpiar el temporizador al desmontar el componente
    return () => clearInterval(intervalId);
},[]);

useEffect(() => {
    if (userData) {
      setNewEvent(prevState => ({
        ...prevState,
        author: userData._id // Actualizar author cuando userData esté disponible
      }));
    }
}, [userData]);

const takeImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setNewEvent(prevState => ({
        ...prevState,
        avatar: result.assets[0].uri 
      }));
    }
  };

const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setNewEvent(prevState => ({
        ...prevState,
        avatar: result.assets[0].uri 
      }));
    }
  };

const handleCancel = () => {
    navigation.navigate('OptionsAddMyEventsSlide');
};

const handleSubmit = async () =>{
    try{
        console.log(newEvent);
        const response = await axios.post('https://appmagriculturabackend-production.up.railway.app/api/v1/publications/new-publication', newEvent);
        console.log(response.data);
        Alert.alert("Felicidades Creaste una publicacion, Mira la lista de eventos");
    }catch(error){
        console.error(error);
        Alert.alert("Lo sentimos no pudiste crear tu publicacion");
    }
}



  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 100, marginBottom: 50, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Registro Evento</Text>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TextInput
                style={styles.input}
                placeholder="Nombre Evento"
                onChangeText={(name_event_text) =>{
                    console.log("Nombre Evento",name_event_text);
                    setNewEvent({...newEvent, title: name_event_text});
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción Evento"
                onChangeText={(description_event_text) =>{
                    console.log("Descripcion Evento",description_event_text);
                    setNewEvent({...newEvent, description: description_event_text});
                }}
            />
            <SelectList 
                setSelected={(val) => {
                    setSelected(val); // Actualiza el estado con el valor seleccionado
                    console.log("Valor seleccionado:", val); // Imprime el valor seleccionado por consola
                    setNewEvent({...newEvent, typePublication: val});
                }} 
                data={data} 
                save="value"
                placeholder="Tipo de Evento"
            />
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TouchableOpacity  onPress={pickImage} style={{ shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign: 'center', fontWeight: 'bold', marginVertical: 20 }}>
                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 25 }}>Seleccionar Foto</Text>
            </TouchableOpacity>
            <TouchableOpacity  onPress={takeImage} style={{ shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign: 'center', fontWeight: 'bold', marginVertical: 20 }}>
                <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 25 }}>Tomar Foto</Text>
            </TouchableOpacity>
            {image && <Image source={{ uri: image }} style={styles.image} />}
        </View>
        <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: "center"}}>
            <TouchableOpacity style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text onPress={handleSubmit} style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Crear Evento</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20, marginLeft:40}}>
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
        fontSize:20
      },
      image: {
        width: 200,
        height: 200,
      },
})

export default RegisterEventWithPhoto
