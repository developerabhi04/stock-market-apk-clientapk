import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY, COMMON_STYLES } from '../../constants/styles';

// Mock Data
const WALLET_BALANCE = 15750.50;
const INVESTED_AMOUNT = 12500.00;
const CURRENT_VALUE = 15750.50;
const TOTAL_RETURNS = 3250.50;
const RETURNS_PERCENTAGE = 26.00;

const TOP_STOCKS = [
    { id: '1', name: 'NIFTY 50', currentPrice: '19,650.50', change: '+1.11%', isPositive: true, invested: 3887.06, current: 3930.10 },
    { id: '2', name: 'BANK NIFTY', currentPrice: '44,125.60', change: '+1.28%', isPositive: true, invested: 6535.17, current: 6618.84 },
    { id: '3', name: 'SENSEX', currentPrice: '64,250.30', change: '-0.90%', isPositive: false, invested: 6483.26, current: 6425.03 },
];

const PURCHASE_HISTORY = [
    { id: '1', name: 'NIFTY 50', date: '28 Oct 2025', amount: 1000, quantity: 20, type: 'Buy' },
    { id: '2', name: 'BANK NIFTY', date: '25 Oct 2025', amount: 1500, quantity: 15, type: 'Buy' },
    { id: '3', name: 'SENSEX', date: '20 Oct 2025', amount: 2000, quantity: 10, type: 'Buy' },
    { id: '4', name: 'NIFTY IT', date: '15 Oct 2025', amount: 1200, quantity: 25, type: 'Sell' },
    { id: '5', name: 'NIFTY 50', date: '10 Oct 2025', amount: 800, quantity: 20, type: 'Buy' },
];

