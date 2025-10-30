import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {COLORS} from '../constants/colors';
import {TYPOGRAPHY} from '../constants/styles';

// Import Screens
import HomeScreen from '../components/screens/HomeScreen';
import HistoryScreen from '../components/screens/HistoryScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.textTertiary,
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Stocks') {
            iconName = 'chart-line';
          } else if (route.name === 'History') {
            iconName = 'history';
          }

          return <Icon name={iconName} size={focused ? 26 : 24} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Stocks"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Stocks',
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: 'History',
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: COLORS.surface,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
    height: 65,
    paddingBottom: 8,
    paddingTop: 4,
    elevation: 8,
    shadowColor: COLORS.shadow,
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },

  tabBarLabel: {
    ...TYPOGRAPHY.caption,
    fontWeight: '600',
    fontSize: 12,
  },
});

export default BottomTabNavigator;
