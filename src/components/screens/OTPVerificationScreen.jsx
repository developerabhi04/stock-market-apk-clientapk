import React, { useState, useEffect } from 'react';
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
import OTPInput from '../OTPInput';
import LoadingOverlay from '../../components/LoadingOverlay';
import { validateOTP, formatPhoneNumber } from '../../utils/validation';
import authService from '../../services/authService';

const OTPVerificationScreen = ({ route, navigation }) => {
    const { phoneNumber, isLogin } = route.params;

    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [resendTimer, setResendTimer] = useState(60);
    const [canResend, setCanResend] = useState(false);

    useEffect(() => {
        let interval;

        if (resendTimer > 0) {
            interval = setInterval(() => {
                setResendTimer(prev => {
                    if (prev <= 1) {
                        setCanResend(true);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [resendTimer]);

    const handleOTPChange = (text) => {
        setError('');
        setOtp(text);
    };

    const handleVerify = async () => {
        const validation = validateOTP(otp);

        if (!validation.isValid) {
            setError(validation.message);
            return;
        }

        setLoading(true);

        try {
            const result = await authService.verifyOTP(phoneNumber, otp);

            if (result.success) {
                // Navigate directly to Home after successful OTP verification
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'Home' }],
                });
            } else {
                setError(result.message || 'Invalid OTP');
            }
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (!canResend) return;

        setLoading(true);
        setOtp('');
        setError('');

        try {
            const result = await authService.sendOTP(phoneNumber);

            if (result.success) {
                Alert.alert(
                    'OTP Sent',
                    `Mock OTP: ${result.otp}\n\nIn production, this would be sent via SMS.`,
                    [{ text: 'OK' }]
                );

                setResendTimer(60);
                setCanResend(false);
            }
        } catch (err) {
            setError('Failed to resend OTP. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
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
                        <Text style={styles.title}>Verify OTP</Text>
                        <Text style={styles.subtitle}>
                            Enter the 6-digit code sent to{'\n'}
                            <Text style={styles.phoneNumber}>
                                {formatPhoneNumber(phoneNumber)}
                            </Text>
                        </Text>

                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={styles.changeNumber}>
                            <Text style={styles.changeNumberText}>Change Number</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.form}>
                        <OTPInput
                            length={6}
                            value={otp}
                            onChangeText={handleOTPChange}
                            error={error}
                        />

                        <Button
                            title="Verify & Continue"
                            onPress={handleVerify}
                            disabled={otp.length !== 6}
                            loading={loading}
                        />

                        <View style={styles.resendContainer}>
                            {canResend ? (
                                <TouchableOpacity onPress={handleResend}>
                                    <Text style={styles.resendText}>Resend OTP</Text>
                                </TouchableOpacity>
                            ) : (
                                <Text style={styles.timerText}>
                                    Resend OTP in {resendTimer}s
                                </Text>
                            )}
                        </View>
                    </View>

                    <View style={styles.helpContainer}>
                        <Text style={styles.helpText}>
                            For testing, use OTP: <Text style={styles.helpBold}>123456</Text>
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {loading && <LoadingOverlay message="Verifying OTP..." />}
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
        lineHeight: 24,
    },

    phoneNumber: {
        color: COLORS.primary,
        fontWeight: '600',
    },

    changeNumber: {
        marginTop: 16,
        padding: 8,
    },

    changeNumberText: {
        ...TYPOGRAPHY.body2,
        color: COLORS.primary,
        fontWeight: '600',
    },

    form: {
        marginBottom: 24,
    },

    resendContainer: {
        alignItems: 'center',
        marginTop: 24,
    },

    resendText: {
        ...TYPOGRAPHY.body1,
        color: COLORS.primary,
        fontWeight: '600',
    },

    timerText: {
        ...TYPOGRAPHY.body2,
        color: COLORS.textLight,
    },

    helpContainer: {
        backgroundColor: COLORS.primaryLight + '15',
        padding: 16,
        borderRadius: 12,
        marginTop: 24,
    },

    helpText: {
        ...TYPOGRAPHY.body2,
        color: COLORS.text,
        textAlign: 'center',
    },

    helpBold: {
        fontWeight: '700',
        color: COLORS.primary,
    },
});

export default OTPVerificationScreen;
