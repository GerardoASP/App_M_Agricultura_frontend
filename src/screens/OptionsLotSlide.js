import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const OptionsLotSlide = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 260, fontFamily: 'San Francisco', fontFamily: 'Roboto',fontSize: 34}}>¿Que quieres hacer?</Text>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TouchableOpacity style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold',fontSize:25}}>Agregar Lote</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TouchableOpacity onPress={() => {
                    navigation.navigate("ListLotsSlide");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold',fontSize:25}}>Ver Lista Lotes</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TouchableOpacity onPress={() => {
                    navigation.navigate("OptionsSlide");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold',fontSize:25}}>Regresar</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default OptionsLotSlide
