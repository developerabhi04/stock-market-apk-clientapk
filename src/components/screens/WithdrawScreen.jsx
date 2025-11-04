import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    Alert,
    ScrollView,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY, COMMON_STYLES } from '../../constants/styles';

// Mock Data
const WALLET_BALANCE = 15750.50;
const MIN_WITHDRAWAL = 100;
const MAX_WITHDRAWAL = 50000;

const WITHDRAWAL_HISTORY = [
    {
        id: '1',
        amount: 5000,
        date: '03 Nov 2025',
        time: '10:30 AM',
        status: 'pending',
        transactionId: 'WD1234567890',
    },
    {
        id: '2',
        amount: 3000,
        date: '01 Nov 2025',
        time: '02:15 PM',
        status: 'processing',
        transactionId: 'WD0987654321',
    },
    {
        id: '3',
        amount: 2500,
        date: '28 Oct 2025',
        time: '04:45 PM',
        status: 'success',
        transactionId: 'WD1122334455',
        completedDate: '30 Oct 2025',
    },
    {
        id: '4',
        amount: 1000,
        date: '25 Oct 2025',
        time: '11:20 AM',
        status: 'success',
        transactionId: 'WD5544332211',
        completedDate: '27 Oct 2025',
    },
    {
        id: '5',
        amount: 4500,
        date: '20 Oct 2025',
        time: '03:30 PM',
        status: 'failed',
        transactionId: 'WD9988776655',
        reason: 'Invalid bank details',
    },
];

const WithdrawScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(value);
    };

    const validateAmount = (value) => {
        const numValue = parseFloat(value);

        if (!value || numValue === 0) {
            setError('Please enter an amount');
            return false;
        }

        if (numValue < MIN_WITHDRAWAL) {
            setError(`Minimum withdrawal amount is ${formatCurrency(MIN_WITHDRAWAL)}`);
            return false;
        }

        if (numValue > MAX_WITHDRAWAL) {
            setError(`Maximum withdrawal amount is ${formatCurrency(MAX_WITHDRAWAL)}`);
            return false;
        }

        if (numValue > WALLET_BALANCE) {
            setError('Insufficient balance');
            return false;
        }

        setError('');
        return true;
    };

    const handleAmountChange = (value) => {
        setAmount(value);
        if (value) {
            validateAmount(value);
        } else {
            setError('');
        }
    };

    const handleWithdraw = () => {
        if (validateAmount(amount)) {
            Alert.alert(
                'Confirm Withdrawal',
                `Withdraw ${formatCurrency(parseFloat(amount))} to your bank account?`,
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Confirm',
                        onPress: () => {
                            Alert.alert(
                                'Withdrawal Initiated',
                                `${formatCurrency(parseFloat(amount))} will be transferred to your bank within 1-3 business days.`,
                                [{ text: 'OK', onPress: () => setAmount('') }]
                            );
                        },
                    },
                ]
            );
        }
    };

    const getStatusInfo = (status) => {
        switch (status) {
            case 'pending':
                return { color: COLORS.warning, icon: 'clock-outline', text: 'Pending' };
            case 'processing':
                return { color: COLORS.primary, icon: 'sync', text: 'Processing' };
            case 'success':
                return { color: COLORS.success, icon: 'check-circle', text: 'Completed' };
            case 'failed':
                return { color: COLORS.error, icon: 'close-circle', text: 'Failed' };
            default:
                return { color: COLORS.textSecondary, icon: 'help-circle', text: 'Unknown' };
        }
    };

    const sortedHistory = [...WITHDRAWAL_HISTORY].sort((a, b) => {
        const statusOrder = { pending: 1, processing: 2, success: 3, failed: 4 };
        return statusOrder[a.status] - statusOrder[b.status];
    });

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={styles.backBtn}
                        activeOpacity={0.7}>
                        <Icon name="arrow-left" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Withdraw Money</Text>
                    <View style={{ width: 48 }} />
                </View>
            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>

                {/* Balance Card */}
                <View style={styles.balanceCard}>
                    <View style={styles.balanceHeader}>
                        <View style={styles.balanceIconContainer}>
                            <Icon name="wallet" size={28} color={COLORS.primary} />
                        </View>
                        <View style={styles.balanceInfo}>
                            <Text style={styles.balanceLabel}>Available Balance</Text>
                            <Text style={styles.balanceValue}>{formatCurrency(WALLET_BALANCE)}</Text>
                        </View>
                    </View>

                    <View style={styles.balanceNote}>
                        <Icon name="information-outline" size={16} color={COLORS.primary} />
                        <Text style={styles.balanceNoteText}>
                            Withdrawals are processed within 1-3 business days
                        </Text>
                    </View>
                </View>

                {/* Withdrawal Form */}
                <View style={styles.formCard}>
                    <Text style={styles.formTitle}>Enter Withdrawal Amount</Text>

                    <View style={[
                        styles.inputContainer,
                        error && styles.inputContainerError,
                        amount && !error && styles.inputContainerSuccess
                    ]}>
                        <Text style={styles.currencySymbol}>₹</Text>
                        <TextInput
                            value={amount}
                            onChangeText={handleAmountChange}
                            keyboardType="numeric"
                            placeholder="0"
                            placeholderTextColor={COLORS.textLight}
                            style={styles.input}
                        />
                    </View>

                    {error && (
                        <View style={styles.errorContainer}>
                            <Icon name="alert-circle-outline" size={16} color={COLORS.error} />
                            <Text style={styles.errorText}>{error}</Text>
                        </View>
                    )}

                    <View style={styles.amountLimits}>
                        <View style={styles.limitItem}>
                            <Icon name="arrow-down-circle-outline" size={16} color={COLORS.textSecondary} />
                            <Text style={styles.limitText}>
                                Min: {formatCurrency(MIN_WITHDRAWAL)}
                            </Text>
                        </View>
                        <View style={styles.limitItem}>
                            <Icon name="arrow-up-circle-outline" size={16} color={COLORS.textSecondary} />
                            <Text style={styles.limitText}>
                                Max: {formatCurrency(MAX_WITHDRAWAL)}
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.withdrawButton,
                            (!amount || error) && styles.withdrawButtonDisabled
                        ]}
                        disabled={!amount || !!error}
                        onPress={handleWithdraw}
                        activeOpacity={0.8}>
                        <Icon name="bank-transfer-out" size={20} color={COLORS.white} />
                        <Text style={styles.withdrawButtonText}>
                            {amount && !error ? `Withdraw ${formatCurrency(parseFloat(amount))}` : 'Enter Amount to Withdraw'}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Withdrawal History */}
                <View style={styles.historySection}>
                    <Text style={styles.historyTitle}>Withdrawal History</Text>

                    {sortedHistory.map((transaction) => {
                        const statusInfo = getStatusInfo(transaction.status);

                        return (
                            <View key={transaction.id} style={styles.historyCard}>
                                <View style={styles.historyHeader}>
                                    <View style={[
                                        styles.statusIcon,
                                        { backgroundColor: statusInfo.color + '20' }
                                    ]}>
                                        <Icon name={statusInfo.icon} size={24} color={statusInfo.color} />
                                    </View>

                                    <View style={styles.historyInfo}>
                                        <View style={styles.historyRow}>
                                            <Text style={styles.historyAmount}>
                                                {formatCurrency(transaction.amount)}
                                            </Text>
                                            <View style={[
                                                styles.statusBadge,
                                                { backgroundColor: statusInfo.color + '20' }
                                            ]}>
                                                <Text style={[styles.statusText, { color: statusInfo.color }]}>
                                                    {statusInfo.text}
                                                </Text>
                                            </View>
                                        </View>

                                        <Text style={styles.historyDate}>
                                            {transaction.date} • {transaction.time}
                                        </Text>

                                        <Text style={styles.transactionId}>
                                            ID: {transaction.transactionId}
                                        </Text>

                                        {transaction.status === 'success' && transaction.completedDate && (
                                            <View style={styles.completedInfo}>
                                                <Icon name="check" size={14} color={COLORS.success} />
                                                <Text style={styles.completedText}>
                                                    Completed on {transaction.completedDate}
                                                </Text>
                                            </View>
                                        )}

                                        {transaction.status === 'failed' && transaction.reason && (
                                            <View style={styles.failedInfo}>
                                                <Icon name="close" size={14} color={COLORS.error} />
                                                <Text style={styles.failedText}>
                                                    {transaction.reason}
                                                </Text>
                                            </View>
                                        )}
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                </View>
            </ScrollView>
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
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
    },

    backBtn: {
        width: 48,
        height: 44,
        alignItems: 'center',
        justifyContent: 'center',
    },

    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },

    // Balance Card
    balanceCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...COMMON_STYLES.shadow,
    },

    balanceHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },

    balanceIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.primaryUltraLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },

    balanceInfo: {
        flex: 1,
    },

    balanceLabel: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 6,
    },

    balanceValue: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.text,
        letterSpacing: -0.5,
    },

    balanceNote: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primaryUltraLight,
        padding: 12,
        borderRadius: 10,
        gap: 8,
    },

    balanceNoteText: {
        flex: 1,
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '500',
    },

    // Form Card
    formCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    formTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 16,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: COLORS.border,
        paddingHorizontal: 16,
        paddingVertical: 14,
        marginBottom: 12,
    },

    inputContainerError: {
        borderColor: COLORS.error,
        backgroundColor: COLORS.errorLight,
    },

    inputContainerSuccess: {
        borderColor: COLORS.success,
    },

    currencySymbol: {
        fontSize: 24,
        fontWeight: '700',
        color: COLORS.textSecondary,
        marginRight: 8,
    },

    input: {
        flex: 1,
        fontSize: 28,
        fontWeight: '700',
        color: COLORS.text,
        padding: 0,
    },

    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        marginBottom: 12,
    },

    errorText: {
        fontSize: 13,
        color: COLORS.error,
        fontWeight: '500',
    },

    amountLimits: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 20,
    },

    limitItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    limitText: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },

    withdrawButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.warning,
        paddingVertical: 16,
        borderRadius: 12,
        gap: 8,
        shadowColor: COLORS.warning,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },

    withdrawButtonDisabled: {
        backgroundColor: COLORS.border,
        shadowOpacity: 0,
        elevation: 0,
    },

    withdrawButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.white,
    },

    // History Section
    historySection: {
        marginBottom: 20,
    },

    historyTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 16,
    },

    historyCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    historyHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },

    statusIcon: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    historyInfo: {
        flex: 1,
    },

    historyRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 6,
    },

    historyAmount: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
    },

    statusBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 6,
    },

    statusText: {
        fontSize: 12,
        fontWeight: '700',
    },

    historyDate: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginBottom: 4,
    },

    transactionId: {
        fontSize: 11,
        color: COLORS.textLight,
        fontFamily: 'monospace',
    },

    completedInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 8,
        padding: 8,
        backgroundColor: COLORS.successLight,
        borderRadius: 8,
    },

    completedText: {
        fontSize: 12,
        color: COLORS.success,
        fontWeight: '600',
    },

    failedInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
        marginTop: 8,
        padding: 8,
        backgroundColor: COLORS.errorLight,
        borderRadius: 8,
    },

    failedText: {
        fontSize: 12,
        color: COLORS.error,
        fontWeight: '600',
    },
});

export default WithdrawScreen;
