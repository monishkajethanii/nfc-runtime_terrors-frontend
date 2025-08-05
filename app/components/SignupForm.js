// components/SignupForm.js - App Router Compatible
'use client';

import { useState } from 'react';

// Translation object - you can move this to a separate file later
const translations = {
  en: {
    signup: "Sign Up",
    signupSubtitle: "Choose your role and create your account",
    societyAdmin: "Society Admin",
    staff: "Staff",
    fullName: "Full Name",
    mobileNumber: "Mobile Number",
    email: "Email Address",
    societyName: "Society Name",
    societyAddress: "Society Address",
    city: "City",
    pinCode: "PIN Code",
    idProof: "ID/Authorization Proof",
    idProofOptional: "ID Proof (Optional)",
    societyCode: "Society Code",
    flatNumber: "Flat Number",
    wing: "Wing",
    fullNameOptional: "Full Name",
    workType: "Work Type",
    areaCity: "Area/City",
    enterFullName: "Enter your full name",
    enterMobile: "Enter mobile number",
    enterEmail: "Enter email address",
    enterSocietyName: "Enter society name",
    enterSocietyAddress: "Enter society address",
    enterCity: "Enter city",
    enterPinCode: "Enter PIN code",
    enterSocietyCode: "Enter society code",
    enterFlatNumber: "Enter flat number",
    enterWing: "Enter wing (optional)",
    enterAreaCity: "Enter your area or city",
    selectOption: "Select an option",
    uploadFile: "Click to upload file",
    plumber: "Plumber",
    electrician: "Electrician",
    technician: "Technician",
    cleaner: "Cleaner",
    security: "Security Guard",
    sendOTP: "Send for verification",
    verifyOTP: "Verify & Sign Up",
    enterOTP: "Enter OTP",
    otpSent: "OTP sent successfully",
    otpSentTo: "OTP sent to",
    processing: "Processing...",
    signupSuccess: "Registration successful! Your account is being processed.",
    invalidOTP: "Invalid OTP. Please try again.",
    mobileRequired: "Mobile number is required.",
    invalidSocietyCode: "Invalid society code. Please check and try again.",
    adminApprovalNote: "Note: Your society registration will be reviewed and approved by our back office team within 24-48 hours."
  },
  hi: {
    signup: "साइन अप",
    signupSubtitle: "अपनी भूमिका चुनें और अपना खाता बनाएं",
    societyAdmin: "सोसाइटी एडमिन",
    staff: "स्टाफ",
    fullName: "पूरा नाम",
    mobileNumber: "मोबाइल नंबर",
    email: "ईमेल पता",
    societyName: "सोसाइटी का नाम",
    societyAddress: "सोसाइटी का पता",
    city: "शहर",
    pinCode: "पिन कोड",
    idProof: "आईडी/प्राधिकरण प्रमाण",
    idProofOptional: "आईडी प्रमाण (वैकल्पिक)",
    societyCode: "सोसाइटी कोड",
    flatNumber: "फ्लैट नंबर",
    wing: "विंग",
    fullNameOptional: "पूरा नाम (वैकल्पिक)",
    workType: "कार्य प्रकार",
    areaCity: "क्षेत्र/शहर",
    enterFullName: "अपना पूरा नाम दर्ज करें",
    enterMobile: "मोबाइल नंबर दर्ज करें",
    enterEmail: "ईमेल पता दर्ज करें",
    enterSocietyName: "सोसाइटी का नाम दर्ज करें",
    enterSocietyAddress: "सोसाइटी का पता दर्ज करें",
    enterCity: "शहर दर्ज करें",
    enterPinCode: "पिन कोड दर्ज करें",
    enterSocietyCode: "सोसाइटी कोड दर्ज करें",
    enterFlatNumber: "फ्लैट नंबर दर्ज करें",
    enterWing: "विंग दर्ज करें (वैकल्पिक)",
    enterAreaCity: "अपना क्षेत्र या शहर दर्ज करें",
    selectOption: "एक विकल्प चुनें",
    uploadFile: "फाइल अपलोड करने के लिए क्लिक करें",
    plumber: "प्लंबर",
    electrician: "इलेक्ट्रीशियन",
    technician: "तकनीशियन",
    cleaner: "सफाई कर्मचारी",
    security: "सिक्योरिटी गार्ड",
    sendOTP: "OTP भेजें",
    verifyOTP: "सत्यापित करें और साइन अप करें",
    enterOTP: "OTP दर्ज करें",
    otpSent: "OTP सफलतापूर्वक भेजा गया",
    otpSentTo: "OTP भेजा गया",
    processing: "प्रसंस्करण...",
    signupSuccess: "पंजीकरण सफल! आपका खाता प्रसंस्करण में है।",
    invalidOTP: "अमान्य OTP। कृपया पुनः प्रयास करें।",
    mobileRequired: "मोबाइल नंबर आवश्यक है।",
    invalidSocietyCode: "अमान्य सोसाइटी कोड। कृपया जांचें और पुनः प्रयास करें।",
    adminApprovalNote: "नोट: आपका सोसाइटी पंजीकरण 24-48 घंटों के भीतर हमारी बैक ऑफिस टीम द्वारा समीक्षा और अनुमोदित किया जाएगा।"
  }
};

