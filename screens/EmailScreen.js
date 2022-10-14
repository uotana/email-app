import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {StyleSheet, View, Text, Image, Modal, TouchableOpacity} from "react-native";
import { WebView } from 'react-native-webview';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default function EmailScreen({route}){

    const {id} = route.params;
    const [email, setEmail] = useState([]);
    const defaultStar = <FontAwesome5 name={'star'} size={20} color='#565656'/>;
    const yellowStar = <FontAwesome5 name={'star'} solid size={20} color='gold'/>;
    const [modalVisible, setModalVisible] = useState(false);
    const chevronDown = <FontAwesome5 name={'chevron-down'} size={12} color='#565656'/>;
    const chevronUp = <FontAwesome5 name={'chevron-up'} size={12} color='#565656'/>;

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
                <View style={styles.tittleBoxLeft}>
                    <Text style={styles.tittle} >{email.tittle}</Text>
                    <View style={styles.inboxBox}>
                        <Text style={styles.inbox}>Inbox</Text>
                    </View> 
                </View>
                <Text>{email.star? yellowStar : defaultStar}</Text>
            </View>
            <View>
                <View style={styles.infoBox}>
                    <Image style={styles.image} source={{ uri: email.picture}}/>
                    <View style={styles.textInfoBox}>
                        <View style={styles.textBox}>
                            <Text style={styles.from}>{email.from}</Text>
                            <Text style={styles.time}>{email.time}</Text>
                        </View>
                        <View style={styles.toBox}>
                            <Text style={styles.to}>
                                {email.to == 'Martin' ? 'to me' : email.to} 
                            </Text>
                            <View>
                                <TouchableOpacity style={styles.btn} onPress={()=>{
                                    modalVisible? setModalVisible(false) : setModalVisible(true)}}>
                                    {modalVisible? chevronUp : chevronDown}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                
                    <Modal
                        animationType="none"
                        transparent={true}
                        visible={modalVisible}
                        shouldCloseOnOverlayClick = {true}
                        onRequestClose={() => {
                        setModalVisible(!modalVisible);
                        }}
                    >
                        <View style={styles.modalView}>
                            <View style={styles.modalHeaderButtonClose}>
                                <TouchableOpacity style={styles.btn} onPress={()=>setModalVisible(false)}>
                                    <Text>X</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalContent}>
                                <View style={styles.modalViewLeft}>
                                    <Text style={styles.modalText}>
                                        From
                                    </Text>
                                    <Text style={styles.modalText}>
                                        To
                                    </Text>
                                    <Text style={styles.modalText}>
                                        Date
                                    </Text>
                                </View>
                                <View>
                                    <Text style={styles.modalText}>  
                                        {email.from}
                                    </Text>
                                    <Text style={styles.modalText}>
                                        {email.to}
                                    </Text>
                                    <Text style={styles.modalText}>
                                        {email.time}
                                    </Text>
                                </View>
                            </View>                                 
                        </View>
                    </Modal> 
                </View>
                
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
        backgroundColor: '#fff',
        padding:20,
        position: 'relative'
    },
    image:{
        height: 50,
        width: 50,
        marginRight:20,
        borderRadius: 50,
    },
    tittle:{
        fontSize: 26,
        marginRight:10,
    },
    tittleBox:{
        position: 'relative',
        marginBottom: 45,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    tittleBoxLeft:{
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    inbox:{
        backgroundColor: '#EEEEEE',
        paddingLeft: 6,
        paddingRight: 6,
        borderRadius: 4,
        paddingBottom: 2,
        marginBottom: 5,        
        fontSize: 13,
    },
    inboxBox:{
        alignSelf: 'flex-end'
    },
    infoBox: {
        position: 'relative',
        flexDirection: 'row',  
        marginBottom: 25,
    },
    textInfoBox: {
        position: 'relative',
    },
    from:{
        fontSize: 18,
        fontWeight: '500',
        marginRight:10,
    },
    time: {
        color: '#565656',
        fontSize: 14,
    },
    textBox: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    toBox:{
        flexDirection: 'row',
        alignItems: 'baseline'
    },
    to: {
        color: '#565656',
        fontSize: 16,
        marginRight:10,
    },
    modalView: {
        marginTop: 220,
        marginLeft: 20,
        marginRight:20,
        borderWidth: 0.5,
        backgroundColor: "white",
        borderRadius: 20,
        paddingTop: 10,
        paddingRight: 20,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2
      },
      btn:{
        padding: 5
      },
      modalHeaderButtonClose:{
        alignSelf: 'flex-end'
      },
      modalContent: {
        flexDirection: 'row',
        padding: 35,
        paddingTop:10,
        paddingBottom: 25
      },
      modalText: {
        fontSize: 16,
        marginBottom: 5
      },
      modalViewLeft: {
        marginRight: 20
      }
});