import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/screens/LoginScreen';
import SignupScreen from '../components/screens/SignupScreen';
import OTPVerificationScreen from '../components/screens/OTPVerificationScreen';
import NotificationScreen from '../components/screens/NotificationScreen';
import SettingScreen from '../components/screens/SettingScreen';
import ProfileScreen from '../components/screens/ProfileScreen';
import { COLORS } from '../../src/constants/colors';
import IndicesScreen from '../components/screens/IndicesScreen';
import HistoryScreen from '../components/screens/HistoryScreen';
import BottomTabNavigator from './BottomTabNavigator';
import WalletScreen from '../components/screens/WalletScreen';
import RechargeScreen from '../components/screens/RechargeScreen';
import WithdrawScreen from '../components/screens/WithdrawScreen';
import PaymentScreen from '../components/screens/PaymentScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName="Login"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: COLORS.primary,
                        elevation: 0,
                        shadowOpacity: 0,
                    },
                    headerTintColor: COLORS.white,
                    headerTitleStyle: {
                        fontWeight: '600',
                        fontSize: 18,
                    },
                    headerBackTitleVisible: false,
                    cardStyle: {
                        backgroundColor: COLORS.background,
                    },
                }}>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{
                        title: 'Login',
                        headerShown: false,
                    }}
                />

                <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Sign Up', headerShown: false }} />

                <Stack.Screen name="OTPVerification" component={OTPVerificationScreen} options={{ title: 'Verify OTP' }} />

                <Stack.Screen name="Home" component={BottomTabNavigator} options={{ title: 'Home', headerShown: false, gestureEnabled: false }} />


                <Stack.Screen name="Indices" component={IndicesScreen} options={{ title: 'Market Indices', headerShown: false }} />

                <Stack.Screen name="Notification" component={NotificationScreen} options={{ title: 'Notifications' }} />

                <Stack.Screen name="Setting" component={SettingScreen} options={{ title: 'Settings' }} />

                <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile' }} />

                <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Transaction History', headerShown: false }} />

                <Stack.Screen name="Wallet" component={WalletScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Recharge" component={RechargeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Withdraw" component={WithdrawScreen} options={{ headerShown: false }} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
