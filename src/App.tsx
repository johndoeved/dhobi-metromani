import { useState, useEffect, useRef, createContext, useContext } from "react";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { FileOpener } from "@capacitor-community/file-opener";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

export const API_BASE_URL = Capacitor.isNativePlatform() ? "https://dhobi-samaj-metromany.vercel.app" : "";

// ─── TRANSLATIONS ─────────────────────────────────────────────────────────────
const TRANSLATIONS = {
  en: {
    appName: "Dhobi Matrimony",
    appTagline: "Trusted Matrimonial for the Dhobi Community",
    community: "Dhobi Community",
    selectLang: "Choose Your Language",
    selectLangSub: "Select language to continue / भाषा चुनें / ભાષા પસંદ કરો",
    continue: "Continue",
    findPartner: "Find Your Life Partner",
    trustedBy: "Trusted by thousands of Dhobi families",
    emailLabel: "Email Address",
    emailPlaceholder: "Enter your email",
    sendOtp: "Send OTP",
    otpLabel: "Enter OTP Code",
    otpPlaceholder: "6-digit code",
    verifyOtp: "Verify & Login",
    resendOtp: "Resend OTP",
    adminLogin: "Admin Login",
    password: "Password",
    loginBtn: "Login as Admin",
    backToUser: "Back to User Login",
    otpSent: "OTP sent to your email.",
    networkError: "Network error. Please try again.",
    invalidEmail: "Please enter a valid email address.",
    enterEmail: "Enter an email address",
    enterOtp: "Enter a 6-digit OTP code",
    otpExpired: "OTP expired. Please request a new one.",
    pendingTitle: "Profile Under Review",
    pendingMsg: "Your profile has been submitted and is under admin review. You will be notified once approved.",
    logout: "Logout",
    downloadBioData: "Download Bio-Data",
    home: "Home",
    matches: "Matches",
    interests: "Interests",
    messages: "Messages",
    profile: "Profile",
    help: "Help",
    adminPanel: "Admin Panel",
    users: "Users",
    reports: "Reports",
    settings: "Settings",
    approve: "Approve",
    reject: "Reject",
    block: "Block",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    search: "Search",
    filter: "Filter",
    male: "Male",
    female: "Female",
    sendInterest: "Send Interest",
    accepted: "Accepted",
    pending: "Pending",
    rejected: "Rejected",
    noProfiles: "No profiles found.",
    otpTimer: "OTP expires in",
    rememberMe: "Remember me for 30 days",
    langName: "English",

    // New keys for complete translation of screens and questions
    "Choose Your Language": "Choose Your Language",
    "Select language to continue / भाषा चुनें / ભાષા પસંદ કરો": "Select language to continue / भाषा चुनें / ભાષા પસંદ કરો",
    "Profile For": "Profile For",
    "Full Name": "Full Name",
    "As per Aadhaar": "As per Aadhaar",
    "Gender": "Gender",
    "Date of Birth": "Date of Birth",
    "Time of Birth": "Time of Birth",
    "e.g. 04:30 PM": "e.g. 04:30 PM",
    "Place of Birth": "Place of Birth",
    "e.g. Palitana, Gujarat": "e.g. Palitana, Gujarat",
    "Rashi (Moon Sign)": "Rashi (Moon Sign)",
    "Height": "Height",
    "Mother Tongue": "Mother Tongue",
    "Religion": "Religion",
    "Caste / Sub-caste": "Caste / Sub-caste",
    "e.g. Dhobi, Madivala": "e.g. Dhobi, Madivala",
    "Hobbies / Interests": "Hobbies / Interests",
    "e.g. Reading, Music, Cooking": "e.g. Reading, Music, Cooking",
    "Highest Education": "Highest Education",
    "Institute / University": "Institute / University",
    "e.g. Gujarat University": "e.g. Gujarat University",
    "Job Type": "Job Type",
    "Annual Income": "Annual Income",
    "Dietary Habits": "Dietary Habits",
    "Physically Challenged": "Physically Challenged",
    "Marital Status": "Marital Status",
    "City, State": "City, State",
    "e.g. Ahmedabad, Gujarat": "e.g. Ahmedabad, Gujarat",
    "Mobile Number": "Mobile Number",
    "WhatsApp Number": "WhatsApp Number",
    "Social Media Links": "Social Media Links",
    "Father's Name": "Father's Name",
    "Father's Occupation": "Father's Occupation",
    "Mother's Name": "Mother's Name",
    "Mother's Occupation": "Mother's Occupation",
    "Contact Person Name": "Contact Person Name",
    "About Yourself": "About Yourself",
    "Briefly describe yourself, your family, and what you're looking for...": "Briefly describe yourself, your family, and what you're looking for...",
    "Profile Photo": "Profile Photo",
    "Select Government ID Type": "Select Government ID Type",
    "Upload Scan of ID Document": "Upload Scan of ID Document",
    "Aadhaar Card": "Aadhaar Card",
    "PAN Card": "PAN Card",
    "Driving License": "Driving License",
    "Ration Card": "Ration Card",
    "Create Profile": "Create Profile",
    "View Profile": "View Profile",
    "Personal Details": "Personal Details",
    "Social Details": "Social Details",
    "Educational Details": "Educational Details",
    "Professional Details": "Professional Details",
    "More Details": "More Details",
    "Contact Details (Consent Guarded)": "Contact Details (Consent Guarded)",
    "Email Address": "Email Address",
    "Social Links": "Social Links",
    "[Mutual Consent Accepted Required]": "[Mutual Consent Accepted Required]",
    "Send Interest Request": "Send Interest Request",
    "⏳ Interest Request Sent (Awaiting Accept)": "⏳ Interest Request Sent (Awaiting Accept)",
    "✓ Accept Interest": "✓ Accept Interest",
    "✕ Decline": "✕ Decline",
    "Open Matrimonial Chat": "Open Matrimonial Chat",
    "✕ Interest Request Declined": "✕ Interest Request Declined",
    "Send Interest 💌": "Send Interest 💌",
    "⚡ Action Needed": "⚡ Action Needed",
    "⏳ Pending Accept": "⏳ Pending Accept",
    "💬 Chat Active": "💬 Chat Active",
    "✕ Declined": "✕ Declined",
    "About": "About",
    "Welcome back,": "Welcome back,",
    "Browse Matches": "Browse Matches",
    "Bride Profiles for You": "Bride Profiles for You",
    "Groom Profiles for You": "Groom Profiles for You",
    "No approved profiles found yet. Check back soon!": "No approved profiles found yet. Check back soon!",
    "Received Interest Requests": "Received Interest Requests",
    "No pending interest requests received.": "No pending interest requests received.",
    "Sent Interest Status": "Sent Interest Status",
    "You haven't sent any interest requests yet.": "You haven't sent any interest requests yet.",
    "Search Profiles": "Search Profiles",
    "Search by name, location, caste...": "Search by name, location, caste...",
    "All Religions": "All Religions",
    "Messages": "Messages",
    "Chats are unlocked only after mutual consent approval.": "Chats are unlocked only after mutual consent approval.",
    "No active conversations yet. Send interest requests to matches, and chats will open once approved!": "No active conversations yet. Send interest requests to matches, and chats will open once approved!",
    "Tap to chat...": "Tap to chat...",
    "🛡️ Identity Verified": "🛡️ Identity Verified",
    "⏳ Verification Pending Admin Review": "⏳ Verification Pending Admin Review",
    "Uploaded Document Scan:": "Uploaded Document Scan:",
    "📄 Download Bio Data PDF": "📄 Download Bio Data PDF",
    "Delete My Profile": "Delete My Profile",
    "Need Help? Contact Us": "Need Help? Contact Us",
    "Type a message...": "Type a message...",
    "Ready for verification ✓": "Ready for verification ✓",
    "Remove": "Remove",
    "Go to Dashboard": "Go to Dashboard",
    "Documents Submitted!": "Documents Submitted!",
    "Your profile information and government ID have been securely uploaded to the admin panel for verification. Once verified by our administrators, your profile will be unlocked and you will gain full matchmaking and messaging access.": "Your profile information and government ID have been securely uploaded to the admin panel for verification. Once verified by our administrators, your profile will be unlocked and you will gain full matchmaking and messaging access.",
    "ℹ️ This process usually takes 24-48 hours. Your privacy and data are secure.": "ℹ️ This process usually takes 24-48 hours. Your privacy and data are secure.",
    "📞 Need Help? Contact Admin": "📞 Need Help? Contact Admin",
    "Male (Groom)": "Male (Groom)",
    "Female (Bride)": "Female (Bride)",
    "Myself": "Myself",
    "Son": "Son",
    "Daughter": "Daughter",
    "Brother": "Brother",
    "Sister": "Sister",
    "Relative": "Relative",
    "Gujarati": "Gujarati",
    "Hindi": "Hindi",
    "Marathi": "Marathi",
    "Punjabi": "Punjabi",
    "Bengali": "Bengali",
    "Tamil": "Tamil",
    "Telugu": "Telugu",
    "Kannada": "Kannada",
    "Malayalam": "Malayalam",
    "Other": "Other",
    "Hindu": "Hindu",
    "Muslim": "Muslim",
    "Sikh": "Sikh",
    "Christian": "Christian",
    "Buddhist": "Buddhist",
    "Jain": "Jain",
    "10th Pass": "10th Pass",
    "12th Pass": "12th Pass",
    "Diploma": "Diploma",
    "Bachelor's Degree": "Bachelor's Degree",
    "Master's Degree": "Master's Degree",
    "PhD": "PhD",
    "Business": "Business",
    "Private Job": "Private Job",
    "Govt Job": "Govt Job",
    "Doctor": "Doctor",
    "Engineer": "Engineer",
    "Lawyer": "Lawyer",
    "Teacher": "Teacher",
    "Homemaker": "Homemaker",
    "Less than ₹50,000": "Less than ₹50,000",
    "₹50,000 - ₹1,00,000": "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹5,00,000": "₹1,00,000 - ₹5,00,000",
    "₹5,00,000 - ₹10,00,000": "₹5,00,000 - ₹10,00,000",
    "Above ₹10,00,000": "Above ₹10,00,000",
    "Not Disclosed": "Not Disclosed",
    "Vegetarian": "Vegetarian",
    "Non-Vegetarian": "Non-Vegetarian",
    "Eggetarian": "Eggetarian",
    "Jain Vegetarian": "Jain Vegetarian",
    "Never Married": "Never Married",
    "Divorced": "Divorced",
    "Widowed": "Widowed",
    "Separated": "Separated",
    "No": "No",
    "Yes": "Yes",
    "Male": "Male",
    "Female": "Female",
    "Mesh (Aries)": "Mesh (Aries)",
    "Vrishabh (Taurus)": "Vrishabh (Taurus)",
    "Mithun (Gemini)": "Mithun (Gemini)",
    "Kark (Cancer)": "Kark (Cancer)",
    "Simha (Leo)": "Simha (Leo)",
    "Kanya (Virgo)": "Kanya (Virgo)",
    "Tula (Libra)": "Tula (Libra)",
    "Vrishchik (Scorpio)": "Vrishchik (Scorpio)",
    "Dhanu (Sagittarius)": "Dhanu (Sagittarius)",
    "Makar (Capricorn)": "Makar (Capricorn)",
    "Kumbha (Aquarius)": "Kumbha (Aquarius)",
    "Meena (Pisces)": "Meena (Pisces)",
    "📤 Upload Photo": "📤 Upload Photo",
    "📸 Use Camera": "📸 Use Camera",
    "🛑 Cancel Camera": "🛑 Cancel Camera",
    "🗑️ Remove Photo": "🗑️ Remove Photo",
    "📸 Capture Photo": "📸 Capture Photo",
    "Or Enter Photo URL": "Or Enter Photo URL",
    "Or click here to generate a simulated Demo ID Scan": "Or click here to generate a simulated Demo ID Scan",
    "Capture ID with Camera": "Capture ID with Camera",
    "Choose File or Drag & Drop": "Choose File or Drag & Drop",
    "Start the conversation with": "Start the conversation with",
    "Email Support": "Email Support",
    "backBtn": "← Back",
    "nextBtn": "Next →",
    "submitBtn": "Submit Profile",
    "Bride": "Bride",
    "Groom": "Groom",
    "Profiles for You": "Profiles for You",
    "PREMIUM": "PREMIUM",
    "Pending Response": "Pending Response",
    "Caste": "Caste",
    "Education": "Education",
    "Institute": "Institute",
    "Salary": "Salary",
    "Diet": "Diet",
    "ID Document Type": "ID Document Type",
    "Matrimonial Bio Data": "Matrimonial Bio Data",
    "Dhobi Community Matchmaking": "Dhobi Community Matchmaking",
    "Age": "Age",
    "Occupation": "Occupation",
    "Current Location": "Current Location",
    "Location": "Location",
    "Hobbies & Interests": "Hobbies & Interests",
    "Social & Family Background": "Social & Family Background",
    "Education & Career": "Education & Career",
    "Contact Information": "Contact Information",
    "Contact Person": "Contact Person",
    "Customize Matrimonial Bio-Data": "Customize Matrimonial Bio-Data",
    "Choose PDF Template Style": "Choose PDF Template Style",
    "Include Profile Photo in PDF": "Include Profile Photo in PDF",
    "Include Contact Details": "Include Contact Details",
    "Generate PDF": "Generate PDF",
    "Admin Console": "Admin Console",
    "Dashboard Overview": "Dashboard Overview",
    "Recent Profiles": "Recent Profiles",
    "Profile Picture": "Profile Picture",
    "Government ID Scan": "Government ID Scan",
    "No document uploaded": "No document uploaded",
    "Approve & Verify Profile": "Approve & Verify Profile",
    "Government ID Proof": "Government ID Proof",
    "REQUIRES VERIFICATION": "REQUIRES VERIFICATION",
    "Click to enlarge": "Click to enlarge",
    "Click outside the image to close": "Click outside the image to close",
    "All Genders": "All Genders",
    "All Status": "All Status",
    "Approved": "Approved",
    "Blocked": "Blocked",
    "Pending Verify": "Pending Verify",
    "Add New Profile": "Add New Profile",
    "Add Profile": "Add Profile",
    "Dhobi Metromani Portal": "Dhobi Matrimony Portal",
    "Navigation Menu": "Navigation Menu",
  },
  hi: {
    appName: "धोबी मैट्रिमोनी",
    appTagline: "धोबी समाज का विश्वसनीय वैवाहिक मंच",
    community: "धोबी समुदाय",
    selectLang: "अपनी भाषा चुनें",
    selectLangSub: "जारी रखने के लिए भाषा चुनें",
    continue: "जारी रखें",
    findPartner: "अपना जीवनसाथी खोजें",
    trustedBy: "हजारों धोबी परिवारों का विश्वास",
    emailLabel: "ईमेल पता",
    emailPlaceholder: "अपना ईमेल दर्ज करें",
    sendOtp: "OTP भेजें",
    otpLabel: "OTP कोड दर्ज करें",
    otpPlaceholder: "6-अंकीय कोड",
    verifyOtp: "सत्यापित करें और लॉगिन करें",
    resendOtp: "OTP दोबारा भेजें",
    adminLogin: "एडमिन लॉगिन",
    password: "पासवर्ड",
    loginBtn: "एडमिन के रूप में लॉगिन करें",
    backToUser: "यूज़र लॉगिन पर वापस जाएं",
    otpSent: "आपके ईमेल पर OTP भेजा गया।",
    networkError: "नेटवर्क त्रुटि। कृपया पुनः प्रयास करें।",
    invalidEmail: "कृपया एक वैध ईमेल पता दर्ज करें।",
    enterEmail: "एक ईमेल पता दर्ज करें",
    enterOtp: "6-अंकीय OTP कोड दर्ज करें",
    otpExpired: "OTP समाप्त हो गया। नया अनुरोध करें।",
    pendingTitle: "प्रोफ़ाइल समीक्षाधीन है",
    pendingMsg: "आपकी प्रोफ़ाइल जमा हो गई है और एडमिन द्वारा समीक्षा की जा रही है। स्वीकृति के बाद आपको सूचित किया जाएगा।",
    logout: "लॉगआउट",
    downloadBioData: "बायो-डेटा डाउनलोड करें",
    home: "होम",
    matches: "मिलान",
    interests: "रुचियाँ",
    messages: "संदेश",
    profile: "प्रोफ़ाइल",
    help: "सहायता",
    adminPanel: "एडमिन पैनल",
    users: "उपयोगकर्ता",
    reports: "रिपोर्ट",
    settings: "सेटिंग्स",
    approve: "स्वीकृत करें",
    reject: "अस्वीकार करें",
    block: "ब्लॉक करें",
    delete: "हटाएं",
    save: "सहेजें",
    cancel: "रद्द करें",
    search: "खोजें",
    filter: "फ़िल्टर",
    male: "पुरुष",
    female: "महिला",
    sendInterest: "रुचि भेजें",
    accepted: "स्वीकृत",
    pending: "प्रतीक्षारत",
    rejected: "अस्वीकृत",
    noProfiles: "कोई प्रोफ़ाइल नहीं मिली।",
    otpTimer: "OTP समाप्त होने में",
    rememberMe: "30 दिनों के लिए याद रखें",
    langName: "हिंदी",

    // New keys for complete translation of screens and questions
    "Choose Your Language": "अपनी भाषा चुनें",
    "Select language to continue / भाषा चुनें / ભાષા પસંદ કરો": "आगे बढ़ने के लिए भाषा चुनें",
    "Profile For": "प्रोफ़ाइल किसके लिए",
    "Full Name": "पूरा नाम",
    "As per Aadhaar": "आधार कार्ड के अनुसार",
    "Gender": "लिंग",
    "Date of Birth": "जन्म तिथि",
    "Time of Birth": "जन्म का समय",
    "e.g. 04:30 PM": "जैसे: शाम 04:30",
    "Place of Birth": "जन्म स्थान",
    "e.g. Palitana, Gujarat": "जैसे: पालिताना, गुजरात",
    "Rashi (Moon Sign)": "राशि (चंद्र राशि)",
    "Height": "कद (ऊंचाई)",
    "Mother Tongue": "मातृभाषा",
    "Religion": "धर्म",
    "Caste / Sub-caste": "जाति / उपजाति",
    "e.g. Dhobi, Madivala": "जैसे: धोबी, मदिवाला",
    "Hobbies / Interests": "शौक / रुचियां",
    "e.g. Reading, Music, Cooking": "जैसे: पढ़ना, संगीत, खाना बनाना",
    "Highest Education": "उच्चतम शिक्षा",
    "Institute / University": "संस्थान / विश्वविद्यालय",
    "e.g. Gujarat University": "जैसे: गुजरात विश्वविद्यालय",
    "Job Type": "कार्य का प्रकार",
    "Annual Income": "वार्षिक आय",
    "Dietary Habits": "खान-पान की आदतें",
    "Physically Challenged": "शारीरिक रूप से विकलांग",
    "Marital Status": "वैवाहिक स्थिति",
    "City, State": "शहर, राज्य",
    "e.g. Ahmedabad, Gujarat": "जैसे: अहमदाबाद, गुजरात",
    "Mobile Number": "मोबाइल नंबर",
    "WhatsApp Number": "व्हाट्सएप नंबर",
    "Social Media Links": "सोशल मीडिया लिंक",
    "Father's Name": "पिता का नाम",
    "Father's Occupation": "पिता का व्यवसाय",
    "Mother's Name": "माता का नाम",
    "Mother's Occupation": "माता का व्यवसाय",
    "Contact Person Name": "संपर्क व्यक्ति का नाम",
    "About Yourself": "अपने बारे में",
    "Briefly describe yourself, your family, and what you're looking for...": "संक्षेप में अपने बारे में, अपने परिवार और अपनी प्राथमिकताओं के बारे में लिखें...",
    "Profile Photo": "प्रोफ़ाइल फोटो",
    "Select Government ID Type": "सरकारी आईडी का प्रकार चुनें",
    "Upload Scan of ID Document": "आईडी दस्तावेज़ का स्कैन अपलोड करें",
    "Aadhaar Card": "आधार कार्ड",
    "PAN Card": "पैन कार्ड",
    "Driving License": "ड्राइविंग लाइसेंस",
    "Ration Card": "राशन कार्ड",
    "Create Profile": "प्रोफ़ाइल बनाएं",
    "View Profile": "प्रोफ़ाइल देखें",
    "Personal Details": "व्यक्तिगत विवरण",
    "Social Details": "सामाजिक विवरण",
    "Educational Details": "शैक्षिक विवरण",
    "Professional Details": "व्यावसायिक विवरण",
    "More Details": "अन्य विवरण",
    "Contact Details (Consent Guarded)": "संपर्क विवरण (सहमति आवश्यक)",
    "Email Address": "ईमेल पता",
    "Social Links": "सोशल मीडिया लिंक",
    "[Mutual Consent Accepted Required]": "[पारस्परिक सहमति की आवश्यकता है]",
    "Send Interest Request": "रुचि अनुरोध भेजें",
    "⏳ Interest Request Sent (Awaiting Accept)": "⏳ रुचि अनुरोध भेजा गया (स्वीकृति की प्रतीक्षा है)",
    "✓ Accept Interest": "✓ रुचि स्वीकार करें",
    "✕ Decline": "✕ अस्वीकार करें",
    "Open Matrimonial Chat": "वैवाहिक चैट खोलें",
    "✕ Interest Request Declined": "✕ रुचि अनुरोध अस्वीकृत",
    "Send Interest 💌": "रुचि भेजें 💌",
    "⚡ Action Needed": "⚡ कार्रवाई आवश्यक",
    "⏳ Pending Accept": "⏳ स्वीकृति लंबित",
    "💬 Chat Active": "💬 चैट सक्रिय",
    "✕ Declined": "✕ अस्वीकृत",
    "About": "परिचय",
    "Welcome back,": "वापस स्वागत है,",
    "Browse Matches": "मिलान ब्राउज़ करें",
    "Bride Profiles for You": "आपके लिए दुल्हन की प्रोफाइल",
    "Groom Profiles for You": "आपके लिए दूल्हे की प्रोफाइल",
    "No approved profiles found yet. Check back soon!": "अभी तक कोई स्वीकृत प्रोफाइल नहीं मिली। जल्द ही दोबारा देखें!",
    "Received Interest Requests": "प्राप्त रुचि अनुरोध",
    "No pending interest requests received.": "कोई लंबित रुचि अनुरोध प्राप्त नहीं हुआ।",
    "Sent Interest Status": "भेजे गए रुचि अनुरोधों की स्थिति",
    "You haven't sent any interest requests yet.": "आपने अभी तक कोई रुचि अनुरोध नहीं भेजा है।",
    "Search Profiles": "प्रोफ़ाइल खोजें",
    "Search by name, location, caste...": "नाम, स्थान, जाति द्वारा खोजें...",
    "All Religions": "सभी धर्म",
    "Messages": "संदेश",
    "Chats are unlocked only after mutual consent approval.": "चैट केवल दोनों तरफ से सहमति होने पर ही अनलॉक होती है।",
    "No active conversations yet. Send interest requests to matches, and chats will open once approved!": "अभी तक कोई सक्रिय बातचीत नहीं है। अन्य प्रोफाइलों को रुचि भेजें, स्वीकृति के बाद चैट शुरू होगी!",
    "Tap to chat...": "चैट करने के लिए टैप करें...",
    "🛡️ Identity Verified": "🛡️ पहचान सत्यापित",
    "⏳ Verification Pending Admin Review": "⏳ एडमिन समीक्षा के लिए सत्यापन लंबित",
    "Uploaded Document Scan:": "अपलोड किया गया आईडी स्कैन:",
    "📄 Download Bio Data PDF": "📄 बायो-डेटा PDF डाउनलोड करें",
    "Delete My Profile": "मेरी प्रोफ़ाइल हटाएं",
    "Need Help? Contact Us": "मदद चाहिए? संपर्क करें",
    "Type a message...": "संदेश लिखें...",
    "Ready for verification ✓": "सत्यापन के लिए तैयार ✓",
    "Remove": "हटाएं",
    "Go to Dashboard": "डैशबोर्ड पर जाएं",
    "Documents Submitted!": "दस्तावेज़ जमा हो गए!",
    "Your profile information and government ID have been securely uploaded to the admin panel for verification. Once verified by our administrators, your profile will be unlocked and you will gain full matchmaking and messaging access.": "आपकी प्रोफाइल जानकारी और सरकारी आईडी को सत्यापन के लिए सुरक्षित रूप से अपलोड कर दिया गया है। एडमिन द्वारा सत्यापित होने के बाद आपकी प्रोफाइल को अनलॉक किया जाएगा।",
    "ℹ️ This process usually takes 24-48 hours. Your privacy and data are secure.": "ℹ️ इस प्रक्रिया में आमतौर पर 24-48 घंटे लगते हैं। आपकी गोपनीयता और डेटा सुरक्षित हैं।",
    "📞 Need Help? Contact Admin": "📞 सहायता चाहिए? एडमिन से संपर्क करें",
    "Male (Groom)": "पुरुष (दूल्हा)",
    "Female (Bride)": "महिला (दुल्हन)",
    "Myself": "स्वयं",
    "Son": "पुत्र",
    "Daughter": "पुत्री",
    "Brother": "भाई",
    "Sister": "बहन",
    "Relative": "रिश्तेदार",
    "Gujarati": "गुजराती",
    "Hindi": "हिंदी",
    "Marathi": "मराठी",
    "Punjabi": "पंजाबी",
    "Bengali": "बंगाली",
    "Tamil": "तमिल",
    "Telugu": "तेलुगु",
    "Kannada": "कन्नड़",
    "Malayalam": "मलयालम",
    "Other": "अन्य",
    "Hindu": "हिंदू",
    "Muslim": "मुस्लिम",
    "Sikh": "सिख",
    "Christian": "ईसाई",
    "Buddhist": "बौद्ध",
    "Jain": "जैन",
    "10th Pass": "10वीं पास",
    "12th Pass": "12वीं पास",
    "Diploma": "डिप्लोमा",
    "Bachelor's Degree": "स्नातक",
    "Master's Degree": "स्नातकोत्तर",
    "PhD": "पीएचडी",
    "Business": "व्यवसाय / व्यापार",
    "Private Job": "प्राइवेट नौकरी",
    "Govt Job": "सरकारी नौकरी",
    "Doctor": "डॉक्टर",
    "Engineer": "इंजीनियर",
    "Lawyer": "वकील",
    "Teacher": "शिक्षक / शिक्षिका",
    "Homemaker": "गृहणी",
    "Less than ₹50,000": "₹50,000 से कम",
    "₹50,000 - ₹1,00,000": "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹5,00,000": "₹1,00,000 - ₹5,00,000",
    "₹5,00,000 - ₹10,00,000": "₹5,00,000 - ₹10,00,000",
    "Above ₹10,00,000": "₹10,00,000 से अधिक",
    "Not Disclosed": "प्रकट नहीं किया",
    "Vegetarian": "शाकाहारी",
    "Non-Vegetarian": "मांसाहारी",
    "Eggetarian": "अंडाहारी",
    "Jain Vegetarian": "जैन शाकाहारी",
    "Never Married": "अविवाहित",
    "Divorced": "तलाकशुदा",
    "Widowed": "विधवा / विधुर",
    "Separated": "अलग",
    "No": "नहीं",
    "Yes": "हाँ",
    "Male": "पुरुष",
    "Female": "महिला",
    "Mesh (Aries)": "मेष",
    "Vrishabh (Taurus)": "वृषभ",
    "Mithun (Gemini)": "मिथुन",
    "Kark (Cancer)": "कर्क",
    "Simha (Leo)": "सिंह",
    "Kanya (Virgo)": "कन्या",
    "Tula (Libra)": "तुला",
    "Vrishchik (Scorpio)": "वृश्चिक",
    "Dhanu (Sagittarius)": "धनु",
    "Makar (Capricorn)": "मकर",
    "Kumbha (Aquarius)": "कुंभ",
    "Meena (Pisces)": "मीन",
    "📤 Upload Photo": "📤 फोटो अपलोड करें",
    "📸 Use Camera": "📸 कैमरा उपयोग करें",
    "🛑 Cancel Camera": "🛑 कैमरा बंद करें",
    "🗑️ Remove Photo": "🗑️ फोटो हटाएं",
    "📸 Capture Photo": "📸 फोटो खींचे",
    "Or Enter Photo URL": "या फोटो का URL दर्ज करें",
    "Or click here to generate a simulated Demo ID Scan": "या डेमो आईडी स्कैन उत्पन्न करने के लिए यहां क्लिक करें",
    "Capture ID with Camera": "📷 कैमरा से ID कैप्चर करें",
    "Choose File or Drag & Drop": "फाइल चुनें या ड्रैग करें",
    "Start the conversation with": "बातचीत शुरू करें",
    "Email Support": "ईमेल सहायता",
    "backBtn": "← पीछे",
    "nextBtn": "आगे →",
    "submitBtn": "प्रोफ़ाइल जमा करें",
    "Bride": "वधू",
    "Groom": "वर",
    "Profiles for You": "आपके लिए प्रोफाइल",
    "PREMIUM": "प्रीमियम",
    "Pending Response": "प्रतिक्रिया लंबित",
    "Caste": "जाति",
    "Education": "शिक्षा",
    "Institute": "संस्थान",
    "Salary": "वेतन",
    "Diet": "आहार",
    "ID Document Type": "ID दस्तावेज़ प्रकार",
    "Matrimonial Bio Data": "वैवाहिक बायो डेटा",
    "Dhobi Community Matchmaking": "धोबी समाज विवाह मंच",
    "Age": "आयु",
    "Occupation": "व्यवसाय",
    "Current Location": "वर्तमान स्थान",
    "Location": "स्थान",
    "Hobbies & Interests": "शौक और रुचियां",
    "Social & Family Background": "सामाजिक और पारिवारिक पृष्ठभूमि",
    "Education & Career": "शिक्षा और करियर",
    "Contact Information": "संपर्क जानकारी",
    "Contact Person": "संपर्क व्यक्ति",
    "Customize Matrimonial Bio-Data": "वैवाहिक बायो-डेटा अनुकूलित करें",
    "Choose PDF Template Style": "पीडीएफ टेम्पलेट शैली चुनें",
    "Include Profile Photo in PDF": "पीडीएफ में प्रोफाइल फोटो शामिल करें",
    "Include Contact Details": "संपर्क विवरण शामिल करें",
    "Generate PDF": "पीडीएफ जनरेट करें",
    "Admin Console": "एडमिन कंसोल",
    "Dashboard Overview": "डैशबोर्ड अवलोकन",
    "Recent Profiles": "हाल की प्रोफाइल",
    "Profile Picture": "प्रोफ़ाइल चित्र",
    "Government ID Scan": "सरकारी आईडी स्कैन",
    "No document uploaded": "कोई दस्तावेज़ अपलोड नहीं किया गया",
    "Approve & Verify Profile": "प्रोफ़ाइल स्वीकृत और सत्यापित करें",
    "Government ID Proof": "सरकारी आईडी प्रमाण",
    "REQUIRES VERIFICATION": "सत्यापन आवश्यक",
    "Click to enlarge": "बड़ा करने के लिए क्लिक करें",
    "Click outside the image to close": "बंद करने के लिए छवि के बाहर क्लिक करें",
    "All Genders": "सभी लिंग",
    "All Status": "सभी स्थिति",
    "Approved": "स्वीकृत",
    "Blocked": "ब्लॉक किया गया",
    "Pending Verify": "लंबित सत्यापन",
    "Add New Profile": "नई प्रोफाइल जोड़ें",
    "Add Profile": "प्रोफाइल जोड़ें",
    "Dhobi Metromani Portal": "धोबी मैट्रिमोनी पोर्टल",
    "Navigation Menu": "नेविगेशन मेनू",
  },
  gu: {
    appName: "ધોબી મેટ્રીમોની",
    appTagline: "ધોબી સમાજ માટે વિશ્વસનીય વૈવાહિક મંચ",
    community: "ધોબી સમુદાય",
    selectLang: "તમારી ભાષા પસંદ કરો",
    selectLangSub: "આગળ વધવા માટે ભાષા પસંદ કરો",
    continue: "આગળ વધો",
    findPartner: "તમારો જીવનસાથી શોધો",
    trustedBy: "હજારો ધોબી પરિવારોનો વિશ્વાસ",
    emailLabel: "ઇમેઇલ સરનામું",
    emailPlaceholder: "તમારો ઇમેઇલ દાખલ કરો",
    sendOtp: "OTP મોકલો",
    otpLabel: "OTP કોડ દાખલ કરો",
    otpPlaceholder: "6-અંકનો કોડ",
    verifyOtp: "ચકાસો અને લૉગઇન કરો",
    resendOtp: "OTP ફરીથી મોકલો",
    adminLogin: "એડમિન લૉગઇન",
    password: "પાસવર્ડ",
    loginBtn: "એડમિન તરીકે લૉગઇન કરો",
    backToUser: "યૂઝર લૉગઇન પર પાછા જાઓ",
    otpSent: "તમારા ઇમેઇલ પર OTP મોકલ્યો.",
    networkError: "नेटवर्क त्रुटि. कृपया पुनः प्रयास करें.",
    invalidEmail: "કૃપા કરીને માન્ય ઇમેઇલ સરનામું દાખલ કરો.",
    enterEmail: "ઇમેઇલ સરનામું દાખલ કરો",
    enterOtp: "6-અંકનો OTP કોડ દાખલ કરો",
    otpExpired: "OTP સમાપ્ત. નવો OTP માંગો.",
    pendingTitle: "પ્રોફાઇલ સમીક્ષા હેઠળ",
    pendingMsg: "તમારી પ્રોફાઇલ સબમિટ થઈ ગઈ છે અને એડમિન દ્વારા સમીક્ષા કરવામાં આવી રહી છે. મંજૂરી મળ્યા પછી સૂચિત કરવામાં આવશે.",
    logout: "લૉગ આઉટ",
    downloadBioData: "બાયો-ડેટા ડાઉનલોડ કરો",
    home: "હોમ",
    matches: "મેળ",
    interests: "રુચિઓ",
    messages: "સંદેશ",
    profile: "પ્રોફાઇલ",
    help: "સહાય",
    adminPanel: "એડમિન પેનલ",
    users: "વપરાશકર્તા",
    reports: "અહેવાલ",
    settings: "સેટિંગ્સ",
    approve: "મંજૂર કરો",
    reject: "નામંજૂર કરો",
    block: "બ્લૉક કરો",
    delete: "કાઢી નાખો",
    save: "સાચવો",
    cancel: "રદ કરો",
    search: "શોધો",
    filter: "ફિલ્ટર",
    male: "પુરુષ",
    female: "સ્ત્રી",
    sendInterest: "રુચિ મોકલો",
    accepted: "સ્વીકૃત",
    pending: "પ્રતીક્ષારત",
    rejected: "નામંજૂર",
    noProfiles: "કોઈ પ્રોફાઇલ મળ્યા નહીં.",
    otpTimer: "OTP સમાપ્ત થવાનો સમય",
    rememberMe: "30 દિવસ માટે યાદ રાખો",
    langName: "ગુજરાતી",

    // New keys for complete translation of screens and questions
    "Choose Your Language": "તમારી ભાષા પસંદ કરો",
    "Select language to continue / भाषा चुनें / ભાષા પસંદ કરો": "આગળ વધવા માટે ભાષા પસંદ કરો",
    "Profile For": "પ્રોફાઇલ કોના માટે",
    "Full Name": "પૂરું નામ",
    "As per Aadhaar": "આધાર મુજબ",
    "Gender": "જાતિ",
    "Date of Birth": "જન્મ તારીખ",
    "Time of Birth": "જન્મ સમય",
    "e.g. 04:30 PM": "દા.ત. 04:30 PM",
    "Place of Birth": "જન્મ સ્થળ",
    "e.g. Palitana, Gujarat": "દા.ત. પાલીતાણા, ગુજરાત",
    "Rashi (Moon Sign)": "રાશિ (ચંદ્ર રાશિ)",
    "Height": "ઊંચાઈ",
    "Mother Tongue": "માતૃભાષા",
    "Religion": "ધર્મ",
    "Caste / Sub-caste": "જ્ઞાતિ / પેટા-જ્ઞાતિ",
    "e.g. Dhobi, Madivala": "દા.ત. ધોબી, મદિવાલા",
    "Hobbies / Interests": "શોખ / રુચિઓ",
    "e.g. Reading, Music, Cooking": "દા.ત. વાંચન, સંગીત, રસોઈ",
    "Highest Education": "ઉચ્ચતમ શિક્ષણ",
    "Institute / University": "સંસ્થા / યુનિવર્સિટી",
    "e.g. Gujarat University": "દા.ત. ગુજરાત યુનિવર્સિટી",
    "Job Type": "નોકરીનો પ્રકાર",
    "Annual Income": "વાર્ષિક આવક",
    "Dietary Habits": "ખાનપાનની આદતો",
    "Physically Challenged": "શારીરિક રીતે અક્ષમ",
    "Marital Status": "વૈવાહિક સ્થિતિ",
    "City, State": "શહેર, રાજ્ય",
    "e.g. Ahmedabad, Gujarat": "દા.ત. અમદાવાદ, ગુજરાત",
    "Mobile Number": "મોબાઇલ નંબર",
    "WhatsApp Number": "વોટ્સએપ નંબર",
    "Social Media Links": "સોશિયલ મીડિયા લિંક્સ",
    "Father's Name": "પિતાનું નામ",
    "Father's Occupation": "પિતાનો વ્યવસાય",
    "Mother's Name": "માતાનું નામ",
    "Mother's Occupation": "માતાનો વ્યવસાય",
    "Contact Person Name": "સંપર્ક વ્યક્તિનું નામ",
    "About Yourself": "તમારા વિશે",
    "Briefly describe yourself, your family, and what you're looking for...": "ટૂંકમાં તમારા વિશે, તમારા પરિવાર વિશે અને તમે કેવો જીવનસાથી શોધો છો તેનું વર્ણન કરો...",
    "Profile Photo": "પ્રોફાઇલ ફોટો",
    "Select Government ID Type": "સરકારી ID નો પ્રકાર પસંદ કરો",
    "Upload Scan of ID Document": "ID દસ્તાવેજનું સ્કેન અપલોડ કરો",
    "Aadhaar Card": "આધાર કાર્ડ",
    "PAN Card": "પાન કાર્ડ",
    "Driving License": "ડ્રાઇવિંગ લાઇસન્સ",
    "Ration Card": "રેશન કાર્ડ",
    "Create Profile": "પ્રોફાઇલ બનાવો",
    "View Profile": "પ્રોફાઇલ જુઓ",
    "Personal Details": "અંગત વિગતો",
    "Social Details": "સામાજિક વિગતો",
    "Educational Details": "શૈક્ષણિક વિગતો",
    "Professional Details": "વ્યાવસાયિક વિગતો",
    "More Details": "વધુ વિગતો",
    "Contact Details (Consent Guarded)": "સંપર્ક વિગતો (સંમતિ સુરક્ષિત)",
    "Email Address": "ઇમેઇલ સરનામું",
    "Social Links": "સોશિયલ લિંક્સ",
    "[Mutual Consent Accepted Required]": "[પરસ્પર સંમતિ સ્વીકારવી જરૂરી છે]",
    "Send Interest Request": "રુચિ વિનંતી મોકલો",
    "⏳ Interest Request Sent (Awaiting Accept)": "⏳ રુચિ વિનંતી મોકલી (સ્વીકૃતિની રાહ છે)",
    "✓ Accept Interest": "✓ રુચિ સ્વીકારો",
    "✕ Decline": "✕ નકારો",
    "Open Matrimonial Chat": "ચેટ શરૂ કરો",
    "✕ Interest Request Declined": "✕ રુચિ વિનંતી નકારી",
    "Send Interest 💌": "રુચિ મોકલો 💌",
    "⚡ Action Needed": "⚡ ક્રિયા જરૂરી",
    "⏳ Pending Accept": "⏳ સ્વીકૃતિ બાકી",
    "💬 Chat Active": "💬 ચેટ સક્રિય",
    "✕ Declined": "✕ નકારેલ",
    "About": "વિશે",
    "Welcome back,": "ફરી સ્વાગત,",
    "Browse Matches": "મેળ શોધો",
    "Bride Profiles for You": "તમારા માટે કન્યાની પ્રોફાઇલ્સ",
    "Groom Profiles for You": "તમારા માટે વરની પ્રોફાઇલ્સ",
    "No approved profiles found yet. Check back soon!": "હજી સુધી કોઈ મંજૂર પ્રોફાઇલ મળી નથી. થોડા સમય પછી ફરી જુઓ!",
    "Received Interest Requests": "મળેલ રુચિ વિનંતીઓ",
    "No pending interest requests received.": "કોઈ નવી રુચિ વિનંતી મળી નથી.",
    "Sent Interest Status": "મોકલેલ રુચિ વિનંતીઓની સ્થિતિ",
    "You haven't sent any interest requests yet.": "તમે હજી સુધી કોઈ રુચિ વિનંતી મોકલી નથી.",
    "Search Profiles": "પ્રોફાઇલ શોધો",
    "Search by name, location, caste...": "નામ, સ્થાન અથવા જ્ઞાતિ દ્વારા શોધો...",
    "All Religions": "બધા ધર્મ",
    "Messages": "સંદેશ",
    "Chats are unlocked only after mutual consent approval.": "ચેટ ફક્ત બંને તરફથી સંમતિ મળ્યા પછી જ અનલૉક થાય છે.",
    "No active conversations yet. Send interest requests to matches, and chats will open once approved!": "હજુ સુધી કોઈ સક્રિય વાતચીત નથી. અન્ય પ્રોફાઇલ્સને રુચિ વિનંતી મોકલો, સ્વીકૃતિ પછી ચેટ શરૂ થશે!",
    "Tap to chat...": "વાત કરવા માટે ટેપ કરો...",
    "🛡️ Identity Verified": "🛡️ ઓળખ ચકાસાયેલ છે",
    "⏳ Verification Pending Admin Review": "⏳ એડમિન ચકાસણી બાકી છે",
    "Uploaded Document Scan:": "અપલોડ કરેલ દસ્તાવેજ:",
    "📄 Download Bio Data PDF": "📄 બાયો-ડેટા PDF ડાઉનલોડ કરો",
    "Delete My Profile": "મારી પ્રોફાઇલ કાઢી નાખો",
    "Need Help? Contact Us": "મદદ જોઈતી હોય તો સંપર્ક કરો",
    "Type a message...": "સંદેશ લખો...",
    "Ready for verification ✓": "ચકાસણી માટે તૈયાર ✓",
    "Remove": "કાઢી નાખો",
    "Go to Dashboard": "ડેશબોર્ડ પર જાઓ",
    "Documents Submitted!": "દસ્તાવેજો સબમિટ થયા!",
    "Your profile information and government ID have been securely uploaded to the admin panel for verification. Once verified by our administrators, your profile will be unlocked and you will gain full matchmaking and messaging access.": "તમારી પ્રોફાઇલ માહિતી અને સરકારી ID ચકાસણી માટે સુરક્ષિત રીતે અપલોડ કરવામાં આવ્યા છે. એડમિન દ્વારા ચકાસણી થયા પછી તમારી પ્રોફાઇલ અનલૉક કરવામાં આવશે.",
    "ℹ️ This process usually takes 24-48 hours. Your privacy and data are secure.": "ℹ️ આ પ્રક્રિયામાં સામાન્ય રીતે ૨૪ થી ૪૮ કલાક લાગે છે. તમારી ગોપનીયતા અને માહિતી સુરક્ષિત છે.",
    "📞 Need Help? Contact Admin": "📞 મદદ જોઈતી હોય તો સંપર્ક કરો",
    "Male (Groom)": "પુરુષ (વર)",
    "Female (Bride)": "સ્ત્રી (કન્યા)",
    "Myself": "પોતે",
    "Son": "દીકરો",
    "Daughter": "દીકરી",
    "Brother": "ભાઈ",
    "Sister": "બહેન",
    "Relative": "સગા-સંબંધી",
    "Gujarati": "ગુજરાતી",
    "Hindi": "હિન્દી",
    "Marathi": "મરાઠી",
    "Punjabi": "પંજાબી",
    "Bengali": "બંગાળી",
    "Tamil": "તમિલ",
    "Telugu": "તેલુગુ",
    "Kannada": "કન્નડ",
    "Malayalam": "મલયાલમ",
    "Other": "અન્ય",
    "Hindu": "હિન્દુ",
    "Muslim": "મુસલમાન",
    "Sikh": "શીખ",
    "Christian": "ખ્રિસ્તી",
    "Buddhist": "બૌદ્ધ",
    "Jain": "જૈન",
    "10th Pass": "10 પાસ",
    "12th Pass": "12 પાસ",
    "Diploma": "ડિપ્લોમા",
    "Bachelor's Degree": "બેચલર ડિગ્રી",
    "Master's Degree": "માસ્ટર ડિગ્રી",
    "PhD": "પીએચડી",
    "Business": "વ્યવસાય / વેપાર",
    "Private Job": "પ્રાઇવેટ નોકરી",
    "Govt Job": "સરકારી નોકરી",
    "Doctor": "ડોક્ટર",
    "Engineer": "એન્જિનિયર",
    "Lawyer": "વકીલ",
    "Teacher": "શિક્ષક",
    "Homemaker": "ગૃહિણી",
    "Less than ₹50,000": "₹50,000 થી ઓછી",
    "₹50,000 - ₹1,00,000": "₹50,000 - ₹1,00,000",
    "₹1,00,000 - ₹5,00,000": "₹1,00,000 - ₹5,00,000",
    "₹5,00,000 - ₹10,00,000": "₹5,00,000 - ₹10,00,000",
    "Above ₹10,00,000": "આવક ₹10,00,000 થી વધુ",
    "Not Disclosed": "જાહેર નથી કર્યું",
    "Vegetarian": "શાકાહારી",
    "Non-Vegetarian": "માન્સાહારી",
    "Eggetarian": "ઇંડા ખાનાર",
    "Jain Vegetarian": "જૈન શાકાહારી",
    "Never Married": "અપરિણીત",
    "Divorced": "છૂટાછેડા લીધેલ",
    "Widowed": "વિધવા / વિધુર",
    "Separated": "અલગ રહેતા",
    "No": "ના",
    "Yes": "હા",
    "Male": "પુરુષ",
    "Female": "સ્ત્રી",
    "Mesh (Aries)": "મેષ",
    "Vrishabh (Taurus)": "વૃષભ",
    "Mithun (Gemini)": "મિથુન",
    "Kark (Cancer)": "કર્ક",
    "Simha (Leo)": "સિંહ",
    "Kanya (Virgo)": "કન્યા",
    "Tula (Libra)": "તુલા",
    "Vrishchik (Scorpio)": "વૃશ્ચિક",
    "Dhanu (Sagittarius)": "ધનુ",
    "Makar (Capricorn)": "મકર",
    "Kumbha (Aquarius)": "કુંભ",
    "Meena (Pisces)": "મીન",
    "📤 Upload Photo": "📤 ફોટો અપલોડ કરો",
    "📸 Use Camera": "📸 કેમેરા વાપરો",
    "🛑 Cancel Camera": "🛑 કેમેરા બંધ કરો",
    "🗑️ Remove Photo": "🗑️ ફોટો કાઢી નાખો",
    "📸 Capture Photo": "📸 ફોટો પાડો",
    "Or Enter Photo URL": "અથવા ફોટો URL દાખલ કરો",
    "Or click here to generate a simulated Demo ID Scan": "અથવા ડેમો ID સ્કેન બનાવવા અહીં ક્લિક કરો",
    "Capture ID with Camera": "📷 કેમેરાથી ID કેપ્ચર કરો",
    "Choose File or Drag & Drop": "ફાઇલ પસંદ કરો અથવા ડ્રેગ કરો",
    "Start the conversation with": "વાતચીત શરૂ કરો",
    "Email Support": "ઇમેઇલ સપોર્ટ",
    "backBtn": "← પાછા",
    "nextBtn": "આગળ →",
    "submitBtn": "પ્રોફાઇલ સબમિટ કરો",
    "Bride": "કન્યા",
    "Groom": "વર",
    "Profiles for You": "તમારા માટે પ્રોફાઇલ્સ",
    "PREMIUM": "પ્રીમિયમ",
    "Caste": "જાતિ",
    "Education": "શિક્ષણ",
    "Institute": "સંસ્થા",
    "Salary": "પગાર",
    "Diet": "આહાર",
    "ID Document Type": "ID દસ્તાવેજ પ્રકાર",
    "Matrimonial Bio Data": "વૈવાહિક બાયો ડેટા",
    "Dhobi Community Matchmaking": "ધોબી સમાજ લગ્ન મંચ",
    "Age": "ઉંમર",
    "Occupation": "વ્યવસાય",
    "Current Location": "વર્તમાન સ્થાન",
    "Location": "સ્થાન",
    "Hobbies & Interests": "શોખ અને રુચિઓ",
    "Social & Family Background": "સામાજિક અને પારિવારિક પૃષ્ઠભૂમિ",
    "Education & Career": "શિક્ષણ અને કારકિર્દી",
    "Contact Information": "સંપર્ક માહિતી",
    "Contact Person": "સંપર્ક વ્યક્તિ",
    "Customize Matrimonial Bio-Data": "વૈવાહિક બાયો-ડેટા કસ્ટમાઇઝ કરો",
    "Choose PDF Template Style": "પીડીએફ નમૂનાની શૈલી પસંદ કરો",
    "Include Profile Photo in PDF": "પીડીએફમાં પ્રોફાઇલ ફોટો શામેલ કરો",
    "Include Contact Details": "સંપર્ક વિગતો શામેલ કરો",
    "Generate PDF": "પીડીએફ બનાવો",
    "Admin Console": "એડમિન કન્સોલ",
    "Dashboard Overview": "ડેશબોર્ડ ઝાંખી",
    "Recent Profiles": "તાજેતરની પ્રોફાઇલ્સ",
    "Profile Picture": "પ્રોફાઇલ ચિત્ર",
    "Government ID Scan": "સરકારી ID સ્કેન",
    "No document uploaded": "કોઈ દસ્તાવેજ અપલોડ કરવામાં આવ્યો નથી",
    "Approve & Verify Profile": "પ્રોફાઇલ મંજૂર કરો અને ચકાસો",
    "Government ID Proof": "સરકારી ID પુરાવા",
    "REQUIRES VERIFICATION": "ચકાસણીની જરૂર છે",
    "Click to enlarge": "મોટું કરવા માટે ક્લિક કરો",
    "Click outside the image to close": "બંધ કરવા માટે છબીની બહાર ક્લિક કરો",
    "All Genders": "બધી જાતિઓ",
    "All Status": "બધી સ્થિતિ",
    "Approved": "મંજૂર",
    "Blocked": "અવરોધિત",
    "Pending Verify": "ચકાસણી બાકી છે",
    "Add New Profile": "નવી પ્રોફાઇલ ઉમેરો",
    "Add Profile": "પ્રોફાઇલ ઉમેરો",
    "Dhobi Metromani Portal": "ધોબી મેત્રીમોની પોર્ટલ",
    "Navigation Menu": "નેવિગેશન મેનૂ",
  },
};

