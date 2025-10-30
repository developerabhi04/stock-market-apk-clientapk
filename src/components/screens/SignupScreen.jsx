import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    KeyboardAvoidingView,
    ScrollView,
    Platform,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY, COMMON_STYLES } from '../../constants/styles';
import Button from '../Button';
import Input from '../../components/Input';
import LoadingOverlay from '../../components/LoadingOverlay';
import { validatePhoneNumber, formatPhoneNumber } from '../../utils/validation';
import authService from '../../services/authService';

const SignupScreen = ({ navigation }) => {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handlePhoneChange = (text) => {
        setError('');
        const cleaned = text.replace(/\D/g, '');
        setPhoneNumber(cleaned);
    };

    const handleContinue = async () => {
        const validation = validatePhoneNumber(phoneNumber);

        if (!validation.isValid) {
            setError(validation.message);
            return;
        }

        setLoading(true);

        try {
            const result = await authService.checkPhoneExists(phoneNumber);

            if (result.success) {
                if (result.exists) {
                    Alert.alert(
                        'Account Exists',
                        'This phone number is already registered. Please login.',
                        [
                            {
                                text: 'Go to Login',
                                onPress: () => navigation.navigate('Login'),
                            },
                        ]
                    );
                    setLoading(false);
                    return;
                }

                const sendOTPResult = await authService.sendOTP(phoneNumber);

                if (sendOTPResult.success) {
                    Alert.alert(
                        'OTP Sent',
                        `Mock OTP: ${sendOTPResult.otp}\n\nIn production, this would be sent via SMS.`,
                        [{ text: 'OK' }]
                    );

                    navigation.navigate('OTPVerification', {
                        phoneNumber,
                        isLogin: false,
                    });
                }
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <KeyboardAvoidingView
            style={COMMON_STYLES.container}
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 0}>
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}>
                <View style={styles.content}>
                    <View style={styles.header}>
                        <Text style={styles.title}>Create Account</Text>
                        <Text style={styles.subtitle}>
                            Enter your phone number to get started
                        </Text>
                    </View>

                    <View style={styles.form}>
                        <Input
                            label="Phone Number"
                            value={formatPhoneNumber(phoneNumber)}
                            onChangeText={handlePhoneChange}
                            placeholder="Enter phone number"
                            keyboardType="phone-pad"
                            error={error}
                            maxLength={20}
                            autoFocus
                        />

                        <Button
                            title="Continue"
                            onPress={handleContinue}
                            disabled={phoneNumber.length < 10}
                            loading={loading}
                        />
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account? </Text>
                        <TouchableOpacity onPress={handleLogin}>
                            <Text style={styles.footerLink}>Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>

            {loading && <LoadingOverlay message="Verifying phone number..." />}
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1,
        justifyContent: 'center',
    },

    content: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        paddingVertical: 40,
    },

    header: {
        marginBottom: 48,
        alignItems: 'center',
    },

    title: {
        ...TYPOGRAPHY.h1,
        marginBottom: 12,
        textAlign: 'center',
    },

    subtitle: {
        ...TYPOGRAPHY.body1,
        color: COLORS.textSecondary,
        textAlign: 'center',
    },

    form: {
        marginBottom: 24,
    },

    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 16,
    },

    footerText: {
        ...TYPOGRAPHY.body2,
        color: COLORS.textSecondary,
    },

    footerLink: {
        ...TYPOGRAPHY.body2,
        color: COLORS.primary,
        fontWeight: '600',
    },
});

export default SignupScreen;
