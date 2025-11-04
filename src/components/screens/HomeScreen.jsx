import React, { useRef, useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    StatusBar,
    FlatList,
    Dimensions,
} from 'react-native';
import { COLORS } from '../../constants/colors';
import { COMMON_STYLES, TYPOGRAPHY } from '../../constants/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import StockCard from '../../components/StockCard';
import { MOCK_STOCKS } from '../../utils/mockData';
import { SafeAreaView } from 'react-native-safe-area-context';


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BANNER_WIDTH = SCREEN_WIDTH - 32;


// Banner data
const BANNERS = [
    {
        id: '1',
        icon: 'chart-areaspline',
        title: 'Start Investing Today',
        subtitle: 'Zero commission on equity delivery',
        buttonText: 'Get Started',
        color: COLORS.primary,
    },
    {
        id: '2',
        icon: 'trending-up',
        title: 'Trade Futures & Options',
        subtitle: 'Advanced trading tools available',
        buttonText: 'Explore F&O',
        color: COLORS.success,
    },
    {
        id: '3',
        icon: 'wallet-plus',
        title: 'Refer & Earn ₹500',
        subtitle: 'Share with friends and get rewards',
        buttonText: 'Invite Now',
        color: COLORS.warning,
    },
    {
        id: '4',
        icon: 'shield-check',
        title: '100% Secure Platform',
        subtitle: 'Bank-grade security for your investments',
        buttonText: 'Learn More',
        color: COLORS.secondary,
    },
];


const FEATURED_INDICES = [
    { id: 'feat-1', name: 'NIFTY 50', value: '19,435.30', change: '+1.24%', isPositive: true, icon: 'chart-line-variant' },
    { id: 'feat-2', name: 'SENSEX', value: '64,832.55', change: '+0.98%', isPositive: true, icon: 'trending-up' },
    { id: 'feat-3', name: 'BANK NIFTY', value: '43,567.80', change: '+2.14%', isPositive: true, icon: 'bank' },
    { id: 'feat-4', name: 'NIFTY IT', value: '30,234.90', change: '-0.45%', isPositive: false, icon: 'laptop' },
    { id: 'feat-5', name: 'DOW JONES', value: '34,567.89', change: '+0.67%', isPositive: true, icon: 'chart-areaspline' },
    { id: 'feat-6', name: 'S&P 500', value: '4,456.23', change: '+0.82%', isPositive: true, icon: 'chart-bell-curve' },
];



const INDICES_CATEGORIES = [
    { id: 'all', title: 'All Indices', icon: 'view-grid', color: COLORS.primary },
    { id: 'indian', title: 'Indian Indices', icon: 'flag', color: COLORS.success },
    { id: 'global', title: 'Global Indices', icon: 'earth', color: COLORS.warning },
    { id: 'crypto', title: 'Crypto', icon: 'bitcoin', color: COLORS.secondary },
];


