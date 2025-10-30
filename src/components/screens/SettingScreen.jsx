import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { COMMON_STYLES, TYPOGRAPHY } from '../../constants/styles';
import { COLORS } from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const settings = [
    { icon: 'account', label: 'Account Settings' },
    { icon: 'shield-check', label: 'Privacy & Security' },
    { icon: 'bell', label: 'Notifications' },
    { icon: 'help-circle', label: 'Help & Support' },
];

export default function SettingScreen() {
    return (
        <ScrollView style={COMMON_STYLES.container} contentContainerStyle={styles.content}>
            {settings.map((item, idx) => (
                <TouchableOpacity key={idx} style={styles.settingRow} activeOpacity={0.8}>
                    <Icon name={item.icon} size={24} color={COLORS.primary} />
                    <Text style={styles.settingLabel}>{item.label}</Text>
                    <Icon name="chevron-right" size={24} color={COLORS.textLight} />
                </TouchableOpacity>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    content: { padding: 16 },
    settingRow: {
        backgroundColor: COLORS.surface,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        borderRadius: 12,
        marginBottom: 10,
        ...COMMON_STYLES.shadow,
    },
    settingLabel: { ...TYPOGRAPHY.body1, marginLeft: 16, flex: 1 },
});
