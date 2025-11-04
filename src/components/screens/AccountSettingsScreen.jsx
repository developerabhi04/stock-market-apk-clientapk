import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    StatusBar,
    Platform,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import { TYPOGRAPHY } from '../../constants/styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

const AccountSettingsScreen = ({ navigation }) => {
    // Form State
    const [fullName, setFullName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [panCard, setPanCard] = useState('');
    const [accountNumber, setAccountNumber] = useState('');
    const [confirmAccountNumber, setConfirmAccountNumber] = useState('');
    const [ifscCode, setIfscCode] = useState('');
    const [bankName, setBankName] = useState('');

    // Validation States
    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState({
        account: false,
        confirmAccount: false,
    });

    // Format date
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Validate PAN Card
    const validatePAN = (pan) => {
        const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
        return panRegex.test(pan);
    };

    // Validate IFSC Code
    const validateIFSC = (ifsc) => {
        const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
        return ifscRegex.test(ifsc);
    };

    // Handle Date Change
    const onDateChange = (event, selectedDate) => {
        setShowDatePicker(Platform.OS === 'ios');
        if (selectedDate) {
            setDateOfBirth(selectedDate);
        }
    };

    // Handle Submit
    const handleSubmit = () => {
        const newErrors = {};

        // Validate Full Name
        if (!fullName.trim()) {
            newErrors.fullName = 'Full name is required';
        }

        // Validate PAN Card
        if (!panCard.trim()) {
            newErrors.panCard = 'PAN card number is required';
        } else if (!validatePAN(panCard.toUpperCase())) {
            newErrors.panCard = 'Invalid PAN card format (e.g., ABCDE1234F)';
        }

        // Validate Account Number
        if (!accountNumber.trim()) {
            newErrors.accountNumber = 'Account number is required';
        } else if (accountNumber.length < 9 || accountNumber.length > 18) {
            newErrors.accountNumber = 'Account number must be 9-18 digits';
        }

        // Validate Confirm Account Number
        if (!confirmAccountNumber.trim()) {
            newErrors.confirmAccountNumber = 'Please confirm account number';
        } else if (accountNumber !== confirmAccountNumber) {
            newErrors.confirmAccountNumber = 'Account numbers do not match';
        }

        // Validate IFSC Code
        if (!ifscCode.trim()) {
            newErrors.ifscCode = 'IFSC code is required';
        } else if (!validateIFSC(ifscCode.toUpperCase())) {
            newErrors.ifscCode = 'Invalid IFSC code format';
        }

        // Validate Bank Name
        if (!bankName.trim()) {
            newErrors.bankName = 'Bank name is required';
        }

        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            Alert.alert(
                'Success',
                'Account details saved successfully!',
                [{ text: 'OK', onPress: () => navigation.goBack() }]
            );
        }
    };

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
                    <Text style={styles.headerTitle}>Account Settings</Text>
                    <View style={styles.headerRight} />
                </View>
            </SafeAreaView>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}>

                {/* Info Banner */}
                <View style={styles.infoBanner}>
                    <Icon name="information-outline" size={20} color={COLORS.primary} />
                    <Text style={styles.infoBannerText}>
                        Complete your account details to enable withdrawals and trading
                    </Text>
                </View>

                {/* Personal Details Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Icon name="account-circle" size={20} color={COLORS.primary} />
                        <Text style={styles.sectionTitle}>Personal Details</Text>
                    </View>

                    {/* Full Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Full Name *</Text>
                        <View style={styles.inputContainer}>
                            <Icon name="account" size={20} color={COLORS.textSecondary} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your full name"
                                placeholderTextColor={COLORS.textLight}
                                value={fullName}
                                onChangeText={setFullName}
                                autoCapitalize="words"
                            />
                        </View>
                        {errors.fullName && (
                            <Text style={styles.errorText}>{errors.fullName}</Text>
                        )}
                    </View>

                    {/* Date of Birth */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Date of Birth *</Text>
                        <TouchableOpacity
                            style={styles.inputContainer}
                            onPress={() => setShowDatePicker(true)}
                            activeOpacity={0.7}>
                            <Icon name="calendar" size={20} color={COLORS.textSecondary} />
                            <Text style={styles.dateText}>{formatDate(dateOfBirth)}</Text>
                            <Icon name="chevron-down" size={20} color={COLORS.textSecondary} />
                        </TouchableOpacity>
                    </View>

                    {showDatePicker && (
                        <DateTimePicker
                            value={dateOfBirth}
                            mode="date"
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                            onChange={onDateChange}
                            maximumDate={new Date()}
                        />
                    )}

                    {/* PAN Card */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>PAN Card Number *</Text>
                        <View style={styles.inputContainer}>
                            <Icon name="card-account-details" size={20} color={COLORS.textSecondary} />
                            <TextInput
                                style={styles.input}
                                placeholder="ABCDE1234F"
                                placeholderTextColor={COLORS.textLight}
                                value={panCard}
                                onChangeText={(text) => setPanCard(text.toUpperCase())}
                                autoCapitalize="characters"
                                maxLength={10}
                            />
                        </View>
                        {errors.panCard && (
                            <Text style={styles.errorText}>{errors.panCard}</Text>
                        )}
                        <Text style={styles.helperText}>
                            Enter your 10-digit PAN card number
                        </Text>
                    </View>
                </View>

                {/* Bank Details Section */}
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Icon name="bank" size={20} color={COLORS.primary} />
                        <Text style={styles.sectionTitle}>Bank Details</Text>
                    </View>

                    {/* Bank Name */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Bank Name *</Text>
                        <View style={styles.inputContainer}>
                            <Icon name="bank" size={20} color={COLORS.textSecondary} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter bank name"
                                placeholderTextColor={COLORS.textLight}
                                value={bankName}
                                onChangeText={setBankName}
                                autoCapitalize="words"
                            />
                        </View>
                        {errors.bankName && (
                            <Text style={styles.errorText}>{errors.bankName}</Text>
                        )}
                    </View>

                    {/* Account Number */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Account Number *</Text>
                        <View style={styles.inputContainer}>
                            <Icon name="credit-card" size={20} color={COLORS.textSecondary} />
                            <TextInput
                                style={styles.input}
                                placeholder="Enter account number"
                                placeholderTextColor={COLORS.textLight}
                                value={accountNumber}
                                onChangeText={setAccountNumber}
                                keyboardType="number-pad"
                                maxLength={18}
                                secureTextEntry={!showPassword.account}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword({
                                    ...showPassword,
                                    account: !showPassword.account
                                })}
                                activeOpacity={0.7}>
                                <Icon
                                    name={showPassword.account ? 'eye-off' : 'eye'}
                                    size={20}
                                    color={COLORS.textSecondary}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.accountNumber && (
                            <Text style={styles.errorText}>{errors.accountNumber}</Text>
                        )}
                    </View>

                    {/* Confirm Account Number */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>Confirm Account Number *</Text>
                        <View style={styles.inputContainer}>
                            <Icon name="credit-card-check" size={20} color={COLORS.textSecondary} />
                            <TextInput
                                style={styles.input}
                                placeholder="Re-enter account number"
                                placeholderTextColor={COLORS.textLight}
                                value={confirmAccountNumber}
                                onChangeText={setConfirmAccountNumber}
                                keyboardType="number-pad"
                                maxLength={18}
                                secureTextEntry={!showPassword.confirmAccount}
                            />
                            <TouchableOpacity
                                onPress={() => setShowPassword({
                                    ...showPassword,
                                    confirmAccount: !showPassword.confirmAccount
                                })}
                                activeOpacity={0.7}>
                                <Icon
                                    name={showPassword.confirmAccount ? 'eye-off' : 'eye'}
                                    size={20}
                                    color={COLORS.textSecondary}
                                />
                            </TouchableOpacity>
                        </View>
                        {errors.confirmAccountNumber && (
                            <Text style={styles.errorText}>{errors.confirmAccountNumber}</Text>
                        )}
                    </View>

                    {/* IFSC Code */}
                    <View style={styles.inputGroup}>
                        <Text style={styles.inputLabel}>IFSC Code *</Text>
                        <View style={styles.inputContainer}>
                            <Icon name="map-marker" size={20} color={COLORS.textSecondary} />
                            <TextInput
                                style={styles.input}
                                placeholder="SBIN0001234"
                                placeholderTextColor={COLORS.textLight}
                                value={ifscCode}
                                onChangeText={(text) => setIfscCode(text.toUpperCase())}
                                autoCapitalize="characters"
                                maxLength={11}
                            />
                        </View>
                        {errors.ifscCode && (
                            <Text style={styles.errorText}>{errors.ifscCode}</Text>
                        )}
                        <Text style={styles.helperText}>
                            Find IFSC code on your cheque book or bank website
                        </Text>
                    </View>
                </View>

                {/* Security Notice */}
                <View style={styles.securityNotice}>
                    <Icon name="shield-check" size={18} color={COLORS.success} />
                    <Text style={styles.securityNoticeText}>
                        Your bank details are encrypted and secure
                    </Text>
                </View>

            </ScrollView>

            {/* Bottom Save Button */}
            <SafeAreaView edges={['bottom']} style={styles.bottomSafeArea}>
                <View style={styles.bottomContainer}>
                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleSubmit}
                        activeOpacity={0.8}>
                        <Icon name="check-circle" size={20} color={COLORS.white} />
                        <Text style={styles.saveButtonText}>Save Details</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
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

    headerTitle: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.text,
    },

    headerRight: {
        width: 40,
    },

    scrollContent: {
        padding: 16,
        paddingBottom: 100,
    },

    // Info Banner
    infoBanner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.primaryUltraLight,
        padding: 14,
        borderRadius: 12,
        marginBottom: 20,
        gap: 10,
    },

    infoBannerText: {
        flex: 1,
        fontSize: 13,
        color: COLORS.primary,
        fontWeight: '500',
        lineHeight: 18,
    },

    // Section
    section: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },

    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        gap: 10,
    },

    sectionTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
    },

    // Input Group
    inputGroup: {
        marginBottom: 20,
    },

    inputLabel: {
        fontSize: 14,
        fontWeight: '600',
        color: COLORS.text,
        marginBottom: 8,
    },

    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.background,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderWidth: 1,
        borderColor: COLORS.border,
        gap: 10,
    },

    input: {
        flex: 1,
        fontSize: 15,
        color: COLORS.text,
        fontWeight: '500',
        padding: 0,
    },

    dateText: {
        flex: 1,
        fontSize: 15,
        color: COLORS.text,
        fontWeight: '500',
    },

    errorText: {
        fontSize: 12,
        color: COLORS.error,
        marginTop: 6,
        fontWeight: '500',
    },

    helperText: {
        fontSize: 12,
        color: COLORS.textSecondary,
        marginTop: 6,
    },

    // Security Notice
    securityNotice: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: COLORS.successLight,
        padding: 12,
        borderRadius: 12,
        gap: 10,
    },

    securityNoticeText: {
        flex: 1,
        fontSize: 13,
        color: COLORS.success,
        fontWeight: '600',
    },

    // Bottom Button
    bottomSafeArea: {
        backgroundColor: COLORS.surface,
    },

    bottomContainer: {
        backgroundColor: COLORS.surface,
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.1,
        shadowRadius: 12,
        elevation: 8,
    },

    saveButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        paddingVertical: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },

    saveButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.white,
        letterSpacing: 0.5,
    },
});

export default AccountSettingsScreen;
