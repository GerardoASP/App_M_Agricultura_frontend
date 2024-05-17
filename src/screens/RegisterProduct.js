import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, Text, TextInput, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { TouchableOpacity } from 'react-native-gesture-handler';


const RegisterProduct = () => {
  const navigation = useNavigation();
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

  const [userData,setUserData]=useState("");
  const [userFarms,setUserFarms]=useState([]);
  const [lotsFarm,setLotFarms] = useState([]);
  const [valueFarm,setValueFarm] = useState(null);
  const [valueLot,setValueLot]=useState(null);

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
          fetch(`http://192.168.1.4:3000/api/v1/users/${userData._id}/farms`)
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
            const response = await fetch(`http://192.168.1.4:3000/api/v1/farms/${valueFarm}/lots`);
            const jsonData = await response.json();
            setLotFarms(jsonData);
        }catch(error){
            console.log(error);
        }
      } 

      const farmOptions = userFarms.map(farm => ({ label: farm.nameFarm, value: farm._id}));
      const lotOptions = lotsFarm.map(lot => ({ label: lot.lotType, value: lot._id}))
      
   const handleSubmit = async () =>{
        console.log(newProduct)
        try{
            const response = await axios.post(`http://192.168.1.4:3000/api/v1/products/new-product`, newProduct);
            console.log(response.data);
            Alert.alert("Felicidades Creaste un producto, Mira la lista de productos");
        }catch(error){
            console.error(error);
            Alert.alert("Lo sentimos no pudiste crear tu producto en AgriAmigo");
        }
    }
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 50, marginBottom: 10, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Registro Producto</Text>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 5, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Selecciona Finca</Text>
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
            <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 5, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Selecciona Finca</Text>
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
                style={styles.input}
                placeholder="Nombre Producto"
                onChangeText={(product_name_text) =>{
                    console.log("Nombre Producto",product_name_text);
                    setNewProduct({...newProduct, nameProduct: product_name_text});
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Peso "
                keyboardType='numeric'
                onChangeText={(weight_text) =>{
                    console.log("Peso Producto",weight_text);
                    setNewProduct({...newProduct, weight: weight_text});
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Volumen"
                keyboardType='numeric'
                onChangeText={(volume_text) =>{
                    console.log("Volumen Producto",volume_text);
                    setNewProduct({...newProduct, volume: volume_text});
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Clima"
                onChangeText={(weather_text) =>{
                    console.log("Clima Producto",weather_text);
                    setNewProduct({...newProduct, weather: weather_text});
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Finalidad"
                onChangeText={(purpose_text) =>{
                    console.log("Finalidad Producto",purpose_text);
                    setNewProduct({...newProduct, purpose: purpose_text});
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Variedad"
                onChangeText={(variety_text) =>{
                    console.log("Variedad Producto",variety_text);
                    setNewProduct({...newProduct, variety: variety_text});
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Tiempo Cosecha"
                onChangeText={(harvest_time_text) =>{
                    console.log("Tiempo Cosecha",harvest_time_text);
                    setNewProduct({...newProduct, harvestTime: harvest_time_text});
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Tiempo Poscosecha"
                onChangeText={(post_harvest_time_text) =>{
                    console.log("Tiempo Cosecha",post_harvest_time_text);
                    setNewProduct({...newProduct, postHarvestTime: post_harvest_time_text});
                }}
            />
        </View>
        <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: "center"}}>
            <TouchableOpacity onPress={handleSubmit} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Crear Producto</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate("OptionsProductSlide");
                }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:10, marginLeft:10}}>
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

export default RegisterProduct
