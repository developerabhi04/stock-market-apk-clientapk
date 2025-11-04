import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COMMON_STYLES, TYPOGRAPHY } from '../../constants/styles';
import { COLORS } from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const settings = [
    { icon: 'bank', label: 'Bank Account', route: 'AccountSettings' },
    { icon: 'shield-check', label: 'Privacy & Security', route: 'PrivacySecurity' },
    { icon: 'bell', label: 'Notifications', route: 'Notifications' },
    { icon: 'help-circle', label: 'Help & Support', route: 'HelpSupport' },
    { icon: 'invite-circle', label: 'Invite', route: 'HelpSupport' },
];

export default function ProfileScreen({ navigation }) {
    const handleLogout = () => {
        navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
        });
    };

    const handleNavigation = (route) => {
        // Navigate to all routes dynamically
        try {
            navigation.navigate(route);
        } catch (error) {
            console.log(`Screen ${route} not implemented yet`);
        }
    };

    return (
        <ScrollView
            style={[COMMON_STYLES.container, styles.container]}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}>

            

            {/* Profile Header */}
            <View style={styles.profileHeader}>
                <View style={styles.avatar}>
                    <Icon name="account" size={48} color={COLORS.primary} />
                </View>
                <Text style={styles.name}>John Doe</Text>
                <Text style={styles.phone}>+1 (123) 456-7890</Text>
            </View>

            {/* Stats Row */}
            {/* <View style={styles.statsRow}>
                <TouchableOpacity
                    style={styles.statBox}
                    onPress={() => navigation.navigate('StockHolding')}>
                    <Text style={styles.statValue}>₹0</Text>
                    <Text style={styles.statLabel}>Portfolio Value</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.statBox}
                    onPress={() => navigation.navigate('StockHolding')}>
                    <Text style={styles.statValue}>0</Text>
                    <Text style={styles.statLabel}>Holdings</Text>
                </TouchableOpacity>
            </View> */}

            {/* Settings Section */}
            <View style={styles.settingsSection}>
                {/* <Text style={styles.sectionTitle}>Settings</Text> */}
                {settings.map((item, idx) => (
                    <TouchableOpacity
                        key={idx}
                        style={styles.settingRow}
                        activeOpacity={0.8}
                        onPress={() => handleNavigation(item.route)}>
                        <View style={styles.settingIconContainer}>
                            <Icon name={item.icon} size={22} color={COLORS.primary} />
                        </View>
                        <Text style={styles.settingLabel}>{item.label}</Text>
                        <Icon name="chevron-right" size={22} color={COLORS.textLight} />
                    </TouchableOpacity>
                ))}
            </View>

            {/* App Info Section */}
            <View style={styles.appInfoSection}>
                {/* <Text style={styles.sectionTitle}>App Information</Text> */}

                <View style={styles.infoRow}>
                    <Text style={styles.infoLabel}>Version</Text>
                    <Text style={styles.infoValue}>1.0.0</Text>
                </View>
            </View>

            {/* Logout Button */}
            <View style={styles.actions}>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout} activeOpacity={0.8}>
                    <Icon name="logout" size={20} color={COLORS.error} />
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    scrollContent: {
        padding: 16,
        paddingBottom: 32,
    },

    // Profile Header
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

    name: {
        ...TYPOGRAPHY.h3,
        fontWeight: '700',
        marginBottom: 6
    },

    phone: {
        ...TYPOGRAPHY.body2,
        color: COLORS.textSecondary
    },

    // Stats Row
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

    statValue: {
        ...TYPOGRAPHY.h3,
        fontWeight: '700',
        marginBottom: 6
    },

    statLabel: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary
    },

    // Settings Section
    settingsSection: {
        marginBottom: 24,
    },

    sectionTitle: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.textSecondary,
        marginBottom: 12,
        marginLeft: 4,
    },

    settingRow: {
        backgroundColor: COLORS.surface,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...COMMON_STYLES.shadow,
    },

    settingIconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: COLORS.primaryUltraLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    settingLabel: {
        ...TYPOGRAPHY.body1,
        flex: 1,
        fontWeight: '500',
        color: COLORS.text,
    },

    // App Info Section
    appInfoSection: {
        backgroundColor: COLORS.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },

    infoLabel: {
        fontSize: 14,
        color: COLORS.textSecondary,
        fontWeight: '500',
    },

    infoValue: {
        fontSize: 14,
        color: COLORS.text,
        fontWeight: '600',
    },

    // Logout Button
    actions: {
        marginTop: 20,
    },

    logoutButton: {
        backgroundColor: COLORS.errorLight,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        borderRadius: 12,
        gap: 8,
        borderWidth: 1,
        borderColor: COLORS.error,
    },

    logoutText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.error,
    },
});
