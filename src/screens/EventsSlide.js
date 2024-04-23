import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const EventsSlide = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 100, marginBottom: 50, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Eventos</Text>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
          <TouchableOpacity style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginBottom:80}}>
            <Text onPress={() => {
                navigation.navigate("MarketEvent");
                }} style={{ color: '#FFF',fontWeight: 'bold', fontSize:30}}>MERCADO</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
                navigation.navigate("CapacitationEvent");
                }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginBottom:80}}>
            <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:30}}>CAPACITACIONES</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
                navigation.navigate("MyEventsSlide");
                }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginBottom:80}}>
            <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:30}}>MIS EVENTOS</Text>
          </TouchableOpacity>
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

export default EventsSlide
