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
import StockDetailScreen from '../components/screens/StockDetailScreen';
import StockHoldingsScreen from '../components/screens/StockHoldingsScreen';
import AccountSettingsScreen from '../components/screens/AccountSettingsScreen';
import PrivacySecurityScreen from '../components/screens/PrivacySecurityScreen';
import NotificationsScreen from '../components/screens/NotificationsScreen';
import AppGuideScreen from '../components/screens/AppGuideScreen';
import BuyStockScreen from '../components/screens/BuyStockScreen';
import OrderScreen from '../components/screens/OrderScreen';
import SellStockScreen from '../components/screens/SellStockScreen';
import ProfileWalletScreen from '../components/screens/ProfileWalletScreen';
import TransactionHistoryScreen from '../components/screens/TransactionHistoryScreen';
import ReferralScreen from '../components/screens/ReferralScreen';
import EditProfileScreen from '../components/screens/EditProfileScreen';

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

                <Stack.Screen name="Notification" component={NotificationScreen} options={{ title: 'Notifications', headerShown: false }} />

                <Stack.Screen name="Setting" component={SettingScreen} options={{ title: 'Settings' }} />

                <Stack.Screen name="Profile" component={ProfileScreen} options={{ title: 'Profile', headerShown: false }} />

                <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Transaction History', headerShown: false }} />

                <Stack.Screen name="Wallet" component={WalletScreen} options={{ headerShown: false }} />
                <Stack.Screen name="EditProfile" component={EditProfileScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Recharge" component={RechargeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Payment" component={PaymentScreen} options={{ headerShown: false }} />
                <Stack.Screen name="Withdraw" component={WithdrawScreen} options={{ headerShown: false }} />


                <Stack.Screen name="StockDetail" component={StockDetailScreen} options={{ animation: 'slide_from_right', headerShown: false }} />
                <Stack.Screen name="StockHolding" component={StockHoldingsScreen} options={{ animation: 'slide_from_right', headerShown: false }} />

                <Stack.Screen name="AccountSettings" component={AccountSettingsScreen} options={{ animation: 'slide_from_right', headerShown: false }} />
                <Stack.Screen name="PrivacySecurity" component={PrivacySecurityScreen} options={{ animation: 'slide_from_right', headerShown: false }} />
                <Stack.Screen name="Notifications" component={NotificationsScreen} options={{ animation: 'slide_from_right', headerShown: false }} />
                <Stack.Screen name="HelpSupport" component={AppGuideScreen} options={{ animation: 'slide_from_right', headerShown: false }} />
                <Stack.Screen name="ReferInvite" component={ReferralScreen} options={{ animation: 'slide_from_right', headerShown: false }} />

                <Stack.Screen
                    name="ProfileWallet"
                    component={ProfileWalletScreen}
                    options={{ headerShown: false }}
                />


                <Stack.Screen
                    name="BuyStock"
                    component={BuyStockScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen
                    name="SellStock"
                    component={SellStockScreen}
                    options={{ headerShown: false }}
                />

                <Stack.Screen name='TopOrder' component={OrderScreen} options={{ animation: 'slide_from_right', headerShown: false }} />
                {/* <Stack.Screen name='SellStock' component={SellStockScreen} options={{ animation: 'slide_from_right', headerShown: false }} /> */}
                <Stack.Screen name='TransactionHistory' component={TransactionHistoryScreen} options={{ animation: 'slide_from_right', headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;
