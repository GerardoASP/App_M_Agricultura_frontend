import React from 'react'
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';

const RegisterProduct = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex:0, justifyContent:"center", alignItems:"center", alignContent:"center"}}>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <Text style={{fontWeight: 'bold', fontSize: 34, marginTop: 100, marginBottom: 50, fontFamily: 'San Francisco', fontFamily: 'Roboto',}}>Registro Producto</Text>
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TextInput
                style={styles.input}
                placeholder="Nombre Producto"
            />
            <TextInput
                style={styles.input}
                placeholder="Peso "
            />
            <TextInput
                style={styles.input}
                placeholder="Volumen"
            />
            <TextInput
                style={styles.input}
                placeholder="Clima"
            />
            <TextInput
                style={styles.input}
                placeholder="Finalidad"
            />
            <TextInput
                style={styles.input}
                placeholder="Variedad"
            />
            <TextInput
                style={styles.input}
                placeholder="Tiempo Cosecha"
            />
            <TextInput
                style={styles.input}
                placeholder="Tiempo Poscosecha"
            />
            <TextInput
                style={styles.input}
                placeholder="Fecha Siembra"
            />
        </View>
        <View style={{flexDirection: 'column',alignItems: 'center', justifyContent: "center"}}>
            <TouchableOpacity style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Crear Producto</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate("OptionsProductSlide");
                }} style={{shadowColor: '#000', alignItems: 'center', backgroundColor: '#4A90E2', padding: 10, textAlign:'center', fontWeight: 'bold', marginVertical:20}}>
                <Text style={{ color: '#FFF',fontWeight: 'bold', fontSize:25}}>Regresar</Text>
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
      }
})

export default RegisterProduct