// ─── LANGUAGE CONTEXT ─────────────────────────────────────────────────────────
type LangCode = "en" | "hi" | "gu";
const LanguageContext = createContext<{ lang: LangCode; t: (k: string) => string; setLang: (l: LangCode) => void }>({
  lang: "en",
  t: (k) => k,
  setLang: () => {},
});
const useLang = () => useContext(LanguageContext);

// ─── DEFAULT CONFIGS ──────────────────────────────────────────────────────────
export const DEFAULT_AVATAR = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='100' height='100'><rect width='24' height='24' fill='%23f3f4f6'/><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z' fill='%23a1a1aa'/></svg>";

export const downloadBioDataPdf = async (user: any, options: { template?: string; showPhoto?: boolean; showContact?: boolean; symbolText?: string } = {}) => {
  const {
    template = "classic",
    showPhoto = true,
    showContact = true,
    symbolText = "|| Shri Ganeshay Namah ||"
  } = options;

  // Dynamically import jsPDF and autoTable for reliable mobile+desktop PDF download
  const jsPDFModule = await import("jspdf") as any;
  const jsPDF = jsPDFModule.jsPDF || (jsPDFModule.default && jsPDFModule.default.jsPDF) || jsPDFModule.default;

  const primaryColor: [number, number, number] = template === "royal" ? [139, 0, 0] : template === "modern" ? [26, 26, 26] : [139, 0, 0];
  const accentColor: [number, number, number] = [200, 150, 12];

  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const margin = 15;
  let y = margin;

  // ── Header ──────────────────────────────────────────────────────────────────
  // Outer border
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(1.2);
  doc.rect(margin - 5, margin - 5, pageW - 2 * (margin - 5), 275);

  // Inner border (gold)
  doc.setDrawColor(...accentColor);
  doc.setLineWidth(0.5);
  doc.rect(margin - 2, margin - 2, pageW - 2 * (margin - 2), 269);

  y += 8;

  // Religious symbol
  if (symbolText) {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...accentColor);
    doc.text(symbolText.replace(/[^\x00-\x7F]/g, "|| Shri Ganeshay Namah ||"), pageW / 2, y, { align: "center" });
    y += 7;
  }

  // Title
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.setTextColor(...primaryColor);
  doc.text("Matrimonial Bio Data", pageW / 2, y, { align: "center" });
  y += 6;

  // Subtitle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(9);
  doc.setTextColor(...accentColor);
  doc.text("DHOBI COMMUNITY MATCHMAKING", pageW / 2, y, { align: "center" });
  y += 2;

  // Divider line
  doc.setDrawColor(...primaryColor);
  doc.setLineWidth(0.8);
  doc.line(margin, y, pageW - margin, y);
  y += 8;

  // ── Photo block ───────────────────────────────────────────────────────
  const startPhotoY = y;
  let photoBlockHeight = 0;
  if (showPhoto) {
    const firstPhoto = Array.isArray(user.photos) && user.photos.length > 0 ? user.photos[0] : user.profilePhoto;
    const photosToRender = firstPhoto ? [firstPhoto] : [];
    if (photosToRender.length > 0) {
      try {
        const photoWidth = photosToRender.length === 1 ? 38 : 30;
        const photoHeight = photosToRender.length === 1 ? 48 : 38;
        const startX = pageW - margin - (photosToRender.length > 1 ? (photoWidth * 2 + 5) : photoWidth);
        let currentX = startX;
        let currentY = y;
        
        photosToRender.slice(0, 4).forEach((photo: string, idx: number) => {
          doc.setDrawColor(...primaryColor);
          doc.setLineWidth(0.5);
          doc.rect(currentX, currentY, photoWidth, photoHeight);
          doc.addImage(photo, "JPEG", currentX + 1, currentY + 1, photoWidth - 2, photoHeight - 2);
          
          if (photosToRender.length > 1 && idx % 2 === 0) {
            currentX += photoWidth + 5;
          } else {
            currentX = startX;
            if (photosToRender.length > 1 && idx !== 3) {
                currentY += photoHeight + 5;
            }
          }
        });
        photoBlockHeight = photosToRender.length > 1 ? (photoHeight * 2 + 5) : photoHeight;
      } catch (e) { /* skip photo if error */ }
    }
  }

  // Name & Verification Badge
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.setTextColor(...primaryColor);
  doc.text(user.name || "—", margin, y + 8);
  
  if (user.status === "approved") {
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(0, 102, 0); // Green
    doc.text("✓ Identity Verified", margin, y + 16);
    y += 22;
  } else {
    y += 16;
  }

  // Gender & Age
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(60, 60, 60);
  const genderAge = `${user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "—"}  |  Age: ${user.age || "—"}  |  ${user.maritalStatus || "—"}`;
  doc.text(genderAge, margin, y);
  y += 6;
  doc.text(user.location || "", margin, y);
  y += 10;

  // Ensure 'y' clears the photo block before starting sections
  y = Math.max(y, startPhotoY + photoBlockHeight + 10);

  // ── Section helper ───────────────────────────────────────────────────────────
  const drawSection = (title: string, rows: [string, string][]) => {
    if (y > 250) { doc.addPage(); y = margin + 5; }
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(...primaryColor);
    doc.text(title.toUpperCase(), margin, y);
    y += 1;
    doc.setDrawColor(...accentColor);
    doc.setLineWidth(0.4);
    doc.line(margin, y, pageW - margin, y);
    y += 5;

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9.5);
    for (const [label, val] of rows) {
      if (!val || val === "—" || val === "-") continue;
      if (y > 268) { doc.addPage(); y = margin + 5; }
      doc.setTextColor(100, 100, 100);
      doc.text(label + ":", margin, y);
      doc.setTextColor(20, 20, 20);
      doc.setFont("helvetica", "bold");
      doc.text(String(val), margin + 55, y);
      doc.setFont("helvetica", "normal");
      y += 6;
    }
    y += 4;
  };

  // ── Sections ─────────────────────────────────────────────────────────────────
  const dobStr = user.dob
    ? new Date(user.dob).toLocaleDateString("en-IN", { day: "2-digit", month: "long", year: "numeric" })
    : "—";

  drawSection("Personal Details", [
    ["Full Name", user.name || "—"],
    ["Gender", user.gender ? user.gender.charAt(0).toUpperCase() + user.gender.slice(1) : "—"],
    ["Date of Birth", dobStr],
    ["Time of Birth", user.timeOfBirth || "—"],
    ["Place of Birth", user.placeOfBirth || "—"],
    ["Rashi (Moon Sign)", user.rashi || "—"],
    ["Age", user.age ? `${user.age} Years` : "—"],
    ["Height", user.height || "—"],
    ["Marital Status", user.maritalStatus || "—"],
    ["Dietary Habits", user.diet || "—"],
    ["Mother Tongue", user.motherTongue || "—"],
    ["Hobbies & Interests", user.hobbies || "—"],
  ]);

  drawSection("Social & Family Background", [
    ["Religion", user.religion || "—"],
    ["Caste / Sub-caste", user.caste || "—"],
    ["Father's Name", user.fatherName || "—"],
    ["Father's Occupation", user.fatherOccupation || "—"],
    ["Mother's Name", user.motherName || "—"],
    ["Mother's Occupation", user.motherOccupation || "—"],
  ]);

  drawSection("Education & Career", [
    ["Highest Education", user.education || "—"],
    ["Institute / University", user.institute || "—"],
    ["Occupation", user.jobType || "—"],
    ["Annual Income", user.salary || "—"],
  ]);

  if (showContact) {
    drawSection("Contact Information", [
      ["Contact Person", user.contactPerson || "—"],
      ["Current Location", user.location || "—"],
      ["Email Address", user.email || "—"],
      ["Mobile Number", user.phone || "—"],
      ["WhatsApp Number", user.whatsapp || "—"],
      ["Social Media", user.socialLinks || "—"],
    ]);
  }

  if (user.about) {
    drawSection("About", [["About Candidate", user.about]]);
  }

  // ── Footer ────────────────────────────────────────────────────────────────────
  const footerY = 282;
  doc.setFontSize(7.5);
  doc.setTextColor(150, 150, 150);
  doc.text("This bio data was generated via Dhobi Samaj Matrimony Portal. All information is subject to verification.", pageW / 2, footerY, { align: "center" });

  // ── Save / Download ───────────────────────────────────────────────────────────
  const fileName = `${(user.name || "BioData").replace(/\s+/g, "_")}_Dhobi_Matrimony.pdf`;
  if (Capacitor.isNativePlatform()) {
    try {
      const pdfBase64 = doc.output('datauristring').split(',')[1];
      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: pdfBase64,
        directory: Directory.Documents,
        recursive: true
      });
      await FileOpener.open({
        filePath: savedFile.uri,
        contentType: 'application/pdf',
        openWithDefault: true
      });
    } catch (e) {
      console.error("Error saving/opening pdf", e);
      alert("Failed to open PDF. Please check your storage permissions.");
    }
  } else {
    doc.save(fileName);
  }
};



