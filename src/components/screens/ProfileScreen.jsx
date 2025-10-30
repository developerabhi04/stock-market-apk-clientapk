import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COMMON_STYLES, TYPOGRAPHY } from '../../constants/styles';
import { COLORS } from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Button from '../Button';

export default function ProfileScreen({ navigation }) {
    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    return (
        <View style={[COMMON_STYLES.container, styles.container]}>
            <View style={styles.profileHeader}>
                <View style={styles.avatar}>
                    <Icon name="account" size={48} color={COLORS.primary} />
                </View>
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.phone}>+1 (123) 456-7890</Text>
            </View>

            <View style={styles.statsRow}>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>₹0</Text>
                    <Text style={styles.statLabel}>Portfolio Value</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statValue}>0</Text>
                    <Text style={styles.statLabel}>Holdings</Text>
                </View>
            </View>

            <View style={styles.actions}>
                <Button title="Logout" onPress={handleLogout} variant="secondary" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 16 },
    profileHeader: {
        alignItems: 'center',
        marginTop: 24,
        marginBottom: 32,
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: COLORS.primaryLight + '30',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    name: { ...TYPOGRAPHY.h3, fontWeight: '700', marginBottom: 6 },
    phone: { ...TYPOGRAPHY.body2, color: COLORS.textSecondary },
    statsRow: {
        flexDirection: 'row',
        marginBottom: 32,
        gap: 12,
    },
    statBox: {
        flex: 1,
        backgroundColor: COLORS.surface,
        padding: 20,
        borderRadius: 12,
        alignItems: 'center',
        ...COMMON_STYLES.shadow,
    },
    statValue: { ...TYPOGRAPHY.h3, fontWeight: '700', marginBottom: 6 },
    statLabel: { ...TYPOGRAPHY.caption, color: COLORS.textSecondary },
    actions: { marginTop: 20 },
});
