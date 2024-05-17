import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Alert, Modal, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { Dropdown } from 'react-native-element-dropdown'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, Card } from 'react-native-paper'

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const ListLotsSlide = () => {
  const navigation = useNavigation();
  const [userData,setUserData]=useState("");
  const [userFarms,setUserFarms]=useState([]);
  const [value,setValue] = useState(null);
  const [selected,setSelected] = useState("");
  const [lotsFarm,setLotFarms] = useState([]);

  const [modalVisible, setModalVisible] = useState(false)
  const [modalVisibleTwo,setModalVisibleTwo]=useState(false);
  const [newLot, setNewLot] = useState({
    lotType: "",
    area: "",
    lotFarm: "",
    lotProducts:[],
  });

  const data = [
    {key:'1',value:'Plano'},
    {key:'2',value:'Enpinado'},
    {key:'3',value:'Medianamente Enpinado'},
    {key:'4',value:'Andable'},
    {key:'5',value:'Ondulado'}
  ]
  
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
    
    const farmOptions = userFarms.map(farm => ({ label: farm.nameFarm, value: farm._id}));

    useEffect(()=>{
        const fetchDataPublications = async () => {
          try {
            const response = await fetch(`http://192.168.1.4:3000/api/v1/farms/${value}/lots`);
            const jsonData = await response.json();
            setLotFarms(jsonData);
          } catch (error) {
            console.error('Error fetching data2:', error);
          }
        };
        fetchDataPublications()
      },[]);

      const handleUpdateLot = async (idLot) =>{
        try{
            const response = await axios.put(`http://192.168.1.4:3000/api/v1/lots/update-lot/${idLot}`, newLot);
            //console.log(response.data);
            Alert.alert("Actualización exitosa");
        }catch(error){
            console.error(error);
        }
      }

      const handleDeleteLot = async (idLot) =>{
        try{
          console.log(idLot)
          console.log(value)
          const response = await axios.delete(`http://192.168.1.4:3000/api/v1/lots/${idLot}`,{
            data: {
              farmId: value // Aquí deberías usar userData._id en lugar de userData.author si _id es el campo correcto que representa el userId
            }
          });
          Alert.alert("Lote Eliminada Exitosamente");
        }catch(error){
          console.error(error);
        }
      }
    
    const handleSubmit = async () =>{
        try{
            const response = await fetch(`http://192.168.1.4:3000/api/v1/farms/${value}/lots`);
            const jsonData = await response.json();
            setLotFarms(jsonData);
        }catch (error) {
            console.error('Error fetching data2:', error);
        }
    }
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <Text style={{fontWeight: 'bold', fontSize: 24,marginTop:350,fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Mis Lotes</Text>
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
                value={value}
                onChange={item => {
                  setValue(item.value);
                  console.log(item.value)
                }}
            />
            <View style={{flexDirection: 'row',alignItems: 'center', justifyContent: "center"}}>
              <TouchableOpacity onPress={handleSubmit}style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize: 24}}>Ver Lotes</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                    navigation.navigate("OptionsLotSlide");
                    }}style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20,marginLeft:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize: 24}}>Regresar</Text>
              </TouchableOpacity>
            </View>
            
        </View>
        <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <ScrollView  horizontal={true} style={{height:650,width:300}} >
        {lotsFarm && lotsFarm.length > 0 ? (
		        lotsFarm.map((lotFarm) => (
			          <Card key={lotFarm._id} style={{marginTop:20}}>
            <Card.Title title={"Tipo Lote: " + lotFarm.lotType} subtitle={"Area Lote: " + lotFarm.area + "metros cuadrados"} left={LeftContent}/>
            <Card.Actions>
                <TouchableOpacity onPress={()=>setModalVisible(true)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                    <Text style={{ color: '#FFF',fontWeight: 'bold'}}>Cambiar Información</Text>
                </TouchableOpacity>
                <Modal visible={modalVisible} onRequestClose={()=>setModalVisible(false)} >
                  <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
                    <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                      <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 100, marginBottom: 50, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Actualizar Lote</Text>
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
                      <Pressable onPress={()=>handleUpdateLot(lotFarm._id)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                        <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Actualizar Lote</Text>
                      </Pressable>
                      <Pressable style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}} onPress={()=>{setModalVisible(false); navigation.navigate("ListLotsSlide");}}>
                        <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Regresar</Text>
                      </Pressable>
                    </View>
                  </View>
                </Modal>
            </Card.Actions>
            <Card.Actions>
              <TouchableOpacity  onPress={()=>setModalVisibleTwo(true)} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold'}}>Eliminar Lote</Text>
              </TouchableOpacity>
              <Modal visible={modalVisibleTwo} onRequestClose={()=>setModalVisibleTwo(false)} >
                <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
                  <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
                    <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 100, marginBottom: 50, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>¿Quieres Eliminar este lote?</Text>
                  </View>
                  <Pressable style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}} onPress={()=>handleDeleteLot(lotFarm._id)} >
                    <Text  style={{ color: '#FFF',fontWeight: 'bold',fontSize: 34}}>Si</Text>
                  </Pressable>

                  <Pressable style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}} onPress={()=>{setModalVisibleTwo(false); navigation.navigate("ListLotsSlide");}} >
                    <Text  style={{ color: '#FFF',fontWeight: 'bold',fontSize: 34}}>No</Text>
                  </Pressable>
                  </View>
              </Modal>
            </Card.Actions>
        </Card>		        ))
	        ) : (
		        <Text style={{fontWeight: 'bold', fontSize: 24, marginTop: 120, marginBottom:80, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>No hay lotes registradas </Text>
        	)}
        </ScrollView>
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

export default ListLotsSlide