// ─── COLORS & THEME ──────────────────────────────────────────────────────────
// Jeevansathi-inspired: white/light gray base, deep maroon accent, gold highlights
const C = {
  primary: "#8B0000",
  primaryLight: "#a30000",
  gold: "#C8960C",
  goldLight: "#f0c040",
  bg: "#f7f7f7",
  white: "#ffffff",
  card: "#ffffff",
  border: "#e8e0e0",
  text: "#1a1a1a",
  muted: "#666666",
  subtle: "#999999",
  success: "#16a34a",
  error: "#dc2626",
  warning: "#d97706",
  pending: "#7c3aed",
};

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const calcAge = (dob) => {
  if (!dob) return "";
  const diff = Date.now() - new Date(dob).getTime();
  return Math.floor(diff / (365.25 * 24 * 60 * 60 * 1000));
};
const fmtDate = (s) => s ? new Date(s).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "N/A";

// ─── ICONS ────────────────────────────────────────────────────────────────────
const Ic = ({ n, s = 18, c = "currentColor" }) => {
  const p = {
    heart: <><path fill={c} d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></>,
    search: <><circle cx="11" cy="11" r="8" stroke={c} fill="none" strokeWidth="2"/><line x1="21" y1="21" x2="16.65" y2="16.65" stroke={c} strokeWidth="2"/></>,
    bell: <><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={c} fill="none" strokeWidth="1.8"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={c} fill="none" strokeWidth="1.8"/></>,
    user: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke={c} fill="none" strokeWidth="2"/><circle cx="12" cy="7" r="4" stroke={c} fill="none" strokeWidth="2"/></>,
    users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" stroke={c} fill="none" strokeWidth="2"/><circle cx="9" cy="7" r="4" stroke={c} fill="none" strokeWidth="2"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" stroke={c} fill="none" strokeWidth="2"/></>,
    chat: <><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" stroke={c} fill="none" strokeWidth="2"/></>,
    home: <><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" stroke={c} fill="none" strokeWidth="2"/><polyline points="9 22 9 12 15 12 15 22" stroke={c} fill="none" strokeWidth="2"/></>,
    back: <><polyline points="15 18 9 12 15 6" stroke={c} fill="none" strokeWidth="2"/></>,
    check: <><polyline points="20 6 9 17 4 12" stroke={c} fill="none" strokeWidth="2.5"/></>,
    x: <><line x1="18" y1="6" x2="6" y2="18" stroke={c} strokeWidth="2"/><line x1="6" y1="6" x2="18" y2="18" stroke={c} strokeWidth="2"/></>,
    send: <><line x1="22" y1="2" x2="11" y2="13" stroke={c} strokeWidth="2"/><polygon points="22 2 15 22 11 13 2 9 22 2" stroke={c} fill="none" strokeWidth="2"/></>,
    edit: <><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke={c} fill="none" strokeWidth="2"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke={c} fill="none" strokeWidth="2"/></>,
    trash: <><polyline points="3 6 5 6 21 6" stroke={c} fill="none" strokeWidth="2"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke={c} fill="none" strokeWidth="2"/></>,
    plus: <><line x1="12" y1="5" x2="12" y2="19" stroke={c} strokeWidth="2"/><line x1="5" y1="12" x2="19" y2="12" stroke={c} strokeWidth="2"/></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke={c} fill="none" strokeWidth="2"/></>,
    pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke={c} fill="none" strokeWidth="2"/><circle cx="12" cy="10" r="3" stroke={c} fill="none" strokeWidth="2"/></>,
    star: <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" fill={c}/></>,
    chart: <><line x1="18" y1="20" x2="18" y2="10" stroke={c} strokeWidth="2"/><line x1="12" y1="20" x2="12" y2="4" stroke={c} strokeWidth="2"/><line x1="6" y1="20" x2="6" y2="14" stroke={c} strokeWidth="2"/></>,
    flag: <><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" stroke={c} fill="none" strokeWidth="2"/><line x1="4" y1="22" x2="4" y2="15" stroke={c} strokeWidth="2"/></>,
    logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" stroke={c} fill="none" strokeWidth="2"/><polyline points="16 17 21 12 16 7" stroke={c} fill="none" strokeWidth="2"/><line x1="21" y1="12" x2="9" y2="12" stroke={c} strokeWidth="2"/></>,
    phone: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.5a16 16 0 0 0 6.61 6.61l.92-.92a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" stroke={c} fill="none" strokeWidth="2"/></>,
    crown: <><path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7zM4 19h16" stroke={c} fill="none" strokeWidth="2"/></>,
    sliders: <><line x1="4" y1="21" x2="4" y2="14" stroke={c} strokeWidth="2"/><line x1="4" y1="10" x2="4" y2="3" stroke={c} strokeWidth="2"/><line x1="12" y1="21" x2="12" y2="12" stroke={c} strokeWidth="2"/><line x1="12" y1="8" x2="12" y2="3" stroke={c} strokeWidth="2"/><line x1="20" y1="21" x2="20" y2="16" stroke={c} strokeWidth="2"/><line x1="20" y1="12" x2="20" y2="3" stroke={c} strokeWidth="2"/><line x1="1" y1="14" x2="7" y2="14" stroke={c} strokeWidth="2"/><line x1="9" y1="8" x2="15" y2="8" stroke={c} strokeWidth="2"/><line x1="17" y1="16" x2="23" y2="16" stroke={c} strokeWidth="2"/></>,
    info: <><circle cx="12" cy="12" r="10" stroke={c} fill="none" strokeWidth="2"/><line x1="12" y1="16" x2="12" y2="12" stroke={c} strokeWidth="2"/><line x1="12" y1="8" x2="12.01" y2="8" stroke={c} strokeWidth="3"/></>,
  };
  return <svg width={s} height={s} viewBox="0 0 24 24">{p[n]}</svg>;
};

// ─── BUTTON COMPONENT ────────────────────────────────────────────────────────
const Btn = ({ children, onClick, variant = "primary", size = "md", full = false, disabled = false, style: sx = {} }: any) => {
  const sizes = { sm: { padding: "6px 14px", fontSize: 12 }, md: { padding: "10px 20px", fontSize: 14 }, lg: { padding: "13px 28px", fontSize: 15 } };
  const variants = {
    primary: { background: C.primary, color: "#fff", border: `1px solid ${C.primary}` },
    outline: { background: "transparent", color: C.primary, border: `1.5px solid ${C.primary}` },
    gold: { background: `linear-gradient(135deg, ${C.gold}, ${C.goldLight})`, color: "#fff", border: "none" },
    ghost: { background: "transparent", color: C.muted, border: "1px solid #ddd" },
    danger: { background: C.error, color: "#fff", border: `1px solid ${C.error}` },
    success: { background: C.success, color: "#fff", border: `1px solid ${C.success}` },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...sizes[size], ...variants[variant],
        borderRadius: 8, fontWeight: 600, cursor: disabled ? "not-allowed" : "pointer",
        width: full ? "100%" : "auto", opacity: disabled ? 0.6 : 1,
        fontFamily: "'Segoe UI', sans-serif", display: "inline-flex", alignItems: "center",
        justifyContent: "center", gap: 6, transition: "all .15s", ...sx,
      }}
    >{children}</button>
  );
};

// ─── INPUT COMPONENT ─────────────────────────────────────────────────────────
const Input = ({ label, value, onChange, placeholder, type = "text", required, style: sx = {} }: any) => {
  const { t } = useLang();
  return (
    <div style={{ marginBottom: 14, ...sx }}>
      {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5 }}>{t(label)}{required && <span style={{ color: C.error }}> *</span>}</label>}
      <input
        type={type} value={value} onChange={onChange} placeholder={placeholder ? t(placeholder) : placeholder}
        style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, color: C.text, outline: "none", fontFamily: "'Segoe UI', sans-serif", background: C.white, transition: "border .15s" }}
        onFocus={e => e.target.style.borderColor = C.primary}
        onBlur={e => e.target.style.borderColor = C.border}
      />
    </div>
  );
};

const Select = ({ label, value, onChange, options, required, style: sx = {} }: any) => {
  const { t } = useLang();
  return (
    <div style={{ marginBottom: 14, ...sx }}>
      {label && <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5 }}>{t(label)}{required && <span style={{ color: C.error }}> *</span>}</label>}
      <select
        value={value} onChange={onChange}
        style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, color: C.text, outline: "none", fontFamily: "'Segoe UI', sans-serif", background: C.white, cursor: "pointer" }}
      >
        {options.map(o => <option key={o.value} value={o.value}>{t(o.label)}</option>)}
      </select>
    </div>
  );
};

