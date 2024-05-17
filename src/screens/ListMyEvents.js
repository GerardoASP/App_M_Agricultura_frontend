import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Card } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';

const ListMyEvents = () => {  
  const navigation = useNavigation();
  const [selected,setSelected] = useState("");
  const [userData, setUserData] = useState('');
  const [image, setImage] = useState(null);
  const [newTitle, setNewTitle] = useState({
    title: "",
    description:"", 
    typePublication:"",
    author: "",
    avatar:"",
  });
  const [deleteTitle,setDeleteTitle]= useState({
    userId:"",
  })
  const [keepAvatar,setKeepAvatar] = useState({
    avatarKeep : ""
  })
  const data = [
    {key:'1',value:'Mercado'},
    {key:'2',value:'Capacitacion'}
  ]

  const [publications,setPublications] = useState([]);
  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisibleTwo,setModalVisibleTwo]=useState(false);

  useEffect(()=>{
    const fetchDataUserByType = async () => {
      try {
        const verifyCode = await AsyncStorage.getItem('verifyCode');
        //console.log(verifyCode);
        const response = await fetch(`http://192.168.1.4:3000/api/v1/users/get-user-by-verify-code/${verifyCode}`);
        const jsonData = await response.json();
        setUserData(jsonData);
        //console.log("Ahhh",jsonData)
        //console.log('Funciona', userData)
      } catch (error) {
        console.error('Error fetching data2:', error);
      }
    };
    fetchDataUserByType();
    // Establecer un temporizador para actualizar automáticamente cada 1 segundo
    const intervalId = setInterval(() => {
      fetchDataUserByType();
    }, 1000); // 1 segundos

    // Limpiar el temporizador al desmontar el componente
    return () => clearInterval(intervalId);
},[]);

useEffect(() => {
  if (userData) {
    setNewTitle(prevState => ({
      ...prevState,
      author: userData._id // Actualizar author cuando userData esté disponible
    }));
    setDeleteTitle(prevState =>({
      ...prevState,
      userId:userData._id
    }))
  }
}, [userData]);

useEffect(() => {
  if (userData && userData._id) {
    fetch(`http://192.168.1.4:3000/api/v1/users/${userData._id}/publications`)
      .then(response => response.json())
      .then(data => {
        //console.log('Publications Data:', data); // Verifica los datos de las publicaciones recibidos
        setPublications(data);
      })
      .catch(error => console.error('Error fetching publications:', error));
  }
}, [userData]);

const handleKeepPhoto = async (idPublication) =>{
  try{
    const response = await fetch(`http://192.168.1.4:3000/api/v1/publications/${idPublication}`);
    const jsonData = await response.json();
    console.log(jsonData.avatar)
    setNewTitle(prevState => ({
      ...prevState,
      avatar: jsonData.avatar // Actualizar author cuando userData esté disponible
    }));
    //console.log(response.data);
    Alert.alert("Listo, No se cambiara la foto");
  }catch(error){
    console.error(error);
  }
}

const handleUpdateEvent = async (idPublication) =>{
  try{
      const response = await axios.put(`http://192.168.1.4:3000/api/v1/publications/${idPublication}/updatePost`, newTitle);
      //console.log(response.data);
      Alert.alert("Actualización exitosa");
  }catch(error){
      console.error(error);
  }
}

