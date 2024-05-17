import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { Dropdown } from 'react-native-element-dropdown'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, Card } from 'react-native-paper'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" /> 

const ListProductsSlide = () => {
  const navigation = useNavigation();
  const [userData,setUserData]=useState("");
  const [valueFarm,setValueFarm] = useState(null);
  const [valueLot,setValueLot]=useState(null);
  const [userFarms,setUserFarms]=useState([]);
  const [lotsFarm,setLotFarms] = useState([]);
  const [productsLot,setProductLot] = useState([]);

  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisibleTwo,setModalVisibleTwo]=useState(false);
  const [newProduct, setNewProduct] = useState({
    nameProduct: "",
    purpose: "",
    variety: "",
    weather: "",
    postHarvestTime: "",
    harvestTime: "",
    weight:"",
    volume:"",
    productLot:""
  });

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
    const lotOptions = lotsFarm.map(lot => ({ label: lot.lotType, value: lot._id}))

    const handleUpdateProduct = async (idProduct) =>{
      try{
          const response = await axios.put(`https://appmagriculturabackend-production.up.railway.app/api/v1/products/update-product/${idProduct}`, newProduct);
          //console.log(response.data);
          Alert.alert("Actualización exitosa");
      }catch(error){
          console.error(error);
      }
    }

    const handleDeleteProduct = async (idProduct) =>{
      try{
        console.log(idProduct)
        console.log(valueLot)
        const response = await axios.delete(`https://appmagriculturabackend-production.up.railway.app/api/v1/products/${idProduct}`,{
          data: {
            lotId: valueLot // Aquí deberías usar userData._id en lugar de userData.author si _id es el campo correcto que representa el userId
          }
        });
        Alert.alert("Producto Eliminada Exitosamente");
      }catch(error){
        console.error(error);
      }
    }

    const handleSubmitLot = async (valueLot) =>{
        try{
            const response = await fetch(`https://appmagriculturabackend-production.up.railway.app/api/v1/lots/${valueLot}/products`);
            const jsonData = await response.json();
            setProductLot(jsonData);
        }catch (error) {
            console.error('Error fetching data2:', error);
        }
    }
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 60, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Mis productos</Text>
        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 10, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Seleccionar finca</Text>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
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
                  handleFarm(item.value);
                  console.log(item.value)
                }}
            />
        </View>
        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 10, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Seleccionar finca</Text>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
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
                placeholder="Selecciona Lote"
                value={valueLot}
                onChange={item => {
                  setValueLot(item.value);
                  handleSubmitLot(item.value);
                  console.log(item.value)
                }}
            />
        </View>
        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 10, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Estos son tus productos</Text>
        <ScrollView horizontal={true} style={{width:300}}>
        {productsLot && productsLot.length > 0 ? (
		       productsLot.map((productLot) => (
			          <Card key={productLot._id} style={{marginTop:20}}>
            <Card.Title title={"Nombre Producto: " + productLot.nameProduct} subtitle={"Proposito Producto: " + productLot.purpose} left={LeftContent}/>
            <Card.Actions>
                <TouchableOpacity onPress={()=>setModalVisible(true)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                    <Text style={{ color: '#FFF',fontWeight: 'bold'}}>Cambiar Información</Text>
                </TouchableOpacity>
                <Modal visible={modalVisible} onRequestClose={()=>setModalVisible(false)} >
                  <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                    <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 100, marginBottom: 10, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Actualizar Producto</Text>
                  </View>
                  <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
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
                        setNewProduct({...newProduct, productLot: item.value});
                      }}
                    />
                  </View>
                  <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                    <TextInput
                      placeholder="Nombre Producto"
                      onChangeText={(product_name_text) =>{
                        console.log("Nombre Producto",product_name_text);
                        setNewProduct({...newProduct, nameProduct: product_name_text});
                      }}
                    />
                    <TextInput
                      placeholder="Peso "
                      onChangeText={(weight_text) =>{
                        console.log("Peso Producto",weight_text);
                        setNewProduct({...newProduct, weight: weight_text});
                      }}
                    />
                    <TextInput
                      placeholder="Volumen"
                      onChangeText={(volume_text) =>{
                        console.log("Volumen Producto",volume_text);
                        setNewProduct({...newProduct, volume: volume_text});
                      }}
                    />
                    <TextInput
                      placeholder="Clima"
                      onChangeText={(weather_text) =>{
                        console.log("Clima Producto",weather_text);
                        setNewProduct({...newProduct, weather: weather_text});
                      }}
                    />
                    <TextInput
                      placeholder="Finalidad"
                      onChangeText={(purpose_text) =>{
                        console.log("Finalidad Producto",purpose_text);
                        setNewProduct({...newProduct, purpose: purpose_text});
                      }}
                    />
                    <TextInput
                      placeholder="Variedad"
                      onChangeText={(variety_text) =>{
                        console.log("Variedad Producto",variety_text);
                        setNewProduct({...newProduct, variety: variety_text});
                      }}
                    />
                    <TextInput
                      placeholder="Tiempo Cosecha"
                      onChangeText={(harvest_time_text) =>{
                        console.log("Tiempo Cosecha",harvest_time_text);
                        setNewProduct({...newProduct, harvestTime: harvest_time_text});
                      }}
                    />
                    <TextInput
                      placeholder="Tiempo Poscosecha"
                      onChangeText={(post_harvest_time_text) =>{
                        console.log("Tiempo Cosecha",post_harvest_time_text);
                        setNewProduct({...newProduct, postHarvestTime: post_harvest_time_text});
                      }}
                    />
                  </View>
                  <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                    <Pressable onPress={()=>handleUpdateProduct(productLot._id)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}} >
                      <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Actualizar Producto</Text>
                    </Pressable>
                    <Pressable style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:10}} onPress={()=>{setModalVisible(false); navigation.navigate("OptionsProductSlide");}}>
                      <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:15}}>Regresar</Text>
                    </Pressable>
                  </View>
                </Modal>
            </Card.Actions>
            <Card.Actions>
              <TouchableOpacity onPress={()=>setModalVisibleTwo(true)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold'}}>Eliminar Producto</Text>
              </TouchableOpacity>
              <Modal visible={modalVisibleTwo} onRequestClose={()=>setModalVisibleTwo(false)} >
                <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
                  <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                    <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 100, marginBottom: 50, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>¿Quieres Eliminar este producto?</Text>
                  </View>
                  <Pressable style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}} onPress={()=>handleDeleteProduct(productLot._id)} >
                    <Text  style={{ color: '#FFF',fontWeight: 'bold',fontSize: 34}}>Si</Text>
                  </Pressable>
                  <Pressable style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}} onPress={()=>{setModalVisibleTwo(false); navigation.navigate("OptionsProductSlide");}} >
                    <Text  style={{ color: '#FFF',fontWeight: 'bold',fontSize: 34}}>No</Text>
                  </Pressable>
                </View>
              </Modal>
            </Card.Actions>
        </Card>		        ))
	        ) : (
		        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 120, marginBottom:80, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>No hay productos  en el lote </Text>
        	)}
        </ScrollView>
        <TouchableOpacity onPress={() => {
                    navigation.navigate("OptionsProductSlide");
                    }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginVertical:20}}>
            <Text style={{ color: '#FFF',fontWeight: 'bold'}}>Regresar</Text>
        </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        marginBottom: 30,
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

export default ListProductsSlide
