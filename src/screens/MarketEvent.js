import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button, Card } from 'react-native-paper';

const MarketEvent = () => {
  const navigation = useNavigation();
  const [marketEvents,setMarketEvents]=useState([]);

  useEffect(()=>{
    const fetchDataPublications = async () => {
      try {
        const response = await fetch(`https://appmagriculturabackend-production.up.railway.app/api/v1/publications/search-publication/type/Mercado`);
        const jsonData = await response.json();
        setMarketEvents(jsonData);
      } catch (error) {
        console.error('Error fetching data2:', error);
      }
    };
    fetchDataPublications()
  },[]);
  
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 70, marginBottom:20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Eventos de Mercado</Text>
        <ScrollView horizontal={false} style={{height:650,width:300}}>
	        {marketEvents && marketEvents.length > 0 ? (
		        marketEvents.map((marketE) => (
			          <Card key={marketE._id} style={{marginBottom:20}}>
          			  <Card.Content>
            				<Text variant="bodyMedium" style={{fontWeight: 'bold', fontSize: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>{"Nombre Evento: " + marketE.title}</Text>
          			  </Card.Content>
          			  <Card.Content>
            				<Text variant="bodyMedium" style={{fontWeight: 'bold', fontSize: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>{"Tipo Evento: " + marketE.typePublication}</Text>
          			  </Card.Content>
          			  <Card.Content>
            				<Text variant="bodyMedium" style={{fontWeight: 'bold', fontSize: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>{"Descripcion: " + marketE.description}</Text>
          			  </Card.Content>
                  <Card.Cover source={{ uri:  `${marketE.avatar}`}} />
        		    </Card>
		        ))
	        ) : (
		        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 120, marginBottom:80, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>No hay eventos Disponibles</Text>
        	)}
        </ScrollView>
        <TouchableOpacity onPress={() => {
                navigation.navigate("EventsSlide");
                }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Regresar</Text>
          </TouchableOpacity>
    </View>
  )
}

export default MarketEvent
