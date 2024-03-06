import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, Card } from 'react-native-paper'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const ListFarmsSlide = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 260, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Mis fincas</Text>
        <Card style={{marginTop:80}}>
            <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent}/>
            <Card.Content>
                <Text variant="titleLarge">Card title</Text>
                <Text variant="bodyMedium">Card content</Text>
            </Card.Content>
            <Card.Cover source={{ uri: 'https://w7.pngwing.com/pngs/338/595/png-transparent-farm-cartoon-drawing-illustration-cartoon-illustration-farm-cartoon-character-other-leaf.png' }} />
            <Card.Actions>
                <TouchableOpacity style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                    <Text style={{ color: '#FFF',fontWeight: 'bold'}}>Cambiar Información</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                    <Text style={{ color: '#FFF',fontWeight: 'bold'}}>Eliminar Finca</Text>
                </TouchableOpacity>
            </Card.Actions>
        </Card>
        <TouchableOpacity onPress={() => {
                    navigation.navigate("OptionsFarmSlide");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginVertical:20}}>
            <Text style={{ color: '#FFF',fontWeight: 'bold'}}>Regresar</Text>
        </TouchableOpacity>
    </View>
  )
}

export default ListFarmsSlide
