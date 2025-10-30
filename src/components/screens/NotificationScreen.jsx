import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { COMMON_STYLES, TYPOGRAPHY } from '../../constants/styles';
import { COLORS } from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const notifications = [
    { id: '1', title: 'Welcome!', message: 'Thank you for joining us', time: '2 min ago' },
    { id: '2', title: 'Market Update', message: 'Your watchlist stocks are moving', time: '1 hour ago' },
];

export default function NotificationScreen() {
    return (
        <View style={COMMON_STYLES.container}>
            <FlatList
                data={notifications}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <View style={styles.notifCard}>
                        <Icon name="bell" size={24} color={COLORS.primary} />
                        <View style={styles.notifContent}>
                            <Text style={styles.notifTitle}>{item.title}</Text>
                            <Text style={styles.notifMessage}>{item.message}</Text>
                            <Text style={styles.notifTime}>{item.time}</Text>
                        </View>
                    </View>
                )}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    list: { padding: 16 },
    notifCard: {
        backgroundColor: COLORS.surface,
        padding: 16,
        borderRadius: 12,
        marginBottom: 12,
        flexDirection: 'row',
        ...COMMON_STYLES.shadow,
    },
    notifContent: { marginLeft: 12, flex: 1 },
    notifTitle: { ...TYPOGRAPHY.body1, fontWeight: '600', marginBottom: 4 },
    notifMessage: { ...TYPOGRAPHY.body2, color: COLORS.textSecondary },
    notifTime: { ...TYPOGRAPHY.caption, marginTop: 6 },
});
