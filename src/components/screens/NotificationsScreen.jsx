import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const NOTIFICATIONS_DATA = [
    {
        id: '1',
        type: 'transaction',
        icon: 'check-circle',
        iconColor: COLORS.success,
        iconBg: COLORS.successLight,
        title: 'Payment Successful',
        message: 'Your payment of ₹1,500 has been credited to your wallet',
        time: '2 mins ago',
        isRead: false,
    },
    {
        id: '2',
        type: 'trade',
        icon: 'chart-line',
        iconColor: COLORS.primary,
        iconBg: COLORS.primaryUltraLight,
        title: 'Trade Executed',
        message: 'Your buy order for NIFTY 50 has been executed at ₹19,435.30',
        time: '1 hour ago',
        isRead: false,
    },
    {
        id: '3',
        type: 'alert',
        icon: 'alert-circle',
        iconColor: COLORS.warning,
        iconBg: COLORS.warningLight,
        title: 'Price Alert',
        message: 'SENSEX has reached your target price of ₹64,500',
        time: '3 hours ago',
        isRead: true,
    },
    {
        id: '4',
        type: 'system',
        icon: 'information',
        iconColor: COLORS.primary,
        iconBg: COLORS.primaryUltraLight,
        title: 'Account Verified',
        message: 'Your account details have been successfully verified',
        time: '1 day ago',
        isRead: true,
    },
    {
        id: '5',
        type: 'transaction',
        icon: 'cash-minus',
        iconColor: COLORS.error,
        iconBg: COLORS.errorLight,
        title: 'Withdrawal Initiated',
        message: 'Your withdrawal request of ₹5,000 is being processed',
        time: '2 days ago',
        isRead: true,
    },
    {
        id: '6',
        type: 'trade',
        icon: 'trending-up',
        iconColor: COLORS.success,
        iconBg: COLORS.successLight,
        title: 'Profit Achieved',
        message: 'Your portfolio gained ₹2,500 today',
        time: '3 days ago',
        isRead: true,
    },
    {
        id: '7',
        type: 'system',
        icon: 'shield-check',
        iconColor: COLORS.primary,
        iconBg: COLORS.primaryUltraLight,
        title: 'Security Update',
        message: 'Two-factor authentication has been enabled on your account',
        time: '1 week ago',
        isRead: true,
    },
];

