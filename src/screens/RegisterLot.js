import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list';
import { Dropdown } from 'react-native-element-dropdown';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

const RegisterLot = () => {
  const navigation = useNavigation();
  const [selected,setSelected] = useState("");
  const [value,setValue] = useState(null);

  const [newLot, setNewLot] = useState({
    lotType: "",
    area: "",
    lotFarm: "",
    lotProducts:[],
  });

  const [userData,setUserData]=useState("");
  const [userFarms,setUserFarms]=useState([]);

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
    
  const data = [
    {key:'1',value:'Plano'},
    {key:'2',value:'Enpinado'},
    {key:'3',value:'Medianamente Enpinado'},
    {key:'4',value:'Andable'},
    {key:'5',value:'Ondulado'}
  ]

  const handleSubmit = async () =>{
    try{
        console.log(newLot);
        const response = await axios.post(`https://appmagriculturabackend-production.up.railway.app/api/v1/lots/new-lot`, newLot);
        console.log(response.data);
        Alert.alert("Felicidades Creaste un lote, Mira la lista de lotes");
    }catch(error){
        console.error(error);
        Alert.alert("Lo sentimos no pudiste crear tu lote en AgriAmigo");
    }
}

  const farmOptions = userFarms.map(farm => ({ label: farm.nameFarm, value: farm._id}));
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 100, marginBottom: 50, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Registro Lote</Text>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <SelectList 
                setSelected={(val) => {
                    setSelected(val); // Actualiza el estado con el valor seleccionado
                    console.log("Valor seleccionado:", val); // Imprime el valor seleccionado por consola
                    setNewLot({...newLot, lotType: val});
                }} 
                data={data} 
                save="value"
                placeholder="Tipo Lote"
            />
            <TextInput
                style={styles.input}
                placeholder="Area Lote"
                onChangeText={(area_lot_text) =>{
                    console.log("Area Lote",area_lot_text);
                    setNewLot({...newLot, area: area_lot_text});
                }}
            />
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
                value={value}
                onChange={item => {
                  setValue(item.value);
                  console.log(item.value)
                  setNewLot({...newLot, lotFarm: item.value});
                }}
            />
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TouchableOpacity onPress={handleSubmit} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Crear Lote</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate("OptionsLotSlide");
                }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Regresar</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    input: {
        marginTop:40,
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

export default RegisterLot
