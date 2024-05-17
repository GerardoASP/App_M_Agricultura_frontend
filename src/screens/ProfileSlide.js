import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { Card } from 'react-native-paper';


const ProfileSlide = () => {
  const navigation = useNavigation();
  const [userData,setUserData]=useState("");

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


  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 50, marginBottom: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Perfil</Text>
            <Card style={{marginTop:40,width:300}}>
              <Card.Title title={`Nombre Usuario: ${userData.firstname} `} subtitle={`${userData.lastname}`} />
              <Card.Content>
                <Text variant="titleLarge">{`Correo Electronico : ${userData.email}`}</Text>
                <Text variant="bodyMedium">{`Telefono : ${userData.phone}`}</Text>
              </Card.Content>
              <Card.Cover source={require('../../assets/images/draw_farm.png')} />
            </Card>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TouchableOpacity onPress={() => {
                navigation.navigate("HomeSlide");
                }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Regresar</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default ProfileSlide