const WalletScreen = ({ navigation }) => {
    const [selectedTab, setSelectedTab] = useState('holdings');

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(value);
    };

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
                    <Text style={styles.headerTitle}>Wallet</Text>
                    <TouchableOpacity style={styles.historyBtn} activeOpacity={0.7}>
                        <Icon name="history" size={24} color={COLORS.text} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>

                {/* Wallet Balance Card */}
                <View style={styles.balanceCard}>
                    <View style={styles.balanceHeader}>
                        <View>
                            <Text style={styles.balanceLabel}>Total Balance</Text>
                            <Text style={styles.balanceValue}>{formatCurrency(WALLET_BALANCE)}</Text>
                        </View>
                        <View style={styles.balanceIconContainer}>
                            <Icon name="wallet" size={32} color={COLORS.primary} />
                        </View>
                    </View>

                    <View style={styles.balanceStats}>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Invested</Text>
                            <Text style={styles.statValue}>{formatCurrency(INVESTED_AMOUNT)}</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Current</Text>
                            <Text style={styles.statValue}>{formatCurrency(CURRENT_VALUE)}</Text>
                        </View>
                        <View style={styles.statDivider} />
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Returns</Text>
                            <View style={styles.returnsContainer}>
                                <Text style={[styles.statValue, { color: COLORS.success }]}>
                                    +{formatCurrency(TOTAL_RETURNS)}
                                </Text>
                                <Text style={[styles.returnsPercent, { color: COLORS.success }]}>
                                    (+{RETURNS_PERCENTAGE}%)
                                </Text>
                            </View>
                        </View>
                    </View>

                    {/* Action Buttons */}
                    <View style={styles.actionButtons}>
                        <TouchableOpacity 
                            style={styles.actionButton}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('Recharge')}>
                            <Icon name="plus-circle" size={20} color={COLORS.white} />
                            <Text style={styles.actionButtonText}>Add Money</Text>
                        </TouchableOpacity>

                        <TouchableOpacity 
                            style={[styles.actionButton, styles.actionButtonSecondary]}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('Withdraw')}>
                            <Icon name="bank-transfer" size={20} color={COLORS.primary} />
                            <Text style={[styles.actionButtonText, { color: COLORS.primary }]}>
                                Withdraw
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Tabs */}
                <View style={styles.tabsContainer}>
                    <TouchableOpacity
                        style={[styles.tab, selectedTab === 'holdings' && styles.tabActive]}
                        onPress={() => setSelectedTab('holdings')}
                        activeOpacity={0.7}>
                        <Text style={[
                            styles.tabText,
                            selectedTab === 'holdings' && styles.tabTextActive
                        ]}>
                            Top Holdings
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[styles.tab, selectedTab === 'history' && styles.tabActive]}
                        onPress={() => setSelectedTab('history')}
                        activeOpacity={0.7}>
                        <Text style={[
                            styles.tabText,
                            selectedTab === 'history' && styles.tabTextActive
                        ]}>
                            Purchase History
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Content based on selected tab */}
                {selectedTab === 'holdings' ? (
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Top Stocks</Text>
                            <TouchableOpacity 
                                onPress={() => navigation.navigate('StockHolding')}
                                activeOpacity={0.7}>
                                <Text style={styles.viewAllText}>View All</Text>
                            </TouchableOpacity>
                        </View>

                        {TOP_STOCKS.map((stock) => (
                            <TouchableOpacity
                                key={stock.id}
                                style={styles.stockCard}
                                activeOpacity={0.8}
                                onPress={() => navigation.navigate('StockDetail', { stock })}>
                                
                                <View style={styles.stockLeft}>
                                    <View style={styles.stockIcon}>
                                        <Icon name="chart-line" size={20} color={COLORS.primary} />
                                    </View>
                                    <View style={styles.stockInfo}>
                                        <Text style={styles.stockName}>{stock.name}</Text>
                                        <Text style={styles.stockPrice}>₹{stock.currentPrice}</Text>
                                    </View>
                                </View>

                                <View style={styles.stockRight}>
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
                                    <Text style={styles.stockValue}>
                                        {formatCurrency(stock.current)}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </View>
                ) : (
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Recent Transactions</Text>

                        {PURCHASE_HISTORY.map((transaction) => (
                            <View key={transaction.id} style={styles.transactionCard}>
                                <View style={styles.transactionLeft}>
                                    <View style={[
                                        styles.transactionIcon,
                                        { backgroundColor: transaction.type === 'Buy' ? COLORS.successLight : COLORS.errorLight }
                                    ]}>
                                        <Icon
                                            name={transaction.type === 'Buy' ? 'arrow-down' : 'arrow-up'}
                                            size={20}
                                            color={transaction.type === 'Buy' ? COLORS.success : COLORS.error}
                                        />
                                    </View>
                                    <View style={styles.transactionInfo}>
                                        <Text style={styles.transactionName}>{transaction.name}</Text>
                                        <Text style={styles.transactionDate}>{transaction.date}</Text>
                                        <Text style={styles.transactionQuantity}>
                                            Qty: {transaction.quantity}
                                        </Text>
                                    </View>
                                </View>

                                <View style={styles.transactionRight}>
                                    <Text style={[
                                        styles.transactionType,
                                        { color: transaction.type === 'Buy' ? COLORS.success : COLORS.error }
                                    ]}>
                                        {transaction.type}
                                    </Text>
                                    <Text style={styles.transactionAmount}>
                                        {formatCurrency(transaction.amount)}
                                    </Text>
                                </View>
                            </View>
                        ))}
                    </View>
                )}
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
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },

    historyBtn: {
        width: 40,
        height: 40,
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
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...COMMON_STYLES.shadow,
    },

    balanceHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        marginBottom: 20,
    },

    balanceLabel: {
        fontSize: 14,
        color: COLORS.textSecondary,
        marginBottom: 8,
    },

    balanceValue: {
        fontSize: 32,
        fontWeight: '800',
        color: COLORS.text,
        letterSpacing: -0.5,
    },

    balanceIconContainer: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: COLORS.primaryUltraLight,
        alignItems: 'center',
        justifyContent: 'center',
    },

    balanceStats: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },

    statItem: {
        flex: 1,
        alignItems: 'center',
    },

    statDivider: {
        width: 1,
        backgroundColor: COLORS.border,
    },

    statLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 6,
    },

    statValue: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.text,
    },

    returnsContainer: {
        alignItems: 'center',
    },

    returnsPercent: {
        fontSize: 11,
        fontWeight: '600',
        marginTop: 2,
    },

    actionButtons: {
        flexDirection: 'row',
        gap: 12,
    },

    actionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.primary,
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
    },

    actionButtonSecondary: {
        backgroundColor: COLORS.primaryUltraLight,
    },

    actionButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.white,
    },

    // Tabs
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 4,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 10,
    },

    tabActive: {
        backgroundColor: COLORS.primary,
    },

    tabText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },

    tabTextActive: {
        color: COLORS.white,
    },

    // Section
    section: {
        marginBottom: 20,
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 16,
    },

    sectionTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
    },

    viewAllText: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.primary,
    },

    // Stock Card
    stockCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    stockLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    stockIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.primaryUltraLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    stockInfo: {
        flex: 1,
    },

    stockName: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 4,
    },

    stockPrice: {
        fontSize: 13,
        color: COLORS.textSecondary,
    },

    stockRight: {
        alignItems: 'flex-end',
    },

    changeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        gap: 4,
        marginBottom: 6,
    },

    changeText: {
        fontSize: 12,
        fontWeight: '700',
    },

    stockValue: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text,
    },

    // Transaction Card
    transactionCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    transactionIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    transactionInfo: {
        flex: 1,
    },

    transactionName: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 4,
    },

    transactionDate: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 2,
    },

    transactionQuantity: {
        fontSize: 11,
        color: COLORS.textLight,
    },

    transactionRight: {
        alignItems: 'flex-end',
    },

    transactionType: {
        fontSize: 13,
        fontWeight: '700',
        marginBottom: 4,
    },

    transactionAmount: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text,
    },
});

export default WalletScreen;