// ─── BIODATA CUSTOMIZATION MODAL ──────────────────────────────────────────
function BioDataModal({ user, onClose }: any) {
  const { t } = useLang();
  const [template, setTemplate] = useState("classic");
  const [showPhoto, setShowPhoto] = useState(true);
  const [showContact, setShowContact] = useState(true);
  const [symbolText, setSymbolText] = useState("|| Shri Ganeshay Namah ||");

  const handleDownload = async () => {
    try {
      await downloadBioDataPdf(user, { template, showPhoto, showContact, symbolText });
      onClose();
    } catch (err) {
      console.error("BioData PDF error:", err);
      alert("Failed to generate PDF. Please try again. " + err.message);
    }
  };

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0, 0, 0, 0.6)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 99999, padding: 20
    }}>
      <div style={{
        background: C.white, borderRadius: 20, padding: 24,
        maxWidth: 420, width: "100%", 
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
        fontFamily: "'Segoe UI', sans-serif"
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.primary, fontFamily: "Georgia, serif" }}>{t("Customize Matrimonial Bio-Data")}</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted, padding: 4 }}>
            <Ic n="x" s={20} c={C.muted} />
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 24 }}>
          {/* Template Selection */}
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 8 }}>{t("Choose PDF Template Style")}</label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 10 }}>
              {[
                { id: "classic", label: "Classic Maroon", desc: "Maroon & Gold" },
                { id: "modern", label: "Modern Minimal", desc: "Clean & Simple" },
                { id: "royal", label: "Royal Cream", desc: "Antique Ivory" }
              ].map(t => {
                const isSelected = template === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTemplate(t.id)}
                    style={{
                      padding: "12px 8px",
                      borderRadius: 10,
                      border: `2px solid ${isSelected ? C.primary : C.border}`,
                      background: isSelected ? `${C.primary}08` : C.white,
                      cursor: "pointer",
                      textAlign: "center",
                      transition: "all 0.15s"
                    }}
                  >
                    <div style={{ fontSize: 12, fontWeight: 700, color: isSelected ? C.primary : C.text }}>{t.label}</div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{t.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Symbol Text */}
          <Input
            label="Header Title / Religious Symbol"
            value={symbolText}
            onChange={(e: any) => setSymbolText(e.target.value)}
            placeholder="e.g. 🌸 || श्री गणेशाय नमः || 🌸"
          />

          {/* Toggles */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={showPhoto}
                onChange={e => setShowPhoto(e.target.checked)}
                style={{ width: 18, height: 18, cursor: "pointer" }}
              />
              <span style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>{t("Include Profile Photo in PDF")}</span>
            </label>
            <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={showContact}
                onChange={e => setShowContact(e.target.checked)}
                style={{ width: 18, height: 18, cursor: "pointer" }}
              />
              <span style={{ fontSize: 13, color: C.text, fontWeight: 600 }}>{t("Include Contact Details")}</span>
            </label>
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <Btn onClick={onClose} variant="ghost" full>Cancel</Btn>
          <Btn onClick={handleDownload} variant="primary" full><Ic n="crown" s={16} c="#fff" /> {t("Generate PDF")}</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── TOAST ───────────────────────────────────────────────────────────────────
function Toast({ msg, type }) {
  if (!msg) return null;
  const colors = { success: "#ecfdf5", error: "#fef2f2", info: "#eff6ff", warning: "#fffbeb" };
  const tc = { success: C.success, error: C.error, info: "#1d4ed8", warning: C.warning };
  return (
    <div style={{ position: "fixed", top: 16, left: "50%", transform: "translateX(-50%)", zIndex: 9999, background: colors[type] || colors.info, color: tc[type] || tc.info, border: `1px solid ${tc[type] || tc.info}30`, borderRadius: 10, padding: "12px 20px", fontSize: 13, fontWeight: 600, fontFamily: "'Segoe UI', sans-serif", boxShadow: "0 4px 20px rgba(0,0,0,0.15)", maxWidth: 360, whiteSpace: "nowrap" }}>
      {msg}
    </div>
  );
}

function useToast() {
  const [toast, setToast] = useState({ msg: "", type: "info" });
  const show = (msg, type = "info") => { setToast({ msg, type }); setTimeout(() => setToast({ msg: "", type: "info" }), 3000); };
  return [toast, show];
}

// ═══════════════════════════════════════════════════════════════════════════
// ─── EMAIL OTP LOGIN SCREEN ───────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════
function EmailLoginScreen({ users, onUserLogin, onAdminLogin }) {
  const { t } = useLang();
  const isUrlAdmin = window.location.search.includes("panel=admin") || window.location.pathname.endsWith("/admin");
  const [step, setStep] = useState("email"); // email | otp
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [adminMode, setAdminMode] = useState(isUrlAdmin);
  const [adminPass, setAdminPass] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Timer states
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [cooldown, setCooldown] = useState(0); // Resend cooldown in seconds

  useEffect(() => {
    if (step !== "otp" || timeLeft <= 0) return;
    const interval = setInterval(() => {
      setTimeLeft(t => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [step, timeLeft]);

  useEffect(() => {
    if (cooldown <= 0) return;
    const interval = setInterval(() => {
      setCooldown(c => c - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [cooldown]);

  const sendOTP = async () => {
    setError("");
    setSuccessMsg("");
    if (!email) { setError(t("enterEmail")); return; }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isPhone = /^[0-9+\-\s()]{10,15}$/.test(email.replace(/[^0-9+]/g, ''));
    if (!isPhone && !emailRegex.test(email)) {
      setError("Please enter a valid email address or phone number.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_BASE_URL + "/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        setStep("otp");
        setTimeLeft(300); // Reset countdown
        setCooldown(60); // Set resend cooldown
        if (data.otp) {
          setOtp(data.otp);
          setSuccessMsg(`OTP sent to email. [Debug Mode: Auto-filled ${data.otp}]`);
        } else {
          setSuccessMsg(t("otpSent"));
        }
      } else {
        setError(data.message || "Failed to send OTP.");
      }
    } catch (err) {
      setLoading(false);
      setError(t("networkError"));
    }
  };

  const verifyOTP = async () => {
    setError("");
    setSuccessMsg("");
    if (!otp || otp.length !== 6) { setError(t("enterOtp")); return; }

    if (timeLeft <= 0) {
      setError(t("otpExpired"));
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_BASE_URL + "/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, rememberMe })
      });
      const data = await res.json();
      setLoading(false);

      if (data.success && data.verified) {
        setSuccessMsg("OTP verified successfully.");
        localStorage.setItem("token", data.token);
        onUserLogin({ isNew: data.isNew, email, user: data.user });
      } else {
        setError(data.message || "Invalid OTP.");
      }
    } catch (err) {
      setLoading(false);
      setError(t("networkError"));
    }
  };

  const adminLogin = () => {
    setError("");
    setLoading(true);
    fetch(API_BASE_URL + "/api/auth/admin-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: adminPass })
    })
      .then(res => res.json())
      .then(data => {
        setLoading(false);
        if (data.success && data.token) {
          localStorage.setItem("token", data.token);
          onAdminLogin();
        } else {
          setError(data.message || "Invalid admin credentials.");
        }
      })
      .catch(err => {
        setLoading(false);
        setError(t("networkError"));
      });
  };

  const sendAdminOTP = async () => {
    setError(""); setSuccessMsg(""); setLoading(true);
    try {
      const res = await fetch(API_BASE_URL + "/api/auth/admin-forgot-password-otp", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        setStep("admin-reset");
        setSuccessMsg(data.message);
      } else {
        setError(data.error || "Failed to send OTP.");
      }
    } catch(e) { setLoading(false); setError("Network error"); }
  };

  const resetAdminPassword = async () => {
    setError(""); setSuccessMsg(""); setLoading(true);
    try {
      const res = await fetch(API_BASE_URL + "/api/auth/admin-reset-password", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newEmail, newPassword })
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        setSuccessMsg("Admin credentials updated successfully. Please log in.");
        setStep("email");
        setAdminPass("");
      } else {
        setError(data.error || "Failed to reset password.");
      }
    } catch(e) { setLoading(false); setError("Network error"); }
  };

  const fmtTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  return (
    <div className="dhobi-app-shell" style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ background: C.primary, padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 }}>💍</div>
        <div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase" }}>{t("community")}</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: "#fff", fontFamily: "Georgia, serif", letterSpacing: 0.5 }}>{t("appName")}</div>
        </div>
      </div>

      {/* Hero Banner */}
      <div style={{ background: `linear-gradient(135deg, ${C.primary} 0%, #5a0000 100%)`, padding: "28px 24px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 8 }}>🌸</div>
        <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, fontFamily: "Georgia, serif", marginBottom: 4 }}>{t("findPartner")}</div>
        <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>{t("trustedBy")}</div>
      </div>

      <div style={{ flex: 1, padding: "24px 20px", maxWidth: 440, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        {/* Mode toggle - only shown on web, not in APK, not on admin panel */}
        {!window.location.search.includes("panel=admin") && !window.location.pathname.endsWith("/admin") && !Capacitor.isNativePlatform() && (
          <div style={{ display: "flex", background: "#f0f0f0", borderRadius: 10, padding: 4, marginBottom: 24 }}>
            {[["Login / Verify", false], [t("adminLogin"), true]].map(([label, isAdmin]) => (
              <button key={label as string} onClick={() => { setAdminMode(isAdmin as boolean); setError(""); setSuccessMsg(""); setStep("email"); }}
                style={{ flex: 1, padding: "8px 12px", borderRadius: 8, border: "none", fontWeight: 600, fontSize: 13, cursor: "pointer", transition: "all .2s", background: adminMode === isAdmin ? "#fff" : "transparent", color: adminMode === isAdmin ? C.primary : C.muted, boxShadow: adminMode === isAdmin ? "0 1px 6px rgba(0,0,0,0.1)" : "none" }}>
                {label as string}
              </button>
            ))}
          </div>
        )}
        {!adminMode ? (
          <div>

            {step === "email" ? (
              <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>{t("sendOtp")}</div>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Enter your Email Address or Phone Number</div>
                <div style={{ marginBottom: 14 }}>
                  <Input label="Email or Phone Number" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@example.com or +919999999999" required />
                </div>
                {error && <div style={{ color: C.error, fontSize: 12, marginBottom: 10 }}>{error}</div>}
                <Btn onClick={sendOTP} variant="primary" full disabled={loading} size="lg">
                  {loading ? "..." : t("sendOtp")}
                </Btn>
              </div>
            ) : (
              <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
                <button onClick={() => { setStep("email"); setOtp(""); setError(""); setSuccessMsg(""); }} style={{ background: "none", border: "none", cursor: "pointer", color: C.primary, display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, marginBottom: 16, padding: 0 }}>
                  <Ic n="back" s={16} c={C.primary} /> Back
                </button>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.text, marginBottom: 4 }}>{t("verifyOtp")}</div>
                <div style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>OTP sent to {email}</div>
                
                <div style={{ marginBottom: 14 }}>
                  <Input label={t("otpLabel")} value={otp} onChange={e => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} placeholder={t("otpPlaceholder")} required />
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
                  <input 
                    type="checkbox" 
                    id="remember-me" 
                    checked={rememberMe} 
                    onChange={e => setRememberMe(e.target.checked)} 
                    style={{ cursor: "pointer", width: 15, height: 15 }} 
                  />
                  <label htmlFor="remember-me" style={{ fontSize: 13, color: C.muted, cursor: "pointer", userSelect: "none" }}>
                    {t("rememberMe")}
                  </label>
                </div>

                {/* Expiry Countdown */}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.muted, marginBottom: 14 }}>
                  <span>{t("otpTimer")}: <strong style={{ color: timeLeft <= 60 ? C.error : C.text }}>{fmtTime(timeLeft)}</strong></span>
                </div>

                {successMsg && <div style={{ color: C.success, fontSize: 12, marginBottom: 10, fontWeight: 600 }}>{successMsg}</div>}
                {error && <div style={{ color: C.error, fontSize: 12, marginBottom: 10 }}>{error}</div>}
                
                <Btn onClick={verifyOTP} variant="primary" full size="lg" disabled={loading || timeLeft <= 0}>{t("verifyOtp")}</Btn>
                
                <button onClick={sendOTP} disabled={cooldown > 0 || loading} style={{ background: "none", border: "none", cursor: cooldown > 0 ? "not-allowed" : "pointer", color: cooldown > 0 ? C.subtle : C.primary, fontSize: 13, fontWeight: 600, width: "100%", marginTop: 12, padding: 8 }}>
                  {cooldown > 0 ? `${t("resendOtp")} ${cooldown}s` : t("resendOtp")}
                </button>
              </div>
            )}
          </div>
        ) : (
          <div style={{ background: C.white, borderRadius: 16, padding: 24, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ textAlign: "center", marginBottom: 20 }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: `${C.primary}15`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 10px" }}>
                <Ic n="shield" s={24} c={C.primary} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: C.text }}>{t("adminLogin")}</div>
            </div>
            <Input label={t("emailLabel")} value={email} onChange={e => setEmail(e.target.value)} placeholder={t("emailPlaceholder")} />
            <Input label={t("password")} type="password" value={adminPass} onChange={e => setAdminPass(e.target.value)} placeholder={t("password")} />
            {error && <div style={{ color: C.error, fontSize: 12, marginBottom: 10 }}>{error}</div>}
            <Btn onClick={adminLogin} variant="primary" full size="lg"><Ic n="shield" s={16} c="#fff" /> {t("loginBtn")}</Btn>
          </div>
        )}
      </div>

      {/* ── Help & Contact Footer ── */}
      <div style={{ padding: "20px 20px 32px", maxWidth: 440, margin: "0 auto", width: "100%", boxSizing: "border-box" }}>
        <div style={{ background: C.white, borderRadius: 16, border: `1px solid ${C.border}`, padding: 18, boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}>
          <div style={{ textAlign: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 22, marginBottom: 4 }}>📞</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: C.text }}>Need Help or Have Questions?</div>
            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Our team is here to assist you. Contact us anytime.</div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <a href="tel:+919173446708" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#fef9f0", borderRadius: 10, border: `1px solid ${C.gold}40`, textDecoration: "none" }}>
              <span style={{ width: 36, height: 36, borderRadius: "50%", background: `${C.gold}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📱</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Rohit Parmar</div>
                <div style={{ fontSize: 11, color: C.muted }}>Platform Manager</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>+91 91734 46708</div>
            </a>
            <a href="tel:+916353606165" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#fef9f0", borderRadius: 10, border: `1px solid ${C.gold}40`, textDecoration: "none" }}>
              <span style={{ width: 36, height: 36, borderRadius: "50%", background: `${C.gold}20`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>📱</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Ved Parmar</div>
                <div style={{ fontSize: 11, color: C.muted }}>Technical Support</div>
              </div>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.primary }}>+91 6353606165</div>
            </a>
            <a href="mailto:vedp9429@gmail.com" style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: "#f0f4ff", borderRadius: 10, border: "1px solid #c7d2fe", textDecoration: "none" }}>
              <span style={{ width: 36, height: 36, borderRadius: "50%", background: "#e0e7ff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>✉️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: C.text }}>Email Us</div>
                <div style={{ fontSize: 11, color: C.muted }}>For queries & feedback</div>
              </div>
              <div style={{ fontSize: 12, fontWeight: 700, color: "#4f46e5" }}>vedp9429@gmail.com</div>
            </a>
          </div>
          {/* WhatsApp buttons */}
          <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
            <a href="https://wa.me/919173446708" target="_blank" rel="noreferrer"
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#25d366", color: "#fff", padding: "10px 0", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 12 }}>
              📲 WhatsApp Rohit
            </a>
            <a href="https://wa.me/916353606165" target="_blank" rel="noreferrer"
              style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, background: "#25d366", color: "#fff", padding: "10px 0", borderRadius: 10, textDecoration: "none", fontWeight: 700, fontSize: 12 }}>
              📲 WhatsApp Ved
            </a>
          </div>
        </div>
        <div style={{ textAlign: "center", fontSize: 11, color: C.subtle, marginTop: 14 }}>Dhobi Matrimony Portal © 2025 • Dhobi Community Matrimonial</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// ─── REGISTRATION SCREEN ──────────────────────────────────────────────────
// ═══════════════════════════════════════════════════════════════════════════
function RegistrationScreen({ email, initialData, onComplete, onBack }: any) {
  const { t } = useLang();
  const [step, setStep] = useState(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [form, setForm] = useState(initialData ? {
    ...initialData,
    photos: Array.isArray(initialData.photos) && initialData.photos.length === 4 ? initialData.photos : [initialData.profilePhoto || "", "", "", ""]
  } : {
    email, name: "", gender: "male", dob: "", height: "5'4\"",
    profileFor: "Myself", motherTongue: "Gujarati", religion: "Hindu", caste: "Dhobi",
    education: "Bachelor's Degree", institute: "",
    jobType: "Business", salary: "₹1,00,000 - ₹5,00,000",
    diet: "Vegetarian", challenged: "No", maritalStatus: "Never Married",
    location: "", about: "",
    profilePhoto: "",
    photos: ["" , "", "", ""] as string[], // 4 mandatory photos
    governmentIdType: "Aadhaar Card",
    governmentIdUrl: "",
    phone: "",
    whatsapp: "",
    socialLinks: "",
    timeOfBirth: "",
    placeOfBirth: "",
    rashi: "",
    hobbies: "",
    fatherName: "",
    fatherOccupation: "",
    motherName: "",
    motherOccupation: "",
    contactPerson: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [toast, showToast] = useToast();
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [activeStream, setActiveStream] = useState<MediaStream | null>(null);

  const [isScanning, setIsScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [scanMessage, setScanMessage] = useState("");
  const [scanError, setScanError] = useState("");

  // ─── NATIVE CAMERA (Android APK) via @capacitor/camera ───
  const takeNativePhoto = async (target: "profile" | "id") => {
    try {
      const photo = await Camera.getPhoto({
        quality: 85,
        allowEditing: false,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,
        correctOrientation: true,
        width: 800,
        height: 800,
      });

      if (photo.dataUrl) {
        if (target === "profile") {
          f("profilePhoto", photo.dataUrl);
          showToast("Profile photo captured!", "success");
        } else {
          runVerificationScan(photo.dataUrl);
        }
      }
    } catch (err: any) {
      const msg = err?.message || String(err);
      if (msg.includes("User cancelled") || msg.includes("cancelled")) {
        // User just pressed back — no error needed
        return;
      }
      if (msg.includes("permission") || msg.includes("denied")) {
        showToast(
          "Camera permission denied. Please allow camera access in your device Settings → Apps → Dhobi Matrimony → Permissions.",
          "error"
        );
      } else if (msg.includes("Camera is not available") || msg.includes("No camera")) {
        showToast("Camera is not available on this device.", "error");
      } else {
        showToast("Could not capture photo. Please try again or upload a file instead.", "error");
      }
    }
  };

  // ─── WEB CAMERA (Desktop browser) via getUserMedia ───
  const startCamera = async () => {
    if (Capacitor.isNativePlatform()) {
      // On native, open device camera directly
      await takeNativePhoto("profile");
      return;
    }
    // Web fallback: show inline video preview
    setShowCamera(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" } });
      setActiveStream(stream);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      showToast("Could not access camera. Please check permissions.", "error");
      setShowCamera(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement("canvas");
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/jpeg");
        f("profilePhoto", dataUrl);
        showToast("Profile photo captured!", "success");
      }
      stopCamera();
    }
  };

  const stopCamera = () => {
    if (activeStream) {
      activeStream.getTracks().forEach(track => track.stop());
      setActiveStream(null);
    }
    setShowCamera(false);
  };

  // ─── NATIVE ID SCAN CAMERA ───
  const startIdCamera = async () => {
    if (Capacitor.isNativePlatform()) {
      await takeNativePhoto("id");
      return;
    }
    // On web, trigger the file input instead
    const input = document.getElementById("id-file-upload") as HTMLInputElement;
    if (input) input.click();
  };

  useEffect(() => {
    return () => {
      if (activeStream) {
        activeStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [activeStream]);

  const handlePhotoUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      f("profilePhoto", base64);
      showToast("Profile photo uploaded successfully!", "success");
    };
    reader.onerror = () => {
      showToast("Failed to read file.", "error");
    };
    reader.readAsDataURL(file);
  };

  const steps = [
    { title: t("stepBasic"), icon: "👤" },
    { title: t("stepSocial"), icon: "🏛️" },
    { title: t("stepEdu"), icon: "🎓" },
    { title: t("stepPersonal"), icon: "📋" },
    { title: t("stepAbout"), icon: "📍" },
    { title: t("stepVerif"), icon: "🆔" },
  ];

  const runVerificationScan = async (dataUrl: string) => {
    // ── SECURITY GATE 1: Valid image format ──
    if (!dataUrl || !dataUrl.startsWith("data:image/")) {
      showToast("Invalid file. Upload a clear JPG/PNG scan of your government ID.", "error");
      setScanError("❌ Invalid image: Please upload a proper JPG or PNG scan of your government ID.");
      return;
    }
    // ── SECURITY GATE 2: ID type must be selected ──
    if (!form.governmentIdType) {
      showToast("Select your Government ID Type first.", "error");
      setScanError("⚠️ Please select your Government ID Type (Aadhaar / PAN / Driving License / Ration Card) before uploading.");
      return;
    }
    // ── SECURITY GATE 3: Profile photo must be present ──
    if (!form.profilePhoto) {
      showToast("Upload your profile photo (Step 4) before scanning ID.", "error");
      setScanError("🔒 Security Gate: Your profile photo is required for face-matching. Please go back to Step 4 and upload your photo first.");
      return;
    }
    // ── SECURITY GATE 4: Age from DOB must be 18+ ──
    if (form.dob) {
      const ageVal = Number(calcAge(form.dob));
      if (!isNaN(ageVal) && ageVal < 18) {
        showToast("Age Restriction: Must be 18+ to register.", "error");
        setScanError(`🚫 Security Check Failed: Your date of birth indicates you are ${ageVal} years old. This platform is strictly for adults aged 18 and above.`);
        return;
      }
    }

    setIsScanning(true);
    setScanStep(0);
    setScanError("");
    f("governmentIdUrl", "");
    setScanMessage("🔍 Initializing AI Face Recognition Engine...");

    try {
      const faceapi = await import("@vladmandic/face-api");

      const MODEL_URL = "https://cdn.jsdelivr.net/npm/@vladmandic/face-api/model";

      setScanStep(0);
      setScanMessage("📦 Loading face recognition neural network models...");

      if (!(faceapi.nets as any).tinyFaceDetector.isLoaded)
        await (faceapi.nets as any).tinyFaceDetector.loadFromUri(MODEL_URL);
      if (!(faceapi.nets as any).faceLandmark68TinyNet.isLoaded)
        await (faceapi.nets as any).faceLandmark68TinyNet.loadFromUri(MODEL_URL);
      if (!(faceapi.nets as any).faceRecognitionNet.isLoaded)
        await (faceapi.nets as any).faceRecognitionNet.loadFromUri(MODEL_URL);
      if (!(faceapi.nets as any).ageGenderNet.isLoaded)
        await (faceapi.nets as any).ageGenderNet.loadFromUri(MODEL_URL);

      setScanStep(1);
      setScanMessage("👤 AI Scanner: Detecting face in your ID document...");

      const loadImg = (src: string): Promise<HTMLImageElement> =>
        new Promise((res, rej) => {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.onload = () => res(img);
          img.onerror = rej;
          img.src = src;
        });

      const detectorOpts = new (faceapi as any).TinyFaceDetectorOptions({ inputSize: 512, scoreThreshold: 0.4 });

      // Detect face in ID photo
      const idImg = await loadImg(dataUrl);
      const idDetection = await (faceapi as any)
        .detectSingleFace(idImg, detectorOpts)
        .withFaceLandmarks(true)
        .withFaceDescriptor();

      if (!idDetection) {
        setIsScanning(false);
        setScanError("❌ Could not detect a clear face in your ID document. Please upload a better scan.");
        return;
      }

      setScanStep(2);
      setScanMessage("🔎 AI Scanner: Detecting face & age in your profile photo...");

      const profileImg = await loadImg(form.profilePhoto);
      const profileDetection = await (faceapi as any)
        .detectSingleFace(profileImg, detectorOpts)
        .withFaceLandmarks(true)
        .withAgeAndGender()
        .withFaceDescriptor();

      if (!profileDetection) {
        setIsScanning(false);
        setScanError("❌ Could not detect a clear face in your profile photo. Please upload a better photo.");
        return;
      }
      
      const estimatedAge = Math.round(profileDetection.age);
      if (estimatedAge < 18) {
        setIsScanning(false);
        setScanError(`🚫 AI Age Check Failed: You appear to be around ${estimatedAge} years old. Must be 18+ to register.`);
        return;
      }

      setScanStep(3);
      setScanMessage("✅ AI Scanner: Computing face similarity score...");

      const distance = (faceapi as any).euclideanDistance(
        idDetection.descriptor,
        profileDetection.descriptor
      );
      const confidence = Math.round(Math.max(0, (1 - distance)) * 100);
      const MATCH_THRESHOLD = 0.6;

      await new Promise(r => setTimeout(r, 800));

      if (distance > MATCH_THRESHOLD) {
        setIsScanning(false);
        setScanError(`❌ Face Match Failed! Confidence is too low (${confidence}%). The person in the ID does not match the profile photo.`);
        return;
      }

      setIsScanning(false);
      f("governmentIdUrl", dataUrl);
      showToast(`✅ Verified! Age: ${estimatedAge}, Face Match: ${confidence}%`, "success");

    } catch (scanErr) {
      console.warn("Face-API verification failed:", scanErr);
      setIsScanning(false);
      setScanError("❌ Security Check Failed: Unable to run AI face and age verification. Please ensure you are connected to the internet.");
    }

  };

  const handleFileUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = e.target?.result as string;
      runVerificationScan(base64);
    };
    reader.onerror = () => {
      showToast("Failed to read file.", "error");
    };
    reader.readAsDataURL(file);
  };

  const generateDemoIdScan = () => {
    const canvas = document.createElement("canvas");
    canvas.width = 400;
    canvas.height = 250;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#f3f4f6";
      ctx.fillRect(0, 0, 400, 250);
      
      ctx.fillStyle = C.primary;
      ctx.fillRect(0, 0, 400, 45);
      
      ctx.fillStyle = "#ffffff";
      ctx.font = "bold 14px sans-serif";
      ctx.fillText("DHOBI MATRIMONY VERIFIED ID", 15, 26);
      
      ctx.fillStyle = C.text;
      ctx.font = "bold 13px sans-serif";
      ctx.fillText(`${form.governmentIdType || "GOVERNMENT ID CARD"}`, 15, 80);
      
      ctx.font = "11px sans-serif";
      ctx.fillStyle = C.muted;
      ctx.fillText(`Holder Name: ${form.name || "Matrimony Candidate"}`, 15, 115);
      ctx.fillText(`Date of Birth: ${fmtDate(form.dob) || "Not Set"}`, 15, 135);
      ctx.fillText(`Gender: ${form.gender === "male" ? "MALE" : "FEMALE"}`, 15, 155);
      ctx.fillText("STATUS: VERIFICATION DEMO DOCUMENT", 15, 185);
      
      // Draw a mock face photo on the ID Card
      ctx.fillStyle = "#e5e7eb";
      ctx.fillRect(270, 70, 110, 130);
      
      // Draw head
      ctx.fillStyle = "#9ca3af";
      ctx.beginPath();
      ctx.arc(325, 120, 22, 0, Math.PI * 2);
      ctx.fill();
      
      // Draw shoulders
      ctx.beginPath();
      ctx.ellipse(325, 175, 32, 24, 0, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.fillStyle = "#6b7280";
      ctx.font = "bold 9px sans-serif";
      ctx.fillText("PHOTO MATCHED", 288, 192);
      
      ctx.fillStyle = C.gold;
      ctx.fillRect(0, 235, 400, 15);
      
      const dataUrl = canvas.toDataURL("image/png");
      runVerificationScan(dataUrl);
    }
  };

  const next = () => {
    if (step === 0) {
      if (!form.name || !form.dob) {
        showToast("Please fill Name and Date of Birth", "error");
        return;
      }
      const ageVal = Number(calcAge(form.dob));
      if (!isNaN(ageVal) && ageVal < 18) {
        showToast("Age Restriction: You must be 18 or older to register.", "error");
        return;
      }
    }
    if (step === 4 && !form.location) { showToast("Please fill City, State location", "error"); return; }
    if (step === 4) {
      // Validate 4 photos
      const filledPhotos = form.photos.filter(p => p && p.length > 4);
      if (filledPhotos.length < 4) {
        showToast(`Please upload all 4 photos. (${filledPhotos.length}/4 uploaded)`, "error");
        return;
      }
      // First photo is profile photo
      if (!form.profilePhoto) {
        setForm(p => ({ ...p, profilePhoto: p.photos[0] }));
      }
    }
    if (step < steps.length - 1) setStep(s => s + 1);
    else {
      if (!form.governmentIdType) { showToast("Please select a government ID type", "error"); return; }
      if (!form.governmentIdUrl) { showToast("Please upload a scan of your government ID", "error"); return; }
      setShowConfirmModal(true);
    }
  };

  const handleConfirm = async () => {
    const age = calcAge(form.dob);
    if (Number(age) < 18) {
      showToast("Access Denied: You must be at least 18 years old to use this platform.", "error");
      return;
    }
    setShowConfirmModal(false);
    setSubmitting(true);
    const profilePhoto = form.photos[0] || form.profilePhoto;
    
    // If we have an existing ID (initialData), we perform an update
    if (initialData?.uid) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(API_BASE_URL + "/api/users/update", {
          method: "POST",
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify({ uid: initialData.uid, updates: { ...form, profilePhoto, age, updatedAt: new Date().toISOString() } })
        });
        const data = await res.json();
        if (data.success) {
          showToast("Profile updated successfully!", "success");
          onComplete(data.user);
        } else {
          showToast(data.message || "Failed to update profile.", "error");
        }
      } catch (err) {
        showToast("Network error.", "error");
      }
    } else {
      // Create new
      onComplete({
        ...form,
        profilePhoto,
        age,
        uid: `u_${Date.now()}`,
        status: "pending",
        isVerified: false,
        membership: "free",
        createdAt: new Date().toISOString()
      });
    }
  };

  const selOpts = {
    gender: [{ value: "male", label: "Male (Groom)" }, { value: "female", label: "Female (Bride)" }],
    profileFor: ["Myself", "Son", "Daughter", "Brother", "Sister", "Relative"].map(v => ({ value: v, label: v })),
    height: ["4'10\"", "4'11\"", "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "5'11\"", "6'0\"", "6'1\"", "6'2\""].map(v => ({ value: v, label: v })),
    rashi: ["Mesh (Aries)", "Vrishabh (Taurus)", "Mithun (Gemini)", "Kark (Cancer)", "Simha (Leo)", "Kanya (Virgo)", "Tula (Libra)", "Vrishchik (Scorpio)", "Dhanu (Sagittarius)", "Makar (Capricorn)", "Kumbha (Aquarius)", "Meena (Pisces)"].map(v => ({ value: v, label: v })),
    motherTongue: ["Gujarati", "Hindi", "Marathi", "Punjabi", "Bengali", "Tamil", "Telugu", "Kannada", "Malayalam", "Other"].map(v => ({ value: v, label: v })),
    religion: ["Hindu", "Muslim", "Sikh", "Christian", "Buddhist", "Jain", "Other"].map(v => ({ value: v, label: v })),
    education: ["10th Pass", "12th Pass", "Diploma", "Bachelor's Degree", "Master's Degree", "PhD", "Other"].map(v => ({ value: v, label: v })),
    jobType: ["Business", "Private Job", "Govt Job", "Doctor", "Engineer", "Lawyer", "Teacher", "Homemaker", "Other"].map(v => ({ value: v, label: v })),
    salary: ["Less than ₹50,000", "₹50,000 - ₹1,00,000", "₹1,00,000 - ₹5,00,000", "₹5,00,000 - ₹10,00,000", "Above ₹10,00,000", "Not Disclosed"].map(v => ({ value: v, label: v })),
    diet: ["Vegetarian", "Non-Vegetarian", "Eggetarian", "Jain Vegetarian"].map(v => ({ value: v, label: v })),
    maritalStatus: ["Never Married", "Divorced", "Widowed", "Separated"].map(v => ({ value: v, label: v })),
    yesno: [{ value: "No", label: "No" }, { value: "Yes", label: "Yes" }],
  };

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', sans-serif" }}>
      <Toast msg={toast.msg} type={toast.type} />
      {/* Header */}
      <div style={{ background: C.primary, padding: "14px 20px", display: "flex", alignItems: "center", gap: 12 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 4 }}><Ic n="back" s={20} c="#fff" /></button>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#fff", fontFamily: "Georgia, serif" }}>{t("Create Profile")}</div>
      </div>
      {/* Steps */}
      <div style={{ background: C.white, padding: "14px 20px", borderBottom: `1px solid ${C.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
          {steps.map((s, i) => (
            <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: i < step ? C.success : i === step ? C.primary : "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: i <= step ? "#fff" : C.muted, fontWeight: 700 }}>
                {i < step ? <Ic n="check" s={14} c="#fff" /> : i + 1}
              </div>
              <div style={{ fontSize: 9, color: i === step ? C.primary : C.muted, marginTop: 3, textAlign: "center", fontWeight: i === step ? 700 : 400 }}>{s.title}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ padding: "20px 20px 100px", maxWidth: 480, margin: "0 auto" }}>
        <div style={{ background: C.white, borderRadius: 16, padding: 20, boxShadow: "0 2px 16px rgba(0,0,0,0.06)" }}>
          <div style={{ fontSize: 20, marginBottom: 4 }}>{steps[step].icon}</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: C.text, marginBottom: 16 }}>{steps[step].title}</div>

          {/* Step 0: Basic Details */}
          {step === 0 && <>
            <Select label="Profile For" value={form.profileFor} onChange={e => f("profileFor", e.target.value)} options={selOpts.profileFor} />
            <Input label="Full Name" value={form.name} onChange={e => f("name", e.target.value)} placeholder="As per Aadhaar" required />
            <Select label="Gender" value={form.gender} onChange={e => f("gender", e.target.value)} options={selOpts.gender} />
            <Input label="Date of Birth" type="date" value={form.dob} onChange={e => f("dob", e.target.value)} required />
            <Input label="Time of Birth" value={form.timeOfBirth} onChange={e => f("timeOfBirth", e.target.value)} placeholder="e.g. 04:30 PM" />
            <Input label="Place of Birth" value={form.placeOfBirth} onChange={e => f("placeOfBirth", e.target.value)} placeholder="e.g. Palitana, Gujarat" />
            <Select label="Rashi (Moon Sign)" value={form.rashi} onChange={e => f("rashi", e.target.value)} options={selOpts.rashi} />
            <Select label="Height" value={form.height} onChange={e => f("height", e.target.value)} options={selOpts.height} />
          </>}

          {/* Step 1: Social Details */}
          {step === 1 && <>
            <Select label="Mother Tongue" value={form.motherTongue} onChange={e => f("motherTongue", e.target.value)} options={selOpts.motherTongue} />
            <Select label="Religion" value={form.religion} onChange={e => f("religion", e.target.value)} options={selOpts.religion} />
            <Input label="Caste / Sub-caste" value={form.caste} onChange={e => f("caste", e.target.value)} placeholder="e.g. Dhobi, Madivala" />
            <Input label="Hobbies / Interests" value={form.hobbies} onChange={e => f("hobbies", e.target.value)} placeholder="e.g. Reading, Music, Cooking" />
          </>}

          {/* Step 2: Education & Career */}
          {step === 2 && <>
            <Select label="Highest Education" value={form.education} onChange={e => f("education", e.target.value)} options={selOpts.education} />
            <Input label="Institute / University" value={form.institute} onChange={e => f("institute", e.target.value)} placeholder="e.g. Gujarat University" />
            <Select label="Job Type" value={form.jobType} onChange={e => f("jobType", e.target.value)} options={selOpts.jobType} />
            <Select label="Annual Income" value={form.salary} onChange={e => f("salary", e.target.value)} options={selOpts.salary} />
          </>}

          {/* Step 3: Personal Info */}
          {step === 3 && <>
            <Select label="Dietary Habits" value={form.diet} onChange={e => f("diet", e.target.value)} options={selOpts.diet} />
            <Select label="Physically Challenged" value={form.challenged} onChange={e => f("challenged", e.target.value)} options={selOpts.yesno} />
            <Select label="Marital Status" value={form.maritalStatus} onChange={e => f("maritalStatus", e.target.value)} options={selOpts.maritalStatus} />
          </>}

          {/* Step 4: About, Location & 4 Photos */}
          {step === 4 && <>
            {/* 4 Mandatory Photos */}
            <div style={{ marginBottom: 18 }}>
              <label style={{ display: "block", fontSize: 13, fontWeight: 700, color: C.primary, marginBottom: 6 }}>📸 Upload 4 Profile Photos <span style={{ color: C.error }}>*</span></label>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 10, background: "#fef3c7", padding: "8px 10px", borderRadius: 8 }}>
                ⚠️ All 4 photos are mandatory. Photo 1 will be your main profile photo used for identity verification. Each photo: JPG/PNG, 2–5 MB.
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} style={{ position: "relative" }}>
                    <div
                      onClick={() => { const el = document.getElementById(`photo-upload-${i}`); if (el) el.click(); }}
                      style={{ width: "100%", paddingBottom: "100%", position: "relative", borderRadius: 12, border: `2px dashed ${form.photos[i] ? C.success : C.primary}50`, background: form.photos[i] ? "transparent" : `${C.bg}`, cursor: "pointer", overflow: "hidden" }}>
                      {form.photos[i] ? (
                        <img src={form.photos[i]} alt={`Photo ${i+1}`} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", borderRadius: 10 }} />
                      ) : (
                        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
                          <div style={{ fontSize: 24 }}>📷</div>
                          <div style={{ fontSize: 10, fontWeight: 700, color: C.primary }}>Photo {i + 1}{i === 0 ? " (Main)" : ""}</div>
                          <div style={{ fontSize: 9, color: C.muted }}>Tap to upload</div>
                        </div>
                      )}
                      {i === 0 && form.photos[0] && (
                        <div style={{ position: "absolute", bottom: 4, left: 4, background: C.primary, color: "#fff", fontSize: 8, fontWeight: 700, padding: "2px 6px", borderRadius: 6 }}>MAIN</div>
                      )}
                      {form.photos[i] && (
                        <button type="button" onClick={e => { e.stopPropagation(); const newPhotos = [...form.photos]; newPhotos[i] = ""; setForm(p => ({ ...p, photos: newPhotos })); }} style={{ position: "absolute", top: 4, right: 4, background: C.error, color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20, fontSize: 11, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
                      )}
                    </div>
                    <input
                      id={`photo-upload-${i}`}
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      style={{ display: "none" }}
                      onChange={e => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        if (!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) {
                          showToast("Only JPG/PNG images allowed.", "error"); return;
                        }
                        if (file.size < 1024 * 100) {
                          showToast(`Photo ${i+1}: File too small. Minimum ~100KB recommended.`, "error"); return;
                        }
                        if (file.size > 5 * 1024 * 1024) {
                          showToast(`Photo ${i+1}: File too large. Maximum 5 MB.`, "error"); return;
                        }
                        const reader = new FileReader();
                        reader.onload = ev => {
                          const newPhotos = [...form.photos];
                          newPhotos[i] = ev.target?.result as string;
                          setForm(p => ({ ...p, photos: newPhotos }));
                          if (i === 0) setForm(p => ({ ...p, profilePhoto: ev.target?.result as string }));
                          showToast(`Photo ${i+1} uploaded!`, "success");
                        };
                        reader.readAsDataURL(file);
                        e.target.value = "";
                      }}
                    />
                    <div style={{ textAlign: "center", marginTop: 4, fontSize: 10, color: form.photos[i] ? C.success : C.muted, fontWeight: 600 }}>
                      {form.photos[i] ? "✅ Uploaded" : "Not uploaded"}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 8, background: "#f0f9ff", borderRadius: 8, padding: "6px 10px", fontSize: 11, color: "#1e40af" }}>
                📊 {form.photos.filter(p => p).length}/4 photos uploaded
              </div>
            </div>
            <Input label="City, State" value={form.location} onChange={e => f("location", e.target.value)} placeholder="e.g. Ahmedabad, Gujarat" required />
            <Input label="Mobile Number" value={form.phone} onChange={e => f("phone", e.target.value.replace(/\D/g, "").slice(0, 15))} placeholder="e.g. 9876543210" />
            <Input label="WhatsApp Number" value={form.whatsapp} onChange={e => f("whatsapp", e.target.value.replace(/\D/g, "").slice(0, 15))} placeholder="e.g. 9876543210 (leave blank if same)" />
            <Input label="Social Media Links" value={form.socialLinks} onChange={e => f("socialLinks", e.target.value)} placeholder="e.g. facebook.com/username or instagram.com/handle" />
            <Input label="Father's Name" value={form.fatherName} onChange={e => f("fatherName", e.target.value)} placeholder="e.g. Rameshchandra Parmar" />
            <Input label="Father's Occupation" value={form.fatherOccupation} onChange={e => f("fatherOccupation", e.target.value)} placeholder="e.g. Retired Govt Officer / Business" />
            <Input label="Mother's Name" value={form.motherName} onChange={e => f("motherName", e.target.value)} placeholder="e.g. Savitaben Parmar" />
            <Input label="Mother's Occupation" value={form.motherOccupation} onChange={e => f("motherOccupation", e.target.value)} placeholder="e.g. Homemaker" />
            <Input label="Contact Person Name" value={form.contactPerson} onChange={e => f("contactPerson", e.target.value)} placeholder="e.g. Rameshchandra Parmar (Father)" />
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5 }}>{t("About Yourself")}</label>
              <textarea value={form.about} onChange={e => f("about", e.target.value)} rows={4} placeholder={t("Briefly describe yourself, your family, and what you're looking for...")}
                style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 14, color: C.text, outline: "none", fontFamily: "'Segoe UI', sans-serif", resize: "vertical" }} />
            </div>

            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 8 }}>{t("Profile Photo")}</label>
              
              <div style={{ display: "flex", gap: 14, alignItems: "center", marginBottom: 14 }}>
                <img 
                  src={form.profilePhoto || DEFAULT_AVATAR} 
                  alt="Profile Photo Preview" 
                  style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: `3px solid ${C.primary}` }} 
                  onError={e => e.target.src = DEFAULT_AVATAR} 
                />
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <input 
                  type="file" 
                  accept="image/*" 
                  id="profile-photo-upload" 
                  style={{ position: "absolute", width: 1, height: 1, opacity: 0, overflow: "hidden", zIndex: -1 }} 
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handlePhotoUpload(file);
                  }}
                />
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <button 
                    type="button"
                    onClick={() => {
                      const el = document.getElementById("profile-photo-upload");
                      if (el) el.click();
                    }}
                    style={{ 
                      display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", 
                      background: C.white, border: `1px solid ${C.primary}`, color: C.primary, 
                      borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" 
                    }}>
                    {t("📤 Upload Photo")}
                  </button>

                    {!showCamera ? (
                      <button type="button" onClick={startCamera} style={{ 
                        display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", 
                        background: C.primary, color: "#fff", border: "none", 
                        borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" 
                      }}>
                        {t("📸 Use Camera")}
                      </button>
                    ) : (
                      <button type="button" onClick={stopCamera} style={{ 
                        display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", 
                        background: C.error, color: "#fff", border: "none", 
                        borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" 
                      }}>
                        {t("🛑 Cancel Camera")}
                      </button>
                    )}

                    {form.profilePhoto && (
                      <button type="button" onClick={() => f("profilePhoto", "")} style={{ 
                        display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 14px", 
                        background: C.white, border: `1px solid ${C.error}`, color: C.error, 
                        borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer" 
                      }}>
                        {t("🗑️ Remove Photo")}
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {showCamera && (
                <div style={{ marginBottom: 14, background: "#000", borderRadius: 12, padding: 8, position: "relative" }}>
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    style={{ width: "100%", maxHeight: 240, objectFit: "cover", borderRadius: 8, display: "block" }} 
                  />
                  <div style={{ display: "flex", gap: 10, justifyContent: "center", marginTop: 8 }}>
                    <button type="button" onClick={capturePhoto} style={{ 
                      background: C.success, color: "#fff", border: "none", 
                      borderRadius: 8, padding: "8px 16px", fontSize: 12, fontWeight: 700, cursor: "pointer" 
                    }}>
                      {t("📸 Capture Photo")}
                    </button>
                  </div>
                </div>
              )}

              <Input 
                label="Or Enter Photo URL" 
                value={form.profilePhoto} 
                onChange={e => f("profilePhoto", e.target.value)} 
                placeholder="https://..." 
              />
            </div>
          </>}

          {/* Step 5: Verification ID Upload */}
          {step === 5 && <>
            <Select
              label="Select Government ID Type"
              value={form.governmentIdType}
              onChange={e => f("governmentIdType", e.target.value)}
              options={[
                { value: "Aadhaar Card", label: "Aadhaar Card" },
                { value: "PAN Card", label: "PAN Card" },
                { value: "License", label: "Driving License" },
                { value: "Ration Card", label: "Ration Card" }
              ]}
              required
            />
            <div style={{ marginBottom: 14 }}>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5 }}>
                {t("Upload Scan of ID Document")} <span style={{ color: C.error }}>*</span>
              </label>
              <div style={{
                border: `2.5px dashed ${form.governmentIdUrl ? C.success : C.primary}40`,
                borderRadius: 12,
                padding: "20px 14px",
                textAlign: "center",
                background: `${C.bg}50`,
                cursor: "pointer",
                position: "relative",
                transition: "all 0.2s"
              }}
              onDragOver={e => e.preventDefault()}
              onDrop={e => {
                e.preventDefault();
                const file = e.dataTransfer.files[0];
                if (file) handleFileUpload(file);
              }}
              onClick={(e) => {
                // Prevent multiple clicks if they click the button itself inside
                if ((e.target as HTMLElement).tagName !== "INPUT") {
                  const el = document.getElementById("id-file-upload");
                  if (el) el.click();
                }
              }}
              >
                <input
                  type="file"
                  accept="image/*,application/pdf"
                  style={{ position: "absolute", width: 1, height: 1, opacity: 0, overflow: "hidden", zIndex: -1 }}
                  id="id-file-upload"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) handleFileUpload(file);
                  }}
                />
                <div style={{ cursor: "pointer", display: "block" }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>📤</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.text }}>
                    {form.governmentIdUrl ? t("Change Uploaded Document") : t("Choose File or Drag & Drop")}
                  </div>
                  <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>
                    {t("Supports PNG, JPG, JPEG, PDF (max 5MB)")}
                  </div>
                </div>
              </div>

              {/* Camera capture button for ID documents */}
              <div style={{ marginTop: 10, textAlign: "center" }}>
                <button
                  type="button"
                  onClick={startIdCamera}
                  style={{
                    display: "inline-flex", alignItems: "center", gap: 6, padding: "10px 18px",
                    background: C.primary, color: "#fff", border: "none",
                    borderRadius: 8, fontSize: 13, fontWeight: 600, cursor: "pointer"
                  }}
                >
                  📷 {t("Capture ID with Camera")}
                </button>
              </div>

              <div style={{ marginTop: 10, textAlign: "center" }}>
                <button
                  type="button"
                  onClick={generateDemoIdScan}
                  style={{
                    background: "none",
                    border: "none",
                    color: C.primary,
                    fontSize: 12,
                    fontWeight: 600,
                    textDecoration: "underline",
                    cursor: "pointer"
                  }}
                >
                  {t("Or click here to generate a simulated Demo ID Scan")}
                </button>
              </div>

              {form.governmentIdUrl && (
                <div style={{ marginTop: 14, padding: 10, border: `1.5px solid ${C.border}`, borderRadius: 10, display: "flex", gap: 10, alignItems: "center" }}>
                  {form.governmentIdUrl.startsWith("data:image/") ? (
                     <img src={form.governmentIdUrl} alt="ID Preview" style={{ width: 50, height: 50, borderRadius: 6, objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: 50, height: 50, background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, fontSize: 20 }}>📄</div>
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: C.text }}>{t(form.governmentIdType)} {t("Document")}</div>
                    <div style={{ fontSize: 10, color: C.success, fontWeight: 600, marginTop: 2 }}>{t("Ready for verification ✓")}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => f("governmentIdUrl", "")}
                    style={{ background: "none", border: "none", color: C.error, cursor: "pointer", padding: 4 }}
                  >
                    {t("Remove")}
                  </button>
                </div>
              )}
            </div>
          </>}

          <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
            {step > 0 && <Btn onClick={() => setStep(s => s - 1)} variant="ghost" full>{t("backBtn")}</Btn>}
            <Btn onClick={next} variant="primary" full>{step === steps.length - 1 ? t("submitBtn") : t("nextBtn")}</Btn>
          </div>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div style={{
          position: "fixed",
          top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0, 0, 0, 0.6)",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 99999, padding: 20
        }}>
          <div style={{
            background: C.white, borderRadius: 20, padding: 30,
            maxWidth: 400, width: "100%", textAlign: "center",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)"
          }}>
            <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 12 }}>
              {t("Documents Submitted!")}
            </div>
            <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6, marginBottom: 24 }}>
              {form.governmentIdType === "Aadhaar Card" ? t("verifAadharMsg") : t("verifDocMsg")}
            </div>
            <Btn onClick={handleConfirm} variant="primary" full size="lg">
              {t("Go to Dashboard")}
            </Btn>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PENDING APPROVAL SCREEN ──────────────────────────────────────────────
