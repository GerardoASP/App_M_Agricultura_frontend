import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';
const MyEventsSlide = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 100, marginBottom: 50, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Mis Eventos</Text>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("OptionsAddMyEventsSlide");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                    <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Agregar Mi Evento</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("ListMyEvents");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                    <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Lista de mis eventos</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.navigate("EventsSlide");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                    <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Regresar</Text>
                </TouchableOpacity>
            </View>
    </View>
  )
}

export default MyEventsSlide
