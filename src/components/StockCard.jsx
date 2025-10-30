import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { COLORS } from '../constants/colors';
import { TYPOGRAPHY, COMMON_STYLES } from '../constants/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const StockCard = ({ stock, onPress }) => {
    return (
        <TouchableOpacity
            style={styles.card}
            onPress={onPress}
            activeOpacity={0.8}>
            <View style={styles.leftSection}>
                <View style={styles.iconContainer}>
                    <Icon name="chart-line" size={22} color={COLORS.primary} />
                </View>
                <View style={styles.info}>
                    <Text style={styles.name} numberOfLines={1}>
                        {stock.name}
                    </Text>
                    <Text style={styles.ticker}>{stock.ticker}</Text>
                </View>
            </View>

            <View style={styles.rightSection}>
                <Text style={styles.price}>₹{stock.price}</Text>
                <Text
                    style={[
                        styles.change,
                        stock.isPositive ? styles.positive : styles.negative,
                    ]}>
                    {stock.change}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 14,
        marginHorizontal: 16,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...COMMON_STYLES.shadow,
    },

    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
    },

    iconContainer: {
        width: 44,
        height: 44,
        borderRadius: 22,
        backgroundColor: COLORS.primaryLight + '20',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    info: {
        flex: 1,
    },

    name: {
        ...TYPOGRAPHY.body1,
        fontWeight: '600',
        marginBottom: 2,
    },

    ticker: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
    },

    rightSection: {
        alignItems: 'flex-end',
    },

    price: {
        ...TYPOGRAPHY.body1,
        fontWeight: '700',
        marginBottom: 2,
    },

    change: {
        ...TYPOGRAPHY.body2,
        fontWeight: '600',
    },

    positive: {
        color: COLORS.green,
    },

    negative: {
        color: COLORS.red,
    },
});

export default StockCard;