function PendingApprovalScreen({ user, onLogout, onDownloadBioData, onEditProfile }: any) {
  const { t } = useLang();
  const [liveStatus, setLiveStatus] = useState(user?.status || "pending");

  // Poll for live status updates every 15 seconds
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const poll = setInterval(async () => {
      try {
        const res = await fetch(API_BASE_URL + "/api/users/me", { headers: { "Authorization": `Bearer ${token}` } });
        const data = await res.json();
        if (data.success && data.user) {
          setLiveStatus(data.user.status);
          if (data.user.status === "approved") {
            // Trigger parent to switch to userapp
            setTimeout(() => window.location.reload(), 1500);
          }
        }
      } catch { /* ignore */ }
    }, 15000);
    return () => clearInterval(poll);
  }, []);

  const statusColor = liveStatus === "approved" ? C.success : liveStatus === "blocked" ? C.error : C.warning;
  const statusIcon = liveStatus === "approved" ? "✅" : liveStatus === "blocked" ? "🚫" : "⏳";
  const statusLabel = liveStatus === "approved" ? "Profile Approved!" : liveStatus === "blocked" ? "Profile Rejected" : "Under Review";

  return (
    <div className="dhobi-app-shell" style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${C.primary}15, #fff8f0)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Segoe UI', sans-serif" }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24 }}>
        <div style={{ fontSize: 28 }}>💍</div>
        <div style={{ fontSize: 18, fontWeight: 800, color: C.primary, fontFamily: "Georgia, serif" }}>Dhobi Matrimony</div>
      </div>

      <div style={{ background: C.white, borderRadius: 20, padding: 28, maxWidth: 400, width: "100%", textAlign: "center", boxShadow: "0 8px 32px rgba(0,0,0,0.12)" }}>
        {/* Profile photo */}
        <img src={user?.profilePhoto || user?.photos?.[0] || DEFAULT_AVATAR} alt="Profile" style={{ width: 80, height: 80, borderRadius: "50%", objectFit: "cover", border: `3px solid ${statusColor}`, marginBottom: 12 }} />
        <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>{user?.name || "User"}</div>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 16 }}>{user?.email}</div>

        {/* Live Status Badge */}
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: `${statusColor}15`, border: `2px solid ${statusColor}`, borderRadius: 99, padding: "8px 20px", marginBottom: 20 }}>
          <span style={{ fontSize: 18 }}>{statusIcon}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: statusColor }}>{statusLabel}</span>
        </div>

        {liveStatus === "pending" && (
          <div style={{ background: "#fefce8", border: "1px solid #fde047", borderRadius: 10, padding: 14, marginBottom: 16, textAlign: "left" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#92400e", marginBottom: 4 }}>⏳ Verification in Progress</div>
            <div style={{ fontSize: 11, color: "#78350f", lineHeight: 1.6 }}>Your profile and government ID are being reviewed by our admin team. This usually takes 24–48 hours. You will be notified once approved.</div>
          </div>
        )}

        {liveStatus === "approved" && (
          <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 10, padding: 14, marginBottom: 16, textAlign: "left" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.success, marginBottom: 4 }}>🎉 Congratulations!</div>
            <div style={{ fontSize: 11, color: "#166534", lineHeight: 1.6 }}>Your profile has been approved. Redirecting to dashboard...</div>
          </div>
        )}

        {liveStatus === "blocked" && (
          <div style={{ background: "#fef2f2", border: "1px solid #fca5a5", borderRadius: 10, padding: 14, marginBottom: 16, textAlign: "left" }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: C.error, marginBottom: 4 }}>🚫 Profile Rejected</div>
            <div style={{ fontSize: 11, color: "#7f1d1d", lineHeight: 1.6 }}>Your profile has been rejected. Please contact admin for more information.</div>
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <Btn onClick={() => onDownloadBioData(user)} variant="gold" full>📄 {t("downloadBioData")}</Btn>
          {onEditProfile && <Btn onClick={onEditProfile} variant="outline" full>✏️ Edit My Profile</Btn>}
          <Btn onClick={onLogout} variant="ghost" full>{t("logout")}</Btn>
        </div>
      </div>

      {/* Contact Support */}
      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: "14px 16px", marginTop: 16, maxWidth: 380, width: "100%", boxSizing: "border-box" }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, marginBottom: 10, textAlign: "center" }}>{t("📞 Need Help? Contact Admin")}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          <a href="tel:+919173446708" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.text, textDecoration: "none" }}>
            <span style={{ fontSize: 18 }}>📱</span>
            <div><div style={{ fontWeight: 600, fontSize: 12 }}>{t("Rohit Parmar")}</div><div style={{ color: C.muted, fontSize: 11 }}>+91 91734 46708</div></div>
          </a>
          <a href="tel:+916353606165" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.text, textDecoration: "none" }}>
            <span style={{ fontSize: 18 }}>📱</span>
            <div><div style={{ fontWeight: 600, fontSize: 12 }}>{t("Ved Parmar")}</div><div style={{ color: C.muted, fontSize: 11 }}>+91 6353606165</div></div>
          </a>
          <a href="mailto:vedp9429@gmail.com" style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 13, color: C.text, textDecoration: "none" }}>
            <span style={{ fontSize: 18 }}>✉️</span>
            <div><div style={{ fontWeight: 600, fontSize: 12 }}>{t("Email")}</div><div style={{ color: C.primary, fontSize: 11 }}>vedp9429@gmail.com</div></div>
          </a>
        </div>
      </div>
    </div>
  );
}