const handleDeleteEvent = async (idPublication) =>{
  try{
    console.log(idPublication)
    console.log(newTitle.author)
    const response = await axios.delete(`http://192.168.1.4:3000/api/v1/publications/${idPublication}`,{
      data: {
        userId: userData._id // Aquí deberías usar userData._id en lugar de userData.author si _id es el campo correcto que representa el userId
      }
    });
    Alert.alert("Evento Eliminado Exitosamente");
  }catch(error){
    console.error(error);
  }
}

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
    setNewTitle(prevState => ({
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
    setNewTitle(prevState => ({
      ...prevState,
      avatar: result.assets[0].uri 
    }));
  }
};

  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 70, marginBottom:20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Estos son tus eventos</Text>
        <ScrollView horizontal={false} style={{height:650,width:300}}>
	        {publications && publications.length > 0 ? (
		        publications.map((personalE) => (
			          <Card key={personalE._id} style={{marginBottom:20}}>
          			  <Card.Content>
            				<Text variant="bodyMedium" style={{fontWeight: 'bold', fontSize: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>{"title " + personalE.title}</Text>
          			  </Card.Content>
          			  <Card.Content>
            				<Text variant="bodyMedium" style={{fontWeight: 'bold', fontSize: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>{"type " + personalE.typePublication}</Text>
          			  </Card.Content>
          			  <Card.Content>
            				<Text variant="bodyMedium" style={{fontWeight: 'bold', fontSize: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>{"Descrip " + personalE.description}</Text>
          			  </Card.Content>
                  <Card.Cover source={{ uri:  `${personalE.avatar}`}} />
                        <Card.Actions>
                          <Button onPress={()=>setModalVisible(true)}> Cambiar Información</Button>
                          <Modal visible={modalVisible} onRequestClose={()=>setModalVisible}>
                            <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
                              <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                                <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 100, marginBottom: 50, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Actualizar Evento</Text>
                              </View>
                              <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                                <TextInput
                                  style={styles.input}
                                  placeholder="Nombre Evento"
                                  onChangeText={(name_event_text) =>{
                                  console.log("Nombre Evento",name_event_text);
                                  setNewTitle({...newTitle, title: name_event_text});
                                  }}
                                />
                                <TextInput
                                  style={styles.input}
                                  placeholder="Descripcion Evento"
                                  onChangeText={(d_event_text) =>{
                                  console.log("Descripcion Evento",d_event_text);
                                  setNewTitle({...newTitle, description: d_event_text});
                                  }}
                                />
                                <SelectList 
                                  setSelected={(val) => {
                                  setSelected(val); // Actualiza el estado con el valor seleccionado
                                  console.log("Valor seleccionado:", val); // Imprime el valor seleccionado por consola
                                  setNewTitle({...newTitle, typePublication: val});
                                  }} 
                                  data={data} 
                                  save="value"
                                  placeholder="Tipo de Evento"
                                />
                              </View>
                              <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: "center"}}>
                                <TouchableOpacity  onPress={pickImage} style={{ shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign: 'center', fontWeight: 'bold', marginVertical: 20 }}>
                                  <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 25 }}>Seleccionar Foto</Text>
                                </TouchableOpacity>
                                <TouchableOpacity  onPress={takeImage} style={{ shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign: 'center', fontWeight: 'bold', marginVertical: 20 }}>
                                  <Text style={{ color: '#FFF', fontWeight: 'bold', fontSize: 25 }}>Tomar Foto</Text>
                                </TouchableOpacity>
                                {image && <Image source={{ uri: image }} style={styles.image} />}
                              </View>

                              <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: "center"}}>
                                <TouchableOpacity onPress={()=>handleKeepPhoto(personalE._id)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                                  <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:10}}>Mantener foto</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>handleUpdateEvent(personalE._id)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                                  <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:10}}>Cambiar Nombre Evento</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>setModalVisible(false)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                                  <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:10}}>Regresar</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </Modal>
                        </Card.Actions>
                        <Card.Actions>
                          <Button onPress={()=>setModalVisibleTwo(true)}>Eliminar Evento</Button>
                          <Modal visible={modalVisibleTwo} onRequestClose={()=>setModalVisibleTwo}>
                            <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
                              <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                                <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 100, marginBottom: 50, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>¿Quieres Eliminar este evento?</Text>
                              </View>
                              <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                                <TouchableOpacity onPress={()=>handleDeleteEvent(personalE._id)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                                  <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Si</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={()=>setModalVisibleTwo(false)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                                  <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>No</Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </Modal>
                        </Card.Actions>
        		    </Card>
		        ))
	        ) : (
		        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 120, marginBottom:80, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>No hay eventos Disponibles</Text>
        	)}
        </ScrollView>
        <TouchableOpacity onPress={() => {
                navigation.navigate("MyEventsSlide");
                }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Regresar</Text>
          </TouchableOpacity>
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
    }
})

export default ListMyEvents
