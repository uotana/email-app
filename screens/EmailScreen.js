import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, View, Text } from "react-native";

export default function EmailScreen({ navigation }){

    return(
        <View style={styles.container}>
            <StatusBar style="auto"/>
            <Text>testando</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
});