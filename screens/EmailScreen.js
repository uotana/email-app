import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, Image} from "react-native";
import { WebView } from 'react-native-webview';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function EmailScreen({route}){

    const {id} = route.params;
    const [email, setEmail] = useState([]);
    const defaultStar = <FontAwesome5 name={'star'} size={24} color='black'/>
    const yellowStar = <FontAwesome5 name={'star'} solid size={24} color='gold'/>
    
    useEffect(()=>{
        async function getData(){
            const response = await fetch('https://mobile.ect.ufrn.br:3002/emails/' + id);
            const email = await response.json();
            setEmail(email);
        }
        getData();
    }, []);

    return(
        <View style = {styles.container}>
            <StatusBar style="auto"/>
            <View style={styles.tittleBox}>
                <Text style={styles.tittle} >{email.tittle}</Text>
                <Text>{email.star? yellowStar : defaultStar}</Text>
            </View>
            <View style={styles.infoBox}>
                <Image style={styles.image} source={{ uri: email.picture}}/>
                <Text>{email.from}</Text>
                <Text>{email.time}</Text>
            </View>
            <WebView
                originWhitelist={['*']}
                source={{ html: email.body }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding:20,
    },
    image:{
        height: 50,
        width: 50,
        marginRight:15,
        borderRadius: 50,
    },
    tittle:{
        fontSize: 30,
    },
    tittleBox:{
        marginBottom: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    infoBox: {
        flexDirection: 'row',  
        marginBottom: 15,
    }
});