'use client';

import { useState, useEffect } from 'react';

// Translation object
const translations = {
  en: {
    signup: "Sign Up",
    signupSubtitle: "Choose your role and create your account",
    societyAdmin: "Society Admin",
    staff: "Staff",
    firstName: "First Name",
    lastName: "Last Name",
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
    firstNameOptional: "First Name",
    lastNameOptional: "Last Name",
    workType: "Work Type",
    areaCity: "Area/City",
    enterFirstName: "Enter your first name",
    enterLastName: "Enter your last name",
    enterMobile: "Enter mobile number",
    enterEmail: "Enter email address",
    enterSocietyName: "Enter society name",
    enterSocietyAddress: "Start typing address...",
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
    createAccount: "Create Account",
    processing: "Processing...",
    signupSuccess: "Registration successful! Your account has been created.",
    invalidSocietyCode: "Invalid society code. Please check and try again.",
    mobileRequired: "Mobile number is required.",
    adminApprovalNote: "Note: Your society registration will be reviewed and approved by our back office team within 24-48 hours.",
     },
  hi: {
    signup: "साइन अप",
    signupSubtitle: "अपनी भूमिका चुनें और अपना खाता बनाएं",
    societyAdmin: "सोसाइटी एडमिन",
    staff: "स्टाफ",
    firstName: "पहला नाम",
    lastName: "अंतिम नाम",
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
    firstNameOptional: "पहला नाम",
    lastNameOptional: "अंतिम नाम",
    workType: "कार्य प्रकार",
    areaCity: "क्षेत्र/शहर",
    enterFirstName: "अपना पहला नाम दर्ज करें",
    enterLastName: "अपना अंतिम नाम दर्ज करें",
    enterMobile: "मोबाइल नंबर दर्ज करें",
    enterEmail: "ईमेल पता दर्ज करें",
    enterSocietyName: "सोसाइटी का नाम दर्ज करें",
    enterSocietyAddress: "पता टाइप करना शुरू करें...",
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
    createAccount: "खाता बनाएं",
    processing: "प्रसंस्करण...",
    signupSuccess: "पंजीकरण सफल! आपका खाता बनाया गया है।",
    invalidSocietyCode: "अमान्य सोसाइटी कोड। कृपया जांचें और पुनः प्रयास करें।",
    mobileRequired: "मोबाइल नंबर आवश्यक है।",
    adminApprovalNote: "नोट: आपका सोसाइटी पंजीकरण 24-48 घंटों के भीतर हमारी बैक ऑफिस टीम द्वारा समीक्षा और अनुमोदित किया जाएगा।",
  }
};

// Mock address data - in real app, this would come from Google Places API or similar
const mockAddresses = [
  "123 MG Road, Pune, Maharashtra",
  "456 Brigade Road, Bangalore, Karnataka",
  "789 Park Street, Kolkata, West Bengal",
  "321 Connaught Place, New Delhi, Delhi",
  "654 Marine Drive, Mumbai, Maharashtra",
  "987 Commercial Street, Bangalore, Karnataka",
  "147 Salt Lake, Kolkata, West Bengal",
  "258 Karol Bagh, New Delhi, Delhi",
  "369 Bandra West, Mumbai, Maharashtra",
  "741 Koregaon Park, Pune, Maharashtra"
];

const SignupForm = () => {
  const [currentLang, setCurrentLang] = useState('en');
  const [activeTab, setActiveTab] = useState('admin');
  const [isLoading, setIsLoading] = useState(false);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [showAddressSuggestions, setShowAddressSuggestions] = useState(false);
  const [formData, setFormData] = useState({
    // Admin fields
    firstName: '',
    lastName: '',
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
    
    // Handle address suggestions
    if (field === 'societyAddress' && value.length > 2) {
      const filtered = mockAddresses.filter(addr =>
        addr.toLowerCase().includes(value.toLowerCase())
      );
      setAddressSuggestions(filtered);
      setShowAddressSuggestions(true);
    } else if (field === 'societyAddress') {
      setShowAddressSuggestions(false);
    }
  };

  const handleAddressSelect = (address) => {
    setFormData(prev => ({ ...prev, societyAddress: address }));
    setShowAddressSuggestions(false);
    
    // Auto-fill city and pin code based on selected address
    const parts = address.split(', ');
    if (parts.length >= 2) {
      const city = parts[parts.length - 2];
      setFormData(prev => ({ ...prev, city: city }));
    }
  };

  const handleFileUpload = (field, file) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.mobile) {
      alert(t('mobileRequired'));
      return;
    }

    setIsLoading(true);
    
    // Simulate account creation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert(t('signupSuccess'));
    
    // Reset form
    setFormData({
      firstName: '', lastName: '', mobile: '', email: '', societyName: '', 
      societyAddress: '', city: '', pinCode: '', idProof: null, 
      societyCode: '', flatNumber: '', wing: '', workType: '', area: ''
    });
    
    setIsLoading(false);
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

  const AddressInputField = ({ label, value, onChange, required = false, placeholder }) => (
    <div className="space-y-2 relative">
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        required={required}
        onFocus={() => value.length > 2 && setShowAddressSuggestions(true)}
        onBlur={() => setTimeout(() => setShowAddressSuggestions(false), 200)}
      />
      
      {/* Address Suggestions Dropdown */}
      {showAddressSuggestions && addressSuggestions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
          {addressSuggestions.map((address, index) => (
            <div
              key={index}
              className="px-4 py-3 hover:bg-gray-100 cursor-pointer border-b border-gray-100 last:border-b-0"
              onClick={() => handleAddressSelect(address)}
            >
              <div className="text-sm text-gray-900">{address}</div>
            </div>
          ))}
        </div>
      )}
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
        <div className="flex space-x-1 mb-6 p-1 bg-white rounded-lg shadow-sm">
          <TabButton id="admin" label={t('societyAdmin')} isActive={activeTab === 'admin'} />
          <TabButton id="staff" label={t('staff')} isActive={activeTab === 'staff'} />
        </div>

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="space-y-6">
            {/* Society Admin Form */}
            {activeTab === 'admin' && (
              <>
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label={t('firstName')}
                    value={formData.firstName}
                    onChange={(value) => handleInputChange('firstName', value)}
                    required
                    placeholder={t('enterFirstName')}
                  />
                  <InputField
                    label={t('lastName')}
                    value={formData.lastName}
                    onChange={(value) => handleInputChange('lastName', value)}
                    required
                    placeholder={t('enterLastName')}
                  />
                </div>
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
                  placeholder={t('enterEmail')}
                />
                <InputField
                  label={t('societyName')}
                  value={formData.societyName}
                  onChange={(value) => handleInputChange('societyName', value)}
                  required
                  placeholder={t('enterSocietyName')}
                />
                <AddressInputField
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
                <div className="grid grid-cols-2 gap-4">
                  <InputField
                    label={t('firstNameOptional')}
                    value={formData.firstName}
                    onChange={(value) => handleInputChange('firstName', value)}
                    required
                    placeholder={t('enterFirstName')}
                  />
                  <InputField
                    label={t('lastNameOptional')}
                    required
                    value={formData.lastName}
                    onChange={(value) => handleInputChange('lastName', value)}
                    placeholder={t('enterLastName')}
                  />
                </div>
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

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
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
              ) : t('createAccount')}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;