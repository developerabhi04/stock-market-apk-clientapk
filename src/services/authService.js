import { MOCK_OTP, getMockUser } from '../utils/mockData';

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

class AuthService {
    constructor() {
        this.currentOTP = null;
        this.currentPhoneNumber = null;
    }

    async checkPhoneExists(phoneNumber) {
        await delay(1000);

        const user = getMockUser(phoneNumber);

        console.log(`[MOCK] Checking phone: ${phoneNumber}`);
        console.log(`[MOCK] User found: ${!!user}`);

        return {
            success: true,
            exists: !!user,
            user: user || null,
        };
    }

    async sendOTP(phoneNumber) {
        await delay(1500);

        this.currentOTP = MOCK_OTP;
        this.currentPhoneNumber = phoneNumber;

        console.log(`[MOCK] Sending OTP to: ${phoneNumber}`);
        console.log(`[MOCK] OTP Code: ${this.currentOTP}`);

        return {
            success: true,
            message: `OTP sent to ${phoneNumber}`,
            otp: this.currentOTP,
        };
    }

    async verifyOTP(phoneNumber, otp) {
        await delay(1000);

        console.log(`[MOCK] Verifying OTP: ${otp}`);
        console.log(`[MOCK] Expected OTP: ${this.currentOTP}`);
        console.log(`[MOCK] Phone match: ${phoneNumber === this.currentPhoneNumber}`);

        const isValid = otp === this.currentOTP && phoneNumber === this.currentPhoneNumber;

        if (isValid) {
            const user = getMockUser(phoneNumber) || {
                phoneNumber,
                name: 'New User',
                isRegistered: false,
            };

            return {
                success: true,
                message: 'OTP verified successfully',
                user,
                token: `mock_token_${Date.now()}`,
            };
        }

        return {
            success: false,
            message: 'Invalid OTP. Please try again.',
        };
    }

    async signup(phoneNumber, userData) {
        await delay(1000);

        console.log(`[MOCK] Signing up user: ${phoneNumber}`, userData);

        return {
            success: true,
            message: 'Account created successfully',
            user: {
                phoneNumber,
                ...userData,
                isRegistered: true,
            },
            token: `mock_token_${Date.now()}`,
        };
    }

    async login(phoneNumber) {
        await delay(1000);

        const user = getMockUser(phoneNumber);

        console.log(`[MOCK] Logging in: ${phoneNumber}`);

        if (!user) {
            return {
                success: false,
                message: 'User not found',
            };
        }

        return {
            success: true,
            message: 'Login successful',
            user,
            token: `mock_token_${Date.now()}`,
        };
    }
}

export default new AuthService();
