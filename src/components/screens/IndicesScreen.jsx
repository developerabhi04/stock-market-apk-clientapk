import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  FlatList,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import { COMMON_STYLES, TYPOGRAPHY } from '../../constants/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Top Highlighted Indices (Featured)
const FEATURED_INDICES = [
  { id: 'feat-1', name: 'NIFTY 50', value: '19,435.30', change: '+1.24%', isPositive: true, icon: 'chart-line-variant' },
  { id: 'feat-2', name: 'SENSEX', value: '64,832.55', change: '+0.98%', isPositive: true, icon: 'trending-up' },
  { id: 'feat-3', name: 'BANK NIFTY', value: '43,567.80', change: '+2.14%', isPositive: true, icon: 'bank' },
  { id: 'feat-4', name: 'NIFTY IT', value: '30,234.90', change: '-0.45%', isPositive: false, icon: 'laptop' },
  { id: 'feat-5', name: 'DOW JONES', value: '34,567.89', change: '+0.67%', isPositive: true, icon: 'chart-areaspline' },
  { id: 'feat-6', name: 'S&P 500', value: '4,456.23', change: '+0.82%', isPositive: true, icon: 'chart-bell-curve' },
];

// Indian Indices (Expanded)
const INDIAN_INDICES = [
  { id: 'in-1', name: 'NIFTY 50', value: '19,435.30', change: '+1.24%', isPositive: true },
  { id: 'in-2', name: 'SENSEX', value: '64,832.55', change: '+0.98%', isPositive: true },
  { id: 'in-3', name: 'BANK NIFTY', value: '43,567.80', change: '+2.14%', isPositive: true },
  { id: 'in-4', name: 'NIFTY IT', value: '30,234.90', change: '-0.45%', isPositive: false },
  { id: 'in-5', name: 'NIFTY PHARMA', value: '14,876.25', change: '+1.78%', isPositive: true },
  { id: 'in-6', name: 'NIFTY AUTO', value: '13,456.70', change: '+0.56%', isPositive: true },
  { id: 'in-7', name: 'NIFTY METAL', value: '6,234.80', change: '+2.34%', isPositive: true },
  { id: 'in-8', name: 'NIFTY REALTY', value: '567.45', change: '-1.23%', isPositive: false },
  { id: 'in-9', name: 'NIFTY ENERGY', value: '21,345.60', change: '+1.45%', isPositive: true },
  { id: 'in-10', name: 'NIFTY FMCG', value: '45,678.90', change: '+0.78%', isPositive: true },
  { id: 'in-11', name: 'NIFTY MEDIA', value: '1,234.56', change: '+1.90%', isPositive: true },
  { id: 'in-12', name: 'NIFTY PSU BANK', value: '3,456.78', change: '-0.67%', isPositive: false },
  { id: 'in-13', name: 'NIFTY MIDCAP 50', value: '9,876.54', change: '+2.45%', isPositive: true },
  { id: 'in-14', name: 'NIFTY SMALLCAP 50', value: '5,432.10', change: '+3.12%', isPositive: true },
  { id: 'in-15', name: 'NIFTY NEXT 50', value: '41,234.50', change: '+1.56%', isPositive: true },
  { id: 'in-16', name: 'BSE 100', value: '18,567.89', change: '+0.89%', isPositive: true },
  { id: 'in-17', name: 'BSE 200', value: '7,654.32', change: '+1.23%', isPositive: true },
  { id: 'in-18', name: 'BSE 500', value: '23,456.78', change: '+0.98%', isPositive: true },
];

// Global Indices (Expanded)
const GLOBAL_INDICES = [
  { id: 'gl-1', name: 'DOW JONES', value: '34,567.89', change: '+0.67%', isPositive: true },
  { id: 'gl-2', name: 'S&P 500', value: '4,456.23', change: '+0.82%', isPositive: true },
  { id: 'gl-3', name: 'NASDAQ', value: '13,789.45', change: '-0.34%', isPositive: false },
  { id: 'gl-4', name: 'FTSE 100', value: '7,456.78', change: '+0.45%', isPositive: true },
  { id: 'gl-5', name: 'NIKKEI 225', value: '28,234.56', change: '+1.12%', isPositive: true },
  { id: 'gl-6', name: 'HANG SENG', value: '19,876.34', change: '-0.89%', isPositive: false },
  { id: 'gl-7', name: 'DAX', value: '15,234.67', change: '+1.34%', isPositive: true },
  { id: 'gl-8', name: 'CAC 40', value: '6,789.23', change: '+0.56%', isPositive: true },
  { id: 'gl-9', name: 'KOSPI', value: '2,456.78', change: '-0.23%', isPositive: false },
  { id: 'gl-10', name: 'SHANGHAI', value: '3,234.56', change: '+0.89%', isPositive: true },
  { id: 'gl-11', name: 'RUSSELL 2000', value: '1,987.65', change: '+1.45%', isPositive: true },
  { id: 'gl-12', name: 'EURO STOXX 50', value: '4,123.45', change: '+0.78%', isPositive: true },
  { id: 'gl-13', name: 'ASX 200', value: '7,234.56', change: '+0.91%', isPositive: true },
  { id: 'gl-14', name: 'TSX COMPOSITE', value: '19,876.54', change: '+1.23%', isPositive: true },
  { id: 'gl-15', name: 'BOVESPA', value: '112,345.67', change: '-0.45%', isPositive: false },
];