const SignupForm = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const [activeTab, setActiveTab] = useState('admin');
  const [isLoading, setIsLoading] = useState(false);
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [formData, setFormData] = useState({
    // Admin fields
    fullName: '',
    mobile: '',
    email: '',
    societyName: '',
    societyAddress: '',
    city: '',
    pinCode: '',
    idProof: null,
    
    // Resident fields
    societyCode: '',
    flatNumber: '',
    wing: '',
    
    // Staff fields
    workType: '',
    area: ''
  });

  // Get translation function
  const t = (key) => translations[currentLang][key] || key;

  const changeLanguage = (locale) => {
    setCurrentLang(locale);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const validateSocietyCode = (code) => {
    // Simulate validation - in real app, this would be an API call
    const validCodes = ['SOC001', 'SOC002', 'SOC003'];
    return validCodes.includes(code.toUpperCase());
  };

  const sendOTP = async (mobile) => {
    setIsLoading(true);
    // Simulate OTP sending
    await new Promise(resolve => setTimeout(resolve, 1500));
    setShowOTP(true);
    setIsLoading(false);
    alert(t('otpSent') + ': 123456'); // For demo purposes
  };

  const verifyOTP = async () => {
    setIsLoading(true);
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (otp === '123456') {
      alert(t('signupSuccess'));
      // Reset form
      setFormData({
        fullName: '', mobile: '', email: '', societyName: '', societyAddress: '',
        city: '', pinCode: '', idProof: null, societyCode: '', flatNumber: '',
        wing: '', workType: '', area: ''
      });
      setShowOTP(false);
      setOtp('');
    } else {
      alert(t('invalidOTP'));
    }
    setIsLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.mobile) {
      alert(t('mobileRequired'));
      return;
    }

    if (!showOTP) {
      await sendOTP(formData.mobile);
    } else {
      await verifyOTP();
    }
  };

  const TabButton = ({ id, label, isActive }) => (
    <button
      type="button"
      onClick={() => setActiveTab(id)}
      className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg transition-all duration-200 ${
        isActive
          ? 'bg-blue-600 text-white shadow-md'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {label}
    </button>
  );

  const InputField = ({ label, type = 'text', value, onChange, required = false, placeholder }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        required={required}
      />
    </div>
  );

  const SelectField = ({ label, value, onChange, options, required = false }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        required={required}
      >
        <option value="">{t('selectOption')}</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );

  const FileUpload = ({ label, onChange, required = false }) => (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors duration-200">
        <input
          type="file"
          onChange={(e) => onChange(e.target.files[0])}
          className="hidden"
          id="file-upload"
          accept="image/*,.pdf"
        />
        <label htmlFor="file-upload" className="cursor-pointer">
          <div className="text-gray-600">
            <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
              <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <p className="mt-2 text-sm text-gray-600">{t('uploadFile')}</p>
          </div>
        </label>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-md mx-auto">
        {/* Language Switcher */}
        <div className="mb-6 flex justify-end">
          <div className="flex bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              onClick={() => changeLanguage('en')}
              className={`px-3 py-2 text-sm font-medium ${
                currentLang === 'en' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => changeLanguage('hi')}
              className={`px-3 py-2 text-sm font-medium ${
                currentLang === 'hi' ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              हिं
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{t('signup')}</h1>
          <p className="text-gray-600">{t('signupSubtitle')}</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 mb-6 p-1 bg-white rounded-lg shadow-sm">
          <TabButton id="admin" label={t('societyAdmin')} isActive={activeTab === 'admin'} />
          <TabButton id="staff" label={t('staff')} isActive={activeTab === 'staff'} />
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Society Admin Form */}
            {activeTab === 'admin' && (
              <>
                <InputField
                  label={t('fullName')}
                  value={formData.fullName}
                  onChange={(value) => handleInputChange('fullName', value)}
                  required
                  placeholder={t('enterFullName')}
                />
                <InputField
                  label={t('mobileNumber')}
                  type="tel"
                  value={formData.mobile}
                  onChange={(value) => handleInputChange('mobile', value)}
                  required
                  placeholder={t('enterMobile')}
                />
                <InputField
                  label={t('email')}
                  type="email"
                  value={formData.email}
                  onChange={(value) => handleInputChange('email', value)}
                  required
                  placeholder={t('enterEmail')}
                />
                <InputField
                  label={t('societyName')}
                  value={formData.societyName}
                  onChange={(value) => handleInputChange('societyName', value)}
                  required
                  placeholder={t('enterSocietyName')}
                />
                <InputField
                  label={t('societyAddress')}
                  value={formData.societyAddress}
                  onChange={(value) => handleInputChange('societyAddress', value)}
                  required
                  placeholder={t('enterSocietyAddress')}
                />
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label={t('city')}
                    value={formData.city}
                    onChange={(value) => handleInputChange('city', value)}
                    required
                    placeholder={t('enterCity')}
                  />
                  <InputField
                    label={t('pinCode')}
                    value={formData.pinCode}
                    onChange={(value) => handleInputChange('pinCode', value)}
                    required
                    placeholder={t('enterPinCode')}
                  />
                </div>
                <FileUpload
                  label={t('idProof')}
                  onChange={(file) => handleFileUpload('idProof', file)}
                  required
                />
              </>
            )}

            {/* Staff Form */}
            {activeTab === 'staff' && (
              <>
                <InputField
                  label={t('mobileNumber')}
                  type="tel"
                  value={formData.mobile}
                  onChange={(value) => handleInputChange('mobile', value)}
                  required
                  placeholder={t('enterMobile')}
                />
                <InputField
                  label={t('fullNameOptional')}
                  value={formData.fullName}
                  onChange={(value) => handleInputChange('fullName', value)}
                  placeholder={t('enterFullName')}
                />
                <SelectField
                  label={t('workType')}
                  value={formData.workType}
                  onChange={(value) => handleInputChange('workType', value)}
                  required
                  options={[
                    { value: 'plumber', label: t('plumber') },
                    { value: 'electrician', label: t('electrician') },
                    { value: 'technician', label: t('technician') },
                    { value: 'cleaner', label: t('cleaner') },
                    { value: 'security', label: t('security') }
                  ]}
                />
                <InputField
                  label={t('areaCity')}
                  value={formData.area}
                  onChange={(value) => handleInputChange('area', value)}
                  required
                  placeholder={t('enterAreaCity')}
                />
              </>
            )}

            {/* OTP Section */}
            {showOTP && (
              <div className="border-t pt-6">
                <InputField
                  label={t('enterOTP')}
                  value={otp}
                  onChange={setOtp}
                  required
                  placeholder="123456"
                />
                <p className="text-sm text-gray-600 mt-2">
                  {t('otpSentTo')} {formData.mobile}
                </p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-medium text-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-200 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('processing')}
                </div>
              ) : showOTP ? t('verifyOTP') : t('sendOTP')}
            </button>

            {/* Status Messages */}
            {activeTab === 'admin' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-800">{t('adminApprovalNote')}</p>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;