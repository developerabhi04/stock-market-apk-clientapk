import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY, COMMON_STYLES } from '../../constants/styles';

const PRESET_AMOUNTS = [500, 1000, 2000, 3000, 5000, 7500, 10000, 15000];
const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 64) / 4;

const RechargeScreen = ({ navigation }) => {
    const [selectedAmount, setSelectedAmount] = useState(null);
    const [customAmount, setCustomAmount] = useState('');

    const amountToUse = customAmount ? Number(customAmount) : selectedAmount;

    const handleAmountSelect = (amount) => {
        setSelectedAmount(amount);
        setCustomAmount(amount.toString());
    };

    const handleRecharge = () => {
        if (!amountToUse || amountToUse <= 0) return;
        // Navigate to Payment screen with the amount
        navigation.navigate('Payment', { amount: amountToUse });
    };

    const renderAmountBox = ({ item }) => {
        const isSelected = selectedAmount === item;
        return (
            <TouchableOpacity
                onPress={() => handleAmountSelect(item)}
                activeOpacity={0.8}
                style={[styles.amountBox, isSelected && styles.amountBoxSelected]}
            >
                <Text style={[styles.amountText, isSelected && styles.amountTextSelected]}>₹{item}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <SafeAreaView style={styles.flex} edges={['top']}>
            <LinearGradient colors={[COLORS.success, COLORS.primary]} style={styles.headerBg}>
                <View style={styles.headerRow}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.headerBtn}>
                        <Icon name="arrow-left" size={24} color={COLORS.white} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Recharge Wallet</Text>
                    <View style={styles.headerBtn} />
                </View>
            </LinearGradient>

            <View style={styles.card}>
                <Icon name="plus-circle" size={50} color={COLORS.success} style={styles.icon} />
                <Text style={styles.label}>Select or Enter Amount</Text>

                <FlatList
                    data={PRESET_AMOUNTS}
                    renderItem={renderAmountBox}
                    keyExtractor={item => item.toString()}
                    numColumns={4}
                    columnWrapperStyle={styles.amountRow}
                    style={styles.amountList}
                    scrollEnabled={false}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter custom amount"
                    keyboardType="numeric"
                    value={customAmount}
                    onChangeText={(text) => {
                        setCustomAmount(text.replace(/[^0-9]/g, ''));
                        setSelectedAmount(null);
                    }}
                    maxLength={6}
                />

                <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: amountToUse ? COLORS.success : COLORS.successLight }]}
                    disabled={!amountToUse}
                    onPress={handleRecharge}
                >
                    <Text style={styles.actionBtnText}>Recharge</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    flex: { flex: 1, backgroundColor: COLORS.successLight },
    headerBg: { paddingBottom: 40, borderBottomLeftRadius: 18, borderBottomRightRadius: 18 },
    headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 18, marginTop: 12 },
    headerBtn: { width: 45, height: 44, justifyContent: 'center', alignItems: 'center' },
    headerTitle: { ...TYPOGRAPHY.h4, fontWeight: '700', color: COLORS.white },

    card: {
        backgroundColor: COLORS.white,
        borderRadius: 20,
        marginHorizontal: 20,
        alignItems: 'center',
        padding: 18,
        marginTop: -48,
        ...COMMON_STYLES.shadowLarge,
    },
    icon: { marginBottom: 18 },
    label: {
        ...TYPOGRAPHY.body1,
        color: COLORS.textSecondary,
        fontWeight: '600',
        marginBottom: 18,
    },

    amountList: { width: '100%', marginBottom: 24 },

    amountRow: {
        justifyContent: 'space-between',
        marginBottom: 14,
    },

    amountBox: {
        width: CARD_SIZE,
        height: CARD_SIZE,
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        ...COMMON_STYLES.shadow,
    },

    amountBoxSelected: {
        backgroundColor: COLORS.primary,
        borderWidth: 0,
        shadowColor: COLORS.primary,
        shadowOpacity: 0.5,
        shadowOffset: { width: 0, height: 6 },
        shadowRadius: 10,
        elevation: 6,
    },

    amountText: {
        ...TYPOGRAPHY.body2Medium,
        color: COLORS.textPrimary,
        fontWeight: '600',
    },

    amountTextSelected: {
        color: COLORS.white,
        fontWeight: '800',
    },

    input: {
        borderWidth: 1.5,
        borderColor: COLORS.success,
        borderRadius: 12,
        backgroundColor: COLORS.successLight + '22',
        width: '90%',
        paddingVertical: 14,
        fontSize: 18,
        color: COLORS.textPrimary,
        fontWeight: '700',
        textAlign: 'center',
        letterSpacing: 1,
        marginBottom: 18,
    },

    actionBtn: {
        borderRadius: 14,
        paddingVertical: 14,
        paddingHorizontal: 50,
        ...COMMON_STYLES.shadow,
    },

    actionBtnText: {
        ...TYPOGRAPHY.button,
        color: COLORS.white,
        fontWeight: '800',
        letterSpacing: 1,
    },
});

export default RechargeScreen;