// Crypto (Expanded)
const CRYPTO_DATA = [
  { id: 'cr-1', name: 'Bitcoin', symbol: 'BTC', value: '$42,567.89', change: '+3.45%', isPositive: true },
  { id: 'cr-2', name: 'Ethereum', symbol: 'ETH', value: '$2,234.56', change: '+2.78%', isPositive: true },
  { id: 'cr-3', name: 'Binance Coin', symbol: 'BNB', value: '$345.67', change: '-1.23%', isPositive: false },
  { id: 'cr-4', name: 'Cardano', symbol: 'ADA', value: '$0.89', change: '+5.67%', isPositive: true },
  { id: 'cr-5', name: 'Solana', symbol: 'SOL', value: '$78.45', change: '+4.12%', isPositive: true },
  { id: 'cr-6', name: 'Ripple', symbol: 'XRP', value: '$0.56', change: '+2.34%', isPositive: true },
  { id: 'cr-7', name: 'Polkadot', symbol: 'DOT', value: '$12.34', change: '-0.89%', isPositive: false },
  { id: 'cr-8', name: 'Dogecoin', symbol: 'DOGE', value: '$0.12', change: '+6.78%', isPositive: true },
  { id: 'cr-9', name: 'Avalanche', symbol: 'AVAX', value: '$23.45', change: '+3.21%', isPositive: true },
  { id: 'cr-10', name: 'Polygon', symbol: 'MATIC', value: '$1.23', change: '+1.89%', isPositive: true },
  { id: 'cr-11', name: 'Chainlink', symbol: 'LINK', value: '$15.67', change: '+2.45%', isPositive: true },
  { id: 'cr-12', name: 'Litecoin', symbol: 'LTC', value: '$89.34', change: '-0.67%', isPositive: false },
  { id: 'cr-13', name: 'Uniswap', symbol: 'UNI', value: '$8.90', change: '+4.56%', isPositive: true },
  { id: 'cr-14', name: 'Shiba Inu', symbol: 'SHIB', value: '$0.000012', change: '+8.90%', isPositive: true },
  { id: 'cr-15', name: 'Tron', symbol: 'TRX', value: '$0.087', change: '+1.23%', isPositive: true },
];

const TABS = ['All Indices', 'Indian Indices', 'Global Indices', 'Crypto'];

