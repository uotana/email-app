import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text, FlatList, Image, TouchableOpacity } from "react-native";

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
        return(
            <TouchableOpacity style={styles.listItem} onPress = {() => navigation.navigate('EmailScreen',{
                id: item.id
            })}>
                    <View style = {styles.listItemLeft}>
                        <Image style={styles.image} source={{ uri: item.picture}}/>
                        <View>
                            <Text style = {styles.tittle}>{item.from}</Text>
                            <Text style = {styles.tittle}>{item.tittle}</Text>
                            <Text>{item.summary}</Text>
                        </View>
                    </View>
                    <View style = {styles.listItemRight}>
                        <Text>{item.time}</Text>
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
        backgroundColor: '#fff'
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
    listItem:{
        width: 350,
        paddingTop:15,
        paddingBottom: 15,
        marginTop:20,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    listItemLeft:{
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    listItemRight:{
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
});