import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    StatusBar,
    Dimensions,
    Platform,
    ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StockChart from '../StockChart';

const StockDetailScreen = ({ navigation, route }) => {
    const { stock } = route?.params || {
        stock: {
            name: 'SENSEX 06 Nov 87000 Call',
            value: '23.25',
            change: '-68.00%',
            isPositive: false,
        },
    };


    // State management
    const [priceLimit, setPriceLimit] = useState('');
    const walletBalance = 1250; // Replace with actual wallet balance from your state/context
    const minimumTradeAmount = 500;

    // Helper functions
    const formatCurrency = (value) => {
        const num = typeof value === 'number' ? value : parseFloat(value) || 0;
        return num.toFixed(2);
    };

    const handleNumberPress = (num) => {
        if (priceLimit.length < 10) {
            setPriceLimit(priceLimit + num);
        }
    };

    const handleBackspace = () => {
        setPriceLimit(priceLimit.slice(0, -1));
    };

    const handleDecimal = () => {
        if (!priceLimit.includes('.')) {
            setPriceLimit(priceLimit + '.');
        }
    };

    const handleClear = () => {
        setPriceLimit('');
    };

    // Calculations
    const enteredAmount = parseFloat(priceLimit) || 0;
    const balanceAfter = walletBalance - enteredAmount;

    // Validation logic - SIMPLIFIED
    const isBelowMinimum = enteredAmount > 0 && enteredAmount < minimumTradeAmount;
    const exceedsBalance = enteredAmount > walletBalance;
    const canTrade = enteredAmount >= minimumTradeAmount && enteredAmount <= walletBalance;

    const NumberButton = ({ value, onPress, style }) => (
        <TouchableOpacity
            style={[styles.numButton, style]}
            onPress={onPress}
            activeOpacity={0.7}>
            {typeof value === 'string' ? (
                <Text style={styles.numButtonText}>{value}</Text>
            ) : (
                value
            )}
        </TouchableOpacity>
    );

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

                    <View style={styles.headerInfo}>
                        <Text style={styles.stockName} numberOfLines={1}>
                            {stock.name}
                        </Text>
                        <View style={styles.stockPriceRow}>
                            <Text style={styles.priceText}>₹{stock.value}</Text>
                            <View style={[
                                styles.changeBadge,
                                { backgroundColor: stock.isPositive ? COLORS.successLight : COLORS.errorLight }
                            ]}>
                                <Icon
                                    name={stock.isPositive ? 'arrow-up' : 'arrow-down'}
                                    size={12}
                                    color={stock.isPositive ? COLORS.success : COLORS.error}
                                />
                                <Text style={[
                                    styles.changeText,
                                    { color: stock.isPositive ? COLORS.success : COLORS.error }
                                ]}>
                                    {stock.change}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.depthButton} activeOpacity={0.7}>
                        <Text style={styles.depthText}>Depth</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            {/* Main Content - Scrollable */}
            <ScrollView
                style={styles.scrollView}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>


                <StockChart
                    stockName={stock.name}
                    currentPrice={stock.value}
                    change={stock.change}
                    isPositive={stock.isPositive}
                />

                {/* Wallet Balance Section */}
                <View style={styles.walletSection}>
                    <View style={styles.walletCard}>
                        <View style={styles.walletHeader}>
                            <View style={styles.walletIconContainer}>
                                <Icon name="wallet-outline" size={20} color={COLORS.primary} />
                            </View>
                            <View style={styles.walletInfo}>
                                <Text style={styles.walletLabel}>Wallet Balance</Text>
                                <Text style={styles.walletAmount}>₹{formatCurrency(walletBalance)}</Text>
                            </View>
                        </View>



                        {/* Error Message - Below Minimum */}
                        {isBelowMinimum && (
                            <View style={styles.errorContainer}>
                                <Icon name="alert-circle-outline" size={16} color={COLORS.error} />
                                <Text style={styles.errorText}>
                                    Minimum trade amount is ₹{minimumTradeAmount}
                                </Text>
                            </View>
                        )}

                        {/* Error Message - Exceeds Balance */}
                        {exceedsBalance && (
                            <View style={styles.errorContainer}>
                                <Icon name="alert-circle-outline" size={16} color={COLORS.error} />
                                <Text style={styles.errorText}>
                                    Insufficient balance. Available: ₹{formatCurrency(walletBalance)}
                                </Text>
                            </View>
                        )}

                        {/* Success Message */}
                        {canTrade && (
                            <View style={styles.successContainer}>
                                <Icon name="check-circle-outline" size={16} color={COLORS.success} />
                                <Text style={styles.successText}>
                                    Ready to trade • Balance after: ₹{formatCurrency(balanceAfter)}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Price Input Section */}
                <View style={styles.priceSection}>
                    <View style={styles.priceSectionHeader}>
                        <Text style={styles.priceLabel}>Enter Amount</Text>
                        <TouchableOpacity
                            style={styles.clearButton}
                            onPress={handleClear}
                            activeOpacity={0.7}>
                            <Text style={styles.clearButtonText}>Clear</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[
                        styles.priceInputContainer,
                        isBelowMinimum && styles.priceInputError,
                        exceedsBalance && styles.priceInputError,
                        canTrade && styles.priceInputSuccess
                    ]}>
                        <Text style={styles.currencySymbol}>₹</Text>
                        <Text style={styles.priceInputText}>
                            {priceLimit || '0'}
                        </Text>
                    </View>

                    <View style={styles.priceHints}>
                        <View style={styles.priceHint}>
                            <Icon name="currency-inr" size={14} color={COLORS.textSecondary} />
                            <Text style={styles.priceHintText}>
                                Min: ₹{minimumTradeAmount}
                            </Text>
                        </View>
                        <View style={styles.priceHint}>
                            <Icon name="chart-line" size={14} color={COLORS.textSecondary} />
                            <Text style={styles.priceHintText}>
                                Market: ₹{stock.value}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Summary Section - Always Visible */}
                <View style={styles.summarySection}>
                    <Text style={styles.summaryTitle}>Transaction Summary</Text>

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Amount to pay</Text>
                        <Text style={styles.summaryValue}>₹{formatCurrency(enteredAmount)}</Text>
                    </View>

                    <View style={styles.summaryDivider} />

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Current balance</Text>
                        <Text style={styles.summaryValue}>₹{formatCurrency(walletBalance)}</Text>
                    </View>

                    <View style={styles.summaryDivider} />

                    <View style={styles.summaryRow}>
                        <Text style={styles.summaryLabel}>Balance after</Text>
                        <Text style={[
                            styles.summaryValue,
                            styles.summaryHighlight,
                            { color: balanceAfter >= 0 ? COLORS.success : COLORS.error }
                        ]}>
                            ₹{formatCurrency(balanceAfter)}
                        </Text>
                    </View>
                </View>
            </ScrollView>

            {/* Bottom Fixed Section */}
            <View style={styles.bottomSection}>
                {/* Action Buttons */}
                <View style={styles.actionButtons}>
                    <TouchableOpacity
                        style={[
                            styles.buyButton,
                            !canTrade && styles.disabledButton
                        ]}
                        activeOpacity={canTrade ? 0.8 : 1}
                        disabled={!canTrade}
                        onPress={() => {
                            if (canTrade) {
                                console.log('Buy pressed with amount:', enteredAmount);
                                // Handle buy logic here
                            }
                        }}>
                        <Text style={[
                            styles.buyButtonText,
                            !canTrade && styles.disabledButtonText
                        ]}>
                            {isBelowMinimum
                                ? `Min ₹${minimumTradeAmount}`
                                : exceedsBalance
                                    ? 'Insufficient Balance'
                                    : canTrade
                                        ? 'Buy Now'
                                        : 'Enter Amount'}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.addMoneyButton}
                        activeOpacity={0.8}
                        onPress={() => navigation.navigate('Recharge')}>
                        <Icon name="plus-circle" size={18} color={COLORS.white} />
                        <Text style={styles.addMoneyButtonText}>Add Money</Text>
                    </TouchableOpacity>
                </View>

                {/* Number Pad */}
                <View style={styles.numberPad}>
                    <View style={styles.numberRow}>
                        <NumberButton value="1" onPress={() => handleNumberPress('1')} />
                        <NumberButton value="2" onPress={() => handleNumberPress('2')} />
                        <NumberButton value="3" onPress={() => handleNumberPress('3')} />
                    </View>

                    <View style={styles.numberRow}>
                        <NumberButton value="4" onPress={() => handleNumberPress('4')} />
                        <NumberButton value="5" onPress={() => handleNumberPress('5')} />
                        <NumberButton value="6" onPress={() => handleNumberPress('6')} />
                    </View>

                    <View style={styles.numberRow}>
                        <NumberButton value="7" onPress={() => handleNumberPress('7')} />
                        <NumberButton value="8" onPress={() => handleNumberPress('8')} />
                        <NumberButton value="9" onPress={() => handleNumberPress('9')} />
                    </View>

                    <View style={styles.numberRow}>
                        <NumberButton value="." onPress={handleDecimal} />
                        <NumberButton value="0" onPress={() => handleNumberPress('0')} />
                        <NumberButton
                            value={<Icon name="backspace-outline" size={24} color={COLORS.text} />}
                            onPress={handleBackspace}
                        />
                    </View>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    safeArea: {
        backgroundColor: COLORS.background,
    },

    scrollView: {
        flex: 1,
    },

    scrollContent: {
        paddingBottom: 20,
    },

    // Header Styles
    header: {
        backgroundColor: COLORS.surface,
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    backButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 8,
    },

    headerInfo: {
        flex: 1,
    },

    stockName: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 6,
    },

    stockPriceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    priceText: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
    },

    changeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
    },

    changeText: {
        fontSize: 12,
        fontWeight: '700',
    },

    depthButton: {
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 8,
        backgroundColor: COLORS.primaryUltraLight,
    },

    depthText: {
        fontSize: 13,
        color: COLORS.primary,
        fontWeight: '700',
    },

    // Wallet Section
    walletSection: {
        padding: 16,
    },

    walletCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 4,
    },

    walletHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },

    walletIconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.primaryUltraLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    walletInfo: {
        flex: 1,
    },

    walletLabel: {
        fontSize: 13,
        color: COLORS.textSecondary,
        marginBottom: 4,
        fontWeight: '500',
    },

    walletAmount: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.text,
        letterSpacing: -0.5,
    },

    balanceInfoCard: {
        backgroundColor: COLORS.primaryUltraLight,
        borderRadius: 10,
        padding: 12,
        marginBottom: 12,
    },

    balanceInfoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },

    balanceInfoText: {
        flex: 1,
        fontSize: 12,
        color: COLORS.primary,
        fontWeight: '600',
    },

    errorContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.errorLight,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        gap: 8,
    },

    errorText: {
        flex: 1,
        fontSize: 12,
        color: COLORS.error,
        fontWeight: '600',
    },

    successContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.successLight,
        paddingHorizontal: 12,
        paddingVertical: 10,
        borderRadius: 10,
        gap: 8,
    },

    successText: {
        flex: 1,
        fontSize: 12,
        color: COLORS.success,
        fontWeight: '600',
    },

    // Price Section
    priceSection: {
        paddingHorizontal: 16,
        marginBottom: 16,
    },

    priceSectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 12,
    },

    priceLabel: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.text,
    },

    clearButton: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 6,
        backgroundColor: COLORS.background,
    },

    clearButtonText: {
        fontSize: 13,
        color: COLORS.primary,
        fontWeight: '600',
    },

    priceInputContainer: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        borderWidth: 2,
        borderColor: COLORS.border,
        paddingHorizontal: 20,
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        minHeight: 80,
    },

    priceInputError: {
        borderColor: COLORS.error,
        backgroundColor: COLORS.errorLight,
    },

    priceInputSuccess: {
        borderColor: COLORS.success,
    },

    currencySymbol: {
        fontSize: 32,
        fontWeight: '700',
        color: COLORS.textSecondary,
        marginRight: 8,
    },

    priceInputText: {
        fontSize: 40,
        fontWeight: '800',
        color: COLORS.text,
        flex: 1,
        letterSpacing: -1,
    },

    priceHints: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },

    priceHint: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    priceHintText: {
        fontSize: 12,
        color: COLORS.textSecondary,
    },

    // Summary Section
    summarySection: {
        marginHorizontal: 16,
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    summaryTitle: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 12,
    },

    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 4,
    },

    summaryDivider: {
        height: 1,
        backgroundColor: COLORS.border,
        marginVertical: 8,
    },

    summaryLabel: {
        fontSize: 13,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },

    summaryValue: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
    },

    summaryHighlight: {
        fontSize: 18,
    },

    // Bottom Section
    bottomSection: {
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        paddingTop: 16,
        paddingHorizontal: 16,
        paddingBottom: Platform.OS === 'ios' ? 20 : 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.08,
        shadowRadius: 12,
        elevation: 8,
    },

    actionButtons: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 16,
    },

    buyButton: {
        flex: 1,
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },

    disabledButton: {
        backgroundColor: COLORS.border,
        shadowOpacity: 0,
    },

    buyButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.white,
        letterSpacing: 0.5,
    },

    disabledButtonText: {
        color: COLORS.textSecondary,
    },

    addMoneyButton: {
        flex: 1,
        backgroundColor: COLORS.success,
        borderRadius: 12,
        paddingVertical: 16,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 8,
        shadowColor: COLORS.success,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },

    addMoneyButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.white,
        letterSpacing: 0.5,
    },

    // Number Pad
    numberPad: {
        gap: 12,
        marginBottom: 18,
    },

    numberRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: 12,
    },

    numButton: {
        flex: 1,
        aspectRatio: 1.3,
        maxHeight: 65,
        backgroundColor: COLORS.background,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },

    numButtonText: {
        fontSize: 24,
        color: COLORS.text,
        fontWeight: '700',
    },
});

export default StockDetailScreen;