const IndicesScreen = ({ navigation, route }) => {
  const initialTab = route?.params?.tab || 'All Indices';
  const [selectedTab, setSelectedTab] = useState(initialTab);

  const getIndicesData = () => {
    switch (selectedTab) {
      case 'Indian Indices':
        return INDIAN_INDICES;
      case 'Global Indices':
        return GLOBAL_INDICES;
      case 'Crypto':
        return CRYPTO_DATA;
      default:
        return [
          ...INDIAN_INDICES.slice(0, 6),
          ...GLOBAL_INDICES.slice(0, 5),
          ...CRYPTO_DATA.slice(0, 5),
        ];
    }
  };

  // const renderFeaturedItem = ({ item }) => (
  //   <TouchableOpacity style={styles.featuredCard} activeOpacity={0.9}>
  //     <View style={styles.featuredHeader}>
  //       <View style={[styles.featuredIcon, { backgroundColor: item.isPositive ? COLORS.successLight : COLORS.errorLight }]}>
  //         <Icon name={item.icon} size={22} color={item.isPositive ? COLORS.success : COLORS.error} />
  //       </View>
  //     </View>
  //     <Text style={styles.featuredName} numberOfLines={1}>{item.name}</Text>
  //     <Text style={styles.featuredValue}>{item.value}</Text>
  //     <View style={[styles.featuredChange, item.isPositive ? styles.positiveTag : styles.negativeTag]}>
  //       <Icon
  //         name={item.isPositive ? 'arrow-top-right' : 'arrow-bottom-right'}
  //         size={12}
  //         color={item.isPositive ? COLORS.success : COLORS.error}
  //       />
  //       <Text style={[styles.featuredChangeText, { color: item.isPositive ? COLORS.success : COLORS.error }]}>
  //         {item.change}
  //       </Text>
  //     </View>
  //   </TouchableOpacity>
  // );

  const renderIndicesItem = ({ item }) => (
    <TouchableOpacity
      style={styles.indicesCard}
      activeOpacity={0.8}
      onPress={() => navigation.navigate('StockDetail', {
        stock: {
          name: item.name,
          value: item.value,
          change: item.change,
          isPositive: item.isPositive,
          symbol: item.symbol // For crypto
        }
      })}>
      <View style={styles.cardHeader}>
        <View style={styles.iconWrapper}>
          <Icon name="chart-line" size={20} color={COLORS.primary} />
        </View>
        <View style={styles.cardInfo}>
          <Text style={styles.indicesName} numberOfLines={1}>{item.name}</Text>
          {item.symbol && <Text style={styles.indicesSymbol}>{item.symbol}</Text>}
        </View>
      </View>

      <View style={styles.cardFooter}>
        <Text style={styles.indicesValue}>{item.value}</Text>
        <View style={[styles.indicesChange, item.isPositive ? styles.positive : styles.negative]}>
          <Icon
            name={item.isPositive ? 'arrow-top-right' : 'arrow-bottom-right'}
            size={14}
            color={item.isPositive ? COLORS.success : COLORS.error}
          />
          <Text
            style={[
              styles.indicesChangeText,
              { color: item.isPositive ? COLORS.success : COLORS.error },
            ]}>
            {item.change}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );


  // In IndicesScreen.js - Update renderFeaturedItem or renderIndicesItem
  const renderFeaturedItem = ({ item }) => (
    <TouchableOpacity
      style={styles.featuredCard}
      onPress={() => navigation.navigate('StockDetail', {
        stock: {
          name: item.name,
          value: item.value,
          change: item.change,
          isPositive: item.isPositive
        }
      })}
      activeOpacity={0.9}>
      {/* rest of code */}
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


  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar
        barStyle="light-content"
        backgroundColor={COLORS.primary}
        translucent={false}
      />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color={COLORS.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Market Indices</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="magnify" size={24} color={COLORS.white} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Featured Indices - Horizontal Scroll */}
        <View style={styles.featuredSection}>
          <View style={styles.featuredSectionHeader}>
            <Text style={styles.featuredSectionTitle}>Top Indices</Text>
            <Icon name="chart-timeline-variant" size={20} color={COLORS.primary} />
          </View>
          <FlatList
            horizontal
            data={FEATURED_INDICES}
            renderItem={renderFeaturedItem}
            keyExtractor={item => item.id}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.featuredList}
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabsSection}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tabsContainer}>
            {TABS.map((tab, index) => (
              <TouchableOpacity
                key={`tab-${index}`}
                style={[styles.tab, selectedTab === tab && styles.tabActive]}
                onPress={() => setSelectedTab(tab)}>
                <Text style={[styles.tabText, selectedTab === tab && styles.tabTextActive]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* All Indices Grid */}
        <View style={styles.allIndicesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              {selectedTab === 'All Indices' ? 'All Markets' : selectedTab}
            </Text>
            <Text style={styles.sectionCount}>
              {getIndicesData().length} {selectedTab === 'Crypto' ? 'Coins' : 'Indices'}
            </Text>
          </View>

          <View style={styles.gridContainer}>
            {getIndicesData().map((item, index) => (
              <View key={item.id} style={styles.gridItemWrapper}>
                {renderIndicesItem({ item, index })}
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },

  header: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 16,
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    ...TYPOGRAPHY.h4,
    color: COLORS.white,
    fontWeight: '700',
    flex: 1,
    textAlign: 'center',
  },

  searchButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
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

  // Tabs Section
  tabsSection: {
    backgroundColor: COLORS.surface,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },

  tabsContainer: {
    paddingHorizontal: 16,
  },

  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: COLORS.background,
    marginRight: 10,
    borderWidth: 1,
    borderColor: COLORS.border,
  },

  tabActive: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },

  tabText: {
    ...TYPOGRAPHY.body2Medium,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },

  tabTextActive: {
    color: COLORS.white,
  },

  // All Indices Section
  allIndicesSection: {
    paddingTop: 20,
    paddingBottom: 24,
    backgroundColor: COLORS.background,
  },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 16,
  },

  sectionTitle: {
    ...TYPOGRAPHY.h4,
    fontWeight: '700',
  },

  sectionCount: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textTertiary,
    fontWeight: '600',
  },

  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 10,
  },

  gridItemWrapper: {
    width: '50%',
    paddingHorizontal: 6,
    marginBottom: 12,
  },

  indicesCard: {
    backgroundColor: COLORS.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.borderLight,
    ...COMMON_STYLES.shadow,
    height: 120,
    justifyContent: 'space-between',
  },

  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: COLORS.primaryUltraLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },

  cardInfo: {
    flex: 1,
  },

  indicesName: {
    ...TYPOGRAPHY.body2,
    color: COLORS.textPrimary,
    fontWeight: '700',
    fontSize: 13,
  },

  indicesSymbol: {
    ...TYPOGRAPHY.caption,
    color: COLORS.textTertiary,
    fontSize: 10,
  },

  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },

  indicesValue: {
    ...TYPOGRAPHY.body1,
    fontWeight: '700',
    color: COLORS.textPrimary,
    fontSize: 15,
  },

  indicesChange: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 3,
    borderRadius: 6,
  },

  positive: {
    backgroundColor: COLORS.successLight,
  },

  negative: {
    backgroundColor: COLORS.errorLight,
  },

  indicesChangeText: {
    ...TYPOGRAPHY.caption,
    fontWeight: '700',
    fontSize: 11,
  },
});

export default IndicesScreen;
