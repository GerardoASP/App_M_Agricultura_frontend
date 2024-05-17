import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Button, Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, Card } from 'react-native-paper'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const ListFarmsSlide = () => {
  const navigation = useNavigation();
  const [userData,setUserData]=useState("");
  const [userFarms,setUserFarms]=useState([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisible2, setModalVisible2] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const [newFarm, setNewFarm] = useState({
    nameFarm: "",
    lineFarm: "",
    area: "",
    predialValue: "",
    services:[],
    farmUser:""
  });

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
            setNewFarm(prevState => ({
            ...prevState,
            farmUser: userData._id // Actualizar farmUser cuando userData esté disponible
          }));
        }
      }, [userData]);

    useEffect(() => {
        if (userData && userData._id) {
          fetch(`https://appmagriculturabackend-production.up.railway.app/api/v1/users/${userData._id}/farms`)
            .then(response => response.json())
            .then(data => {
              //console.log('Publications Data:', data); // Verifica los datos de las publicaciones recibidos
              setUserFarms(data);
            })
            .catch(error => console.error('Error fetching publications:', error));
        }
      }, [userData]);

      const handleWater = () => {
        console.log("Agua");
        Alert.alert("Ok, Servicio Agua Seleccionado");
        setNewFarm(prevFarm => ({
            ...prevFarm,
            services: Array.from(new Set([...prevFarm.services, "Agua"]))  // Usa un Set para evitar duplicados
        }));
    }

    const handleLight = () => {
        console.log("Luz");
        Alert.alert("Ok, Servicio Luz Seleccionado");
        setNewFarm(prevFarm => ({
            ...prevFarm,
            services: Array.from(new Set([...prevFarm.services, "Luz"]))  // Usa un Set para evitar duplicados
        }));
    }

    const handleGas = () => {
        console.log("Gas");
        Alert.alert("Ok, Servicio Gas Seleccionado");
        setNewFarm(prevFarm => ({
            ...prevFarm,
            services: Array.from(new Set([...prevFarm.services, "Gas"]))  // Usa un Set para evitar duplicados
        }));
    }

    const handleNotSelectService = () =>{
        Alert.alert("Ok, Servicio No Seleccionado");
    }

    const handleUpdateFarm = async (idFarm) =>{
        try{
            const response = await axios.put(`https://appmagriculturabackend-production.up.railway.app/api/v1/farms/update-farm/${idFarm}`, newFarm);
            //console.log(response.data);
            Alert.alert("Actualización exitosa");
        }catch(error){
            console.error(error);
        }
    }

    const handleDeleteFarm = async (idFarm) =>{
        try{
          console.log(idFarm)
          console.log(userData._id)
          const response = await axios.delete(`https://appmagriculturabackend-production.up.railway.app/api/v1/farms/${idFarm}`,{
            data: {
              userId: userData._id // Aquí deberías usar userData._id en lugar de userData.author si _id es el campo correcto que representa el userId
            }
          });
          Alert.alert("Finca Eliminada Exitosamente");
        }catch(error){
          console.error(error);
        }
    }


  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 60, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Mis fincas</Text>
        <ScrollView horizontal={false} style={{height:650,width:300}}>
        {userFarms && userFarms.length > 0 ? (
		        userFarms.map((userFarm) => (
			          <Card key={userFarm._id} style={{marginTop:40}}>
            <Card.Title title={"Nombre Finca: " + userFarm.nameFarm} subtitle={"Linea Finca: " + userFarm.lineFarm} left={LeftContent}/>
            <Card.Content>
                <Text variant="titleLarge">{"Area Finca: " + userFarm.area + " metros cuadrados"}</Text>
            </Card.Content>
            <Card.Actions>
                <TouchableOpacity onPress={()=>setModalVisible2(true)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                    <Text  style={{ color: '#FFF',fontWeight: 'bold'}}>Cambiar Información Finca</Text>
                </TouchableOpacity>
                <Modal visible={isModalVisible2} onRequestClose={()=>setModalVisible2(false)} >
                    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
                        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                            <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 80, marginBottom: 30, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Actualizar Finca</Text>
                        </View>
                        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                            <TextInput
                                style={styles.input}
                                placeholder="Nombre Finca"
                                onChangeText={(name_farm_text) =>{
                                    console.log("Nombre Finca",name_farm_text);
                                    setNewFarm({...newFarm, nameFarm: name_farm_text});
                                }}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Linea Finca"
                                onChangeText={(line_farm_text) =>{
                                    console.log("Linea Finca",line_farm_text);
                                    setNewFarm({...newFarm, lineFarm: line_farm_text});
                                }}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Area Finca"
                                onChangeText={(area_farm) =>{
                                    console.log("Area Finca",area_farm);
                                    setNewFarm({...newFarm, area: area_farm});
                                }}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Valor Predial"
                                onChangeText={(predial_farm) =>{
                                    console.log("Area Finca",predial_farm);
                                    setNewFarm({...newFarm, predialValue: predial_farm});
                                }}
                            />
                        </View>
                        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                            <Text style={{fontWeight: 'bold', fontSize: 24, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Servicios</Text>
                        </View>
                        <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: "center"}}>
                            <Text style={{fontWeight: 'bold', fontSize: 21, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>¿Tiene Agua (Acueducto)?</Text>
                            <Pressable  onPress={handleWater} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginLeft:15}}>
                                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:20}}>Si</Text>
                            </Pressable>
                            <Pressable onPress={handleNotSelectService} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginLeft:15}}>
                                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:20}}>No</Text>
                            </Pressable>
                        </View>
                        <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: "center"}}>
                            <Text style={{fontWeight: 'bold', fontSize: 21, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>¿Tiene Agua (Acueducto)?</Text>
                            <Pressable  onPress={handleLight} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginLeft:15}}>
                                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:20}}>Si</Text>
                            </Pressable>
                            <Pressable onPress={handleNotSelectService} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginLeft:15}}>
                                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:20}}>No</Text>
                            </Pressable>
                        </View>
                        <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: "center"}}>
                            <Text style={{fontWeight: 'bold', fontSize: 21, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>¿Tiene Agua (Acueducto)?</Text>
                            <Pressable  onPress={handleGas} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginLeft:15}}>
                                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:20}}>Si</Text>
                            </Pressable>
                            <Pressable onPress={handleNotSelectService} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginLeft:15}}>
                                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:20}}>No</Text>
                            </Pressable>
                        </View>
                        <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: "center"}}>
                            <Pressable onPress={()=>handleUpdateFarm(userFarm._id)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginRight:5,marginTop:20}}>
                                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:23}}>Actualizar Finca</Text>
                            </Pressable>
                            <Pressable onPress={()=>setModalVisible2(false)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginTop:20}}>
                                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:23}}>Regresar</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </Card.Actions>
            <Card.Actions>
                <TouchableOpacity onPress={()=>setModalVisible(true)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                    <Text  style={{ color: '#FFF',fontWeight: 'bold'}}>Eliminar </Text>
                </TouchableOpacity>
                <Modal visible={isModalVisible} onRequestClose={()=>setModalVisible(false)} >
                    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
                        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                            <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 100, marginBottom: 50, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>¿Quieres Eliminar esta finca?</Text>
                        </View>

                        <Pressable style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}} onPress={()=>handleDeleteFarm(userFarm._id)} >
                            <Text  style={{ color: '#FFF',fontWeight: 'bold',fontSize: 34}}>Si</Text>
                        </Pressable>

                        <Pressable style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}} onPress={()=>setModalVisible(false)} >
                            <Text  style={{ color: '#FFF',fontWeight: 'bold',fontSize: 34}}>No</Text>
                        </Pressable>
                    </View>
                </Modal>
            </Card.Actions>
        </Card>		        ))
	        ) : (
		        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 120, marginBottom:80, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>No hay fincas registradas </Text>
        	)}
        </ScrollView>
        
        <TouchableOpacity onPress={() => {
                    navigation.navigate("OptionsFarmSlide");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginVertical:20}}>
            <Text style={{ color: '#FFF',fontWeight: 'bold',fontSize: 34}}>Regresar</Text>
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
      }
})

export default ListFarmsSlide