const NotificationsScreen = ({ navigation }) => {
    const [notifications, setNotifications] = useState(NOTIFICATIONS_DATA);
    const [filter, setFilter] = useState('all');

    const unreadCount = notifications.filter(n => !n.isRead).length;

    const filteredNotifications = filter === 'all'
        ? notifications
        : notifications.filter(n => n.type === filter);

    const markAsRead = (id) => {
        setNotifications(prev =>
            prev.map(notif =>
                notif.id === id ? { ...notif, isRead: true } : notif
            )
        );
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notif => ({ ...notif, isRead: true }))
        );
    };

    const renderNotification = ({ item }) => (
        <TouchableOpacity
            style={[
                styles.notificationCard,
                !item.isRead && styles.notificationCardUnread
            ]}
            activeOpacity={0.7}
            onPress={() => markAsRead(item.id)}>

            <View style={[styles.iconContainer, { backgroundColor: item.iconBg }]}>
                <Icon name={item.icon} size={24} color={item.iconColor} />
            </View>

            <View style={styles.notificationContent}>
                <View style={styles.notificationHeader}>
                    <Text style={styles.notificationTitle} numberOfLines={1}>
                        {item.title}
                    </Text>
                    {!item.isRead && <View style={styles.unreadDot} />}
                </View>

                <Text style={styles.notificationMessage} numberOfLines={2}>
                    {item.message}
                </Text>

                <Text style={styles.notificationTime}>{item.time}</Text>
            </View>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor={COLORS.background} />

            {/* Header */}
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.header}>
                    <TouchableOpacity
                        style={styles.backButton}
                        onPress={() => navigation.goBack()}
                        activeOpacity={0.7}>
                        <Icon name="arrow-left" size={24} color={COLORS.text} />
                    </TouchableOpacity>

                    <View style={styles.headerCenter}>
                        <Text style={styles.headerTitle}>Notifications</Text>
                        {unreadCount > 0 && (
                            <View style={styles.headerBadge}>
                                <Text style={styles.headerBadgeText}>{unreadCount}</Text>
                            </View>
                        )}
                    </View>

                    <TouchableOpacity
                        style={styles.markAllButton}
                        onPress={markAllAsRead}
                        activeOpacity={0.7}>
                        <Icon name="check-all" size={22} color={COLORS.primary} />
                    </TouchableOpacity>
                </View>

                {/* Filter Tabs */}
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.filterContainer}>
                    {['all', 'transaction', 'trade', 'alert', 'system'].map((type) => (
                        <TouchableOpacity
                            key={type}
                            style={[
                                styles.filterTab,
                                filter === type && styles.filterTabActive
                            ]}
                            onPress={() => setFilter(type)}
                            activeOpacity={0.7}>
                            <Text style={[
                                styles.filterTabText,
                                filter === type && styles.filterTabTextActive
                            ]}>
                                {type.charAt(0).toUpperCase() + type.slice(1)}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </SafeAreaView>

            {/* Notifications List */}
            {filteredNotifications.length > 0 ? (
                <FlatList
                    data={filteredNotifications}
                    renderItem={renderNotification}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContent}
                    showsVerticalScrollIndicator={false}
                />
            ) : (
                <View style={styles.emptyState}>
                    <Icon name="bell-off-outline" size={80} color={COLORS.border} />
                    <Text style={styles.emptyStateTitle}>No Notifications</Text>
                    <Text style={styles.emptyStateText}>
                        You're all caught up! Check back later for updates.
                    </Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },

    safeArea: {
        backgroundColor: COLORS.surface,
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

    headerCenter: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
    },

    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
    },

    headerBadge: {
        backgroundColor: COLORS.error,
        borderRadius: 10,
        paddingHorizontal: 8,
        paddingVertical: 2,
        minWidth: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    headerBadgeText: {
        fontSize: 11,
        fontWeight: '700',
        color: COLORS.white,
    },

    markAllButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },

    // Filter Tabs
    filterContainer: {
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: COLORS.surface,
        gap: 8,
    },

    filterTab: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    filterTabActive: {
        backgroundColor: COLORS.primary,
        borderColor: COLORS.primary,
    },

    filterTabText: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.textSecondary,
    },

    filterTabTextActive: {
        color: COLORS.white,
    },

    // Notifications List
    listContent: {
        padding: 16,
        paddingBottom: 32,
    },

    notificationCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },

    notificationCardUnread: {
        backgroundColor: COLORS.primaryUltraLight,
        borderColor: COLORS.primary,
        borderWidth: 1.5,
    },

    iconContainer: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 12,
    },

    notificationContent: {
        flex: 1,
    },

    notificationHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
    },

    notificationTitle: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.text,
        flex: 1,
    },

    unreadDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.primary,
        marginLeft: 8,
    },

    notificationMessage: {
        fontSize: 13,
        color: COLORS.textSecondary,
        lineHeight: 18,
        marginBottom: 6,
    },

    notificationTime: {
        fontSize: 11,
        color: COLORS.textLight,
        fontWeight: '500',
    },

    // Empty State
    emptyState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 40,
    },

    emptyStateTitle: {
        fontSize: 20,
        fontWeight: '700',
        color: COLORS.text,
        marginTop: 16,
        marginBottom: 8,
    },

    emptyStateText: {
        fontSize: 14,
        color: COLORS.textSecondary,
        textAlign: 'center',
        lineHeight: 20,
    },
});

export default NotificationsScreen;
