import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY, COMMON_STYLES } from '../../constants/styles';

const WalletScreen = ({ navigation }) => (
  <SafeAreaView style={styles.container}>
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Icon name="arrow-left" size={24} color={COLORS.primary} />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Wallet</Text>
      <View style={{ width: 48 }} />
    </View>
    <View style={styles.center}>
      <Icon name="wallet" size={60} color={COLORS.primary} style={styles.walletIcon} />
      <Text style={styles.balanceLabel}>Current Balance</Text>
      <Text style={styles.balanceValue}>₹0.00</Text>
      {/* <TouchableOpacity style={styles.actionBtn} onPress={() => navigation.navigate('Recharge')}>
        <Text style={styles.actionBtnText}>Add Money</Text>
      </TouchableOpacity> */}
    </View>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: COLORS.surface,
    ...COMMON_STYLES.shadow,
  },
  headerTitle: {
    ...TYPOGRAPHY.h4,
    fontWeight: '700',
    color: COLORS.primary,
  },
  backBtn: {
    width: 48, height: 44, alignItems: 'center', justifyContent: 'center'
  },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  walletIcon: { marginBottom: 16 },
  balanceLabel: { ...TYPOGRAPHY.body1, color: COLORS.textSecondary, marginBottom: 10 },
  balanceValue: { ...TYPOGRAPHY.h1, fontWeight: 'bold', color: COLORS.textPrimary, marginBottom: 30 },
  actionBtn: {
    backgroundColor: COLORS.primary,
    borderRadius: 12,
    paddingHorizontal: 36,
    paddingVertical: 14,
    ...COMMON_STYLES.shadow,
  },
  actionBtnText: {
    ...TYPOGRAPHY.button,
    color: COLORS.white,
    fontWeight: '600'
  },
});

export default WalletScreen;
