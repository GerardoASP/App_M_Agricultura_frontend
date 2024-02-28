import { useNavigation } from '@react-navigation/native';
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const OptionsSlide = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TouchableOpacity onPress={() => {
                    navigation.navigate("OptionsFarmSlide");
                    }}>
                <Image
                    source={require('../../assets/images/imagen_finca.jpg')}
                    style={{width:300, height:190, marginTop:80}} 
                />
                <Text style={{ color: 'black',fontWeight: 'bold', marginLeft:95, fontSize:30}}>Fincas</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                    navigation.navigate("OptionsLotSlide");
                    }}>
                <Image
                    source={require('../../assets/images/jardin_1308-3869.png')}
                    style={{width:300, height:190, marginTop:5}}
                />
                <Text style={{ color: 'black',fontWeight: 'bold', marginLeft:95, fontSize:30}}>Lotes</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                    navigation.navigate("OptionsProductSlide");
                    }}>
                <Image
                    source={require('../../assets/images/producto_campo.png')}
                    style={{width:300, height:190, marginTop:10}} 
                />
                <Text style={{ color: 'black',fontWeight: 'bold', marginLeft:85, fontSize:30}}>Productos</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                    navigation.navigate("HomeSlide");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:20}}>Regresar</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}



export default OptionsSlide
