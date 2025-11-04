import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LineChart } from 'react-native-svg-charts';
import * as shape from 'd3-shape';
import { COLORS } from '../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const { width } = Dimensions.get('window');
const CHART_WIDTH = width - 32;

// Mock historical data (static data - 1-2 days delay)
const generateChartData = (period) => {
    const baseData = {
        '1D': [
            { value: 19450, date: '9:15 AM' },
            { value: 19480, date: '10:00 AM' },
            { value: 19420, date: '11:00 AM' },
            { value: 19500, date: '12:00 PM' },
            { value: 19470, date: '1:00 PM' },
            { value: 19520, date: '2:00 PM' },
            { value: 19490, date: '3:00 PM' },
            { value: 19510, date: '3:30 PM' },
        ],
        '1W': [
            { value: 19200, date: 'Mon' },
            { value: 19350, date: 'Tue' },
            { value: 19280, date: 'Wed' },
            { value: 19450, date: 'Thu' },
            { value: 19510, date: 'Fri' },
        ],
        '1M': [
            { value: 18800, date: '1 Oct' },
            { value: 18950, date: '5 Oct' },
            { value: 19100, date: '10 Oct' },
            { value: 19000, date: '15 Oct' },
            { value: 19200, date: '20 Oct' },
            { value: 19350, date: '25 Oct' },
            { value: 19510, date: '1 Nov' },
        ],
        '6M': [
            { value: 17500, date: 'May' },
            { value: 17800, date: 'Jun' },
            { value: 18200, date: 'Jul' },
            { value: 18600, date: 'Aug' },
            { value: 19000, date: 'Sep' },
            { value: 19350, date: 'Oct' },
            { value: 19510, date: 'Nov' },
        ],
        '1Y': [
            { value: 16200, date: 'Dec 23' },
            { value: 16800, date: 'Feb 24' },
            { value: 17400, date: 'Apr 24' },
            { value: 18000, date: 'Jun 24' },
            { value: 18500, date: 'Aug 24' },
            { value: 19000, date: 'Oct 24' },
            { value: 19510, date: 'Nov 24' },
        ],
    };

    return baseData[period] || baseData['1M'];
};

const StockChart = ({ stockName, currentPrice, change, isPositive }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('1M');
    const [selectedPoint, setSelectedPoint] = useState(null);

    const periods = ['1D', '1W', '1M', '6M', '1Y'];
    const chartData = generateChartData(selectedPeriod);
    const values = chartData.map(d => d.value);

    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);
    const currentValue = selectedPoint !== null ? values[selectedPoint] : values[values.length - 1];
    const currentLabel = selectedPoint !== null ? chartData[selectedPoint].date : 'Current';

    // Calculate change for selected period
    const periodChange = ((values[values.length - 1] - values[0]) / values[0] * 100).toFixed(2);
    const isPeriodPositive = periodChange >= 0;

    return (
        <View style={styles.container}>
            {/* Chart Info */}
            <View style={styles.chartInfo}>
                <View style={styles.priceSection}>
                    <Text style={styles.currentPrice}>₹{currentValue.toFixed(2)}</Text>
                    <View style={[
                        styles.changeBadge,
                        { backgroundColor: isPeriodPositive ? COLORS.successLight : COLORS.errorLight }
                    ]}>
                        <Icon
                            name={isPeriodPositive ? 'trending-up' : 'trending-down'}
                            size={14}
                            color={isPeriodPositive ? COLORS.success : COLORS.error}
                        />
                        <Text style={[
                            styles.changeText,
                            { color: isPeriodPositive ? COLORS.success : COLORS.error }
                        ]}>
                            {isPeriodPositive ? '+' : ''}{periodChange}%
                        </Text>
                    </View>
                </View>
                <Text style={styles.selectedLabel}>{currentLabel}</Text>
            </View>

            {/* Chart */}
            <View style={styles.chartContainer}>
                <LineChart
                    style={styles.chart}
                    data={values}
                    svg={{
                        stroke: isPositive ? COLORS.success : COLORS.error,
                        strokeWidth: 2.5,
                    }}
                    curve={shape.curveNatural}
                    contentInset={{ top: 20, bottom: 20 }}
                />

                {/* Chart Gradient Background */}
                <View style={styles.chartGradient} />
            </View>

            {/* Period Selector */}
            <View style={styles.periodSelector}>
                {periods.map((period) => (
                    <TouchableOpacity
                        key={period}
                        style={[
                            styles.periodButton,
                            selectedPeriod === period && styles.periodButtonActive
                        ]}
                        onPress={() => {
                            setSelectedPeriod(period);
                            setSelectedPoint(null);
                        }}
                        activeOpacity={0.7}>
                        <Text style={[
                            styles.periodText,
                            selectedPeriod === period && styles.periodTextActive
                        ]}>
                            {period}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Chart Legend */}
            <View style={styles.legendContainer}>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: COLORS.success }]} />
                    <Text style={styles.legendText}>High: ₹{maxValue.toFixed(2)}</Text>
                </View>
                <View style={styles.legendItem}>
                    <View style={[styles.legendDot, { backgroundColor: COLORS.error }]} />
                    <Text style={styles.legendText}>Low: ₹{minValue.toFixed(2)}</Text>
                </View>
            </View>

            {/* Data Delay Notice */}
            <View style={styles.noticeContainer}>
                <Icon name="information-outline" size={14} color={COLORS.textSecondary} />
                <Text style={styles.noticeText}>
                    Historical data • 1-2 days delay
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginHorizontal: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    // Chart Info
    chartInfo: {
        marginBottom: 16,
    },

    priceSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        marginBottom: 4,
    },

    currentPrice: {
        fontSize: 28,
        fontWeight: '800',
        color: COLORS.text,
        letterSpacing: -0.5,
    },

    changeBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 8,
        gap: 4,
    },

    changeText: {
        fontSize: 14,
        fontWeight: '700',
    },

    selectedLabel: {
        fontSize: 13,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },

    // Chart
    chartContainer: {
        height: 200,
        marginBottom: 16,
        position: 'relative',
    },

    chart: {
        height: 200,
    },

    chartGradient: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: 100,
        backgroundColor: 'transparent',
    },

    // Period Selector
    periodSelector: {
        flexDirection: 'row',
        backgroundColor: COLORS.background,
        borderRadius: 10,
        padding: 4,
        marginBottom: 16,
        gap: 4,
    },

    periodButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 8,
    },

    periodButtonActive: {
        backgroundColor: COLORS.primary,
    },

    periodText: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },

    periodTextActive: {
        color: COLORS.white,
    },

    // Legend
    legendContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 12,
    },

    legendItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
    },

    legendDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },

    legendText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },

    // Notice
    noticeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        paddingVertical: 8,
        backgroundColor: COLORS.background,
        borderRadius: 8,
    },

    noticeText: {
        fontSize: 11,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },
});

export default StockChart;
