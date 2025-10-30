import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY, COMMON_STYLES } from '../../constants/styles';

const WithdrawScreen = ({ navigation }) => {
    const [amount, setAmount] = useState('');

    const handleWithdraw = () => {
        Alert.alert('Withdraw Success', `₹${amount} will be withdrawn!`, [{ text: "OK", onPress: () => navigation.goBack() }]);
        setAmount('');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                    <Icon name="arrow-left" size={24} color={COLORS.warning} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Withdraw</Text>
                <View style={{ width: 48 }} />
            </View>
            <View style={styles.center}>
                <Icon name="bank-transfer-out" size={60} color={COLORS.warning} style={styles.withdrawIcon} />
                <Text style={styles.label}>Enter Amount</Text>
                <TextInput
                    value={amount}
                    onChangeText={setAmount}
                    keyboardType="numeric"
                    placeholder="₹0.00"
                    style={styles.input}
                />
                <TouchableOpacity
                    style={[styles.actionBtn, { backgroundColor: amount ? COLORS.warning : COLORS.warningLight }]}
                    disabled={!amount}
                    onPress={handleWithdraw}
                >
                    <Text style={styles.actionBtnText}>Withdraw</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingHorizontal: 16, paddingVertical: 16,
        backgroundColor: COLORS.surface, ...COMMON_STYLES.shadow,
    },
    headerTitle: { ...TYPOGRAPHY.h4, fontWeight: '700', color: COLORS.warning },
    backBtn: { width: 48, height: 44, alignItems: 'center', justifyContent: 'center' },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    withdrawIcon: { marginBottom: 20 },
    label: { ...TYPOGRAPHY.body2, color: COLORS.textSecondary, marginBottom: 8 },
    input: {
        borderWidth: 1.5, borderColor: COLORS.warning,
        borderRadius: 12, backgroundColor: COLORS.white,
        padding: 16, minWidth: 200, fontSize: 20,
        color: COLORS.textPrimary, marginBottom: 22, textAlign: 'center'
    },
    actionBtn: {
        borderRadius: 12, paddingHorizontal: 36, paddingVertical: 14, ...COMMON_STYLES.shadow,
    },
    actionBtnText: { ...TYPOGRAPHY.button, color: COLORS.white, fontWeight: '600' },
});

export default WithdrawScreen;
