import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Alert,
    Clipboard,
    TextInput,
    ScrollView,
    Image,
    Platform,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY, COMMON_STYLES } from '../../constants/styles';

const PaymentScreen = ({ navigation, route }) => {
    const { amount, upiId, qrCodeImage } = route?.params || {
        amount: '1000',
        upiId: 'merchant@paytm',
        qrCodeImage: null,
    };

    const [utr, setUtr] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    const copyToClipboard = (text) => {
        Clipboard.setString(text);
        Alert.alert('Copied!', `${text} has been copied to clipboard.`);
    };

    const handleConfirmPayment = () => {
        if (!utr.trim()) {
            Alert.alert('Required', 'Please enter UTR/Transaction ID to confirm payment.');
            return;
        }

        if (utr.length < 6) {
            Alert.alert('Invalid UTR', 'Please enter a valid transaction ID (minimum 6 characters).');
            return;
        }

        setIsProcessing(true);

        // Simulate API call
        setTimeout(() => {
            setIsProcessing(false);
            Alert.alert(
                'Payment Confirmed',
                `Payment of ₹${amount} has been received successfully.\n\nTransaction ID: ${utr}`,
                [{ text: 'Done', onPress: () => navigation.goBack() }],
            );
        }, 1500);
    };

    // Payment apps data
    const paymentApps = [
        { id: 1, name: 'PhonePe', icon: 'alpha-p-circle', color: '#5f259f' },
        { id: 2, name: 'Paytm', icon: 'alpha-p-circle-outline', color: '#00BAF2' },
        { id: 3, name: 'Google Pay', icon: 'google-pay', color: '#4285F4' },
        { id: 4, name: 'PayPal', icon: 'alpha-p-box', color: '#003087' },
        { id: 5, name: 'Amazon Pay', icon: 'amazon', color: '#FF9900' },
        { id: 6, name: 'Bhim UPI', icon: 'bank', color: '#097969' },
    ];

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.7}>
                        <Icon name="arrow-left" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Complete Payment</Text>
                    <View style={styles.headerRight} />
                </View>
            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>

                {/* IMPORTANT: UTR Mandatory Warning Banner */}
                <View style={styles.criticalWarningBanner}>
                    <View style={styles.warningIconContainer}>
                        <Icon name="alert" size={24} color={COLORS.error} />
                    </View>
                    <View style={styles.warningContent}>
                        <Text style={styles.warningTitle}>⚠️ UTR Submission Required</Text>
                        <Text style={styles.warningText}>
                            Your wallet will NOT be credited unless you submit the UTR/Transaction ID after completing payment. Please ensure you enter the correct UTR to receive your balance.
                        </Text>
                    </View>
                </View>

                {/* Amount Card */}
                <View style={styles.amountCard}>
                    <View style={styles.amountIconContainer}>
                        <Icon name="currency-inr" size={32} color={COLORS.primary} />
                    </View>
                    <Text style={styles.amountLabel}>Amount to Pay</Text>
                    <Text style={styles.amountValue}>₹{amount}</Text>
                    <View style={styles.amountBadge}>
                        <Icon name="clock-outline" size={14} color={COLORS.warning} />
                        <Text style={styles.amountBadgeText}>Payment pending</Text>
                    </View>
                </View>

                {/* Instructions */}
                <View style={styles.instructionCard}>
                    <View style={styles.instructionHeader}>
                        <Icon name="information-outline" size={20} color={COLORS.primary} />
                        <Text style={styles.instructionTitle}>Payment Instructions</Text>
                    </View>
                    <View style={styles.instructionSteps}>
                        <View style={styles.instructionStep}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>1</Text>
                            </View>
                            <Text style={styles.stepText}>Copy UPI ID or scan QR code</Text>
                        </View>
                        <View style={styles.instructionStep}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>2</Text>
                            </View>
                            <Text style={styles.stepText}>Complete payment in your UPI app</Text>
                        </View>
                        <View style={styles.instructionStep}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>3</Text>
                            </View>
                            <Text style={styles.stepText}>
                                <Text style={styles.stepTextBold}>Enter UTR below</Text> - This is mandatory for wallet credit
                            </Text>
                        </View>
                    </View>
                </View>

                {/* UPI ID Card */}
                <View style={styles.paymentMethodCard}>
                    <Text style={styles.cardTitle}>UPI ID</Text>
                    <View style={styles.upiIdContainer}>
                        <View style={styles.upiIdBox}>
                            <Icon name="at" size={18} color={COLORS.textSecondary} />
                            <Text style={styles.upiIdText} selectable>{upiId}</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.copyButton}
                            onPress={() => copyToClipboard(upiId)}
                            activeOpacity={0.7}>
                            <Icon name="content-copy" size={18} color={COLORS.primary} />
                            <Text style={styles.copyButtonText}>Copy</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Payment Apps Grid */}
                    {/* <View style={styles.paymentAppsSection}>
                        <Text style={styles.paymentAppsLabel}>Pay using</Text>
                        <View style={styles.paymentAppsGrid}>
                            {paymentApps.map((app) => (
                                <TouchableOpacity
                                    key={app.id}
                                    style={styles.paymentAppItem}
                                    activeOpacity={0.7}>
                                    <View style={[styles.paymentAppIconContainer, { backgroundColor: app.color + '20' }]}>
                                        <Icon name={app.icon} size={32} color={app.color} />
                                    </View>
                                    <Text style={styles.paymentAppName}>{app.name}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View> */}

                </View>

                {/* QR Code Card */}
                <View style={styles.paymentMethodCard}>
                    <Text style={styles.cardTitle}>Or Scan QR Code</Text>
                    <View style={styles.qrCodeContainer}>
                        {qrCodeImage ? (
                            <Image source={{ uri: qrCodeImage }} style={styles.qrCodeImage} />
                        ) : (
                            <View style={styles.qrCodePlaceholder}>
                                <Icon name="qrcode-scan" size={120} color={COLORS.border} />
                                <Text style={styles.qrCodePlaceholderText}>QR Code will appear here</Text>
                            </View>
                        )}
                    </View>
                    <View style={styles.qrHintContainer}>
                        <Icon name="information-outline" size={16} color={COLORS.primary} />
                        <Text style={styles.qrHintText}>
                            Open any UPI app and scan this QR code to pay
                        </Text>
                    </View>
                </View>

                {/* UTR Input Card - With Emphasis */}
                <View style={styles.utrCard}>
                    <View style={styles.utrCardHeader}>
                        <Icon name="shield-check" size={20} color={COLORS.error} />
                        <Text style={styles.cardTitleImportant}>Transaction Confirmation (Required)</Text>
                    </View>
                    <Text style={styles.utrSubtitle}>
                        Enter the 12-digit UTR/Transaction ID from your payment app
                    </Text>

                    {/* UTR Importance Notice */}
                    <View style={styles.utrImportanceBox}>
                        <Icon name="alert-circle" size={18} color={COLORS.error} />
                        <Text style={styles.utrImportanceText}>
                            Without UTR, your ₹{amount} will NOT be added to your wallet
                        </Text>
                    </View>

                    <View style={styles.utrInputContainer}>
                        <Icon name="receipt" size={20} color={COLORS.textSecondary} />
                        <TextInput
                            style={styles.utrInput}
                            placeholder="Enter UTR / Transaction ID *"
                            placeholderTextColor={COLORS.textLight}
                            value={utr}
                            onChangeText={setUtr}
                            autoCapitalize="characters"
                            keyboardType="default"
                            maxLength={20}
                        />
                        {utr.length > 0 && (
                            <TouchableOpacity onPress={() => setUtr('')}>
                                <Icon name="close-circle" size={20} color={COLORS.textLight} />
                            </TouchableOpacity>
                        )}
                    </View>

                    {utr.length > 0 && utr.length < 6 && (
                        <View style={styles.validationMessage}>
                            <Icon name="alert-circle-outline" size={14} color={COLORS.error} />
                            <Text style={styles.validationText}>
                                UTR should be at least 6 characters
                            </Text>
                        </View>
                    )}

                    {/* Where to find UTR */}
                    <View style={styles.utrHelpBox}>
                        <Icon name="help-circle-outline" size={16} color={COLORS.primary} />
                        <Text style={styles.utrHelpText}>
                            Find UTR in your payment app's transaction history
                        </Text>
                    </View>
                </View>

                {/* Security Badge */}
                <View style={styles.securityBadge}>
                    <Icon name="shield-check" size={18} color={COLORS.success} />
                    <Text style={styles.securityText}>
                        Secure & Encrypted Transaction
                    </Text>
                    <Icon name="lock" size={16} color={COLORS.success} />
                </View>

            </ScrollView>

            {/* Bottom Fixed Button */}
            <SafeAreaView edges={['bottom']} style={styles.bottomSafeArea}>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={[
                            styles.confirmButton,
                            (!utr.trim() || isProcessing) && styles.confirmButtonDisabled
                        ]}
                        onPress={handleConfirmPayment}
                        disabled={!utr.trim() || isProcessing}
                        activeOpacity={0.8}>
                        {isProcessing ? (
                            <View style={styles.processingContainer}>
                                <Icon name="loading" size={20} color={COLORS.white} />
                                <Text style={styles.confirmButtonText}>Processing...</Text>
                            </View>
                        ) : (
                            <>
                                <Icon name="check-circle" size={20} color={COLORS.white} />
                                <Text style={styles.confirmButtonText}>
                                    {utr.trim() ? 'Confirm Payment' : 'Enter UTR to Continue'}
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    safeArea: {
        backgroundColor: COLORS.surface,
    },

    // Header
    header: {
        backgroundColor: COLORS.surface,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
    },

    headerRight: {
        width: 40,
    },

    scrollContent: {
        padding: 16,
        paddingBottom: 100,
    },

    // Critical Warning Banner
    criticalWarningBanner: {
        flexDirection: 'row',
        backgroundColor: '#FFF3E0',
        borderLeftWidth: 4,
        borderLeftColor: COLORS.error,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        shadowColor: COLORS.error,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 3,
    },

    warningIconContainer: {
        marginRight: 12,
    },

    warningContent: {
        flex: 1,
    },

    warningTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: COLORS.error,
        marginBottom: 6,
    },

    warningText: {
        fontSize: 13,
        color: '#D84315',
        lineHeight: 18,
        fontWeight: '500',
    },

    // Amount Card
    amountCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },

    amountIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: COLORS.primaryUltraLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },

    amountLabel: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 8,
        fontWeight: '500',
    },

    amountValue: {
        fontSize: 40,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 12,
        letterSpacing: -1,
    },

    amountBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.warningLight,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        gap: 6,
    },

    amountBadgeText: {
        fontSize: 12,
        color: COLORS.warning,
        fontWeight: '600',
    },

    // Instruction Card
    instructionCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    instructionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 8,
    },

    instructionTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.text,
    },

    instructionSteps: {
        gap: 12,
    },

    instructionStep: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },

    stepNumber: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },

    stepNumberText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.white,
    },

    stepText: {
        flex: 1,
        fontSize: 14,
        color: COLORS.textSecondary,
        lineHeight: 20,
    },

    stepTextBold: {
        fontWeight: '700',
        color: COLORS.error,
    },

    // Payment Method Card
    paymentMethodCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    cardTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 12,
    },

    upiIdContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        marginBottom: 16,
    },

    upiIdBox: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 12,
        padding: 14,
        gap: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    upiIdText: {
        flex: 1,
        fontSize: 15,
        fontWeight: '600',
        color: COLORS.text,
        letterSpacing: 0.5,
    },

    copyButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primaryUltraLight,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: 12,
        gap: 6,
    },

    copyButtonText: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.primary,
    },

    // Payment Apps Section
    paymentAppsSection: {
        marginTop: 4,
    },

    paymentAppsLabel: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginBottom: 12,
        fontWeight: '600',
    },

    paymentAppsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },

    paymentAppItem: {
        width: '30%',
        alignItems: 'center',
        gap: 8,
    },

    paymentAppIconContainer: {
        width: 64,
        height: 64,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    paymentAppName: {
        fontSize: 11,
        color: COLORS.textSecondary,
        fontWeight: '600',
        textAlign: 'center',
    },

    // QR Code
    qrCodeContainer: {
        alignItems: 'center',
        padding: 16,
    },

    qrCodeImage: {
        width: 200,
        height: 200,
        borderRadius: 16,
    },

    qrCodePlaceholder: {
        width: 200,
        height: 200,
        borderRadius: 16,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: COLORS.border,
        borderStyle: 'dashed',
    },

    qrCodePlaceholderText: {
        fontSize: 12,
        color: COLORS.textLight,
        marginTop: 12,
    },

    qrHintContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primaryUltraLight,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        gap: 8,
    },

    qrHintText: {
        flex: 1,
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '500',
    },

    // UTR Card - Enhanced
    utrCard: {
        backgroundColor: '#FFF9E6',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 2,
        borderColor: COLORS.error,
    },

    utrCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 8,
    },

    cardTitleImportant: {
        fontSize: 16,
        fontWeight: '800',
        color: COLORS.error,
    },

    utrSubtitle: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginBottom: 12,
        lineHeight: 18,
    },

    utrImportanceBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.errorLight,
        padding: 12,
        borderRadius: 10,
        gap: 8,
        marginBottom: 16,
    },

    utrImportanceText: {
        flex: 1,
        fontSize: 13,
        color: COLORS.error,
        fontWeight: '700',
    },

    utrInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        borderRadius: 12,
        padding: 14,
        borderWidth: 2,
        borderColor: COLORS.error,
        gap: 10,
        marginBottom: 8,
    },

    utrInput: {
        flex: 1,
        fontSize: 16,
        color: COLORS.text,
        fontWeight: '600',
        letterSpacing: 1,
    },

    validationMessage: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        gap: 6,
    },

    validationText: {
        fontSize: 12,
        color: COLORS.error,
        fontWeight: '600',
    },

    utrHelpBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primaryUltraLight,
        padding: 10,
        borderRadius: 8,
        gap: 8,
    },

    utrHelpText: {
        flex: 1,
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '500',
    },

    // Security Badge
    securityBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.successLight,
        paddingVertical: 12,
        paddingHorizontal: 16,
        borderRadius: 12,
        gap: 8,
        marginBottom: 16,
    },

    securityText: {
        fontSize: 13,
        color: COLORS.success,
        fontWeight: '600',
    },

    // Bottom Button
    bottomSafeArea: {
        backgroundColor: COLORS.surface,
    },

    bottomContainer: {
        backgroundColor: COLORS.surface,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },

    confirmButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },

    confirmButtonDisabled: {
        backgroundColor: COLORS.border,
        shadowOpacity: 0,
    },

    confirmButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.white,
        letterSpacing: 0.5,
    },

    processingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
});

export default PaymentScreen;
