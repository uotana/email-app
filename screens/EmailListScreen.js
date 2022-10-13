import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function EmailListScreen({ navigation }){

    const [emailList, setEmailList] = useState([]);

    useEffect(function(){
        async function getData(){
            const response = await fetch('https://mobile.ect.ufrn.br:3002/emails');
            const emailList = await response.json();
            console.log(emailList);
            setEmailList(emailList);
        }
        getData();
    },[]);

    function renderItem({item}){
        const defaultStar = <FontAwesome5 name={'star'} size={20} color='black'/>
        const yellowStar = <FontAwesome5 name={'star'} solid size={20} color='gold'/>
        
        return(
            <TouchableOpacity style={styles.listItem} onPress = {() => navigation.navigate('EmailScreen',{
                id: item.id
            })}>
                <View>
                    <Image style={styles.image} source={{ uri: item.picture}}/>
                </View>
                <View style={styles.textBox}>
                    <View style={styles.itemTop}>
                        <View style = {styles.itemTopLeft}>
                            <View>
                                <Text style = {styles.tittle}>{item.from}</Text>
                                <Text style = {styles.tittle}>{item.tittle}</Text>   
                            </View>
                        </View>
                        <View style = {styles.itemTopRight}>
                            <Text>{item.time}</Text>
                        </View>
                    </View>    
                    <View style={styles.itemBottom}>
                        <Text>{item.summary}</Text>
                        {item.star? yellowStar : defaultStar}
                    </View>
                </View>
                                    
            </TouchableOpacity>
        );
    }

    return(
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <FlatList
                data={emailList}
                renderItem={renderItem}
                keyExtractor={ item => item.id}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        borderWidth: 0.5,
    },
    tittle:{
        fontWeight: 'bold',
    },
    image:{
        height: 50,
        width: 50,
        marginLeft:15,
        marginRight:15,
        borderRadius: 50,
    },
    textBox:{
        flex:1,
    },
    listItem:{
        flex: 1,
        padding:15,
        marginTop:20,
        flexDirection: 'row',
    },
    itemTop: {
        flexDirection:'row',
        justifyContent: 'space-between',
    },
    itemBottom:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});