const HomeScreen = ({ navigation }) => {
    const [activeSlide, setActiveSlide] = useState(0);
    const flatListRef = useRef(null);

    // Move navigateToIndices before renderFeaturedItem
    const navigateToIndices = (tab) => {
        navigation.navigate('Indices', { tab });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const nextSlide = (activeSlide + 1) % BANNERS.length;
            if (flatListRef.current) {
                flatListRef.current.scrollToOffset({
                    offset: nextSlide * BANNER_WIDTH,
                    animated: true,
                });
            }
            setActiveSlide(nextSlide);
        }, 3500);


        return () => clearInterval(interval);
    }, [activeSlide]);


    const onScroll = event => {
        const slideSize = BANNER_WIDTH;
        const index = Math.round(event.nativeEvent.contentOffset.x / slideSize);
        setActiveSlide(index);
    };


    const renderBanner = ({ item }) => (
        <View style={[styles.bannerSlide, { width: BANNER_WIDTH }]}>
            <View style={[styles.bannerGradient, { backgroundColor: item.color }]}>
                <View style={styles.bannerContent}>
                    <View style={styles.bannerIconWrap}>
                        <Icon name={item.icon} size={28} color={COLORS.white} />
                    </View>
                    <Text style={styles.bannerTitle}>{item.title}</Text>
                    <Text style={styles.bannerSubtitle}>{item.subtitle}</Text>
                    <TouchableOpacity style={styles.bannerButton}>
                        <Text style={[styles.bannerButtonText, { color: item.color }]}>
                            {item.buttonText}
                        </Text>
                        <Icon name="arrow-right" size={16} color={item.color} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );


    const renderFeaturedItem = ({ item }) => {
        // Check if this is the "View All" item
        if (item.id === 'view-all') {
            return (
                <TouchableOpacity
                    style={styles.viewAllCard}
                    activeOpacity={0.8}
                    onPress={() => navigateToIndices('All Indices')}>
                    <View style={styles.viewAllIconContainer}>
                        <Icon name="arrow-right-circle" size={48} color={COLORS.primary} />
                    </View>
                    <Text style={styles.viewAllCardTitle}>View All</Text>
                    <Text style={styles.viewAllCardSubtitle}>Indices</Text>
                </TouchableOpacity>
            );
        }

        // Regular featured item
        return (
            <TouchableOpacity style={styles.featuredCard} activeOpacity={0.9}
                onPress={() => navigation.navigate('StockDetail', {
                    stock: {
                        name: item.name,
                        value: item.value,
                        change: item.change,
                        isPositive: item.isPositive,
                    }
                })}
            >
                <View style={styles.featuredHeader}>
                    <View style={[styles.featuredIcon, { backgroundColor: item.isPositive ? COLORS.successLight : COLORS.errorLight }]}>
                        <Icon name={item.icon} size={22} color={item.isPositive ? COLORS.success : COLORS.error} />
                    </View>
                </View>
                <Text style={styles.featuredName} numberOfLines={1}>{item.name}</Text>
                <Text style={styles.featuredValue}>{item.value}</Text>
                <View style={[styles.featuredChange, item.isPositive ? styles.positiveTag : styles.negativeTag]}>
                    <Icon
                        name={item.isPositive ? 'arrow-top-right' : 'arrow-bottom-right'}
                        size={12}
                        color={item.isPositive ? COLORS.success : COLORS.error}
                    />
                    <Text style={[styles.featuredChangeText, { color: item.isPositive ? COLORS.success : COLORS.error }]}>
                        {item.change}
                    </Text>
                </View>
            </TouchableOpacity>
        );
    };

    // Add "View All" item to the featured indices data
    const featuredIndicesWithViewAll = [...FEATURED_INDICES, { id: 'view-all' }];


    return (
        <>
            <View style={styles.mainContainer}>
                <StatusBar
                    barStyle="dark-content"
                    backgroundColor={COLORS.background}
                    translucent={false}
                />


                {/* Header */}
                <SafeAreaView style={styles.container} edges={['top']}></SafeAreaView>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <View style={styles.logoContainer}>
                            <Icon name="chart-line-variant" size={24} color={COLORS.primary} />
                        </View>
                        <Text style={styles.companyName}>InvestPro</Text>
                    </View>
                    <View style={styles.headerRight}>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => navigation.navigate('Notification')}>
                            <Icon name="bell-outline" size={22} color={COLORS.textPrimary} />
                            <View style={styles.notificationBadge} />
                        </TouchableOpacity>
                        {/* <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => navigation.navigate('Setting')}>
                            <Icon name="cog-outline" size={22} color={COLORS.textPrimary} />
                        </TouchableOpacity> */}
                        <TouchableOpacity
                            style={styles.profileButton}
                            onPress={() => navigation.navigate('Profile')}>
                            <Icon name="account" size={20} color={COLORS.white} />
                        </TouchableOpacity>
                    </View>
                </View>



                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.scrollContent}>
                    {/* Banner Carousel */}
                    <View style={styles.bannerContainer}>
                        <FlatList
                            ref={flatListRef}
                            data={BANNERS}
                            renderItem={renderBanner}
                            keyExtractor={item => item.id}
                            horizontal
                            pagingEnabled
                            showsHorizontalScrollIndicator={false}
                            snapToInterval={BANNER_WIDTH}
                            decelerationRate="fast"
                            onScroll={onScroll}
                            scrollEventThrottle={16}
                            contentContainerStyle={{ paddingHorizontal: 16 }}
                        />


                        <View style={styles.paginationContainer}>
                            {BANNERS.map((_, index) => (
                                <View
                                    key={`dot-${index}`}
                                    style={[
                                        styles.paginationDot,
                                        index === activeSlide && styles.paginationDotActive,
                                    ]}
                                />
                            ))}
                        </View>
                    </View>


                    {/* Quick Actions */}
                    <View style={styles.quickActionsContainer}>
                        <TouchableOpacity
                            style={styles.actionCard}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('Wallet')}>
                            <View style={[styles.actionIconWrap, { backgroundColor: COLORS.primaryUltraLight }]}>
                                <Icon name="wallet" size={24} color={COLORS.primary} />
                            </View>
                            <Text style={styles.actionLabel}>Wallet</Text>
                            <Text style={styles.actionValue}>Check Balance</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionCard}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('Recharge')}>
                            <View style={[styles.actionIconWrap, { backgroundColor: COLORS.successLight }]}>
                                <Icon name="plus-circle" size={24} color={COLORS.success} />
                            </View>
                            <Text style={styles.actionLabel}>Recharge</Text>
                            <Text style={styles.actionValue}>Add Funds</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.actionCard}
                            activeOpacity={0.8}
                            onPress={() => navigation.navigate('Withdraw')}>
                            <View style={[styles.actionIconWrap, { backgroundColor: COLORS.warningLight }]}>
                                <Icon name="bank-transfer-out" size={24} color={COLORS.warning} />
                            </View>
                            <Text style={styles.actionLabel}>Withdraw</Text>
                            <Text style={styles.actionValue}>Cash Out</Text>
                        </TouchableOpacity>
                    </View>



                    {/* Market Indices Categories */}
                    <View style={styles.indicesSection}>
                        {/* Featured Indices - Horizontal Scroll */}
                        <View style={styles.featuredSection}>
                            <View style={styles.featuredSectionHeader}>
                                <Text style={styles.featuredSectionTitle}>Top Indices</Text>
                                <Icon name="chart-timeline-variant" size={20} color={COLORS.primary} />
                            </View>
                            <FlatList
                                horizontal
                                data={featuredIndicesWithViewAll}
                                renderItem={renderFeaturedItem}
                                keyExtractor={item => item.id}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={styles.featuredList}
                            />
                        </View>


                        <View style={styles.sectionHeader}>
                            <Text style={styles.sectionTitle}>Market Indices</Text>
                            <TouchableOpacity
                                style={styles.viewAllButton}
                                onPress={() => navigateToIndices('All Indices')}>
                                <Text style={styles.viewAllText}>View All</Text>
                                <Icon name="chevron-right" size={18} color={COLORS.primary} />
                            </TouchableOpacity>
                        </View>


                        <View style={styles.categoriesGrid}>
                            {INDICES_CATEGORIES.map(category => (
                                <TouchableOpacity
                                    key={category.id}
                                    style={styles.categoryCard}
                                    activeOpacity={0.8}
                                    onPress={() => navigateToIndices(category.title)}>
                                    <View
                                        style={[
                                            styles.categoryIcon,
                                            { backgroundColor: category.color + '20' },
                                        ]}>
                                        <Icon name={category.icon} size={28} color={category.color} />
                                    </View>
                                    <Text style={styles.categoryTitle}>{category.title}</Text>
                                    <Icon name="chevron-right" size={20} color={COLORS.textTertiary} />
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>


                    {/* Top Stocks Section */}
                    <View style={styles.sectionHeader}>
                        <View>
                            <Text style={styles.sectionTitle}>Top Stocks</Text>
                            <Text style={styles.sectionSubtitle}>Live market prices</Text>
                        </View>
                        <TouchableOpacity style={styles.viewAllButton}>
                            <Text style={styles.viewAllText}>View All</Text>
                            <Icon name="chevron-right" size={18} color={COLORS.primary} />
                        </TouchableOpacity>
                    </View>


                    <View style={styles.stockList}>
                        {MOCK_STOCKS.slice(0, 8).map(stock => (
                            <StockCard
                                key={stock.id}
                                stock={stock}
                                onPress={() => console.log('Stock pressed:', stock.ticker)}
                            />
                        ))}
                    </View>


                    <View style={{ height: 20 }} />
                </ScrollView>
            </View>
        </>
    );
};



const styles = StyleSheet.create({


    mainContainer: {
        flex: 1,
        backgroundColor: COLORS.primaryUltraLight,
    },


    header: {
        backgroundColor: COLORS.surface,
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 14,
        ...COMMON_STYLES.rowBetween,
        ...COMMON_STYLES.shadow,
        zIndex: 10,
    },


    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },


    logoContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.primaryUltraLight,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 10,
    },


    companyName: {
        ...TYPOGRAPHY.h4,
        fontWeight: '700',
    },


    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },


    iconButton: {
        width: 40,
        height: 40,
        borderRadius: 12,
        backgroundColor: COLORS.backgroundDark,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
    },


    notificationBadge: {
        position: 'absolute',
        top: 8,
        right: 8,
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.error,
        borderWidth: 1.5,
        borderColor: COLORS.backgroundDark,
    },


    profileButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: COLORS.primary,
        alignItems: 'center',
        justifyContent: 'center',
    },


    scrollContent: {
        paddingBottom: 24,
    },


    bannerContainer: {
        marginTop: 4,
        marginBottom: 20,
        height: 220,
    },


    bannerSlide: {
        paddingHorizontal: 0,
    },


    bannerGradient: {
        borderRadius: 10,
        overflow: 'hidden',
        height: 200,
        marginHorizontal: 2,
        ...COMMON_STYLES.shadowMedium,
    },


    bannerContent: {
        padding: 24,
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    },


    bannerIconWrap: {
        width: 56,
        height: 56,
        borderRadius: 28,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },


    bannerTitle: {
        ...TYPOGRAPHY.h3,
        color: COLORS.white,
        fontWeight: '700',
        marginBottom: 6,
        textAlign: 'center',
    },


    bannerSubtitle: {
        ...TYPOGRAPHY.body2,
        color: COLORS.white,
        opacity: 0.95,
        marginBottom: 16,
        textAlign: 'center',
    },


    bannerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.white,
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 12,
        gap: 6,
    },


    bannerButtonText: {
        ...TYPOGRAPHY.button,
        fontSize: 14,
        fontWeight: '600',
    },


    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 12,
    },


    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: COLORS.border,
        marginHorizontal: 4,
    },


    paginationDotActive: {
        width: 24,
        backgroundColor: COLORS.primary,
    },


    quickActionsContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        marginBottom: 24,
        gap: 12,
    },


    actionCard: {
        flex: 1,
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        alignItems: 'center',
        ...COMMON_STYLES.shadow,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
    },


    actionIconWrap: {
        width: 48,
        height: 48,
        borderRadius: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },


    actionLabel: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
        marginBottom: 4,
        fontSize: 11,
    },


    actionValue: {
        ...TYPOGRAPHY.body2Medium,
        fontWeight: '700',
        color: COLORS.textPrimary,
        fontSize: 12,
    },


    indicesSection: {
        marginBottom: 24,
    },


    categoriesGrid: {
        paddingHorizontal: 16,
        gap: 12,
    },


    categoryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        borderWidth: 1,
        borderColor: COLORS.borderLight,
        ...COMMON_STYLES.shadow,
    },


    categoryIcon: {
        width: 56,
        height: 56,
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 16,
    },


    categoryTitle: {
        ...TYPOGRAPHY.body1,
        fontWeight: '600',
        color: COLORS.textPrimary,
        flex: 1,
    },


    sectionHeader: {
        ...COMMON_STYLES.rowBetween,
        paddingHorizontal: 16,
        marginBottom: 16,
        paddingTop: 18,
    },


    sectionTitle: {
        ...TYPOGRAPHY.h4,
        fontWeight: '700',
        marginBottom: 2,
    },


    sectionSubtitle: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
    },


    viewAllButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
    },


    viewAllText: {
        ...TYPOGRAPHY.body2Medium,
        color: COLORS.primary,
        fontWeight: '600',
    },


    stockList: {
        paddingHorizontal: 4,
    },


    // Featured Section
    featuredSection: {
        paddingTop: 16,
        paddingBottom: 20,
        backgroundColor: COLORS.surface,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.border,
    },


    featuredSectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 12,
    },


    featuredSectionTitle: {
        ...TYPOGRAPHY.h4,
        fontWeight: '700',
    },


    featuredList: {
        paddingHorizontal: 16,
        paddingRight: 16,
    },


    featuredCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 14,
        marginRight: 12,
        width: 140,
        borderWidth: 1.5,
        borderColor: COLORS.borderLight,
        ...COMMON_STYLES.shadowMedium,
    },


    featuredHeader: {
        marginBottom: 10,
    },


    featuredIcon: {
        width: 44,
        height: 44,
        borderRadius: 22,
        alignItems: 'center',
        justifyContent: 'center',
    },


    featuredName: {
        ...TYPOGRAPHY.caption,
        color: COLORS.textSecondary,
        fontWeight: '600',
        marginBottom: 6,
    },


    featuredValue: {
        ...TYPOGRAPHY.h5,
        fontWeight: '800',
        color: COLORS.textPrimary,
        marginBottom: 8,
    },


    featuredChange: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 3,
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 6,
        alignSelf: 'flex-start',
    },


    positiveTag: {
        backgroundColor: COLORS.successLight,
    },


    negativeTag: {
        backgroundColor: COLORS.errorLight,
    },


    featuredChangeText: {
        ...TYPOGRAPHY.caption,
        fontWeight: '700',
        fontSize: 11,
    },

    // View All Card Styles
    viewAllCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 14,
        marginRight: 16,
        width: 140,
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderStyle: 'dashed',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 156,
        ...COMMON_STYLES.shadowMedium,
    },

    viewAllIconContainer: {
        marginBottom: 8,
    },

    viewAllCardTitle: {
        ...TYPOGRAPHY.h5,
        fontWeight: '700',
        color: COLORS.primary,
        marginBottom: 4,
    },

    viewAllCardSubtitle: {
        ...TYPOGRAPHY.caption,
        color: COLORS.primary,
        fontWeight: '600',
    },
});


export default HomeScreen;
