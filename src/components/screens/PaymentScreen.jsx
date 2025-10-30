import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    SafeAreaView,
    Alert,
    Clipboard,
    TextInput,
    ScrollView,
    Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY, COMMON_STYLES } from '../../constants/styles';

const PaymentScreen = ({ navigation, route }) => {
    const { amount, upiId, qrCodeImage } = route.params;

    const [utr, setUtr] = useState('');

    const copyToClipboard = (text) => {
        Clipboard.setString(text);
        Alert.alert('Copied!', `${text} copied to clipboard.`);
    };

    const handleConfirmPayment = () => {
        if (!utr.trim()) {
            Alert.alert('Error', 'Please enter UTR/Transaction ID before confirming payment.');
            return;
        }
        Alert.alert(
            'Payment Confirmation',
            `₹${amount} payment confirmed with UTR: ${utr}`,
            [{ text: 'OK', onPress: () => navigation.goBack() }],
        );
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <ScrollView contentContainerStyle={styles.contentContainer}>

                {/* Title */}
                <Text style={styles.pageTitle}>Complete Payment</Text>

                {/* Amount & Instructions */}
                <View style={styles.amountBox}>
                    <Text style={styles.amountLabel}>Amount to Pay</Text>
                    <Text style={styles.amountValue}>₹{amount}</Text>
                    <Text style={styles.instructionText}>
                        Please complete your payment using the UPI ID or QR code below. After successful payment, enter your UTR in the box to confirm the transaction.
                    </Text>
                </View>

                {/* UPI Details Card */}
                <View style={styles.upiCard}>
                    <Text style={styles.upiIdText} selectable>{upiId}</Text>
                    <TouchableOpacity style={styles.copyBtn} onPress={() => copyToClipboard(upiId)}>
                        <Icon name="content-copy" size={18} color={COLORS.primary} />
                        <Text style={styles.copyBtnText}>Copy UPI ID</Text>
                    </TouchableOpacity>
                    <View style={styles.paymentIcons}>
                        <Icon name="upi" size={40} color={COLORS.primary} style={styles.paymentIcon} />
                        <Icon name="currency-inr" size={40} color={COLORS.primary} style={styles.paymentIcon} />
                        <Icon name="google-pay" size={40} color={COLORS.primary} style={styles.paymentIcon} />
                        <Icon name="google" size={40} color={COLORS.primary} style={styles.paymentIcon} />
                    </View>
                </View>

                {/* QR Code Section */}
                <View style={styles.qrSection}>
                    {qrCodeImage ? (
                        <Image source={{ uri: qrCodeImage }} style={styles.qrImage} />
                    ) : (
                        <Icon name="qrcode-scan" size={120} color={COLORS.primary} />
                    )}
                    <Text style={styles.qrLabel}>Scan QR Code to Pay</Text>
                </View>

                {/* UTR Input Section */}
                <View style={styles.utrSection}>
                    <Text style={styles.utrLabel}>Enter UTR / Transaction ID</Text>
                    <TextInput
                        style={styles.utrInput}
                        placeholder="Enter your UTR here"
                        value={utr}
                        onChangeText={setUtr}
                        autoCapitalize="characters"
                        keyboardType="default"
                    />
                </View>

                {/* Encryption Info */}
                <View style={styles.secureSection}>
                    <Icon name="lock" size={22} color={COLORS.success} />
                    <Text style={styles.secureText}>Secure & Encrypted Transaction</Text>
                </View>

                {/* Confirm Button */}
                <TouchableOpacity
                    style={[styles.confirmBtn, !utr.trim() && styles.buttonDisabled]}
                    onPress={handleConfirmPayment}
                    disabled={!utr.trim()}>
                    <Text style={styles.confirmBtnText}>Confirm Payment</Text>
                </TouchableOpacity>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    contentContainer: {
        padding: 24,
        paddingTop: 40,
        alignItems: 'center',
    },

    pageTitle: {
        ...TYPOGRAPHY.h2,
        fontWeight: '800',
        color: COLORS.textPrimary,
        marginBottom: 30,
    },

    amountBox: {
        backgroundColor: COLORS.primaryLight,
        paddingVertical: 24,
        paddingHorizontal: 30,
        borderRadius: 24,
        width: '100%',
        alignItems: 'center',
        ...COMMON_STYLES.shadowMedium,
        marginBottom: 30,
    },

    amountLabel: {
        ...TYPOGRAPHY.body2Medium,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: 8,
    },

    amountValue: {
        ...TYPOGRAPHY.h1,
        fontWeight: '900',
        color: COLORS.primary,
        marginBottom: 12,
        letterSpacing: 2,
    },

    instructionText: {
        ...TYPOGRAPHY.caption,
        textAlign: 'center',
        color: COLORS.textSecondary,
        lineHeight: 18,
    },

    upiCard: {
        backgroundColor: COLORS.surface,
        width: '100%',
        borderRadius: 16,
        paddingVertical: 18,
        paddingHorizontal: 24,
        alignItems: 'center',
        marginBottom: 30,
        ...COMMON_STYLES.shadow,
    },

    upiIdText: {
        ...TYPOGRAPHY.body1,
        color: COLORS.textPrimary,
        fontWeight: '600',
        letterSpacing: 1,
        marginBottom: 12,
    },

    copyBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primary + '22',
        alignSelf: 'center',
        paddingVertical: 6,
        paddingHorizontal: 14,
        borderRadius: 20,
        marginBottom: 18,
    },

    copyBtnText: {
        ...TYPOGRAPHY.caption,
        color: COLORS.primary,
        fontWeight: '600',
        marginLeft: 6,
    },

    paymentIcons: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '60%',
    },

    paymentIcon: {
        marginHorizontal: 8,
    },

    qrSection: {
        alignItems: 'center',
        marginBottom: 30,
    },

    qrImage: {
        width: 140,
        height: 140,
        borderRadius: 16,
        marginBottom: 12,
        backgroundColor: COLORS.primaryLight,
    },

    qrLabel: {
        ...TYPOGRAPHY.body2,
        color: COLORS.textSecondary,
        fontWeight: '600',
    },

    utrSection: {
        width: '100%',
        marginBottom: 30,
    },

    utrLabel: {
        ...TYPOGRAPHY.body1,
        fontWeight: '700',
        marginBottom: 6,
        color: COLORS.textPrimary,
    },

    utrInput: {
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        borderRadius: 12,
        backgroundColor: COLORS.primaryLight + '22',
        padding: 14,
        fontSize: 18,
        color: COLORS.textPrimary,
        fontWeight: '600',
        letterSpacing: 1,
        textTransform: 'uppercase',
    },

    secureSection: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 40,
        gap: 8,
    },

    secureText: {
        ...TYPOGRAPHY.body2Medium,
        color: COLORS.success,
        fontWeight: '700',
    },

    confirmBtn: {
        backgroundColor: COLORS.primary,
        borderRadius: 30,
        paddingVertical: 18,
        width: '100%',
        alignItems: 'center',
        ...COMMON_STYLES.shadowLarge,
    },

    buttonDisabled: {
        backgroundColor: COLORS.primary + '66',
    },

    confirmBtnText: {
        ...TYPOGRAPHY.h5,
        color: COLORS.white,
        fontWeight: '700',
        letterSpacing: 1,
    },
});

export default PaymentScreen;
