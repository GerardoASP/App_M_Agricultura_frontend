import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { Text, TouchableOpacity, View } from 'react-native';

const OptionsAddMyEventsSlide = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 260, fontFamily: 'San Francisco', fontFamily: 'Roboto',fontSize: 34}}>¿Como quieres agregar tu evento?</Text>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TouchableOpacity onPress={() => {
                    navigation.navigate("RegisterEventWithPhoto");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold',fontSize: 25}}>Con Foto</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TouchableOpacity onPress={() => {
                    navigation.navigate("RegisterEventWithoutPhoto");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold',fontSize: 25}}>Sin Foto</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TouchableOpacity onPress={() => {
                    navigation.navigate("MyEventsSlide");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold',fontSize: 25}}>Regresar</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default OptionsAddMyEventsSlide
