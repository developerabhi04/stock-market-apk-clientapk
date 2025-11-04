import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StockHoldingsScreen = ({ navigation }) => {
    // Mock holdings data - Replace with actual data from your state/API
    const [holdings] = useState([
        {
            id: 1,
            name: 'NIFTY 50',
            symbol: 'NIFTY',
            quantity: 20,
            avgPrice: 19435.30,
            currentPrice: 19650.50,
            investedAmount: 388706.00,
            currentValue: 393010.00,
            pnl: 4304.00,
            pnlPercentage: 1.11,
            isPositive: true,
        },
        {
            id: 2,
            name: 'SENSEX',
            symbol: 'SENSEX',
            quantity: 10,
            avgPrice: 64832.55,
            currentPrice: 64250.30,
            investedAmount: 648325.50,
            currentValue: 642503.00,
            pnl: -5822.50,
            pnlPercentage: -0.90,
            isPositive: false,
        },
        {
            id: 3,
            name: 'BANK NIFTY',
            symbol: 'BANKNIFTY',
            quantity: 15,
            avgPrice: 43567.80,
            currentPrice: 44125.60,
            investedAmount: 653517.00,
            currentValue: 661884.00,
            pnl: 8367.00,
            pnlPercentage: 1.28,
            isPositive: true,
        },
        {
            id: 4,
            name: 'NIFTY IT',
            symbol: 'NIFTYIT',
            quantity: 25,
            avgPrice: 30234.90,
            currentPrice: 29850.20,
            investedAmount: 755872.50,
            currentValue: 746255.00,
            pnl: -9617.50,
            pnlPercentage: -1.27,
            isPositive: false,
        },
    ]);

    // Calculate totals
    const totalInvested = holdings.reduce((sum, item) => sum + item.investedAmount, 0);
    const totalCurrent = holdings.reduce((sum, item) => sum + item.currentValue, 0);
    const totalPnL = totalCurrent - totalInvested;
    const totalPnLPercentage = ((totalPnL / totalInvested) * 100).toFixed(2);
    const isOverallPositive = totalPnL >= 0;

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('en-IN', {
            style: 'currency',
            currency: 'INR',
            minimumFractionDigits: 2,
        }).format(value);
    };

    const renderHoldingCard = (holding) => (
        <TouchableOpacity
            key={holding.id}
            style={styles.holdingCard}
            activeOpacity={0.8}>

            {/* Stock Header */}
            <View style={styles.stockHeader}>
                <View style={styles.stockIconContainer}>
                    <Icon name="chart-line" size={20} color={COLORS.primary} />
                </View>
                <View style={styles.stockInfo}>
                    <Text style={styles.stockName}>{holding.name}</Text>
                    <Text style={styles.stockSymbol}>{holding.symbol}</Text>
                </View>
                <View style={[
                    styles.pnlBadge,
                    { backgroundColor: holding.isPositive ? COLORS.successLight : COLORS.errorLight }
                ]}>
                    <Icon
                        name={holding.isPositive ? 'arrow-up' : 'arrow-down'}
                        size={12}
                        color={holding.isPositive ? COLORS.success : COLORS.error}
                    />
                    <Text style={[
                        styles.pnlBadgeText,
                        { color: holding.isPositive ? COLORS.success : COLORS.error }
                    ]}>
                        {holding.pnlPercentage}%
                    </Text>
                </View>
            </View>

            {/* Stock Details */}
            <View style={styles.stockDetails}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Quantity</Text>
                    <Text style={styles.detailValue}>{holding.quantity}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Avg. Price</Text>
                    <Text style={styles.detailValue}>{formatCurrency(holding.avgPrice)}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Current Price</Text>
                    <Text style={styles.detailValue}>{formatCurrency(holding.currentPrice)}</Text>
                </View>
            </View>

            {/* Investment Summary */}
            <View style={styles.investmentSummary}>
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Invested</Text>
                    <Text style={styles.summaryValue}>{formatCurrency(holding.investedAmount)}</Text>
                </View>
                <View style={styles.summaryDivider} />
                <View style={styles.summaryItem}>
                    <Text style={styles.summaryLabel}>Current</Text>
                    <Text style={styles.summaryValue}>{formatCurrency(holding.currentValue)}</Text>
                </View>
            </View>

            {/* P&L */}
            <View style={[
                styles.pnlContainer,
                { backgroundColor: holding.isPositive ? COLORS.successLight : COLORS.errorLight }
            ]}>
                <Text style={styles.pnlLabel}>Profit & Loss</Text>
                <Text style={[
                    styles.pnlValue,
                    { color: holding.isPositive ? COLORS.success : COLORS.error }
                ]}>
                    {holding.isPositive ? '+' : ''}{formatCurrency(holding.pnl)}
                </Text>
            </View>
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
                    <Text style={styles.headerTitle}>My Holdings</Text>
                    <TouchableOpacity style={styles.filterButton} activeOpacity={0.7}>
                        <Icon name="filter-variant" size={22} color={COLORS.text} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>

                {/* Overall Summary Card */}
                <View style={styles.summaryCard}>
                    <View style={styles.summaryCardHeader}>
                        <Icon name="wallet" size={24} color={COLORS.primary} />
                        <Text style={styles.summaryCardTitle}>Portfolio Summary</Text>
                    </View>

                    <View style={styles.summaryStats}>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Total Invested</Text>
                            <Text style={styles.statValue}>{formatCurrency(totalInvested)}</Text>
                        </View>
                        <View style={styles.statItem}>
                            <Text style={styles.statLabel}>Current Value</Text>
                            <Text style={styles.statValue}>{formatCurrency(totalCurrent)}</Text>
                        </View>
                    </View>

                    <View style={[
                        styles.totalPnlContainer,
                        { backgroundColor: isOverallPositive ? COLORS.successLight : COLORS.errorLight }
                    ]}>
                        <View style={styles.totalPnlRow}>
                            <Text style={styles.totalPnlLabel}>Total P&L</Text>
                            <Text style={[
                                styles.totalPnlValue,
                                { color: isOverallPositive ? COLORS.success : COLORS.error }
                            ]}>
                                {isOverallPositive ? '+' : ''}{formatCurrency(totalPnL)}
                            </Text>
                        </View>
                        <View style={[
                            styles.totalPnlPercentage,
                            { backgroundColor: isOverallPositive ? COLORS.success : COLORS.error }
                        ]}>
                            <Icon
                                name={isOverallPositive ? 'trending-up' : 'trending-down'}
                                size={16}
                                color={COLORS.white}
                            />
                            <Text style={styles.totalPnlPercentageText}>
                                {isOverallPositive ? '+' : ''}{totalPnLPercentage}%
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Holdings Section */}
                <View style={styles.holdingsSection}>
                    <View style={styles.holdingsHeader}>
                        <Text style={styles.holdingsTitle}>Your Stocks</Text>
                        <Text style={styles.holdingsCount}>{holdings.length} holdings</Text>
                    </View>

                    {holdings.map(renderHoldingCard)}
                </View>

                {/* Empty State - Show when no holdings */}
                {holdings.length === 0 && (
                    <View style={styles.emptyState}>
                        <Icon name="chart-box-outline" size={80} color={COLORS.border} />
                        <Text style={styles.emptyStateTitle}>No Holdings Yet</Text>
                        <Text style={styles.emptyStateText}>
                            Start investing to see your portfolio here
                        </Text>
                        <TouchableOpacity
                            style={styles.exploreButton}
                            onPress={() => navigation.navigate('Home')}>
                            <Text style={styles.exploreButtonText}>Explore Stocks</Text>
                        </TouchableOpacity>
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

    filterButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },

    // Summary Card
    summaryCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 4,
    },

    summaryCardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10,
    },

    summaryCardTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
    },

    summaryStats: {
        flexDirection: 'row',
        marginBottom: 16,
        gap: 12,
    },

    statItem: {
        flex: 1,
        backgroundColor: COLORS.background,
        borderRadius: 12,
        padding: 12,
    },

    statLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 6,
        fontWeight: '500',
    },

    statValue: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.text,
    },

    totalPnlContainer: {
        borderRadius: 12,
        padding: 14,
    },

    totalPnlRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },

    totalPnlLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
    },

    totalPnlValue: {
        fontSize: 22,
        fontWeight: '800',
        letterSpacing: -0.5,
    },

    totalPnlPercentage: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 20,
        gap: 4,
    },

    totalPnlPercentageText: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.white,
    },

    // Holdings Section
    holdingsSection: {
        marginBottom: 16,
    },

    holdingsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },

    holdingsTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
    },

    holdingsCount: {
        fontSize: 13,
        color: COLORS.textSecondary,
        fontWeight: '600',
    },

    // Holding Card
    holdingCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },

    stockHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 14,
    },

    stockIconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primaryUltraLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    stockInfo: {
        flex: 1,
    },

    stockName: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 2,
    },

    stockSymbol: {
        fontSize: 12,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },

    pnlBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 5,
        borderRadius: 20,
        gap: 4,
    },

    pnlBadgeText: {
        fontSize: 12,
        fontWeight: '700',
    },

    // Stock Details
    stockDetails: {
        backgroundColor: COLORS.background,
        borderRadius: 10,
        padding: 10,
        marginBottom: 12,
        gap: 8,
    },

    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    detailLabel: {
        fontSize: 13,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },

    detailValue: {
        fontSize: 13,
        color: COLORS.text,
        fontWeight: '600',
    },

    // Investment Summary
    investmentSummary: {
        flexDirection: 'row',
        marginBottom: 12,
    },

    summaryItem: {
        flex: 1,
    },

    summaryLabel: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginBottom: 4,
        fontWeight: '500',
    },

    summaryValue: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.text,
    },

    summaryDivider: {
        width: 1,
        backgroundColor: COLORS.border,
        marginHorizontal: 12,
    },

    // P&L Container
    pnlContainer: {
        borderRadius: 10,
        padding: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    pnlLabel: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.text,
    },

    pnlValue: {
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: -0.5,
    },

    // Empty State
    emptyState: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 60,
    },

    emptyStateTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.text,
        marginTop: 16,
        marginBottom: 8,
    },

    emptyStateText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: 'center',
        marginBottom: 24,
    },

    exploreButton: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 12,
    },

    exploreButtonText: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.white,
    },
});

export default StockHoldingsScreen;
