import React from 'react';
import { Ionicons } from '@expo/vector-icons';

import Home from './src/Views/Home';
import Champions from './src/Views/Champions/index';
import Itens from './src/Views/Itens/index';
import Profile from './src/Views/Profile/index';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export default function App() {
  const Tab = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle-outline';
            } else if (route.name === 'Champions') {
              iconName = focused ? 'people-outline' : 'people-sharp';
            }else if (route.name === 'Itens') {
              iconName = focused ? 'albums-outline' : 'albums';
            }else if (route.name === 'Profile') {
              iconName = focused ? 'md-people-outline' : 'md-people-sharp';
            }
           
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
        }}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Champions" component={Champions} />
        <Tab.Screen name="Itens" component={Itens} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