function UserApp({ currentUser, setCurrentUser, triggerRefresh, allUsers, setAllUsers, onLogout, onSwitchAdmin, onDownloadBioData, onEditProfile }) {
  const { t } = useLang();
  const [tab, setTab] = useState("home");
  const [homeFeedMode, setHomeFeedMode] = useState("matches"); // matches | interests
  const [viewProfile, setViewProfile] = useState(null);
  const [chatWith, setChatWith] = useState(null);
  const [interests, setInterests] = useState([]);
  const [toast, showToast] = useToast();
  const [activeChat, setActiveChat] = useState<any>(null);
  const [editData, setEditData] = useState<any>({});

  // Auto-refresh user status every 30s (for live admin → user sync)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    const poll = setInterval(async () => {
      try {
        const res = await fetch(API_BASE_URL + "/api/users/me", { headers: { "Authorization": `Bearer ${token}` } });
        const data = await res.json();
        if (data.success && data.user) {
          setCurrentUser((prev: any) => ({ ...prev, ...data.user }));
        }
      } catch { /* ignore */ }
    }, 30000);
    return () => clearInterval(poll);
  }, []);

  const loadInterests = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(API_BASE_URL + "/api/interests/my", {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.interests) {
          setInterests(data.interests);
        }
      })
      .catch(err => console.error("Error loading interests:", err));
  };

  useEffect(() => {
    loadInterests();
  }, [tab, homeFeedMode]);

  const sendInterest = async (receiverId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(API_BASE_URL + "/api/interests/send", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ receiverId })
      });
      const data = await res.json();
      if (data.success) {
        showToast("Interest sent successfully! 💌", "success");
        loadInterests();
        if (viewProfile && viewProfile.uid === receiverId) {
          setViewProfile(null);
        }
      } else {
        showToast(data.error || "Failed to send interest.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error. Failed to send interest.", "error");
    }
  };

  const respondInterest = async (interestId, status) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(API_BASE_URL + "/api/interests/respond", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ interestId, status })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Interest request ${status}!`, "success");
        loadInterests();
        if (viewProfile) setViewProfile(null);
      } else {
        showToast(data.error || "Failed to respond to interest.", "error");
      }
    } catch (err) {
      console.error(err);
      showToast("Network error. Failed to respond.", "error");
    }
  };

  const matches = allUsers.filter(u =>
    u.uid !== currentUser.uid &&
    u.status === "approved" &&
    u.gender !== currentUser.gender
  );

  const getInterestStatus = (otherUid) => {
    const record = interests.find(i => 
      (i.senderId === currentUser.uid && i.receiverId === otherUid) ||
      (i.senderId === otherUid && i.receiverId === currentUser.uid)
    );
    if (!record) return null;
    return {
      id: record.id,
      status: record.status,
      senderId: record.senderId
    };
  };

  const deleteMyProfile = async () => {
    if (!window.confirm("Are you sure you want to delete your profile? This action cannot be undone.")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(API_BASE_URL + "/api/users/delete", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ uid: currentUser.uid })
      });
      const data = await res.json();
      if (data.success) {
        setAllUsers(prev => prev.filter(u => u.uid !== currentUser.uid));
        onLogout();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleProfileSave = async (updates: any) => {
    const token = localStorage.getItem("token");
    // Build changedFields for audit log
    const changedFields: { field: string; oldValue: string; newValue: string }[] = [];
    Object.keys(updates).forEach(key => {
      if (key === "updatedAt" || key === "uid") return;
      const oldVal = String(currentUser[key] || "");
      const newVal = String(updates[key] || "");
      if (oldVal !== newVal && updates[key] !== undefined) {
        changedFields.push({ field: key, oldValue: oldVal, newValue: newVal });
      }
    });

    try {
      const res = await fetch(API_BASE_URL + "/api/users/update", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
        body: JSON.stringify({ uid: currentUser.uid, updates: { ...updates, updatedAt: new Date().toISOString() }, changedFields })
      });
      const data = await res.json();
      if (data.success) {
        setCurrentUser((prev: any) => ({ ...prev, ...updates }));
        setAllUsers((prev: any[]) => prev.map(u => u.uid === currentUser.uid ? { ...u, ...updates } : u));
        showToast("Profile updated successfully! ✏️", "success");
        setEditMode(false);
      } else {
        showToast(data.error || "Failed to update profile.", "error");
      }
    } catch (err) {
      showToast("Network error.", "error");
    }
  };

  // Filter users that have accepted mutual interest with currentUser for chat list
  const activeChatsList = allUsers.filter(u => {
    if (u.uid === currentUser.uid || u.status !== "approved") return false;
    const intInfo = getInterestStatus(u.uid);
    return intInfo !== null && intInfo.status === "accepted";
  });

  if (chatWith) {
    return <ChatRoom me={currentUser} other={chatWith} onBack={() => setChatWith(null)} />;
  }
  if (viewProfile) {
    return (
      <ProfileDetailView 
        user={viewProfile} 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser}
        triggerRefresh={triggerRefresh}
        interestInfo={getInterestStatus(viewProfile.uid)}
        onBack={() => setViewProfile(null)} 
        onChat={() => { setChatWith(viewProfile); setViewProfile(null); setTab("messages"); }} 
        onInterest={() => sendInterest(viewProfile.uid)} 
        onRespond={respondInterest}
      />
    );
  }

  return (
    <div className="dhobi-app-shell" style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', sans-serif", position: "relative" }}>
      <Toast msg={toast.msg} type={toast.type} />

      {/* Top Bar */}
      <div style={{ background: C.white, borderBottom: `1px solid ${C.border}`, padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ fontSize: 22 }}>💍</div>
          <div style={{ fontSize: 17, fontWeight: 800, color: C.primary, fontFamily: "Georgia, serif" }}>{t("appName")}</div>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {currentUser.isVerified && <span style={{ background: "#fef3c7", color: "#92400e", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99 }}>⭐ VERIFIED</span>}
          <button onClick={() => showToast("Notifications: No new alerts", "info")} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}>
            <Ic n="bell" s={20} c={C.muted} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", paddingBottom: 70 }}>

        {tab === "home" && (
          <div>
            <div style={{ background: `linear-gradient(135deg, ${C.primary}, #5a0000)`, padding: "18px 16px", color: "#fff" }}>
              <div style={{ fontSize: 13, opacity: 0.8, marginBottom: 4 }}>{t("home") === "होम" ? "वापस स्वागत है," : t("home") === "હોમ" ? "ફરી સ્વાગત," : "Welcome back,"}</div>
              <div style={{ fontSize: 20, fontWeight: 700, fontFamily: "Georgia, serif" }}>{currentUser.name || 'User'} 👋</div>
              <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4 }}>{matches.length} {t("matches")}</div>

            </div>

            {/* Matches Feed */}
            <div style={{ display: 'flex', borderBottom: `1px solid ${C.border}`, marginBottom: 0 }}>
              {[['matches', 'Matches'], ['interests', 'Interests']].map(([mode, label]) => (
                <button key={mode} onClick={() => setHomeFeedMode(mode)}
                  style={{ flex: 1, padding: '10px 0', background: 'none', border: 'none', borderBottom: homeFeedMode === mode ? `3px solid ${C.primary}` : '3px solid transparent', cursor: 'pointer', fontSize: 13, fontWeight: homeFeedMode === mode ? 700 : 400, color: homeFeedMode === mode ? C.primary : C.muted }}>
                  {label}
                </button>
              ))}
            </div>

            {homeFeedMode === 'matches' && (
              <div style={{ padding: 14 }}>
                {matches.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 30, color: C.muted }}>{t('noProfiles')}</div>
                ) : matches.map(u => (
                  <ProfileCard key={u.uid} user={u} onView={() => setViewProfile(u)} onInterest={() => sendInterest(u.uid)} interestInfo={getInterestStatus(u.uid)} />
                ))}
              </div>
            )}

            {homeFeedMode === 'interests' && (
              <div style={{ padding: 14 }}>
                {interests.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 30, color: C.muted }}>No interest requests yet.</div>
                ) : interests.map((i: any) => {
                  const otherUid = i.senderId === currentUser.uid ? i.receiverId : i.senderId;
                  const otherUser = allUsers.find(u => u.uid === otherUid);
                  if (!otherUser) return null;
                  return (
                    <ProfileCard key={i.id || otherUid} user={otherUser} onView={() => setViewProfile(otherUser)} onInterest={() => sendInterest(otherUser.uid)} interestInfo={getInterestStatus(otherUser.uid)} />
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === 'search' && (
          <div style={{ padding: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 14 }}>🔍 {t('search')}</div>
            {allUsers.filter(u => u.uid !== currentUser.uid && u.status === 'approved').map(u => (
              <ProfileCard key={u.uid} user={u} onView={() => setViewProfile(u)} onInterest={() => sendInterest(u.uid)} interestInfo={getInterestStatus(u.uid)} />
            ))}
          </div>
        )}

        {tab === 'messages' && (
          <div style={{ padding: 14 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.text, marginBottom: 14 }}>💬 {t('messages')}</div>
            {activeChatsList.length === 0 ? (
              <div style={{ textAlign: 'center', padding: 30, color: C.muted }}>No active chats. Accept an interest to start chatting!</div>
            ) : activeChatsList.map(u => (
              <div key={u.uid} onClick={() => setChatWith(u)} style={{ background: C.white, borderRadius: 12, padding: '12px 14px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer', border: `1px solid ${C.border}` }}>
                <img src={u.profilePhoto || DEFAULT_AVATAR} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover' }} alt={u.name} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>{u.name}</div>
                  <div style={{ fontSize: 11, color: C.muted }}>{u.location}</div>
                </div>
                <Ic n="chevron-right" s={16} c={C.muted} />
              </div>
            ))}
          </div>
        )}

        {tab === 'profile' && (
          <div style={{ padding: 14 }}>
            {/* My Profile */}
            <div style={{ background: C.white, borderRadius: 16, overflow: 'hidden', border: `1px solid ${C.border}`, marginBottom: 14 }}>
              <div style={{ background: `linear-gradient(135deg, ${C.primary}, #5a0000)`, padding: '20px 16px', textAlign: 'center' }}>
                <img src={currentUser.profilePhoto || DEFAULT_AVATAR} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.5)', marginBottom: 8 }} alt={currentUser.name} />
                <div style={{ fontSize: 18, fontWeight: 700, color: '#fff', fontFamily: 'Georgia, serif' }}>{currentUser.name || 'User'}, {currentUser.age || ''}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.75)', marginTop: 2 }}>{currentUser.location || 'Location not set'}</div>
                <div style={{ marginTop: 8 }}>
                  <span style={{ background: currentUser.status === 'approved' ? '#16a34a' : currentUser.status === 'pending' ? '#d97706' : '#ef4444', color: '#fff', fontSize: 11, fontWeight: 700, padding: '3px 12px', borderRadius: 20 }}>
                    {currentUser.status === 'approved' ? '✅ Approved' : currentUser.status === 'pending' ? '⏳ Under Review' : '🚫 ' + currentUser.status}
                  </span>
                </div>
              </div>
              <div style={{ padding: 16 }}>
                {[['Profile For', currentUser.profileFor, true], ['Gender', currentUser.gender, true], ['Date of Birth', currentUser.dob],
                  ['Height', currentUser.height], ['Mother Tongue', currentUser.motherTongue, true], ['Religion', currentUser.religion, true],
                  ['Caste', currentUser.caste], ['Education', currentUser.education, true], ['Institute', currentUser.institute],
                  ['Job Type', currentUser.jobType, true], ['Salary', currentUser.salary, true], ['Diet', currentUser.diet, true],
                  ['Marital Status', currentUser.maritalStatus, true], ['Email Address', currentUser.email],
                  ['Mobile Number', currentUser.phone], ['WhatsApp Number', currentUser.whatsapp],
                  ['Social Links', currentUser.socialLinks],
                  ['ID Document Type', currentUser.governmentIdType || currentUser.idType, true],
                  ['ID Number', currentUser.idNumber],
                ].map(([label, val, translateVal]) => val && (
                  <div key={label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: `1px solid ${C.bg}`, fontSize: 13 }}>
                    <span style={{ color: C.muted }}>{t(label)}</span>
                    <span style={{ fontWeight: 600, color: C.text, textAlign: 'right', maxWidth: '55%' }}>
                      {translateVal ? t(val) : val}
                    </span>
                  </div>
                ))}

                {(currentUser.governmentIdType || currentUser.idType) && (
                  <div style={{ marginTop: 14, padding: 12, borderRadius: 10, background: currentUser.isVerified ? '#f0fdf4' : '#fefdf0', border: `1.5px solid ${currentUser.isVerified ? '#bbf7d0' : '#fde047'}`, textAlign: 'center' }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: currentUser.isVerified ? C.success : '#d97706' }}>
                      {currentUser.isVerified ? '🛡️ Identity Verified' : '⏳ Verification Pending Admin Review'}
                    </div>
                    {currentUser.governmentIdUrl && (
                      <div style={{ marginTop: 8 }}>
                        <span style={{ fontSize: 11, color: C.muted, display: 'block', marginBottom: 4 }}>Uploaded Document Scan:</span>
                        <a href={currentUser.governmentIdUrl} target="_blank" rel="noreferrer">
                          <img src={currentUser.governmentIdUrl} style={{ width: '100%', maxHeight: 150, objectFit: 'contain', borderRadius: 8, border: `2px solid ${currentUser.isVerified ? C.success : C.gold}` }} alt="ID Scan" />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <Btn onClick={onEditProfile} variant="primary" full><Ic n="edit" s={16} c="#fff" /> ✏️ Edit My Profile</Btn>
              <Btn onClick={() => onDownloadBioData(currentUser)} variant="gold" full><Ic n="crown" s={16} c="#fff" /> 📄 Download Bio Data PDF</Btn>
              {onSwitchAdmin && <Btn onClick={onSwitchAdmin} variant="outline" full><Ic n="shield" s={16} c={C.primary} /> {t('Admin Panel')}</Btn>}
              <Btn onClick={deleteMyProfile} variant="danger" full><Ic n="trash" s={16} c="#fff" /> Delete My Profile</Btn>
              <Btn onClick={onLogout} variant="ghost" full><Ic n="logout" s={16} c={C.muted} /> {t('Logout')}</Btn>
            </div>

            {/* Contact Support Card */}
            <div style={{ background: C.white, borderRadius: 14, border: `1.5px solid ${C.border}`, padding: '14px 16px', marginTop: 12 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: C.primary, marginBottom: 10, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Ic n="phone" s={14} c={C.primary} /> Need Help? Contact Us
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <a href="tel:+919173446708" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.text, textDecoration: 'none' }}>
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: `${C.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic n="phone" s={13} c={C.primary} /></span>
                  <div><div style={{ fontWeight: 600, fontSize: 12 }}>Rohit Parmar</div><div style={{ color: C.muted, fontSize: 11 }}>+91 91734 46708</div></div>
                </a>
                <a href="tel:+916353606165" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.text, textDecoration: 'none' }}>
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: `${C.primary}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Ic n="phone" s={13} c={C.primary} /></span>
                  <div><div style={{ fontWeight: 600, fontSize: 12 }}>Ved Parmar</div><div style={{ color: C.muted, fontSize: 11 }}>+91 6353606165</div></div>
                </a>
                <a href="mailto:vedp9429@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: C.text, textDecoration: 'none' }}>
                  <span style={{ width: 28, height: 28, borderRadius: '50%', background: `${C.gold}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13 }}>✉️</span>
                  <div><div style={{ fontWeight: 600, fontSize: 12 }}>Email Support</div><div style={{ color: C.primary, fontSize: 11 }}>vedp9429@gmail.com</div></div>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div style={{ position: 'fixed', bottom: 0, left: '50%', transform: 'translateX(-50%)', width: '100%', maxWidth: 430, background: C.white, borderTop: `2px solid ${C.border}`, display: 'flex', zIndex: 20 }}>
        {[['home', 'home', t('home')], ['search', 'search', t('search')], ['messages', 'chat', t('messages')], ['profile', 'user', t('profile')]].map(([id, icon, label]) => (
          <button key={id} onClick={() => setTab(id)} style={{ flex: 1, background: 'none', border: 'none', cursor: 'pointer', padding: '10px 0 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3, color: tab === id ? C.primary : C.muted, transition: 'color .15s' }}>
            <Ic n={icon} s={20} c={tab === id ? C.primary : C.muted} />
            <span style={{ fontSize: 10, fontWeight: tab === id ? 700 : 400 }}>{label}</span>
          </button>
        ))}
      </div>

      {/* Removed basic Edit Profile Modal in favor of full registration wizard */}
    </div>
  );
}


// ─── PROFILE CARD ─────────────────────────────────────────────────────────
function ProfileCard({ user, onView, onInterest, interestInfo }: any) {
  const { t } = useLang();
  return (
    <div style={{ background: C.white, borderRadius: 14, marginBottom: 12, overflow: "hidden", border: `1px solid ${C.border}`, boxShadow: "0 1px 6px rgba(0,0,0,0.04)" }}>
      <div style={{ display: "flex", gap: 0 }}>
        <div style={{ width: 110, flexShrink: 0, position: "relative" }}>
          <img src={user.profilePhoto || DEFAULT_AVATAR} alt={user.name} style={{ width: "100%", height: 130, objectFit: "cover" }} />
          {user.isVerified && <div style={{ position: "absolute", top: 6, left: 6, background: "#fef3c7", borderRadius: 20, padding: "2px 6px", fontSize: 9, fontWeight: 700, color: "#92400e" }}>⭐ Verified</div>}
          {user.membership === "premium" && <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "rgba(139,0,0,0.85)", textAlign: "center", padding: "3px 0", fontSize: 9, color: "#ffd700", fontWeight: 700 }}>{t("PREMIUM")}</div>}
        </div>
        <div style={{ flex: 1, padding: "12px 12px 8px" }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.text }}>{user.name}, {user.age}</div>
          <div style={{ fontSize: 11, color: C.primary, fontWeight: 600, marginTop: 2 }}>{user.caste}</div>
          <div style={{ marginTop: 6, display: "flex", flexDirection: "column", gap: 3 }}>
            {[
              ["🎓", user.education, true],
              ["💼", user.jobType, true],
              ["📍", user.location],
              ["🕊", user.maritalStatus, true],
            ].map(([ic, val, translateVal]) => val && (
              <div key={ic} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: C.muted }}>
                <span>{ic}</span><span>{translateVal ? t(val) : val}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ display: "flex", borderTop: `1px solid ${C.bg}` }}>
        <button onClick={onView} style={{ flex: 1, padding: "10px 0", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: C.primary, borderRight: `1px solid ${C.bg}` }}>
          {t("View Profile")}
        </button>
        
        {interestInfo === null ? (
          <button onClick={onInterest} style={{ flex: 1, padding: "10px 0", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: C.primary }}>
            {t("Send Interest")} 💌
          </button>
        ) : interestInfo.status === "pending" ? (
          <button disabled style={{ flex: 1, padding: "10px 0", background: "none", border: "none", cursor: "not-allowed", fontSize: 12, fontWeight: 600, color: C.muted }}>
            {interestInfo.senderId === user.uid ? t("⚡ Action Needed") : t("⏳ Pending Accept")}
          </button>
        ) : interestInfo.status === "accepted" ? (
          <button onClick={onView} style={{ flex: 1, padding: "10px 0", background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: C.success }}>
            {t("💬 Chat Active")}
          </button>
        ) : (
          <button disabled style={{ flex: 1, padding: "10px 0", background: "none", border: "none", cursor: "not-allowed", fontSize: 12, fontWeight: 600, color: C.error }}>
            {t("✕ Declined")}
          </button>
        )}
      </div>
    </div>
  );
}

// ─── PROFILE DETAIL VIEW ──────────────────────────────────────────────────
function ProfileDetailView({ user, currentUser, setCurrentUser, triggerRefresh, interestInfo, onBack, onChat, onInterest, onRespond }) {
  const isConsentAccepted = interestInfo !== null && interestInfo.status === "accepted";
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportType, setReportType] = useState("fake_profile");
  const [reportDetails, setReportDetails] = useState("");
  const [isSubmittingReport, setIsSubmittingReport] = useState(false);
  const [toast, showToast] = useToast();
  
  const sections = [
    { title: "Personal Details", icon: "👤", fields: [["Profile For", user.profileFor], ["Name", user.name], ["Gender", user.gender], ["Date of Birth", user.dob], ["Height", user.height]] },
    { title: "Social Details", icon: "🏛", fields: [["Location", user.location], ["Mother Tongue", user.motherTongue], ["Religion", user.religion], ["Caste", user.caste]] },
    { title: "Educational Details", icon: "🎓", fields: [["Highest Education", user.education], ["Institute", user.institute]] },
    { title: "Professional Details", icon: "💼", fields: [["Job Type", user.jobType], ["Salary", user.salary]] },
    { title: "More Details", icon: "📋", fields: [["Dietary Habits", user.diet], ["Physically Challenged", user.challenged], ["Marital Status", user.maritalStatus]] },
    { title: "Contact Details (Consent Guarded)", icon: "📧", fields: [
      ["Email Address", isConsentAccepted ? user.email : "[Mutual Consent Accepted Required]"],
      ["Mobile Number", isConsentAccepted ? user.phone : "[Mutual Consent Accepted Required]"],
      ["WhatsApp Number", isConsentAccepted ? user.whatsapp : "[Mutual Consent Accepted Required]"],
      ["Social Links", isConsentAccepted ? user.socialLinks : "[Mutual Consent Accepted Required]"],
    ] },
  ];

  const handleBlockToggle = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(API_BASE_URL + "/api/users/block", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ targetUserId: user.uid })
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.isBlocked ? "User blocked successfully 🛡️" : "User unblocked successfully ✓", "success");
        setCurrentUser((prev: any) => ({ ...prev, blockedUsers: data.blockedUsers }));
        triggerRefresh();
        if (data.isBlocked) {
          setTimeout(() => onBack(), 1000);
        }
      } else {
        showToast(data.error || "Failed to toggle block.", "error");
      }
    } catch (err) {
      showToast("Network error. Failed to toggle block.", "error");
    }
  };

  const handleMuteToggle = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(API_BASE_URL + "/api/users/mute", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ targetUserId: user.uid })
      });
      const data = await res.json();
      if (data.success) {
        showToast(data.isMuted ? "Notifications muted for this user 🔕" : "Notifications unmuted for this user 🔔", "success");
        setCurrentUser((prev: any) => ({ ...prev, mutedUsers: data.mutedUsers }));
        triggerRefresh();
      } else {
        showToast(data.error || "Failed to toggle mute.", "error");
      }
    } catch (err) {
      showToast("Network error. Failed to toggle mute.", "error");
    }
  };

  const handleUnmatch = async () => {
    if (!window.confirm(`Are you sure you want to unmatch with ${user.name}? This will lock the chat and hide contact details again.`)) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(API_BASE_URL + "/api/interests/unmatch", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ targetUserId: user.uid })
      });
      const data = await res.json();
      if (data.success) {
        showToast("Unmatched successfully.", "success");
        triggerRefresh();
        setTimeout(() => onBack(), 1000);
      } else {
        showToast(data.error || "Failed to unmatch.", "error");
      }
    } catch (err) {
      showToast("Network error. Failed to unmatch.", "error");
    }
  };

  const handleReportSubmit = async (e: any) => {
    e.preventDefault();
    if (!reportDetails.trim()) {
      showToast("Please provide details for the report.", "error");
      return;
    }
    setIsSubmittingReport(true);
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(API_BASE_URL + "/api/reports/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          reportedUserId: user.uid,
          type: reportType,
          details: reportDetails.trim()
        })
      });
      const data = await res.json();
      if (data.success) {
        showToast("Report submitted successfully. Administrators will review it.", "success");
        setShowReportModal(false);
        setReportDetails("");
      } else {
        showToast(data.error || "Failed to submit report.", "error");
      }
    } catch (err) {
      showToast("Network error. Failed to submit report.", "error");
    } finally {
      setIsSubmittingReport(false);
    }
  };

  return (
    <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: C.bg, fontFamily: "'Segoe UI', sans-serif", position: "relative" }}>
      <Toast msg={toast.msg} type={toast.type} />
      {/* Header */}
      <div style={{ background: C.primary, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff", padding: 4 }}>
          <Ic n="back" s={20} c="#fff" />
        </button>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#fff" }}>View Profile</div>
      </div>

      {/* Photo & Name */}
      <div style={{ background: `linear-gradient(180deg, ${C.primary} 0%, ${C.bg} 100%)`, padding: "0 0 20px" }}>
        <div style={{ textAlign: "center", paddingTop: 20 }}>
          <img src={user.profilePhoto || DEFAULT_AVATAR} style={{ width: 110, height: 110, borderRadius: "50%", objectFit: "cover", border: "4px solid #fff", boxShadow: "0 4px 20px rgba(0,0,0,0.2)" }} alt={user.name} />
          <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginTop: 10, fontFamily: "Georgia, serif" }}>{user.name}, {user.age}</div>
          <div style={{ fontSize: 13, color: C.muted, marginTop: 2 }}>{user.caste} • {user.religion}</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 4, fontSize: 12, color: C.muted, marginTop: 4 }}>
            <Ic n="pin" s={13} c={C.muted} /> {user.location}
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 12 }}>
            {user.isVerified && <span style={{ background: "#fef3c7", color: "#92400e", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>⭐ Verified</span>}
            {user.membership === "premium" && <span style={{ background: C.primary, color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 }}>Premium</span>}
          </div>
        </div>
      </div>

      {/* About */}
      {user.about && (
        <div style={{ margin: "0 14px 14px", background: C.white, borderRadius: 12, padding: 14, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.text, marginBottom: 6 }}>About</div>
          <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{user.about}</div>
        </div>
      )}

      {/* Detail Sections */}
      {sections.map(sec => (
        <div key={sec.title} style={{ margin: "0 14px 12px", background: C.white, borderRadius: 12, border: `1px solid ${C.border}`, overflow: "hidden" }}>
          <div style={{ padding: "12px 14px", background: `${C.primary}08`, borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 700, color: C.primary }}>
              <span>{sec.icon}</span> {sec.title}
            </div>
          </div>
          {sec.fields.map(([label, val]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "10px 14px", borderBottom: `1px solid ${C.bg}`, fontSize: 13 }}>
              <span style={{ color: C.muted }}>{label}</span>
              <span style={{ fontWeight: 600, color: C.text, textAlign: "right", maxWidth: "55%" }}>{val || "-"}</span>
            </div>
          ))}
        </div>
      ))}

      {/* CTA Buttons */}
      <div style={{ padding: "14px 14px 90px", display: "flex", flexDirection: "column", gap: 10 }}>
        {interestInfo === null && (
          <Btn onClick={onInterest} variant="primary" full size="lg"><Ic n="heart" s={16} c="#fff" /> Send Interest Request</Btn>
        )}
        
        {interestInfo && interestInfo.status === "pending" && interestInfo.senderId === currentUser.uid && (
          <Btn disabled variant="ghost" full size="lg">⏳ Interest Request Sent (Awaiting Accept)</Btn>
        )}

        {interestInfo && interestInfo.status === "pending" && interestInfo.senderId === user.uid && (
          <div style={{ display: "flex", gap: 10 }}>
            <Btn onClick={() => onRespond(interestInfo.id, "accepted")} variant="success" full size="lg">✓ Accept Interest</Btn>
            <Btn onClick={() => onRespond(interestInfo.id, "rejected")} variant="danger" full size="lg">✕ Decline</Btn>
          </div>
        )}

        {interestInfo && interestInfo.status === "accepted" && (
          <Btn onClick={onChat} variant="primary" full size="lg"><Ic n="chat" s={16} c="#fff" /> Open Matrimonial Chat</Btn>
        )}

        {interestInfo && interestInfo.status === "rejected" && (
          <Btn disabled variant="ghost" full size="lg">✕ Interest Request Declined</Btn>
        )}
      </div>
    </div>
  );
}

// ─── SEARCH VIEW ──────────────────────────────────────────────────────────
function SearchView({ users, onView }) {
  const [q, setQ] = useState("");
  const [filterReligion, setFilterReligion] = useState("");
  const filtered = users.filter(u =>
    (!q || u.name.toLowerCase().includes(q.toLowerCase()) || u.location?.toLowerCase().includes(q.toLowerCase()) || u.caste?.toLowerCase().includes(q.toLowerCase())) &&
    (!filterReligion || u.religion === filterReligion)
  );

  return (
    <div>
      <div style={{ position: "relative", marginBottom: 10 }}>
        <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><Ic n="search" s={16} c={C.muted} /></span>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search by name, location, caste..."
          style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "10px 14px 10px 36px", fontSize: 13, fontFamily: "'Segoe UI', sans-serif", outline: "none" }} />
      </div>
      <select value={filterReligion} onChange={e => setFilterReligion(e.target.value)}
        style={{ width: "100%", border: `1.5px solid ${C.border}`, borderRadius: 10, padding: "9px 12px", fontSize: 13, marginBottom: 12, fontFamily: "'Segoe UI', sans-serif", outline: "none" }}>
        <option value="">All Religions</option>
        {["Hindu", "Muslim", "Sikh", "Christian", "Buddhist", "Jain"].map(r => <option key={r} value={r}>{r}</option>)}
      </select>
      {filtered.length === 0 ? <div style={{ textAlign: "center", color: C.muted, padding: 24, fontSize: 13 }}>No profiles found</div>
        : filtered.map(u => <ProfileCard key={u.uid} user={u} interestInfo={null} onView={() => onView(u)} onInterest={() => {}} />)}
    </div>
  );
}

// ─── CHAT ROOM ────────────────────────────────────────────────────────────
function ChatRoom({ me, other, onBack }) {
  const [text, setText] = useState("");
  const [thread, setThread] = useState([]);
  const [toast, showToast] = useToast();
  const endRef = useRef(null);

  const loadMessages = () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(API_BASE_URL + `/api/messages?otherId=${other.uid}`, {
      headers: { "Authorization": `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.messages) {
          setThread(data.messages);
        }
      })
      .catch(err => console.error("Error loading chat messages:", err));
  };

  useEffect(() => {
    loadMessages();
    const interval = setInterval(loadMessages, 3000); // Poll every 3 seconds for new messages
    return () => clearInterval(interval);
  }, [other.uid]);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [thread]);

  const send = () => {
    if (!text.trim()) return;
    const token = localStorage.getItem("token");
    fetch(API_BASE_URL + "/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({ receiverId: other.uid, text: text.trim() })
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.message) {
          setThread(prev => [...prev, data.message]);
          setText("");
        } else {
          showToast(data.error || "Failed to send message.", "error");
        }
      })
      .catch(err => {
        console.error(err);
        showToast("Network error. Failed to send message.", "error");
      });
  };

  return (
    <div style={{ maxWidth: 430, margin: "0 auto", minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ background: C.primary, padding: "12px 16px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
        <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#fff" }}><Ic n="back" s={20} c="#fff" /></button>
        <img src={other.profilePhoto} style={{ width: 38, height: 38, borderRadius: "50%", objectFit: "cover", border: "2px solid rgba(255,255,255,0.4)" }} alt={other.name} />
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>{other.name}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)" }}>{other.location}</div>
        </div>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10 }}>
        {thread.length === 0 && <div style={{ textAlign: "center", color: C.muted, fontSize: 12, padding: 24 }}>{t("Start the conversation with")} {other.name} 🌸</div>}
        {thread.map((msg, i) => (
          <div key={i} style={{ display: "flex", justifyContent: msg.from === me.uid ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "72%", background: msg.from === me.uid ? C.primary : C.white, color: msg.from === me.uid ? "#fff" : C.text, borderRadius: msg.from === me.uid ? "16px 16px 4px 16px" : "16px 16px 16px 4px", padding: "9px 14px", fontSize: 13, boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
              {msg.text}
              <div style={{ fontSize: 10, opacity: 0.65, marginTop: 3, textAlign: "right" }}>{msg.time}</div>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div style={{ background: C.white, padding: "10px 14px", borderTop: `1px solid ${C.border}`, display: "flex", gap: 10, alignItems: "center" }}>
        <input value={text} onChange={e => setText(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder={"Type a message..."}
          style={{ flex: 1, border: `1.5px solid ${C.border}`, borderRadius: 24, padding: "10px 16px", fontSize: 13, outline: "none", fontFamily: "'Segoe UI', sans-serif" }} />
        <button onClick={send} style={{ width: 40, height: 40, borderRadius: "50%", background: C.primary, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Ic n="send" s={16} c="#fff" />
        </button>
      </div>
    </div>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────
function AdminPanel({ users, setUsers, onLogout, onSwitchUser }) {
  const { t } = useLang();
  const [tab, setTab] = useState("dashboard");
  const [toast, showToast] = useToast();
  const [reports, setReports] = useState([]);
  const [notifications, setNotifications] = useState<any[]>([]);
  const [auditLogs, setAuditLogs] = useState<any[]>([]);
  const [adminStats, setAdminStats] = useState<any>(null);
  const [hoveredUser, setHoveredUser] = useState<any>(null);
  const [hoverPosition, setHoverPosition] = useState({ x: 0, y: 0 });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const pending = users.filter(u => u.status === "pending");
  const approved = users.filter(u => u.status === "approved");
  const total = users.length;

  const authHeaders = { "Content-Type": "application/json", "Authorization": `Bearer ${localStorage.getItem("token")}` };

  const fetchReports = async () => {
    try {
      const res = await fetch(API_BASE_URL + "/api/admin/reports", { headers: authHeaders });
      const data = await res.json();
      if (data.success && data.reports) setReports(data.reports.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
    } catch (err) { console.error("Failed to fetch reports:", err); }
  };

  const fetchNotifications = async () => {
    try {
      const res = await fetch(API_BASE_URL + "/api/admin/notifications", { headers: authHeaders });
      const data = await res.json();
      if (data.success) setNotifications(data.notifications || []);
    } catch (err) { console.error("Failed to fetch notifications:", err); }
  };

  const fetchAuditLogs = async () => {
    try {
      const res = await fetch(API_BASE_URL + "/api/admin/audit-logs", { headers: authHeaders });
      const data = await res.json();
      if (data.success) setAuditLogs(data.logs || []);
    } catch (err) { console.error("Failed to fetch audit logs:", err); }
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(API_BASE_URL + "/api/admin/stats", { headers: authHeaders });
      const data = await res.json();
      if (data.success) setAdminStats(data.stats);
    } catch (err) { console.error("Failed to fetch stats:", err); }
  };

  useEffect(() => {
    fetchReports();
    fetchNotifications();
    fetchAuditLogs();
    fetchStats();
  }, [users]);

  const unreadNotifCount = notifications.filter(n => !n.read).length;
  const pendingReportsCount = reports.filter(r => r.status === "pending").length;

  const approve = async (uid) => {
    try {
      const res = await fetch(API_BASE_URL + "/api/users/update", { method: "POST", headers: authHeaders, body: JSON.stringify({ uid, updates: { status: "approved", isVerified: true } }) });
      const data = await res.json();
      if (data.success) { setUsers(p => p.map(u => u.uid === uid ? { ...u, status: "approved", isVerified: true } : u)); showToast("Profile approved & verified ✓", "success"); fetchStats(); }
    } catch (err) { console.error(err); }
  };

  const reject = async (uid) => {
    try {
      const res = await fetch(API_BASE_URL + "/api/users/update", { method: "POST", headers: authHeaders, body: JSON.stringify({ uid, updates: { status: "blocked" } }) });
      const data = await res.json();
      if (data.success) { setUsers(p => p.map(u => u.uid === uid ? { ...u, status: "blocked" } : u)); showToast("Profile rejected.", "info"); fetchStats(); }
    } catch (err) { console.error(err); }
  };

  const toggleVerify = async (uid) => {
    const targetUser = users.find(u => u.uid === uid);
    if (!targetUser) return;
    try {
      const res = await fetch(API_BASE_URL + "/api/users/update", { method: "POST", headers: authHeaders, body: JSON.stringify({ uid, updates: { isVerified: !targetUser.isVerified } }) });
      const data = await res.json();
      if (data.success) { setUsers(p => p.map(u => u.uid === uid ? { ...u, isVerified: !u.isVerified } : u)); showToast("Verification status updated.", "success"); }
    } catch (err) { console.error(err); }
  };

  const toggleBlock = async (uid) => {
    const targetUser = users.find(u => u.uid === uid);
    if (!targetUser) return;
    const nextStatus = targetUser.status === "blocked" ? "approved" : "blocked";
    try {
      const res = await fetch(API_BASE_URL + "/api/users/update", { method: "POST", headers: authHeaders, body: JSON.stringify({ uid, updates: { status: nextStatus } }) });
      const data = await res.json();
      if (data.success) { setUsers(p => p.map(u => u.uid === uid ? { ...u, status: nextStatus } : u)); showToast("Account status updated.", "info"); fetchStats(); }
    } catch (err) { console.error(err); }
  };

  const deleteUser = async (uid, name) => {
    if (!window.confirm(`Delete ${name}'s profile?`)) return;
    try {
      const res = await fetch(API_BASE_URL + "/api/users/delete", { method: "POST", headers: authHeaders, body: JSON.stringify({ uid }) });
      const data = await res.json();
      if (data.success) { setUsers(p => p.filter(u => u.uid !== uid)); showToast(`${name}'s profile deleted.`, "info"); fetchStats(); }
    } catch (err) { console.error(err); }
  };

  const markNotificationsRead = async () => {
    try {
      await fetch(API_BASE_URL + "/api/admin/notifications/mark-read", { method: "POST", headers: authHeaders });
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) { console.error(err); }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: "chart" },
    { id: "pending", label: "Pending Approvals", icon: "bell", badge: pending.length, badgeRed: true },
    { id: "users", label: "All Profiles", icon: "users" },
    { id: "notifications", label: "Notifications", icon: "bell", badge: unreadNotifCount, badgeRed: false },
    { id: "audit", label: "Activity Logs", icon: "shield" },
    { id: "create", label: "Add Profile", icon: "plus" },
    { id: "interests", label: "Interests", icon: "heart" },
    { id: "reports", label: "Reports", icon: "flag", badge: pendingReportsCount, badgeRed: true },
    { id: "chats", label: "Conversations", icon: "chat" },
    { id: "sessions", label: "Sessions", icon: "shield" },
    { id: "settings", label: "SMTP Settings", icon: "sliders" },
    { id: "help", label: "Help & About", icon: "info" },
  ];

  const s = adminStats;

  return (
    <div style={{ minHeight: "100vh", background: "#f5f5f5", fontFamily: "'Segoe UI', sans-serif" }}>
      <Toast msg={toast.msg} type={toast.type} />

      {/* Admin Top Bar */}
      <div style={{ background: C.primary, padding: "0 24px", display: "flex", alignItems: "center", gap: 16, borderBottom: `3px solid ${C.gold}`, minHeight: 58 }}>
        {isMobile && (
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", padding: "8px 0" }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        )}
        <div style={{ padding: "14px 0", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 22 }}>💍</div>
          <div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", letterSpacing: 2, textTransform: "uppercase" }}>Admin Console</div>
            <div style={{ fontSize: 17, fontWeight: 800, color: "#fff", fontFamily: "Georgia, serif" }}>Dhobi Matrimony</div>
          </div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {unreadNotifCount > 0 && (
            <span onClick={() => setTab("notifications")} style={{ background: "#ef4444", color: "#fff", fontSize: 11, fontWeight: 700, padding: "3px 9px", borderRadius: 20, cursor: "pointer", border: "2px solid #fff" }}>
              🔔 {unreadNotifCount} new
            </span>
          )}
          <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 20 }}>🛡️ Admin</span>
          <button onClick={onLogout} style={{ background: "none", border: "1px solid rgba(255,255,255,0.3)", borderRadius: 8, padding: "6px 10px", color: "rgba(255,255,255,0.8)", cursor: "pointer" }}>
            <Ic n="logout" s={14} c="rgba(255,255,255,0.8)" />
          </button>
        </div>
      </div>

      <div style={{ display: "flex", minHeight: "calc(100vh - 58px)", position: "relative" }}>
        {isMobile && isSidebarOpen && (
          <div onClick={() => setIsSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 999 }} />
        )}

        {/* Sidebar */}
        <aside style={{ width: 220, background: C.white, borderRight: `1px solid ${C.border}`, flexShrink: 0, paddingTop: 16, ...(isMobile ? { position: "fixed", top: 0, left: isSidebarOpen ? 0 : -230, height: "100vh", zIndex: 1000, boxShadow: "2px 0 12px rgba(0,0,0,0.15)", transition: "left 0.25s cubic-bezier(0.4, 0, 0.2, 1)" } : {}) }}>
          {isMobile && (
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 18px 12px", borderBottom: `1px solid ${C.border}`, marginBottom: 12 }}>
              <span style={{ fontWeight: 800, color: C.primary, fontSize: 14 }}>Navigation Menu</span>
              <button onClick={() => setIsSidebarOpen(false)} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer" }}><Ic n="x" s={18} c={C.muted} /></button>
            </div>
          )}
          {navItems.map(item => (
            <button key={item.id} onClick={() => { setTab(item.id); if (isMobile) setIsSidebarOpen(false); if (item.id === "notifications") markNotificationsRead(); }}
              style={{ width: "100%", padding: "11px 18px", background: tab === item.id ? `${C.primary}10` : "transparent", borderLeft: tab === item.id ? `3px solid ${C.primary}` : "3px solid transparent", border: "none", borderRadius: 0, display: "flex", alignItems: "center", gap: 10, cursor: "pointer", fontFamily: "'Segoe UI', sans-serif", fontSize: 13, fontWeight: tab === item.id ? 700 : 500, color: tab === item.id ? C.primary : C.text, transition: "all .15s" }}>
              <Ic n={item.icon} s={16} c={tab === item.id ? C.primary : C.muted} />
              <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
              {item.badge > 0 && <span style={{ background: item.badgeRed ? C.error : "#3b82f6", color: "#fff", borderRadius: 99, padding: "1px 7px", fontSize: 10, fontWeight: 800 }}>{item.badge}</span>}
            </button>
          ))}
        </aside>

        {/* Main Content */}
        <main style={{ flex: 1, padding: isMobile ? 16 : 28, overflowY: "auto" }}>
          {tab === "dashboard" && <AdminDashboard isMobile={isMobile} users={users} pending={pending} approved={approved} total={total} stats={s} onHoverUser={setHoveredUser} onHoverPosition={setHoverPosition} />}
          {tab === "pending" && <AdminPending isMobile={isMobile} users={pending} onApprove={approve} onReject={reject} onHoverUser={setHoveredUser} onHoverPosition={setHoverPosition} />}
          {tab === "users" && <AdminUsers isMobile={isMobile} users={users} onVerify={toggleVerify} onBlock={toggleBlock} onDelete={deleteUser} onHoverUser={setHoveredUser} onHoverPosition={setHoverPosition} />}
          {tab === "notifications" && (
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 20 }}>🔔 Notifications</div>
              {notifications.length === 0 ? (
                <div style={{ textAlign: "center", padding: 40, color: C.muted }}>No notifications yet.</div>
              ) : notifications.map((n: any) => (
                <div key={n.id} style={{ background: n.read ? C.white : "#fff8e1", borderRadius: 12, padding: "14px 18px", marginBottom: 12, border: `1px solid ${n.read ? C.border : C.gold}`, boxShadow: n.read ? "none" : "0 2px 8px rgba(200,150,12,0.12)" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 6 }}>
                    <span style={{ fontSize: 20 }}>{n.type === "new_registration" ? "🆕" : n.type === "profile_update" ? "✏️" : "📋"}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{n.summary}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>{n.userName} • {n.userEmail} • {new Date(n.timestamp).toLocaleString("en-IN")}</div>
                    </div>
                    {!n.read && <span style={{ background: "#3b82f6", color: "#fff", fontSize: 9, fontWeight: 800, padding: "2px 6px", borderRadius: 10 }}>NEW</span>}
                  </div>
                  {n.changedFields && n.changedFields.length > 0 && (
                    <div style={{ background: "#f9fafb", borderRadius: 8, padding: "8px 12px", marginTop: 6 }}>
                      {n.changedFields.map((f: any, i: number) => (
                        <div key={i} style={{ display: "grid", gridTemplateColumns: "140px 1fr 1fr", fontSize: 12, borderBottom: "1px solid #f0f0f0", padding: "3px 0" }}>
                          <span style={{ fontWeight: 600, color: C.muted }}>{f.field}</span>
                          <span style={{ color: "#ef4444", textDecoration: "line-through" }}>{f.oldValue || "(empty)"}</span>
                          <span style={{ color: "#16a34a" }}>→ {f.newValue || "(empty)"}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  {!n.changedFields && n.details && (
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 4 }}>{n.details}</div>
                  )}
                </div>
              ))}
            </div>
          )}
          {tab === "audit" && (
            <div>
              <div style={{ fontSize: 20, fontWeight: 700, color: C.text, marginBottom: 20 }}>📋 Activity Audit Logs</div>
              <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, overflow: "hidden" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12 }}>
                  <thead>
                    <tr style={{ background: `${C.primary}08` }}>
                      {["Timestamp", "User", "Action", "Details", "IP"].map(h => (
                        <th key={h} style={{ padding: "10px 14px", textAlign: "left", fontWeight: 700, color: C.primary, borderBottom: `1px solid ${C.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {auditLogs.slice(0, 200).map((log: any) => (
                      <tr key={log.id} style={{ borderBottom: `1px solid #f5f5f5` }}>
                        <td style={{ padding: "8px 14px", color: C.muted, whiteSpace: "nowrap" }}>{new Date(log.timestamp).toLocaleString("en-IN")}</td>
                        <td style={{ padding: "8px 14px", fontWeight: 600 }}>{log.userEmail || log.userId}</td>
                        <td style={{ padding: "8px 14px" }}>
                          <span style={{ background: log.action.includes("ADMIN") ? "#fef3c7" : log.action.includes("REGISTER") ? "#dcfce7" : "#eff6ff", color: log.action.includes("ADMIN") ? "#92400e" : log.action.includes("REGISTER") ? "#166534" : "#1e40af", padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 700 }}>
                            {log.action}
                          </span>
                        </td>
                        <td style={{ padding: "8px 14px", color: C.muted, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis" }}>{log.details}</td>
                        <td style={{ padding: "8px 14px", color: C.muted, fontFamily: "monospace", fontSize: 11 }}>{log.ip}</td>
                      </tr>
                    ))}
                    {auditLogs.length === 0 && (
                      <tr><td colSpan={5} style={{ padding: 30, textAlign: "center", color: C.muted }}>No activity logs yet.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
          {tab === "create" && <AdminCreateProfile isMobile={isMobile} onSave={async (u) => {
            try {
              const res = await fetch(API_BASE_URL + "/api/users/register", { method: "POST", headers: authHeaders, body: JSON.stringify(u) });
              const data = await res.json();
              if (data.success) { setUsers(p => [...p, u]); showToast(`${u.name} added.`, "success"); setTab("users"); }
            } catch (err) { console.error(err); }
          }} />}
          {tab === "interests" && <AdminInterests isMobile={isMobile} />}
          {tab === "reports" && <AdminReports isMobile={isMobile} users={users} setUsers={setUsers} reports={reports} refetchReports={fetchReports} />}
          {tab === "chats" && <AdminChats isMobile={isMobile} />}
          {tab === "sessions" && <AdminSessions isMobile={isMobile} users={users} />}
          {tab === "settings" && <AdminSettings />}
          {tab === "help" && <AdminHelp />}
        </main>
      </div>

      {/* ADMIN HOVER DETAIL POPUP */}
      {hoveredUser && (
        <div style={{ position: "fixed", left: hoverPosition.x + 15, top: hoverPosition.y + 10, width: 380, maxHeight: "85vh", overflowY: "auto", background: "#fff", border: `3px solid ${C.primary}`, borderRadius: 12, boxShadow: "0 8px 32px rgba(139,0,0,0.25)", zIndex: 999999, padding: 16, pointerEvents: "none", fontFamily: "'Segoe UI', sans-serif" }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, borderBottom: `2px solid ${C.gold}`, paddingBottom: 8 }}>
            <img src={hoveredUser.profilePhoto || DEFAULT_AVATAR} style={{ width: 50, height: 50, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.primary}` }} alt="" />
            <div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.primary }}>{hoveredUser.name}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{hoveredUser.email} • Age: {hoveredUser.age}</div>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[["Gender", hoveredUser.gender],["DOB", hoveredUser.dob],["Time of Birth", hoveredUser.timeOfBirth],["Place of Birth", hoveredUser.placeOfBirth],["Rashi", hoveredUser.rashi],["Caste", hoveredUser.caste],["Religion", hoveredUser.religion],["Mother Tongue", hoveredUser.motherTongue],["Location", hoveredUser.location],["Marital Status", hoveredUser.maritalStatus],["Diet", hoveredUser.diet],["Challenged", hoveredUser.challenged],["Hobbies", hoveredUser.hobbies],["Education", hoveredUser.education],["Institute", hoveredUser.institute],["Job Type", hoveredUser.jobType],["Income", hoveredUser.salary],["Father's Name", hoveredUser.fatherName],["Father's Occ", hoveredUser.fatherOccupation],["Mother's Name", hoveredUser.motherName],["Mother's Occ", hoveredUser.motherOccupation],["Contact Person", hoveredUser.contactPerson],["Phone", hoveredUser.phone],["WhatsApp", hoveredUser.whatsapp],["Social Links", hoveredUser.socialLinks],["Govt ID Type", hoveredUser.governmentIdType || hoveredUser.idType],["Verification", hoveredUser.isVerified ? "Verified ⭐" : `Pending (${hoveredUser.status})`]].map(([label, val]) => val && (
              <div key={label} style={{ display: "grid", gridTemplateColumns: "140px 1fr", fontSize: 11, borderBottom: "1px solid #f5f5f5", paddingBottom: 3 }}>
                <span style={{ color: C.muted, fontWeight: 600 }}>{label}</span>
                <span style={{ color: C.text, fontWeight: 700 }}>: &nbsp; {val}</span>
              </div>
            ))}
          </div>
          {hoveredUser.governmentIdUrl && (
            <div style={{ marginTop: 10, borderTop: "1px dashed #ddd", paddingTop: 8 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: C.primary, marginBottom: 4 }}>Uploaded ID Scan:</div>
              <img src={hoveredUser.governmentIdUrl} style={{ width: "100%", maxHeight: 120, objectFit: "contain", borderRadius: 6, border: `1.5px solid ${C.gold}` }} alt="ID" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}


// ─── ADMIN DASHBOARD ──────────────────────────────────────────────────────
function AdminDashboard({ isMobile, users, pending, approved, total, stats: apiStats, onHoverUser, onHoverPosition }: any) {
  const { t } = useLang();
  const males = (users || []).filter(u => u.gender === "male").length;
  const females = (users || []).filter(u => u.gender === "female").length;
  const premium = (users || []).filter(u => u.membership === "premium").length;
  const rejected = (users || []).filter(u => u.status === "blocked" || u.status === "rejected").length;
  const today = new Date().toISOString().slice(0, 10);
  const todayReg = (users || []).filter(u => u.createdAt && u.createdAt.startsWith(today)).length;

  const statCards = [
    { label: "Total Users", val: apiStats?.total ?? total, icon: "users", color: C.primary, bg: "#fdf4ff" },
    { label: "✅ Approved", val: apiStats?.approved ?? (approved?.length || 0), icon: "check", color: C.success, bg: "#f0fdf4" },
    { label: "⏳ Pending", val: apiStats?.pending ?? (pending?.length || 0), icon: "bell", color: C.warning, bg: "#fefce8" },
    { label: "🚫 Rejected/Blocked", val: apiStats?.rejected ?? rejected, icon: "x", color: C.error, bg: "#fef2f2" },
    { label: "📅 Today's Reg.", val: apiStats?.todayRegistrations ?? todayReg, icon: "calendar", color: "#7c3aed", bg: "#f5f3ff" },
    { label: "👑 Premium", val: apiStats?.premiumMembers ?? premium, icon: "crown", color: C.gold, bg: "#fffbeb" },
    { label: "👨 Grooms", val: apiStats?.males ?? males, icon: "user", color: "#2563eb", bg: "#eff6ff" },
    { label: "👩 Brides", val: apiStats?.females ?? females, icon: "user", color: "#db2777", bg: "#fdf2f8" },
  ];

  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 6 }}>📊 Dashboard Overview</div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 20 }}>Real-time statistics from the database</div>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)", gap: 14, marginBottom: 28 }}>
        {statCards.map(s => (
          <div key={s.label} style={{ background: s.bg || C.white, borderRadius: 14, padding: "16px 18px", border: `1px solid ${C.border}`, boxShadow: "0 2px 8px rgba(0,0,0,0.05)", transition: "transform .15s" }}
            onMouseEnter={e => (e.currentTarget.style.transform = "translateY(-2px)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "translateY(0)")}>
            <div style={{ fontSize: 11, color: C.muted, fontWeight: 600, marginBottom: 8 }}>{s.label}</div>
            <div style={{ fontSize: 32, fontWeight: 800, color: s.color }}>{s.val}</div>
          </div>
        ))}
      </div>

      <div style={{ background: C.white, borderRadius: 14, padding: 20, border: `1px solid ${C.border}` }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 14 }}>🕐 Recent Profiles</div>
        {(users || []).length === 0 ? (
          <div style={{ textAlign: "center", padding: 20, color: C.muted }}>No profiles yet.</div>
        ) : (users || []).slice(-8).reverse().map(u => (
          <div key={u.uid} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${C.bg}` }}>
            <img
              src={u.profilePhoto || DEFAULT_AVATAR}
              style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", cursor: "pointer" }}
              alt={u.name}
              onMouseEnter={() => onHoverUser(u)}
              onMouseMove={(e) => onHoverPosition({ x: e.clientX, y: e.clientY })}
              onMouseLeave={() => onHoverUser(null)}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.text }}>{u.name}, {u.age}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{u.caste} • {u.location} • {u.email}</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <span style={{ fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: u.status === "approved" ? "#ecfdf5" : u.status === "pending" ? "#fef9c3" : "#fef2f2", color: u.status === "approved" ? C.success : u.status === "pending" ? C.warning : C.error }}>
                {u.status}
              </span>
              <div style={{ fontSize: 10, color: C.muted, marginTop: 2 }}>{u.createdAt ? new Date(u.createdAt).toLocaleDateString("en-IN") : ""}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── STRICT VERIFICATION CHECKLIST MODAL ───────────────────────────────────
function StrictReviewModal({ user, onConfirm, onClose }: any) {
  const { t } = useLang();
  const [faceCheck, setFaceCheck] = useState(false);
  const [nameCheck, setNameCheck] = useState(false);
  const [docCheck, setDocCheck] = useState(false);

  const canApprove = faceCheck && nameCheck && docCheck;

  return (
    <div style={{
      position: "fixed",
      top: 0, left: 0, right: 0, bottom: 0,
      background: "rgba(0, 0, 0, 0.7)",
      display: "flex", alignItems: "center", justifyContent: "center",
      zIndex: 99999, padding: 20
    }}>
      <div style={{
        background: C.white, borderRadius: 20, padding: 24,
        maxWidth: 580, width: "100%", 
        boxShadow: "0 12px 40px rgba(0, 0, 0, 0.3)",
        fontFamily: "'Segoe UI', sans-serif",
        border: `3px solid ${C.primary}`
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: `2.5px solid ${C.gold}`, paddingBottom: 10, marginBottom: 16 }}>
          <div style={{ fontSize: 18, fontWeight: 700, color: C.primary, fontFamily: "Georgia, serif" }}>🔍 Strict Verification Checklist</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.muted }}>
            <Ic n="x" s={20} c={C.muted} />
          </button>
        </div>

        {/* Photo comparison panel */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, marginBottom: 4 }}>{t("Profile Picture")}</div>
            <img src={user.profilePhoto || DEFAULT_AVATAR} style={{ width: 120, height: 120, borderRadius: 8, objectFit: "cover", border: `2.5px solid ${C.border}` }} alt="" />
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: C.muted, marginBottom: 4 }}>{t("Government ID Scan")}</div>
            {user.governmentIdUrl ? (
              <img src={user.governmentIdUrl} style={{ width: "100%", height: 120, borderRadius: 8, objectFit: "contain", border: `2.5px solid ${C.border}` }} alt="" />
            ) : (
              <div style={{ height: 120, background: "#f5f5f5", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: C.muted, fontSize: 12 }}>{t("No document uploaded")}</div>
            )}
          </div>
        </div>

        <div style={{ background: "#fef8f8", borderRadius: 10, padding: 14, borderLeft: `4px solid ${C.primary}`, marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.primary, marginBottom: 4 }}>User Details:</div>
          <div style={{ fontSize: 12, color: C.text }}><strong>Name:</strong> {user.name} | <strong>Gender:</strong> {user.gender}</div>
          <div style={{ fontSize: 12, color: C.text, marginTop: 2 }}><strong>ID Type:</strong> {user.governmentIdType || user.idType || "N/A"} | <strong>ID Number:</strong> {user.idNumber || "N/A"}</div>
        </div>

        {/* Checkboxes */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
            <input type="checkbox" checked={faceCheck} onChange={e => setFaceCheck(e.target.checked)} style={{ width: 18, height: 18, marginTop: 2, cursor: "pointer" }} />
            <div style={{ fontSize: 13, color: C.text }}>
              <strong>Photo Correlation:</strong> I confirm that the face in the profile picture matches the face printed on the government ID document.
            </div>
          </label>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
            <input type="checkbox" checked={nameCheck} onChange={e => setNameCheck(e.target.checked)} style={{ width: 18, height: 18, marginTop: 2, cursor: "pointer" }} />
            <div style={{ fontSize: 13, color: C.text }}>
              <strong>Name Match:</strong> I confirm that the candidate's registered name matches the name printed on the government ID document.
            </div>
          </label>
          <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
            <input type="checkbox" checked={docCheck} onChange={e => setDocCheck(e.target.checked)} style={{ width: 18, height: 18, marginTop: 2, cursor: "pointer" }} />
            <div style={{ fontSize: 13, color: C.text }}>
              <strong>Legibility check:</strong> I confirm that the document is legible, issued by a valid government authority, and displays a visible stamp or security marking.
            </div>
          </label>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <Btn onClick={onClose} variant="ghost" full>Cancel</Btn>
          <Btn onClick={onConfirm} variant="success" full disabled={!canApprove}><Ic n="check" s={16} c="#fff" /> Approve & Verify Profile</Btn>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN PENDING ────────────────────────────────────────────────────────
function AdminPending({ isMobile, users, onApprove, onReject, onHoverUser, onHoverPosition }: any) {
  const { t } = useLang();
  const [reviewUser, setReviewUser] = useState<any>(null);
  const [fullViewImg, setFullViewImg] = useState<string | null>(null);

  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 20 }}>Pending Approvals ({users.length})</div>

      {users.length === 0 ? (
        <div style={{ background: C.white, borderRadius: 14, padding: 40, textAlign: "center", color: C.muted, border: `1px solid ${C.border}` }}>
          <div style={{ fontSize: 36, marginBottom: 10 }}>✅</div>
          <div style={{ fontSize: 15, fontWeight: 600 }}>All caught up! No pending profiles.</div>
        </div>
      ) : users.map(u => (
        <div key={u.uid} style={{ background: C.white, borderRadius: 14, padding: 20, marginBottom: 14, border: `1.5px solid ${C.border}`, boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>

          {/* ── Profile Header ── */}
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 14, alignItems: isMobile ? "center" : "flex-start", marginBottom: 14 }}>
            <img
              src={u.profilePhoto || DEFAULT_AVATAR}
              style={{ width: 80, height: 80, borderRadius: 12, objectFit: "cover", border: `2px solid ${C.primary}`, cursor: "pointer", flexShrink: 0 }}
              alt={u.name}
              onClick={() => u.profilePhoto && setFullViewImg(u.profilePhoto)}
              onMouseEnter={() => onHoverUser(u)}
              onMouseMove={(e) => onHoverPosition({ x: e.clientX, y: e.clientY })}
              onMouseLeave={() => onHoverUser(null)}
              title="Click to enlarge profile photo"
            />
            <div style={{ flex: 1, width: "100%", textAlign: isMobile ? "center" : "left" }}>
              <div style={{ fontSize: 17, fontWeight: 700, color: C.text }}>{u.name}, {u.age}</div>
              <div style={{ fontSize: 12, color: C.primary, fontWeight: 600, marginTop: 2 }}>{u.caste} • {u.religion} • {u.gender === "male" ? "♂ Groom" : "♀ Bride"}</div>
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "4px 16px", marginTop: 8, fontSize: 12 }}>
                {[["📍", u.location], ["🎓", u.education], ["💼", u.jobType], ["📧", u.email], ["📱", u.phone], ["💒", u.maritalStatus]].map(([ic, val]) => val && (
                  <div key={ic} style={{ color: C.muted }}><span>{ic}</span> {val}</div>
                ))}
              </div>
              {u.about && <div style={{ fontSize: 12, color: C.muted, marginTop: 8, fontStyle: "italic", lineHeight: 1.5, borderTop: `1px dashed ${C.border}`, paddingTop: 6 }}>"{u.about}"</div>}
            </div>
          </div>

          {/* ── 🆔 ID PROOF SECTION (ALWAYS SHOWN, PROMINENT) ── */}
          <div style={{
            background: u.governmentIdUrl ? "linear-gradient(135deg, #fffbeb, #fff8e1)" : "#fef2f2",
            border: `2px solid ${u.governmentIdUrl ? C.gold : C.error}`,
            borderRadius: 12,
            padding: 16,
            marginBottom: 14,
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
              <span style={{ fontSize: 20 }}>🆔</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 800, color: u.governmentIdUrl ? "#92400e" : C.error }}>{t("Government ID Proof")}</div>
                <div style={{ fontSize: 11, color: C.muted }}>
                  {u.governmentIdUrl ? `${u.governmentIdType || u.idType || "Document"} uploaded` : "⚠️ No ID document uploaded by user"}
                </div>
              </div>
              {u.governmentIdUrl && (
                <span style={{ marginLeft: isMobile ? "0" : "auto", background: "#d97706", color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99 }}>{t("REQUIRES VERIFICATION")}</span>
              )}
            </div>

            {u.governmentIdUrl ? (
              <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
                {/* Profile Photo for comparison */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>Profile Photo</div>
                  <img
                    src={u.profilePhoto || DEFAULT_AVATAR}
                    style={{ width: "100%", maxWidth: 160, height: 160, objectFit: "cover", borderRadius: 8, border: `2px solid ${C.border}`, cursor: "pointer", margin: "0 auto" }}
                    alt="Profile"
                    onClick={() => u.profilePhoto && setFullViewImg(u.profilePhoto)}
                    title="Click to enlarge"
                  />
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{t("Click to enlarge")}</div>
                </div>

                {/* ID Document */}
                <div style={{ textAlign: "center" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: C.muted, marginBottom: 6, textTransform: "uppercase", letterSpacing: 1 }}>{u.governmentIdType || "ID Document"}</div>
                  <img
                    src={u.governmentIdUrl}
                    style={{ width: "100%", maxWidth: 220, height: 160, objectFit: "contain", borderRadius: 8, border: `2.5px solid ${C.gold}`, cursor: "pointer", background: "#f8f8f8", margin: "0 auto" }}
                    alt="ID Proof"
                    onClick={() => setFullViewImg(u.governmentIdUrl)}
                    title="Click to enlarge ID document"
                  />
                  <div style={{ fontSize: 10, color: C.primary, marginTop: 4, fontWeight: 600 }}>🔍 Click to enlarge</div>
                </div>
              </div>
            ) : (
              <div style={{ padding: "12px 0", textAlign: "center", color: C.error, fontSize: 13, fontWeight: 600 }}>
                This applicant has not uploaded any government ID document.
              </div>
            )}

            {/* ID meta info */}
            {(u.governmentIdType || u.idType || u.idNumber) && (
              <div style={{ marginTop: 12, display: "flex", gap: 16, flexWrap: "wrap", fontSize: 12 }}>
                {(u.governmentIdType || u.idType) && (
                  <span style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 6, padding: "3px 10px", fontWeight: 600, color: "#92400e" }}>
                    📄 {u.governmentIdType || u.idType}
                  </span>
                )}
                {u.idNumber && (
                  <span style={{ background: "#f5f3ff", border: "1px solid #ddd6fe", borderRadius: 6, padding: "3px 10px", fontFamily: "monospace", fontWeight: 700, color: "#5b21b6" }}>
                    # {u.idNumber}
                  </span>
                )}
              </div>
            )}
          </div>

          {/* ── Action Buttons ── */}
          <div style={{ display: "flex", gap: 10 }}>
            <Btn onClick={() => setReviewUser(u)} variant="success" full><Ic n="check" s={14} c="#fff" /> ✅ Approve Profile</Btn>
            <Btn onClick={() => onReject(u.uid)} variant="danger" full><Ic n="x" s={14} c="#fff" /> ❌ Reject</Btn>
          </div>
        </div>
      ))}

      {/* ── Review Modal ── */}
      {reviewUser && (
        <StrictReviewModal
          user={reviewUser}
          onClose={() => setReviewUser(null)}
          onConfirm={() => {
            onApprove(reviewUser.uid);
            setReviewUser(null);
          }}
        />
      )}

      {/* ── Full-Size Image Lightbox ── */}
      {fullViewImg && (
        <div
          onClick={() => setFullViewImg(null)}
          style={{
            position: "fixed", inset: 0,
            background: "rgba(0,0,0,0.85)",
            display: "flex", alignItems: "center", justifyContent: "center",
            zIndex: 999999, cursor: "zoom-out", padding: 24
          }}
        >
          <div style={{ position: "relative", maxWidth: 800, width: "100%" }}>
            <button
              onClick={() => setFullViewImg(null)}
              style={{ position: "absolute", top: -40, right: 0, background: "none", border: "none", color: "#fff", fontSize: 28, cursor: "pointer", lineHeight: 1 }}
            >✕</button>
            <img
              src={fullViewImg}
              style={{ width: "100%", maxHeight: "80vh", objectFit: "contain", borderRadius: 12, border: `3px solid ${C.gold}` }}
              alt="Full size view"
              onClick={e => e.stopPropagation()}
            />
            <div style={{ textAlign: "center", color: "rgba(255,255,255,0.6)", fontSize: 12, marginTop: 10 }}>{t("Click outside the image to close")}</div>
          </div>
        </div>
      )}
    </div>
  );
}
// ─── ADMIN USERS ──────────────────────────────────────────────────────────
function AdminUsers({ isMobile, users, onVerify, onBlock, onDelete, onHoverUser, onHoverPosition }: any) {
  const { t } = useLang();
  const [search, setSearch] = useState("");
  const [gFilter, setGFilter] = useState("all");
  const [sFilter, setSFilter] = useState("all");

  const filtered = users.filter(u =>
    (u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase())) &&
    (gFilter === "all" || u.gender === gFilter) &&
    (sFilter === "all" || u.status === sFilter)
  );

  const statusColor = { approved: C.success, pending: C.warning, blocked: C.error };

  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 16 }}>All Profiles ({filtered.length})</div>
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 10, marginBottom: 16 }}>
        <div style={{ flex: 1, position: "relative" }}>
          <span style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)" }}><Ic n="search" s={16} c={C.muted} /></span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name or email..."
            style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "9px 14px 9px 34px", fontSize: 13, outline: "none" }} />
        </div>
        <div style={{ display: "flex", gap: 10, width: isMobile ? "100%" : "auto" }}>
          <select value={gFilter} onChange={e => setGFilter(e.target.value)} style={{ flex: isMobile ? 1 : "none", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", fontSize: 13, outline: "none" }}>
            <option value="all">{t("All Genders")}</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
          <select value={sFilter} onChange={e => setSFilter(e.target.value)} style={{ flex: isMobile ? 1 : "none", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "9px 12px", fontSize: 13, outline: "none" }}>
            <option value="all">{t("All Status")}</option>
            <option value="approved">{t("Approved")}</option>
            <option value="pending">Pending</option>
            <option value="blocked">{t("Blocked")}</option>
          </select>
        </div>
      </div>

      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: `${C.primary}08` }}>
              {["Profile", "Location & Details", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 700, color: C.text, borderBottom: `1px solid ${C.border}`, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map(u => (
              <tr key={u.uid} style={{ borderBottom: `1px solid ${C.bg}` }}>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <img 
                      src={u.profilePhoto} 
                      style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover", border: `2px solid ${C.border}`, cursor: "pointer" }} 
                      alt={u.name} 
                      onMouseEnter={() => onHoverUser(u)}
                      onMouseMove={(e) => onHoverPosition({ x: e.clientX, y: e.clientY })}
                      onMouseLeave={() => onHoverUser(null)}
                    />
                    <div>
                      <div style={{ fontWeight: 700, color: C.text, display: "flex", alignItems: "center", gap: 6 }}>
                        {u.name}, {u.age}
                        {u.isVerified && <span style={{ color: C.gold, fontSize: 13 }} title="Identity Verified">⭐</span>}
                        {!u.isVerified && (u.governmentIdType || u.idType) && <span style={{ background: "#fef3c7", color: "#d97706", fontSize: 9, fontWeight: 700, padding: "1px 5px", borderRadius: 4 }} title={`${u.governmentIdType || u.idType} submitted, awaiting verification`}>{t("Pending Verify")}</span>}
                      </div>
                      <div style={{ fontSize: 11, color: C.muted }}>{u.email}</div>
                      <div style={{ fontSize: 10, color: C.muted }}>{u.gender === "male" ? "♂ Groom" : "♀ Bride"}</div>
                    </div>
                  </div>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ color: C.muted, fontSize: 12 }}>{u.caste}</div>
                  <div style={{ color: C.muted, fontSize: 11, marginTop: 2 }}>{u.education}</div>
                  <div style={{ color: C.muted, fontSize: 11, display: "flex", alignItems: "center", gap: 3, marginTop: 2 }}>
                    <Ic n="pin" s={10} c={C.muted} /> {u.location}
                  </div>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <span style={{ background: `${statusColor[u.status]}20`, color: statusColor[u.status], borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>
                    {u.status}
                  </span>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 4 }}>{fmtDate(u.createdAt)}</div>
                </td>
                <td style={{ padding: "12px 14px" }}>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                    <button onClick={() => onVerify(u.uid)} title={u.isVerified ? "Remove Verify" : "Verify"} style={{ background: u.isVerified ? "#fef3c7" : "#ecfdf5", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", fontSize: 11, fontWeight: 600, color: u.isVerified ? "#92400e" : C.success }}>
                      {u.isVerified ? "⭐ Unverify" : "Verify ✓"}
                    </button>
                    <button onClick={() => onBlock(u.uid)} style={{ background: u.status === "blocked" ? "#ecfdf5" : "#fef2f2", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", fontSize: 11, fontWeight: 600, color: u.status === "blocked" ? C.success : C.error }}>
                      {u.status === "blocked" ? "Unblock" : "Block"}
                    </button>
                    <button onClick={() => onDelete(u.uid, u.name)} style={{ background: "#fef2f2", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", color: C.error }}>
                      <Ic n="trash" s={13} c={C.error} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── ADMIN CREATE PROFILE ─────────────────────────────────────────────────
function AdminCreateProfile({ isMobile, onSave }) {
  const { t } = useLang();
  const [form, setForm] = useState({
    name: "", email: "", gender: "male", dob: "", age: 25, height: "5'4\"",
    profileFor: "Myself", motherTongue: "Gujarati", religion: "Hindu", caste: "Dhobi",
    education: "Bachelor's Degree", institute: "",
    jobType: "Business", salary: "₹50,000 - ₹1,00,000",
    diet: "Vegetarian", challenged: "No", maritalStatus: "Never Married",
    location: "", about: "",
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop",
    status: "approved", isVerified: false, membership: "free",
  });
  const [toast, showToast] = useToast();
  const f = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const save = () => {
    if (!form.name || !form.email) { showToast("Name and Email are required.", "error"); return; }
    onSave({ ...form, uid: `admin_${Date.now()}`, createdAt: new Date().toISOString(), age: form.dob ? calcAge(form.dob) : form.age });
  };

  return (
    <div>
      <Toast msg={toast.msg} type={toast.type} />
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 20 }}>{t("Add New Profile")}</div>
      <div style={{ background: C.white, borderRadius: 14, padding: 24, border: `1px solid ${C.border}` }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: "0 16px" }}>
          <Input label="Full Name" value={form.name} onChange={e => f("name", e.target.value)} placeholder="Full Name" required />
          <Input label="Email Address" value={form.email} onChange={e => f("email", e.target.value)} placeholder="name@example.com" required />
          <Select label="Gender" value={form.gender} onChange={e => f("gender", e.target.value)} options={[{ value: "male", label: "Male (Groom)" }, { value: "female", label: "Female (Bride)" }]} />
          <Input label="Date of Birth" type="date" value={form.dob} onChange={e => f("dob", e.target.value)} />
          <Input label="City, State" value={form.location} onChange={e => f("location", e.target.value)} placeholder="e.g. Ahmedabad, Gujarat" />
          <Select label="Religion" value={form.religion} onChange={e => f("religion", e.target.value)} options={["Hindu", "Muslim", "Sikh", "Christian", "Buddhist", "Jain", "Other"].map(v => ({ value: v, label: v }))} />
          <Input label="Caste" value={form.caste} onChange={e => f("caste", e.target.value)} placeholder="e.g. Dhobi (Madivala)" />
          <Select label="Education" value={form.education} onChange={e => f("education", e.target.value)} options={["10th Pass", "12th Pass", "Diploma", "Bachelor's Degree", "Master's Degree", "PhD"].map(v => ({ value: v, label: v }))} />
          <Select label="Job Type" value={form.jobType} onChange={e => f("jobType", e.target.value)} options={["Business", "Private Job", "Govt Job", "Doctor", "Engineer", "Teacher", "Homemaker", "Other"].map(v => ({ value: v, label: v }))} />
          <Select label="Marital Status" value={form.maritalStatus} onChange={e => f("maritalStatus", e.target.value)} options={["Never Married", "Divorced", "Widowed", "Separated"].map(v => ({ value: v, label: v }))} />
          <Select label="Profile Status" value={form.status} onChange={e => f("status", e.target.value)} options={[{ value: "approved", label: "Approved" }, { value: "pending", label: "Pending" }]} />
          <Input label="Profile Photo URL" value={form.profilePhoto} onChange={e => f("profilePhoto", e.target.value)} placeholder="https://..." />
        </div>
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: C.muted, marginBottom: 5 }}>About</label>
          <textarea value={form.about} onChange={e => f("about", e.target.value)} rows={3} placeholder="Brief description..."
            style={{ width: "100%", boxSizing: "border-box", border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "10px 14px", fontSize: 13, outline: "none", fontFamily: "'Segoe UI', sans-serif", resize: "vertical" }} />
        </div>
        <Btn onClick={save} variant="primary" size="lg"><Ic n="plus" s={16} c="#fff" /> {t("Add Profile")}</Btn>
      </div>
    </div>
  );
}

// ─── ADMIN SESSIONS (SESSION MONITORING) ──────────────────────────────────
function AdminSessions({ isMobile, users }) {
  const { t } = useLang();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, showToast] = useToast();

  const fetchSessions = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE_URL + "/api/admin/sessions", {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
      });
      const data = await res.json();
      if (data.success && data.sessions) {
        setSessions(data.sessions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } else {
        showToast(data.error || "Failed to fetch sessions.", "error");
      }
    } catch (err) {
      showToast("Network error. Failed to load sessions.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const handleRevoke = async (token) => {
    if (!window.confirm("Are you sure you want to revoke this session? The user will be logged out immediately.")) return;
    try {
      const res = await fetch(API_BASE_URL + "/api/admin/sessions/revoke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ token })
      });
      const data = await res.json();
      if (data.success) {
        showToast("Session revoked successfully ✓", "success");
        setSessions(prev => prev.map(s => s.token === token ? { ...s, status: "revoked" } : s));
      } else {
        showToast(data.error || "Failed to revoke session.", "error");
      }
    } catch (err) {
      showToast("Network error. Failed to revoke session.", "error");
    }
  };

  const getUserDetails = (uid) => {
    if (uid === "admin") return { name: "Admin", email: "admin@dhobimatrimony.com" };
    const user = users.find(u => u.uid === uid);
    return user ? { name: user.name, email: user.email } : { name: `Unknown (${uid})`, email: "" };
  };

  return (
    <div>
      <Toast msg={toast.msg} type={toast.type} />
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: 10, marginBottom: 16 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>Session Monitoring ({sessions.length})</div>
        <button onClick={fetchSessions} disabled={loading} style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          🔄 {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: `${C.primary}08` }}>
              {["User", "IP & Device", "Created / Last Used", "Expires", "Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 700, color: C.text, borderBottom: `1px solid ${C.border}`, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sessions.map(s => {
              const u = getUserDetails(s.uid);
              const isRevoked = s.status === "revoked";
              const isExpired = new Date(s.expiresAt).getTime() < Date.now();
              return (
                <tr key={s.id} style={{ borderBottom: `1px solid ${C.bg}`, opacity: (isRevoked || isExpired) ? 0.6 : 1 }}>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ fontWeight: 700, color: C.text }}>{u.name}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{u.email}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>UID: {s.uid}</div>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ fontWeight: 600, color: C.text }}>{s.ip}</div>
                    <div style={{ fontSize: 11, color: C.muted, maxWidth: 200, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={s.deviceInfo}>{s.deviceInfo}</div>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ fontSize: 11, color: C.text }}>Created: {new Date(s.createdAt).toLocaleString()}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>Used: {new Date(s.lastUsedAt).toLocaleString()}</div>
                  </td>
                  <td style={{ padding: "12px 14px", fontSize: 11, color: isExpired ? C.error : C.text }}>
                    {new Date(s.expiresAt).toLocaleString()}
                    {isExpired && <span style={{ color: C.error, fontWeight: 700, marginLeft: 4 }}>(Expired)</span>}
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ 
                      background: isRevoked ? `${C.error}20` : isExpired ? "#f3f4f6" : `${C.success}20`, 
                      color: isRevoked ? C.error : isExpired ? C.muted : C.success, 
                      borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 
                    }}>
                      {isRevoked ? "Revoked" : isExpired ? "Expired" : "Active"}
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    {!isRevoked && !isExpired && (
                      <button onClick={() => handleRevoke(s.token)} style={{ background: "#fef2f2", border: "none", borderRadius: 6, padding: "5px 8px", cursor: "pointer", fontSize: 11, fontWeight: 600, color: C.error }}>
                        Revoke
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
            {sessions.length === 0 && (
              <tr>
                <td colSpan={6} style={{ padding: 24, textAlign: "center", color: C.muted }}>No sessions found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── ADMIN SETTINGS (SMTP CONFIGURATION) ──────────────────────────────────
function AdminSettings() {
  const [smtpUser, setSmtpUser] = useState("");
  const [smtpPass, setSmtpPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, showToast] = useToast();

  const handleSaveSmtp = async () => {
    if (!smtpUser || !smtpPass) {
      showToast("Both Gmail address and App Password are required.", "error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(smtpUser)) {
      showToast("Please enter a valid Gmail address.", "error");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(API_BASE_URL + "/api/admin/save-smtp", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ smtpUser: smtpUser.trim().toLowerCase(), smtpPass: smtpPass.trim() })
      });
      const data = await res.json();
      setLoading(false);

      if (data.success) {
        showToast("SMTP credentials saved and loaded successfully ✓", "success");
        setSmtpPass("");
      } else {
        showToast(data.error || "Failed to update SMTP configurations.", "error");
      }
    } catch (err) {
      setLoading(false);
      showToast("Network error. Failed to save credentials.", "error");
    }
  };

  return (
    <div>
      <Toast msg={toast.msg} type={toast.type} />
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 20 }}>📧 Email Dispatch Settings (SMTP)</div>
      <div style={{ background: C.white, borderRadius: 14, padding: 24, border: `1px solid ${C.border}`, maxWidth: 550 }}>
        <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.5, marginBottom: 20 }}>
          To send **real OTP verification codes** directly to candidate email inboxes, configure your Google Gmail SMTP credentials. For security, you must use a Google **App Password** rather than your main account password.
        </p>

        <Input 
          label="Gmail Address" 
          value={smtpUser} 
          onChange={e => setSmtpUser(e.target.value)} 
          placeholder="e.g. your-email@gmail.com" 
          required 
        />
        
        <Input 
          label="Google App Password" 
          type="password"
          value={smtpPass} 
          onChange={e => setSmtpPass(e.target.value)} 
          placeholder="16-character code (e.g. abcd efgh ijkl mnop)" 
          required 
        />

        <Btn onClick={handleSaveSmtp} variant="primary" full disabled={loading} style={{ marginTop: 8 }}>
          {loading ? "Saving & Testing Connection..." : "💾 Save & Enable Real Email"}
        </Btn>

        <div style={{ 
          marginTop: 24, 
          padding: 16, 
          background: `${C.primary}05`, 
          border: `1.5px dashed ${C.border}`, 
          borderRadius: 10,
          fontSize: 12.5,
          color: C.text
        }}>
          <div style={{ fontWeight: 700, color: C.primary, marginBottom: 6 }}>💡 How to generate a Google App Password:</div>
          <ol style={{ paddingLeft: 16, margin: 0, lineHeight: 1.6, color: C.muted }}>
            <li>Go to your **[Google Account Security settings](https://myaccount.google.com/security)**.</li>
            <li>Enable **2-Step Verification** (required by Google for app passwords).</li>
            <li>Select **App Passwords** (or search "App Passwords" in the search box).</li>
            <li>Enter a name (e.g., *Matrimony Admin*) and click **Create**.</li>
            <li>Copy the generated **16-character code** and paste it into the field above.</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

// ─── ADMIN INTERESTS ──────────────────────────────────────────────────────
function AdminInterests({ isMobile }) {
  const { t } = useLang();
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, showToast] = useToast();

  const fetchInterests = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE_URL + "/api/admin/interests", {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await res.json();
      if (data.success && data.interests) {
        setInterests(data.interests.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } else {
        showToast(data.error || "Failed to fetch interests.", "error");
      }
    } catch (err) {
      showToast("Network error. Failed to load interests.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterests();
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case "accepted": return { background: `${C.success}20`, color: C.success };
      case "rejected": return { background: `${C.error}20`, color: C.error };
      default: return { background: `${C.warning}20`, color: C.warning };
    }
  };

  return (
    <div>
      <Toast msg={toast.msg} type={toast.type} />
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: 10, marginBottom: 16 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>All Interests ({interests.length})</div>
        <button onClick={fetchInterests} disabled={loading} style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          🔄 {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: `${C.primary}08` }}>
              {["Sender", "Direction", "Recipient", "Sent Date", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 700, color: C.text, borderBottom: `1px solid ${C.border}`, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {interests.map(i => {
              const st = getStatusStyle(i.status);
              return (
                <tr key={i.id} style={{ borderBottom: `1px solid ${C.bg}` }}>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ fontWeight: 700, color: C.text }}>{i.senderName}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{i.senderEmail}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>UID: {i.senderId}</div>
                  </td>
                  <td style={{ padding: "12px 14px", fontSize: 18, color: C.gold, fontWeight: "bold" }}>
                    ➔
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ fontWeight: 700, color: C.text }}>{i.receiverName}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{i.receiverEmail}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>UID: {i.receiverId}</div>
                  </td>
                  <td style={{ padding: "12px 14px", fontSize: 11, color: C.text }}>
                    {new Date(i.createdAt).toLocaleString("en-IN")}
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ 
                      background: st.background, 
                      color: st.color, 
                      borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 
                    }}>
                      {i.status}
                    </span>
                  </td>
                </tr>
              );
            })}
            {interests.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: 24, textAlign: "center", color: C.muted }}>No interest requests found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── ADMIN REPORTS ────────────────────────────────────────────────────────
