import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Alert, StyleSheet, Text, TextInput, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler';


const RegisterFarm = () => {
  //Código Adicional
  const [newFarm, setNewFarm] = useState({
    nameFarm: "",
    lineFarm: "",
    area: "",
    predialValue: "",
    services:[],
    farmUser:""
  });
  const [userData,setUserData]=useState("");

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
        if (userData) {
            setNewFarm(prevState => ({
                ...prevState,
                farmUser: userData._id // Actualizar author cuando userData esté disponible
            }));
        }
    }, [userData]);

    const handleCancel = () => {
        navigation.navigate('OptionsFarmSlide');
    };

    const handleWater = () => {
        console.log("Agua");
        Alert.alert("Ok, Servicio Agua Seleccionado");
        setNewFarm(prevFarm => ({
            ...prevFarm,
            services: Array.from(new Set([...prevFarm.services, "Agua"]))  // Usa un Set para evitar duplicados
        }));
    }

    const handleLight = () => {
        console.log("Luz");
        Alert.alert("Ok, Servicio Luz Seleccionado");
        setNewFarm(prevFarm => ({
            ...prevFarm,
            services: Array.from(new Set([...prevFarm.services, "Luz"]))  // Usa un Set para evitar duplicados
        }));
    }

    const handleGas = () => {
        console.log("Gas");
        Alert.alert("Ok, Servicio Gas Seleccionado");
        setNewFarm(prevFarm => ({
            ...prevFarm,
            services: Array.from(new Set([...prevFarm.services, "Gas"]))  // Usa un Set para evitar duplicados
        }));
    }

    const handleNotSelectService = () =>{
        Alert.alert("Ok, Servicio No Seleccionado");
    }

    const handleSubmit = async () =>{
        try{
            console.log(newFarm);
            const response = await axios.post('http://192.168.1.4:3000/api/v1/farms/new-farm', newFarm);
            console.log(response.data);
            Alert.alert("Felicidades Creaste una finca, Mira la lista de fincas");
        }catch(error){
            console.error(error);
            Alert.alert("Lo sentimos no pudiste crear tu finca en AgriAmigo");
        }
    }

  const navigation = useNavigation();
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 80, marginBottom: 30, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Registro Finca</Text>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TextInput
                style={styles.input}
                placeholder="Nombre Finca"
                onChangeText={(name_farm_text) =>{
                    console.log("Nombre Finca",name_farm_text);
                    setNewFarm({...newFarm, nameFarm: name_farm_text});
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Linea Finca"
                onChangeText={(line_farm_text) =>{
                    console.log("Linea Finca",line_farm_text);
                    setNewFarm({...newFarm, lineFarm: line_farm_text});
                }}
            />
            <TextInput
                style={styles.input2}
                placeholder="Area Finca"
                keyboardType='numeric'
                onChangeText={(area_farm) =>{
                    console.log("Area Finca",area_farm);
                    setNewFarm({...newFarm, area: area_farm});
                }}
            />
            <TextInput
                style={styles.input}
                placeholder="Valor Predial"
                onChangeText={(predial_farm) =>{
                    console.log("Area Finca",predial_farm);
                    setNewFarm({...newFarm, predialValue: predial_farm});
                }}
            />
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <Text style={{fontWeight: 'bold', fontSize: 24, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Servicios</Text>
        </View>
        <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: "center"}}>
            <Text style={{fontWeight: 'bold', fontSize: 21, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>¿Tiene Agua (Acueducto)?</Text>
            <TouchableOpacity  onPress={handleWater} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginLeft:15}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:20}}>Si</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNotSelectService} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginLeft:15}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:20}}>No</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: "center", marginTop:5}}>
            <Text style={{fontWeight: 'bold', fontSize: 21, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>¿Tiene Luz (Red publica) ?</Text>
            <TouchableOpacity onPress={handleLight} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginLeft:15}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:20}}>Si</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNotSelectService} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginLeft:15}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:20}}>No</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: "center", marginTop:5}}>
            <Text style={{fontWeight: 'bold', fontSize: 21, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>¿Tiene Gas (Red publica)?</Text>
            <TouchableOpacity onPress={handleGas} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginLeft:15}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:20}}>Si</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNotSelectService} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginLeft:15}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:20}}>No</Text>
            </TouchableOpacity>
        </View>
        <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: "center"}}>
            <TouchableOpacity onPress={handleSubmit} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginRight:5,marginTop:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:23}}>Crear Finca</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleCancel} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold',marginTop:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:23}}>Regresar</Text>
            </TouchableOpacity>
        </View>
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
      input2: {
        marginBottom: 30,
        paddingVertical: 5,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 3,
        fontSize:20
      }
})

export default RegisterFarm
