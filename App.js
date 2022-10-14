import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import EmailListScreen from "./screens/EmailListScreen";
import EmailScreen from "./screens/EmailScreen";

const Stack = createStackNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="EmailListScreen" component={EmailListScreen} options={{title: 'Email App'}}/>
        <Stack.Screen name="EmailScreen" component={EmailScreen} options={{title: ''}}/>
      </Stack.Navigator>
    </NavigationContainer>

  );
}