function AdminReports({ isMobile, users, setUsers, reports, refetchReports }) {
  const { t } = useLang();
  const [loading, setLoading] = useState(false);
  const [toast, showToast] = useToast();

  const handleResolve = async (reportId, nextStatus) => {
    try {
      const res = await fetch(API_BASE_URL + "/api/admin/reports/resolve", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ reportId, status: nextStatus })
      });
      const data = await res.json();
      if (data.success) {
        showToast(`Report updated to ${nextStatus}.`, "success");
        refetchReports();
      } else {
        showToast(data.error || "Failed to update report status.", "error");
      }
    } catch (err) {
      showToast("Network error.", "error");
    }
  };

  const handleSuspend = async (uid, reportId) => {
    if (!window.confirm("Are you sure you want to suspend/block this user account? All their active sessions will be terminated.")) return;
    try {
      // Step 1: Block user profile
      const res1 = await fetch(API_BASE_URL + "/api/users/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ uid, updates: { status: "blocked" } })
      });
      const data1 = await res1.json();
      if (data1.success) {
        // Step 2: Resolve report to resolved
        await fetch(API_BASE_URL + "/api/admin/reports/resolve", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
          body: JSON.stringify({ reportId, status: "resolved" })
        });
        
        showToast("User suspended and report resolved ✓", "success");
        setUsers(prev => prev.map(u => u.uid === uid ? { ...u, status: "blocked" } : u));
        refetchReports();
      } else {
        showToast(data1.error || "Failed to suspend user.", "error");
      }
    } catch (err) {
      showToast("Network error.", "error");
    }
  };

  const handleUnban = async (uid) => {
    try {
      const res = await fetch(API_BASE_URL + "/api/users/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ uid, updates: { status: "approved" } })
      });
      const data = await res.json();
      if (data.success) {
        showToast("User account reactivated.", "success");
        setUsers(prev => prev.map(u => u.uid === uid ? { ...u, status: "approved" } : u));
        refetchReports();
      }
    } catch (err) {
      showToast("Network error.", "error");
    }
  };

  const getReportTypeLabel = (type) => {
    switch (type) {
      case "fake_profile": return "Fake Profile / Identity Issue";
      case "abuse": return "Abusive / Inappropriate Behavior";
      case "spam": return "Spam / Commercial Intent";
      default: return type;
    }
  };

  return (
    <div>
      <Toast msg={toast.msg} type={toast.type} />
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: 10, marginBottom: 16 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>Abuse Reports ({reports.length})</div>
        <button onClick={refetchReports} disabled={loading} style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          🔄 {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: `${C.primary}08` }}>
              {["Reporter", "Reported User", "Issue Details", "Report Status", "Actions"].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 700, color: C.text, borderBottom: `1px solid ${C.border}`, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.map(r => {
              const isPending = r.status === "pending";
              const isBlocked = r.reportedStatus === "blocked";
              return (
                <tr key={r.reportId} style={{ borderBottom: `1px solid ${C.bg}` }}>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ fontWeight: 700, color: C.text }}>{r.reporterName}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{r.reporterEmail}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>UID: {r.reporterId}</div>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ fontWeight: 700, color: C.text }}>{r.reportedName}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{r.reportedEmail}</div>
                    <div style={{ fontSize: 10, color: C.muted }}>UID: {r.reportedUserId}</div>
                    <div style={{ marginTop: 4 }}>
                      <span style={{ 
                        background: isBlocked ? `${C.error}20` : `${C.success}20`, 
                        color: isBlocked ? C.error : C.success, 
                        borderRadius: 4, padding: "2px 6px", fontSize: 9, fontWeight: 700 
                      }}>
                        Account: {r.reportedStatus || "approved"}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "12px 14px", maxWidth: 300 }}>
                    <div style={{ fontWeight: 700, color: C.primary }}>{getReportTypeLabel(r.type)}</div>
                    <div style={{ fontSize: 12, color: C.text, marginTop: 4, whiteSpace: "pre-wrap", lineHeight: 1.4 }}>"{r.details}"</div>
                    <div style={{ fontSize: 10, color: C.muted, marginTop: 6 }}>Submitted: {new Date(r.createdAt).toLocaleString("en-IN")}</div>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <span style={{ 
                      background: r.status === "resolved" ? `${C.success}20` : r.status === "dismissed" ? "#f3f4f6" : `${C.warning}20`, 
                      color: r.status === "resolved" ? C.success : r.status === "dismissed" ? C.muted : C.warning, 
                      borderRadius: 20, padding: "3px 10px", fontSize: 11, fontWeight: 700 
                    }}>
                      {r.status}
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", gap: 6, flexDirection: "column" }}>
                      {isPending && (
                        <>
                          <button onClick={() => handleResolve(r.reportId, "dismissed")} style={{ background: "#f3f4f6", border: "none", borderRadius: 6, padding: "6px 10px", cursor: "pointer", fontSize: 11, fontWeight: 600, color: C.muted, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                            Dismiss Report
                          </button>
                          {!isBlocked && (
                            <button onClick={() => handleSuspend(r.reportedUserId, r.reportId)} style={{ background: `${C.error}15`, border: "none", borderRadius: 6, padding: "6px 10px", cursor: "pointer", fontSize: 11, fontWeight: 600, color: C.error, display: "flex", alignItems: "center", justifyContent: "center", gap: 4 }}>
                              🛑 Suspend User & Resolve
                            </button>
                          )}
                        </>
                      )}
                      {!isPending && isBlocked && (
                        <button onClick={() => handleUnban(r.reportedUserId)} style={{ background: `${C.success}15`, border: "none", borderRadius: 6, padding: "6px 10px", cursor: "pointer", fontSize: 11, fontWeight: 600, color: C.success }}>
                          Reactivate Account
                        </button>
                      )}
                      {!isPending && !isBlocked && r.status === "dismissed" && (
                        <button onClick={() => handleSuspend(r.reportedUserId, r.reportId)} style={{ background: `${C.error}15`, border: "none", borderRadius: 6, padding: "6px 10px", cursor: "pointer", fontSize: 11, fontWeight: 600, color: C.error }}>
                          🛑 Suspend User
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
            {reports.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: 24, textAlign: "center", color: C.muted }}>No reports submitted.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── ADMIN CHATS ──────────────────────────────────────────────────────────
function AdminChats({ isMobile }) {
  const { t } = useLang();
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, showToast] = useToast();

  const fetchChats = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE_URL + "/api/admin/chats", {
        headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
      });
      const data = await res.json();
      if (data.success && data.chats) {
        setChats(data.chats.sort((a, b) => b.messagesCount - a.messagesCount));
      } else {
        showToast(data.error || "Failed to fetch chat logs.", "error");
      }
    } catch (err) {
      showToast("Network error. Failed to load chat logs.", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchChats();
  }, []);

  return (
    <div>
      <Toast msg={toast.msg} type={toast.type} />
      <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", justifyContent: "space-between", alignItems: isMobile ? "flex-start" : "center", gap: 10, marginBottom: 16 }}>
        <div style={{ fontSize: 22, fontWeight: 700, color: C.text }}>Conversations & Activity Logs ({chats.length})</div>
        <button onClick={fetchChats} disabled={loading} style={{ background: C.white, border: `1.5px solid ${C.border}`, borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
          🔄 {loading ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ background: `${C.primary}08` }}>
              {["Participant 1", "Participant 2", "Total Messages", "Last Message Snippet", "Last Active"].map(h => (
                <th key={h} style={{ padding: "12px 14px", textAlign: "left", fontWeight: 700, color: C.text, borderBottom: `1px solid ${C.border}`, fontSize: 12, textTransform: "uppercase", letterSpacing: 0.5 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {chats.map((c, index) => {
              return (
                <tr key={index} style={{ borderBottom: `1px solid ${C.bg}` }}>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ fontWeight: 700, color: C.text }}>{c.user1Name}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{c.user1Email}</div>
                  </td>
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ fontWeight: 700, color: C.text }}>{c.user2Name}</div>
                    <div style={{ fontSize: 11, color: C.muted }}>{c.user2Email}</div>
                  </td>
                  <td style={{ padding: "12px 14px", textAlign: "center" }}>
                    <span style={{ 
                      background: `${C.primary}15`, 
                      color: C.primary, 
                      borderRadius: 12, padding: "4px 10px", fontSize: 12, fontWeight: 700 
                    }}>
                      {c.messagesCount}
                    </span>
                  </td>
                  <td style={{ padding: "12px 14px", maxWidth: 250, color: C.text, fontStyle: "italic" }}>
                    "{c.lastMessage}"
                  </td>
                  <td style={{ padding: "12px 14px", fontSize: 11, color: C.muted }}>
                    {c.lastTimestamp}
                  </td>
                </tr>
              );
            })}
            {chats.length === 0 && (
              <tr>
                <td colSpan={5} style={{ padding: 24, textAlign: "center", color: C.muted }}>No active conversations found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── ADMIN HELP & ABOUT ──────────────────────────────────────────────────
function AdminHelp() {
  const { t } = useLang();
  const faqs = [
    {
      q: "How do I approve a pending profile?",
      a: "Go to the 'Pending' tab. Review the applicant's profile photo and Government ID document carefully. Compare the face on the ID with the profile photo. Once satisfied, click 'Approve Profile'. A verification checklist modal will appear where you must tick all confirmation checkboxes before final approval."
    },
    {
      q: "Why can't I see the ID document for some users?",
      a: "Some users may have submitted their profile without uploading a government ID (the upload is required but rarely users find workarounds). If no ID is shown, you should NOT approve that profile. You can reject it and ask the user to re-register with a valid ID."
    },
    {
      q: "What happens when I click 'Reject'?",
      a: "Rejection permanently deletes the user's profile and all associated data from the database. The user will need to re-register from scratch using their email."
    },
    {
      q: "How do I block a user without deleting them?",
      a: "In the 'All Profiles' tab, find the user and click the 'Block' button in the Actions column. This suspends their account without deleting their data. You can unblock them later using the same button."
    },
    {
      q: "What is the difference between 'Verified' and 'Approved'?",
      a: "'Approved' means the profile is visible to other users for matchmaking. 'Verified' (⭐) means the admin has manually confirmed the user's identity by checking their government ID. All newly approved profiles via the Strict Checklist are automatically set to Verified."
    },
    {
      q: "How do I configure real email OTP sending?",
      a: "Go to the 'SMTP Settings' tab. Enter a Gmail address and its Google App Password. This enables the system to send real OTP codes to candidates' email inboxes during login/registration."
    },
    {
      q: "How do I handle abuse reports?",
      a: "Check the 'Reports' tab. Each report shows who reported, who was reported, and the reason. You can Dismiss (no action needed) or Suspend the reported user. Suspended users are blocked and all their sessions are terminated."
    },
  ];

  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.text, marginBottom: 8 }}>ℹ️ Help & About</div>
      <div style={{ fontSize: 13, color: C.muted, marginBottom: 24 }}>Administrator guide and support contacts for the Dhobi Matrimony platform.</div>

      {/* ── Contact Cards ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 14, marginBottom: 28 }}>
        {[
          { icon: "📱", title: "Rohit Parmar", sub: "Platform Manager", contact: "+91 91734 46708", href: "tel:+919173446708", bg: "#fef9f0", border: C.gold },
          { icon: "📱", title: "Ved Parmar", sub: "Technical Support", contact: "+91 6353606165", href: "tel:+916353606165", bg: "#fef9f0", border: C.gold },
          { icon: "✉️", title: "Email Support", sub: "For queries & issues", contact: "vedp9429@gmail.com", href: "mailto:vedp9429@gmail.com", bg: "#f0f4ff", border: "#6366f1" },
        ].map(card => (
          <a key={card.title} href={card.href} style={{ textDecoration: "none" }}>
            <div style={{ background: card.bg, border: `2px solid ${card.border}`, borderRadius: 14, padding: 18, cursor: "pointer", transition: "transform 0.15s", display: "flex", flexDirection: "column", gap: 6 }}
              onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
              onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
            >
              <div style={{ fontSize: 28 }}>{card.icon}</div>
              <div style={{ fontWeight: 700, fontSize: 15, color: C.text }}>{card.title}</div>
              <div style={{ fontSize: 11, color: C.muted }}>{card.sub}</div>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.primary, marginTop: 4 }}>{card.contact}</div>
            </div>
          </a>
        ))}
      </div>

      {/* ── WhatsApp Quick Links ── */}
      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: 20, marginBottom: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 14 }}>💬 Quick Contact Options</div>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="https://wa.me/919173446708" target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25d366", color: "#fff", padding: "10px 16px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 13 }}>
            <span style={{ fontSize: 18 }}>📲</span> WhatsApp Rohit
          </a>
          <a href="https://wa.me/916353606165" target="_blank" rel="noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25d366", color: "#fff", padding: "10px 16px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 13 }}>
            <span style={{ fontSize: 18 }}>📲</span> WhatsApp Ved
          </a>
          <a href="mailto:vedp9429@gmail.com"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: C.primary, color: "#fff", padding: "10px 16px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 13 }}>
            <span style={{ fontSize: 18 }}>📧</span> Send Email
          </a>
          <a href="tel:+919173446708"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#2563eb", color: "#fff", padding: "10px 16px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 13 }}>
            <span style={{ fontSize: 18 }}>📞</span> Call Rohit
          </a>
          <a href="tel:+916353606165"
            style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#2563eb", color: "#fff", padding: "10px 16px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 13 }}>
            <span style={{ fontSize: 18 }}>📞</span> Call Ved
          </a>
        </div>
      </div>

      {/* ── Admin FAQ ── */}
      <div style={{ background: C.white, borderRadius: 14, border: `1px solid ${C.border}`, padding: 20, marginBottom: 24 }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.text, marginBottom: 14 }}>❓ Frequently Asked Questions</div>
        {faqs.map((faq, i) => (
          <div key={i} style={{ borderBottom: i < faqs.length - 1 ? `1px solid ${C.bg}` : "none", paddingBottom: 12, marginBottom: 12 }}>
            <button
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
              style={{ width: "100%", background: "none", border: "none", textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 10, padding: 0, fontFamily: "'Segoe UI', sans-serif" }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: C.primary, lineHeight: 1.4 }}>Q: {faq.q}</span>
              <span style={{ fontSize: 18, color: C.muted, flexShrink: 0, lineHeight: 1 }}>{openFaq === i ? '−' : '+'}</span>
            </button>
            {openFaq === i && (
              <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7, marginTop: 8, padding: "10px 14px", background: `${C.primary}05`, borderRadius: 8, borderLeft: `3px solid ${C.primary}` }}>
                {faq.a}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── About Platform ── */}
      <div style={{ background: `linear-gradient(135deg, ${C.primary}, #5a0000)`, borderRadius: 14, padding: 24, color: "#fff" }}>
        <div style={{ fontSize: 24, marginBottom: 8 }}>💍</div>
        <div style={{ fontSize: 18, fontWeight: 700, fontFamily: "Georgia, serif", marginBottom: 6 }}>{t("Dhobi Metromani Portal")}</div>
        <div style={{ fontSize: 12, opacity: 0.8, lineHeight: 1.7 }}>
          A secure, community-first matrimonial platform built exclusively for the Dhobi (Madivala) community.
          All profiles go through strict admin verification before being made live. The platform supports OTP-based secure login,
          government ID verification, mutual consent-based matchmaking, and privacy-protected contact sharing.
        </div>
        <div style={{ marginTop: 16, display: "flex", gap: 12, flexWrap: "wrap" }}>
          <span style={{ background: "rgba(255,255,255,0.15)", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>🔐 OTP Login</span>
          <span style={{ background: "rgba(255,255,255,0.15)", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>🆔 ID Verification</span>
          <span style={{ background: "rgba(255,255,255,0.15)", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>💬 Consent Chat</span>
          <span style={{ background: "rgba(255,255,255,0.15)", padding: "4px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>🔒 Privacy First</span>
        </div>
      </div>
    </div>
  );
}

// ─── LANGUAGE SPLASH SCREEN ───────────────────────────────────────────────
function LanguageSplashScreen({ onSelect }: { onSelect: (l: LangCode) => void }) {
  const [selected, setSelected] = useState<LangCode | null>(null);
  const [animating, setAnimating] = useState(false);

  const langs: { code: LangCode; flag: string; native: string; english: string; sub: string }[] = [
    { code: "en", flag: "🇮🇳", native: "English", english: "English", sub: "Continue in English" },
    { code: "hi", flag: "🇮🇳", native: "हिंदी", english: "Hindi", sub: "हिंदी में जारी रखें" },
    { code: "gu", flag: "🇮🇳", native: "ગુજરાતી", english: "Gujarati", sub: "ગુજરાતીમાં આગળ વધો" },
  ];

  const handleSelect = (code: LangCode) => {
    setSelected(code);
    setAnimating(true);
    setTimeout(() => {
      localStorage.setItem("dhobi_lang", code);
      onSelect(code);
    }, 600);
  };

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #8B0000 0%, #4a0000 40%, #1a0000 100%)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "24px 20px",
      fontFamily: "'Segoe UI', sans-serif",
      overflow: "hidden",
      position: "relative",
    }}>
      {/* Decorative circles */}
      <div style={{ position: "absolute", top: -80, right: -80, width: 260, height: 260, borderRadius: "50%", background: "rgba(200,150,12,0.08)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", bottom: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(200,150,12,0.06)", pointerEvents: "none" }} />

      {/* Logo area */}
      <div style={{ textAlign: "center", marginBottom: 40 }}>
        <div style={{ fontSize: 60, marginBottom: 12, filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.4))" }}>💍</div>
        <div style={{ fontSize: 30, fontWeight: 800, color: "#fff", fontFamily: "Georgia, serif", letterSpacing: 0.5, marginBottom: 4 }}>Dhobi Matrimony</div>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 6 }}>धोबी मैट्रिमोनी · ધોબી મેત્રીમોની</div>
        <div style={{ width: 60, height: 2, background: "linear-gradient(90deg, transparent, #C8960C, transparent)", margin: "0 auto" }} />
      </div>

      {/* Card */}
      <div style={{
        background: "rgba(255,255,255,0.06)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 24,
        padding: "32px 24px",
        maxWidth: 400,
        width: "100%",
        boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", marginBottom: 6 }}>Choose Your Language</div>
          <div style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.6 }}>अपनी भाषा चुनें · ભાષા પસંદ કરો</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {langs.map(({ code, flag, native, english, sub }) => {
            const isSelected = selected === code;
            return (
              <button
                key={code}
                onClick={() => handleSelect(code)}
                disabled={animating}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: "18px 20px",
                  borderRadius: 16,
                  border: `2px solid ${isSelected ? "#C8960C" : "rgba(255,255,255,0.15)"}`,
                  background: isSelected
                    ? "linear-gradient(135deg, rgba(200,150,12,0.25), rgba(200,150,12,0.1))"
                    : "rgba(255,255,255,0.05)",
                  cursor: animating ? "not-allowed" : "pointer",
                  textAlign: "left",
                  transition: "all 0.2s ease",
                  transform: isSelected ? "scale(1.02)" : "scale(1)",
                  boxShadow: isSelected ? "0 4px 20px rgba(200,150,12,0.3)" : "none",
                  fontFamily: "'Segoe UI', sans-serif",
                  width: "100%",
                }}
                onMouseEnter={e => { if (!isSelected && !animating) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.1)"; }}
                onMouseLeave={e => { if (!isSelected) (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.05)"; }}
              >
                <div style={{ fontSize: 36 }}>{flag}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 20, fontWeight: 700, color: "#fff", lineHeight: 1.2 }}>{native}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.55)", marginTop: 2 }}>{sub}</div>
                </div>
                {isSelected && (
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#C8960C", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>✓</div>
                )}
              </button>
            );
          })}
        </div>

        <div style={{ marginTop: 24, textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.35)", lineHeight: 1.7 }}>
          You can change language anytime from the app settings
          <br/>आप सेटिंग्स में कभी भी बदल सकते हैं
        </div>
      </div>

      {/* Bottom tagline */}
      <div style={{ marginTop: 32, textAlign: "center" }}>
        <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", letterSpacing: 1 }}>🌸 Trusted matrimonial for Dhobi community 🌸</div>
      </div>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [users, setUsers] = useState([]);
  const [screen, setScreen] = useState("login"); // login | register | pending | userapp | admin
  const [currentUser, setCurrentUser] = useState(null);
  const [newUserEmail, setNewUserEmail] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const triggerRefresh = () => setRefreshTrigger(prev => prev + 1);
  const [bioDataUser, setBioDataUser] = useState<any>(null);

  // ── Language state ──
  const savedLang = localStorage.getItem("dhobi_lang") as LangCode | null;
  const [lang, setLangState] = useState<LangCode>(savedLang || "en");
  const [showLangSplash, setShowLangSplash] = useState(!savedLang);

  const setLang = (l: LangCode) => {
    setLangState(l);
    localStorage.setItem("dhobi_lang", l);
  };

  const t = (key: string): string => {
    const dict = TRANSLATIONS[lang] as Record<string, string>;
    return dict?.[key] ?? (TRANSLATIONS["en"] as Record<string, string>)[key] ?? key;
  };

  const handleLangSelect = (l: LangCode) => {
    setLang(l);
    setShowLangSplash(false);
  };

  // Inspect localStorage for token on load and call /api/auth/me to auto-login
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(API_BASE_URL + "/api/auth/me", {
        headers: { "Authorization": "Bearer " + token }
      })
        .then(res => res.json())
        .then(data => {
          if (data.success && data.user) {
            setCurrentUser(data.user);
            if (data.user.isAdmin) {
              setScreen("admin");
            } else if (data.user.dob && Number(calcAge(data.user.dob)) < 18) {
              localStorage.removeItem("token");
              setScreen("login");
            } else if (!data.user.name || !data.user.gender || !data.user.dob) {
              setNewUserEmail(data.user.email);
              setScreen("register");
            } else {
              setScreen(data.user.status === "approved" ? "userapp" : "pending");
            }
          } else {
            localStorage.removeItem("token");
            setScreen("login");
          }
        })
        .catch(err => {
          console.error("Auto-login failed:", err);
          localStorage.removeItem("token");
          setScreen("login");
        });
    }
  }, []);

  // Sync with persistent backend database
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch(API_BASE_URL + "/api/users", {
      headers: { "Authorization": "Bearer " + token }
    })
      .then(res => res.json())
      .then(data => {
        if (data.success && data.users) {
          setUsers(data.users);
          
          // Re-sync current logged in user details if they exist
          if (currentUser && currentUser.uid !== "admin") {
            const freshUser = data.users.find(u => u.uid === currentUser.uid);
            if (freshUser) {
              setCurrentUser(freshUser);
            }
          }
        }
      })
      .catch(err => console.error("Error loading users database:", err));
  }, [screen, currentUser?.uid, refreshTrigger]);

  const handleUserLogin = ({ isNew, email, user }) => {
    if (user && !user.isAdmin && user.dob && Number(calcAge(user.dob)) < 18) {
      alert("Access Denied: You must be at least 18 years old to use this platform.");
      localStorage.removeItem("token");
      return;
    }
    setCurrentUser(user);
    if (isNew || !user.name || !user.gender || !user.dob) {
      setNewUserEmail(email);
      setScreen("register");
    } else {
      setScreen(user.status === "approved" ? "userapp" : "pending");
    }
  };

  const [showSubmitSuccess, setShowSubmitSuccess] = useState(false);
  const [submitCountdown, setSubmitCountdown] = useState(3);

  const handleRegistration = async (userData) => {
    const isEditMode = !!currentUser;
    const finalUserData = {
      ...userData,
      uid: currentUser?.uid || userData.uid
    };
    try {
      const endpoint = isEditMode ? "/api/users/update" : "/api/users/register";
      const payload = isEditMode ? { uid: finalUserData.uid, updates: finalUserData } : finalUserData;

      const res = await fetch(API_BASE_URL + endpoint, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setUsers(prev => {
          const filtered = prev.filter(u => u.uid !== finalUserData.uid);
          return [...filtered, finalUserData];
        });
        setCurrentUser(finalUserData);
        // Show success popup with countdown
        setShowSubmitSuccess(true);
        setSubmitCountdown(3);
        let countdown = 3;
        const timer = setInterval(() => {
          countdown -= 1;
          setSubmitCountdown(countdown);
          if (countdown <= 0) {
            clearInterval(timer);
            setShowSubmitSuccess(false);
            setScreen("pending");
          }
        }, 1000);
      } else {
        console.error("Registration failed:", data.error);
        alert("Failed to save profile: " + (data.error || "Unknown error"));
        // Stop the user from continuing so they know their data is unsaved
      }
    } catch (err) {
      console.error("Registration failed:", err);
      alert("Failed to save profile due to a network or server error.");
    }
  };

  const handleAdminLogin = () => { setCurrentUser({ uid: "admin", name: "Admin", isAdmin: true }); setScreen("admin"); };

  const handleLogout = () => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch(API_BASE_URL + "/api/auth/logout", {
        method: "POST",
        headers: { "Authorization": "Bearer " + token }
      }).catch(err => console.error("Logout fetch failed:", err));
    }
    localStorage.removeItem("token");
    setCurrentUser(null);
    setScreen("login");
  };

  if (showLangSplash) {
    return <LanguageSplashScreen onSelect={handleLangSelect} />;
  }

  let screenComponent = null;
  if (screen === "login") screenComponent = <EmailLoginScreen users={users} onUserLogin={handleUserLogin} onAdminLogin={handleAdminLogin} />;
  else if (screen === "register") screenComponent = <RegistrationScreen email={currentUser?.email || newUserEmail} initialData={currentUser} onComplete={handleRegistration} onBack={() => setScreen(currentUser ? (currentUser.status === "approved" ? "userapp" : "pending") : "login")} />;
  else if (screen === "pending") screenComponent = <PendingApprovalScreen user={currentUser} onLogout={handleLogout} onDownloadBioData={setBioDataUser} onEditProfile={() => setScreen("register")} />;
  else if (screen === "admin") screenComponent = <AdminPanel users={users} setUsers={setUsers} onLogout={handleLogout} onSwitchUser={() => { setCurrentUser(users.find(u => u.status === "approved") || users[0]); setScreen("userapp"); }} />;
  else if (screen === "userapp") screenComponent = (
    <UserApp
      currentUser={currentUser}
      setCurrentUser={setCurrentUser}
      triggerRefresh={triggerRefresh}
      allUsers={users}
      setAllUsers={setUsers}
      onLogout={handleLogout}
      onSwitchAdmin={null}
      onDownloadBioData={setBioDataUser}
      onEditProfile={() => setScreen("register")}
    />
  );

  return (
    <LanguageContext.Provider value={{ lang, t, setLang }}>
      {screenComponent}
      {bioDataUser && <BioDataModal user={bioDataUser} onClose={() => setBioDataUser(null)} />}

      {/* Profile Submission Success Popup */}
      {showSubmitSuccess && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", zIndex: 99999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <div style={{ background: "#fff", borderRadius: 24, padding: 36, maxWidth: 360, width: "100%", textAlign: "center", boxShadow: "0 16px 48px rgba(0,0,0,0.3)" }}>
            <div style={{ fontSize: 60, marginBottom: 12 }}>🎉</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: C.primary, marginBottom: 8, fontFamily: "Georgia, serif" }}>Profile Submitted!</div>
            <div style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, marginBottom: 20 }}>
              Your profile and documents have been securely submitted to the admin for verification.<br />
              <strong>This process takes 24–48 hours.</strong>
            </div>
            <div style={{ background: `${C.primary}10`, border: `2px solid ${C.primary}`, borderRadius: 12, padding: "12px 20px", marginBottom: 8 }}>
              <div style={{ fontSize: 12, color: C.muted }}>Redirecting to your dashboard in</div>
              <div style={{ fontSize: 40, fontWeight: 800, color: C.primary }}>{submitCountdown}</div>
            </div>
            <div style={{ fontSize: 11, color: C.muted }}>⏳ Please wait...</div>
          </div>
        </div>
      )}

      {/* Floating language switcher */}
      <div style={{
        position: "fixed",
        bottom: 80,
        right: 16,
        zIndex: 9999,
      }}>
        <button
          id="lang-switcher-btn"
          title="Change Language / भाषा बदलें / ભાષા બદલો"
          onClick={() => setShowLangSplash(true)}
          style={{
            background: "linear-gradient(135deg, #8B0000, #5a0000)",
            color: "#fff",
            border: "2px solid #C8960C",
            borderRadius: 50,
            width: 48,
            height: 48,
            fontSize: 20,
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "transform 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
        >🌐</button>
      </div>
    </LanguageContext.Provider>
  );
}
