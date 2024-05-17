import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';

const FinanceProductSpentSlide = () => {
    const navigation = useNavigation();
    const [userData,setUserData]=useState("");
    const [userFarms,setUserFarms]=useState([]);
    const [lotsFarm,setLotFarms] = useState([]);
    const [valueFarm,setValueFarm] = useState(null);
    const [valueLot,setValueLot]=useState(null);
    const [valueProduct,setValueProduct]=useState(null);
    const [valueTotalInvested,setValueTotalInvested] = useState(null);
    const [productsLot,setProductLot] = useState([]);
    const [spentsProduct,setSpentsProduct] = useState([]);
    const [newSpent, setNewSpent] = useState({
      nameSpent: "",
      valueSpent: 0,
      dateSpent: Date.now(),
      spentProduct: "",
    });

    const [modalVisible, setModalVisible] = useState(false)
    const [modalVisibleTwo,setModalVisibleTwo]=useState(false);

    useEffect(()=>{
        const fetchDataUserByType = async () => {
        try {
            const verifyCode =  await AsyncStorage.getItem('verifyCode');
            //console.log(verifyCode);
            const response = await fetch(`http://192.168.1.4:3000/api/v1/users/get-user-by-verify-code/${verifyCode}`);
            const jsonData = await response.json();
            setUserData(jsonData);
            //console.log(userData._id);
        } catch (error) {
            console.error('Error fetching user data:', error);
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
          fetch(`http://192.168.1.4:3000/api/v1/users/${userData._id}/farms`)
            .then(response => response.json())
            .then(data => {
              //console.log('Publications Data:', data); // Verifica los datos de las publicaciones recibidos
              setUserFarms(data);
            })
            .catch(error => console.error('Error fetching farms of user:', error));
        }
    }, [userData]);

    const handleFarm = async (valueFarm) =>{
        try{
            const response = await fetch(`http://192.168.1.4:3000/api/v1/farms/${valueFarm}/lots`);
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
            const response = await fetch(`http://192.168.1.4:3000/api/v1/lots/${valueLot}/products`);
            const jsonData = await response.json();
            setProductLot(jsonData);
        }catch (error) {
            console.error('Error fetching products of lot:', error);
        }
    }

    const productOptions = productsLot.map(product => ({ label: product.nameProduct, value: product._id}));

    const handleProduct = async (valueProduct) =>{
        try{
            const response = await fetch(`http://192.168.1.4:3000/api/v1/products/${valueProduct}/spents`);
            const jsonData = await response.json();
            setSpentsProduct(jsonData);
        }catch (error) {
            console.error('Error fetching spents of product:', error);
        }
    }

    const handleProductTwo = async (valueProduct) =>{
        try{
            const response = await fetch(`http://192.168.1.4:3000/api/v1/products/${valueProduct}/total-value-invested`);
            const jsonData = await response.json();
            setValueTotalInvested(jsonData);
        }catch (error) {
            console.error('Error fetching total value invested:', error);
        }
    }

    
    const handleSubmit = async () =>{
        console.log(newSpent)
        try{
            const response = await axios.post(`http://192.168.1.4:3000/api/v1/spents/new-spent-for-product`, newSpent);
            console.log(response.data);
            Alert.alert("Felicidades Creaste un gasto para el producto, Mira la lista de gastos");
        }catch(error){
            console.error(error);
            Alert.alert("Lo sentimos no pudiste crear tu gasto para el producto en AgriAmigo");
        }
    }

  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
          <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 60, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Gastos</Text>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
          <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Selecciona Finca</Text>
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
           <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Selecciona Lote</Text>
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
                }}
            />
            <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Selecciona Producto</Text>
            <Dropdown 
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                inputSearchStyle={styles.inputSearchStyle}
                iconStyle={styles.iconStyle}
                data={productOptions}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder="Selecciona Producto"
                value={valueProduct}
                onChange={item => {
                  setValueProduct(item.value);
                  console.log(item.value);
                  handleProduct(item.value);
                  handleProductTwo(item.value)
                  setNewSpent({...newSpent, spentProduct: item.value});
                }}
            />
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
          <TouchableOpacity onPress={()=>setModalVisible(true)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Acceder Formulario Gasto</Text>
          </TouchableOpacity>
          <Modal visible={modalVisible} onRequestClose={()=>setModalVisible(false)} >
            <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
              <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 100, marginBottom: 50, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Registro Gasto para lote</Text>
              </View>
              <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                <TextInput
                  style={styles.input}
                  placeholder="Nombre Gasto"
                  onChangeText={(name_event_text) =>{
                    console.log("Nombre gasto",name_event_text);
                    setNewSpent({...newSpent, nameSpent: name_event_text});
                  }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Valor Gasto"
                  keyboardType="numeric"
                  onChangeText={(spent_value_text) => {
                    const valueSpent = parseFloat(spent_value_text);
                    if (!isNaN(valueSpent)) {
                      console.log("Valor Gasto", valueSpent);
                      setNewSpent({...newSpent, valueSpent: valueSpent});
                    } else {
                      console.log("Entrada no válida");
                    }
                  }}
                />
              </View>
              <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                    <Pressable onPress={handleSubmit} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}} >
                      <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Crear gasto</Text>
                    </Pressable>
                    <Pressable style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:10}} onPress={()=>{setModalVisible(false);}}>
                      <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:15}}>Regresar</Text>
                    </Pressable>
                  </View>
            </View>
          </Modal>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
          <TouchableOpacity onPress={()=>setModalVisibleTwo(true)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:15}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Ver Lista de Gastos</Text>
          </TouchableOpacity>
          <Modal visible={modalVisibleTwo} onRequestClose={()=>setModalVisibleTwo(false)} >
            <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
              <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 60, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Tus gastos</Text>
              <ScrollView horizontal={true} style={{width:300}}>
              {spentsProduct && spentsProduct.length > 0 ? (
		        spentsProduct.map((spentProduct) => (
			          <Card key={spentProduct._id} style={{marginBottom:20}}>
          			  <Card.Content>
            				<Text variant="bodyMedium" style={{fontWeight: 'bold', fontSize: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>{"Nombre Gasto: "+spentProduct.nameSpent}</Text>
          			  </Card.Content>
          			  <Card.Content>
            				<Text variant="bodyMedium" style={{fontWeight: 'bold', fontSize: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>{"Valor Gasto: "+spentProduct.valueSpent}</Text>
          			  </Card.Content>
          			  <Card.Content>
            				<Text variant="bodyMedium" style={{fontWeight: 'bold', fontSize: 20, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>{"Fecha Gasto: "+spentProduct.dateSpent.split('T')[0]}</Text>
          			  </Card.Content>
        		    </Card>
		        ))
	        ) : (
		        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 120, marginBottom:80, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>No hay gastos Disponibles</Text>
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
          <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 15, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Valor Invertido en Producto</Text>
          <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 10, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>({valueTotalInvested})</Text>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
          <TouchableOpacity onPress={() => {
                navigation.navigate("FinanceProductSlide");
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

export default FinanceProductSpentSlide
