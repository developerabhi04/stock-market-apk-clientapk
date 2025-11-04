import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COMMON_STYLES, TYPOGRAPHY } from '../../constants/styles';
import { COLORS } from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const settings = [
    { icon: 'account', label: 'Account Settings', route: 'AccountSettings' },
    { icon: 'shield-check', label: 'Privacy & Security', route: 'PrivacySecurity' },
    { icon: 'bell', label: 'Notifications', route: 'Notifications' },
    { icon: 'help-circle', label: 'Help & Support', route: 'HelpSupport' },
];

export default function SettingScreen({ navigation }) {
    const handleNavigation = (route) => {
        if (route === 'AccountSettings') {
            navigation.navigate('AccountSettings');
        } else {
            // For other screens that aren't implemented yet
            console.log(`Navigate to ${route}`);
        }
    };

    return (
        <SafeAreaView style={styles.container} edges={['top']}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            {/* <View style={styles.header}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                    activeOpacity={0.7}>
                    <Icon name="arrow-left" size={24} color={COLORS.text} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Settings</Text>
                <View style={styles.headerRight} />
            </View> */}

            <ScrollView 
                style={styles.scrollView}
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}>
                
                {/* Profile Section */}
                {/* <View style={styles.profileSection}>
                    <View style={styles.profileIconContainer}>
                        <Icon name="account-circle" size={60} color={COLORS.primary} />
                    </View>
                    <Text style={styles.profileName}>John Doe</Text>
                    <Text style={styles.profileEmail}>john.doe@example.com</Text>
                </View> */}

                {/* Settings List */}
                <View style={styles.settingsSection}>
                    <Text style={styles.sectionTitle}>General</Text>
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
                    <Text style={styles.sectionTitle}>App Information</Text>
                    
                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Version</Text>
                        <Text style={styles.infoValue}>1.0.0</Text>
                    </View>

                    <View style={styles.infoRow}>
                        <Text style={styles.infoLabel}>Build</Text>
                        <Text style={styles.infoValue}>100</Text>
                    </View>
                </View>

              

            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
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

    headerRight: {
        width: 40,
    },

    scrollView: {
        flex: 1,
    },

    content: {
        padding: 16,
        paddingBottom: 32,
    },

    // Profile Section
    profileSection: {
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 24,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        ...COMMON_STYLES.shadow,
    },

    profileIconContainer: {
        marginBottom: 12,
    },

    profileName: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 4,
    },

    profileEmail: {
        fontSize: 14,
        color: COLORS.textSecondary,
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
