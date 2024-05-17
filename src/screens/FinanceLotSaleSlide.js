import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';

const FinanceLotSaleSlide = () => {
    const navigation = useNavigation();
    const [userData,setUserData]=useState("");
    const [userFarms,setUserFarms]=useState([]);
    const [lotsFarm,setLotFarms] = useState([]);
    const [salesLot,setSalesLot] = useState([]);
    const [valueFarm,setValueFarm] = useState(null);
    const [valueLot,setValueLot]=useState(null);
    const [valueTotalAgain,setValueTotalAgain] = useState(null);
    const [newSale, setNewSale] = useState({
      nameSale: "",
      quantity: "",
      unitSale: "",
      valueSale: 0,
      dateSale: Date.now(),
      saleLot: "",
    });

    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisibleTwo,setModalVisibleTwo]=useState(false);

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

    const handleFarm = async (valueFarm) =>{
        try{
            const response = await fetch(`https://appmagriculturabackend-production.up.railway.app/api/v1/farms/${valueFarm}/lots`);
            const jsonData = await response.json();
            setLotFarms(jsonData);
        }catch(error){
            console.log(error);
        }
    }

    const farmOptions = userFarms.map(farm => ({ label: farm.nameFarm, value: farm._id}));
    const lotOptions = lotsFarm.map(lot => ({ label: lot.lotType, value: lot._id}));

    const handleLot = async (valueLot) =>{
        try{
            const response = await fetch(`https://appmagriculturabackend-production.up.railway.app/api/v1/lots/${valueLot}/sales`);
            const jsonData = await response.json();
            setSalesLot(jsonData);
        }catch(error){
            console.log(error);
        }
    }

    const handleLotTwo = async (valueLot) =>{
        try{
            const response = await fetch(`https://appmagriculturabackend-production.up.railway.app/api/v1/lots/${valueLot}/total-gain-value`);
            const jsonData = await response.json();
            setValueTotalAgain(jsonData);
        }catch(error){
            console.log(error);
        }
    }

    const handleSubmit = async () =>{
        console.log(newSale)
        try{
            const response = await axios.post(`https://appmagriculturabackend-production.up.railway.app/api/v1/sales/new-sale`, newSale);
            console.log(response.data);
            Alert.alert("Felicidades Creaste una venta para el lote, Mira la lista de ventas");
        }catch(error){
            console.error(error);
            Alert.alert("Lo sentimos no pudiste crear tu venta para el lote en AgriAmigo");
        }
    }
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
          <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 70, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Ventas</Text>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
          <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 30, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Selecciona Finca</Text>
          <Dropdown 
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={farmOptions}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Selecciona Finca"
                value={valueFarm}
                onChange={item => {
                  setValueFarm(item.value);
                  console.log(item.value)
                  handleFarm(item.value) 
                }}
           />
           <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 30, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Selecciona Lote</Text>
           <Dropdown 
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={lotOptions}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Selecciona Finca"
                value={valueLot}
                onChange={item => {
                  setValueLot(item.value);
                  console.log(item.value);
                  handleLot(item.value);
                  handleLotTwo(item.value);
                  setNewSale({...newSale, saleLot: item.value});
                }}
            />
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
          <TouchableOpacity onPress={()=>setModalVisible(true)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Acceder Formulario Venta</Text>
          </TouchableOpacity>
          <Modal visible={modalVisible} onRequestClose={()=>setModalVisible(false)} >
            <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
                <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                    <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 100, marginBottom: 50, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Registro Venta para lote</Text>
                </View>
                <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nombre Venta"
                        onChangeText={(name_event_text) =>{
                            console.log("Nombre Venta",name_event_text);
                            setNewSale({...newSale, nameSale: name_event_text});
                         }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Cantidad Venta"
                        onChangeText={(quantity_event_text) =>{
                            console.log("Cantidad Venta",quantity_event_text);
                            setNewSale({...newSale, quantity: quantity_event_text});
                         }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Unidad Venta"
                        onChangeText={(unit_event_text) =>{
                            console.log("Cantidad Venta",unit_event_text);
                            setNewSale({...newSale, unitSale: unit_event_text});
                        }}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Valor Venta"
                        keyboardType="numeric"
                        onChangeText={(sale_value_text) => {
                            const valueSale = parseFloat(sale_value_text);
                            if (!isNaN(valueSale)) {
                                console.log("Valor Gasto", valueSale);
                                setNewSale({...newSale, valueSale: valueSale});
                            } else {
                                console.log("Entrada no válida");
                            }
                        }}
                    />
                </View>
                <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                    <Pressable onPress={handleSubmit} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}} >
                      <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Crear venta</Text>
                    </Pressable>
                    <Pressable style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:10}} onPress={()=>{setModalVisible(false);}}>
                      <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Regresar</Text>
                    </Pressable>
                </View>
            </View>
          </Modal>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
          <TouchableOpacity onPress={()=>setModalVisibleTwo(true)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Ver Lista de Ventas</Text>
          </TouchableOpacity>
          <Modal visible={modalVisibleTwo} onRequestClose={()=>setModalVisibleTwo(false)} >
            <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
              <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 60, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Tus gastos</Text>
              <ScrollView horizontal={true} style={{width:300}}>
              {salesLot && salesLot.length > 0 ? (
		        salesLot.map((saleLot) => (
			          <Card key={saleLot._id} style={{marginBottom:20}}>
          			  <Card.Content>
            				<Text variant="bodyMedium" style={{fontWeight: 'bold', fontSize: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>{"Nombre Venta: "+saleLot.nameSale}</Text>
          			  </Card.Content>
          			  <Card.Content>
            				<Text variant="bodyMedium" style={{fontWeight: 'bold', fontSize: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>{"Valor Venta: "+saleLot.valueSale}</Text>
          			  </Card.Content>
          			  <Card.Content>
            				<Text variant="bodyMedium" style={{fontWeight: 'bold', fontSize: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>{"Fecha Venta: "+saleLot.dateSale.split('T')[0]}</Text>
          			  </Card.Content>
        		    </Card>
		        ))
	        ) : (
		        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 120, marginBottom:80, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>No hay ventas Disponibles</Text>
        	)}
              </ScrollView>
            </View>
            <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
              <Pressable style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:10}} onPress={()=>{setModalVisibleTwo(false);}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:15}}>Regresar</Text>
              </Pressable>
            </View>
          </Modal>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
          <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Esto ha ganado el lote</Text>
          <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>({JSON.stringify(valueTotalAgain)})</Text>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
          <TouchableOpacity onPress={() => {
                navigation.navigate("FinanceLotSlide");
                }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Regresar</Text>
          </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 10,
        paddingVertical: 5,
        paddingHorizontal: 60,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3,
        fontSize:20
      },
      dropdown: {
        margin: 16,
        height: 50,
        backgroundColor: 'white',
        borderRadius: 12,
        padding: 12,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
  
        elevation: 2,
      },
      icon: {
        marginRight: 5,
      },
      item: {
        padding: 17,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      textItem: {
        flex: 1,
        fontSize: 16,
      },
      placeholderStyle: {
        fontSize: 16,
      },
      selectedTextStyle: {
        fontSize: 16
      },
      iconStyle: {
        width: 100,
        height: 20,
      },
      inputSearchStyle: {
        height: 40,
        fontSize: 16,
      },
})

export default FinanceLotSaleSlide
