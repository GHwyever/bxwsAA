import { useState, useEffect } from 'react';
import { foodStorage } from '@/utils/storage';

const translations = {
  en: {
    // App
    appName: 'FreshGuard',
    appTitle: 'FreshGuard',
    homeSubtitle1: 'Money doesn\'t grow on trees',
    homeSubtitle2: 'Fight "expiry"; eliminate "waste"',
    
    // Navigation
    home: 'Home',
    addItem: 'Add Item',
    settings: 'Settings',
    
    // Home Screen
    expired: 'Expired',
    expiringSoon: 'Expiring Soon',
    fresh: 'Fresh',
    yourItems: 'Your Items',
    noItemsTitle: 'Start Your Fresh Journey',
    noItemsSubtitle: 'Scan barcode or take photo to begin',
    allItems: 'All Items',
    noItemsFound: 'No items found',
    today: 'Today',
    tomorrow: 'Tomorrow',
    days: 'days',
    
    // Item Detail
    editItem: 'Edit Item',
    itemDetails: 'Item Details',
    edit: 'Edit',
    save: 'Save',
    itemName: 'Item Name',
    enterItemName: 'Enter item name',
    productionDate: 'Production Date',
    expiryDate: 'Expiry Date',
    expiryDays: 'Days until expiry',
    enterExpiryDays: 'Enter number of days',
    
    // Camera/Scan
    photoOverview: 'Item Overview',
    photoProduction: 'Production Date',
    photoExpiry: 'Expiry Date',
    manualDays: 'Manual Entry',
    reviewPhotos: 'Review',
    photoOverviewInstructions: 'Take a clear photo of your item',
    photoProductionInstructions: 'Take a photo of the production date on the packaging',
    photoExpiryInstructions: 'Take a photo of the expiry date on the packaging',
    manualDaysInstructions: 'Enter how many days until this item expires',
    reviewPhotosInstructions: 'Review your photos and information',
    hasPackagingQuestion: 'Does this item have packaging?',
    hasPackagingDescription: 'This helps us determine how to record expiry information',
    hasPackaging: 'Has Packaging',
    noPackaging: 'No Packaging',
    itemOverview: 'Item Overview',
    productionDatePhoto: 'Production Date',
    expiryDatePhoto: 'Expiry Date',
    reviewYourPhotos: 'Review Your Photos',
    daysPlaceholder: 'e.g. 7',
    confirm: 'Confirm',
    validDaysRequired: 'Please enter a valid number of days',
    retake: 'Retake',
    usePhoto: 'Use Photo',
    recognizingItem: 'Recognizing item...',
    recognizedAs: 'Recognized as:',
    reRecognize: 'Re-recognize',
    loadingCamera: 'Loading camera...',
    cameraPermissionTitle: 'Camera Permission Required',
    cameraPermissionText: 'This app needs camera access to scan barcodes and take photos',
    grantPermission: 'Grant Permission',
    
    // Settings
    notifications: 'Notifications',
    notificationsSubtitle: 'Expiry reminders',
    voiceReminders: 'Voice Reminders',
    voiceRemindersSubtitle: 'Audio alerts for expiring items',
    language: 'Language',
    subscription: 'Subscription',
    rateApp: 'Rate App',
    rateAppSubtitle: 'Help us improve',
    help: 'Help & Support',
    helpSubtitle: 'Get assistance',
    privacy: 'Privacy Policy',
    privacySubtitle: 'Your data protection',
    clearData: 'Clear All Data',
    clearDataSubtitle: 'Remove all stored items',
    appVersion: 'App Version',
    madeWithLove: 'Made with ❤️',
    
    // Subscription
    freeTrial: 'Free Trial',
    monthlyPlan: 'Monthly Plan',
    yearlyPlan: 'Yearly Plan',
    lifetimePlan: 'Lifetime Plan',
    month: 'month',
    year: 'year',
    lifetime: 'lifetime',
    save8: 'Save $8',
    limitedTime: 'Limited Time',
    upgradeToPremium: 'Upgrade to Premium',
    unlockAllFeatures: 'Unlock all premium features',
    freeTrial7Days: '7 days free trial',
    premiumFeatures: 'Premium Features',
    choosePlan: 'Choose Your Plan',
    mostPopular: 'Most Popular',
    startFreeTrial: 'Start Free Trial',
    subscriptionDisclaimer: 'Cancel anytime. No commitment.',
    
    // Premium Features
    unlimitedItems: 'Unlimited items',
    smartNotifications: 'Smart expiry notifications',
    photoRecognition: 'Photo recognition technology',
    multiDeviceSync: 'Multi-device synchronization',
    advancedAnalytics: 'Advanced item analytics',
    prioritySupport: 'Priority customer support',
    premiumMember: 'Premium Member',
    freeUser: 'Free User',
    
    // Alerts
    deleteConfirmTitle: 'Delete Item',
    deleteConfirmMessage: 'Are you sure you want to delete this item?',
    delete: 'Delete',
    cancel: 'Cancel',
    ok: 'OK',
    error: 'Error',
    success: 'Success',
    
    // Trial Limit
    trialLimitTitle: 'Trial Limit Reached',
    trialLimitMessage: 'You can only add 5 items during the free trial. Upgrade to add unlimited items.',
    upgrade: 'Upgrade',
    
    // Validation
    nameRequired: 'Item name is required',
    expiryDateRequired: 'Expiry date is required',
    photoError: 'Failed to take photo',
    saveError: 'Failed to save item',
    itemSaved: 'Item saved successfully',
    
    // Data Management
    clearDataTitle: 'Clear All Data',
    clearDataMessage: 'This will permanently delete all your item data. This action cannot be undone.',
    clear: 'Clear',
    dataCleared: 'All data has been cleared',
    clearDataError: 'Failed to clear data',
    
    // Subscription Management
    subscriptionSuccess: 'Subscription Successful',
    subscriptionSuccessMessage: 'Welcome to Premium! Enjoy unlimited access to all features.',
    subscriptionError: 'Subscription failed. Please try again.',
    
    // Help & Support
    helpTitle: 'Help & Support',
    helpMessage: 'For support, please contact us at support@freshguard.com',
    
    // Privacy
    privacyTitle: 'Privacy Policy',
    privacyMessage: 'Your privacy is important to us. We only store data locally on your device.',
    
    // Rate App
    rateAppTitle: 'Rate FreshGuard',
    rateAppMessage: 'If you enjoy using FreshGuard, please rate us on the App Store!',
    rate: 'Rate',
    later: 'Later',
    
    // Voice Settings
    voiceSettings: 'Voice Settings',
    enableVoiceReminders: 'Enable Voice Reminders',
    voiceRemindersDescription: 'Automatically speak expiry alerts',
    voiceLanguage: 'Voice Language',
    voiceLanguageDescription: 'Language for voice announcements',
    speechRate: 'Speech Rate',
    speechPitch: 'Speech Pitch',
    speechVolume: 'Speech Volume',
    testVoice: 'Test Voice',
    stopTest: 'Stop Test',
    
    // Onboarding
    smartRecognition: 'Smart Recognition',
    smartRecognitionDesc: 'Take photos to automatically identify food types and expiry dates',
    expiryReminders: 'Expiry Reminders',
    expiryRemindersDesc: 'Timely reminders for expiring food to avoid waste',
    privacyProtection: 'Privacy Protection',
    privacyProtectionDesc: 'All data stored locally to protect your privacy',
    skip: 'Skip',
    next: 'Next',
    getStarted: 'Get Started',
    
    // Food List
    addFirstItem: 'Add Your First Item',
    
    // Common
    item: 'Item',
    items: 'Items',
    addItem: 'Add Item',
    captureItem: 'Capture Item',
    takePhoto: 'Take Photo',
    pleaseAddSomeItemsFirst: 'Please add some items first',
    
    // Privacy Policy
    privacyPolicyTitle: 'Privacy Policy',
    privacyPolicySubtitle: 'Your data protection',
    lastUpdated: 'Last updated: January 1, 2024',
    introduction: 'Introduction',
    introductionText1: 'Welcome to FreshGuard! We understand the importance of privacy, so we\'ve created this privacy policy to explain how we collect, use, store, and protect your personal information.',
    introductionText2: 'By using our app, you agree to the terms of this privacy policy. If you do not agree with this policy, please do not use our services.',
    informationWeCollect: 'Information We Collect',
    
    // Privacy Policy Content
    itemInformation: 'Item Information',
    deviceInformation: 'Device Information',
    usageData: 'Usage Data',
    howWeUseInformation: 'How We Use Information',
    dataStorageAndSecurity: 'Data Storage & Security',
    localStorageNotice: 'All your item data is stored locally on your device. We do not upload this information to our servers.',
    thirdPartyServices: 'Third-party Services',
    yourRights: 'Your Rights',
    childrensPrivacy: 'Children\'s Privacy Protection',
    policyUpdates: 'Policy Updates',
    contactUs: 'Contact Us',
    
    // Privacy Policy Details
    itemInfoDetails: '• Item names, categories, production dates, and expiry dates\n• Photos you take of items\n• Storage location and note information',
    deviceInfoDetails: '• Device model, operating system version\n• App version and usage statistics\n• Crash logs and error reports (no personal information included)',
    usageDataDetails: '• App usage frequency and feature preferences\n• Notification settings and language preferences\n• Subscription status and purchase records',
    howWeUseDetails: 'We use the collected information to:\n• Provide item expiry reminder services\n• Improve app functionality and user experience\n• Provide customer support and technical services\n• Send important service notifications\n• Analyze usage trends to optimize the product',
    dataSecurityDetails: '• All data is encrypted for storage\n• Personal information is only saved on your device\n• We do not share your item data with third parties\n• Regular security audits and updates are performed',
    thirdPartyDetails: 'We may use the following third-party services to improve app experience:\n• App stores (for app distribution and updates)\n• Crash reporting services (for bug fixes)\n• Payment processing services (for subscription management)\n\nThese services have their own privacy policies, and we recommend reviewing their terms.',
    yourRightsDetails: 'You have the right to:\n• View and modify your item data at any time\n• Delete all personal information in the app\n• Choose to receive or decline notifications\n• Uninstall the app and delete all data at any time\n• Contact us for privacy-related support',
    childrensPrivacyDetails: 'Our services are intended for users aged 13 and above. We do not knowingly collect personal information from children under 13. If you discover that we have inadvertently collected children\'s information, please contact us immediately.',
    policyUpdatesDetails: 'We may update this privacy policy from time to time. Significant changes will be communicated through in-app notifications or other appropriate means. Continued use of our services indicates acceptance of the updated policy.',
    contactUsDetails: 'If you have any questions or suggestions about this privacy policy, please contact us through the following methods:',
    contactEmail: 'Email: postmaster@patring.com',
    contactPhone: 'Customer Service: 400-123-4567',
    contactAddress: 'Address: 30 N GOULD ST NUM 47701 SHERIDAN, WY',
    updateDate: 'January 1, 2024',
    
    // Expiry Reminder Modal
    itemExpired: 'Item has expired!',
    pleaseDisposeSafely: 'Please dispose safely',
    itemExpiresToday: 'Item expires today!',
    pleaseUseImmediately: 'Please use immediately',
    itemExpiresTomorrow: 'Item expires tomorrow!',
    pleaseUseSoon: 'Please use soon',
    itemExpiresInDays: 'Item expires in {days} days',
    pleaseNoteExpiryTime: 'Please note expiry time',
    itemInGoodCondition: 'Item is in good condition',
    stayFresh: 'Stay fresh',
    remindLater: 'Remind Later',
    viewDetails: 'View Details',
    
    // Voice Messages
    voiceExpired: 'Alert! Your item has expired. Please dispose of it safely.',
    voiceExpiringToday: 'Urgent! Your item expires today. Please use it immediately.',
    voiceExpiringTomorrow: 'Warning! Your item expires tomorrow. Please use it soon.',
    voiceExpiringSoon: 'Attention! Your item expires in {days} days. Please use it soon.',
    voiceEnabled: 'Voice reminders enabled',
    voiceDisabled: 'Voice reminders disabled',
  },
  zh: {
    // App
    appName: '新鲜卫士',
    appTitle: '新鲜卫士',
    homeSubtitle1: '钱不是大风刮来的',
    homeSubtitle2: '对抗"过期"，消除"浪费"',
    
    // Navigation
    home: '首页',
    addItem: '添加物品',
    settings: '设置',
    
    // Home Screen
    expired: '已过期',
    expiringSoon: '即将过期',
    fresh: '新鲜',
    yourItems: '您的物品',
    noItemsTitle: '开始您的新鲜之旅',
    noItemsSubtitle: '扫描条码或拍照开始使用',
    allItems: '所有物品',
    noItemsFound: '未找到物品',
    today: '今天',
    tomorrow: '明天',
    days: '天',
    
    // Item Detail
    editItem: '编辑物品',
    itemDetails: '物品详情',
    edit: '编辑',
    save: '保存',
    itemName: '物品名称',
    enterItemName: '输入物品名称',
    productionDate: '生产日期',
    expiryDate: '过期日期',
    expiryDays: '距离过期天数',
    enterExpiryDays: '输入天数',
    
    // Camera/Scan
    photoOverview: '物品概览',
    photoProduction: '生产日期',
    photoExpiry: '过期日期',
    manualDays: '手动输入',
    reviewPhotos: '查看',
    photoOverviewInstructions: '为您的物品拍摄清晰照片',
    photoProductionInstructions: '拍摄包装上的生产日期',
    photoExpiryInstructions: '拍摄包装上的过期日期',
    manualDaysInstructions: '输入此物品距离过期的天数',
    reviewPhotosInstructions: '查看您的照片和信息',
    hasPackagingQuestion: '此物品有包装吗？',
    hasPackagingDescription: '这有助于我们确定如何记录过期信息',
    hasPackaging: '有包装',
    noPackaging: '无包装',
    itemOverview: '物品概览',
    productionDatePhoto: '生产日期',
    expiryDatePhoto: '过期日期',
    reviewYourPhotos: '查看您的照片',
    daysPlaceholder: '例如：7',
    confirm: '确认',
    validDaysRequired: '请输入有效的天数',
    retake: '重拍',
    usePhoto: '使用照片',
    recognizingItem: '正在识别物品...',
    recognizedAs: '识别为：',
    reRecognize: '重新识别',
    loadingCamera: '正在加载相机...',
    cameraPermissionTitle: '需要相机权限',
    cameraPermissionText: '此应用需要相机权限来扫描条码和拍照',
    grantPermission: '授予权限',
    
    // Settings
    notifications: '通知',
    notificationsSubtitle: '过期提醒',
    voiceReminders: '语音提醒',
    voiceRemindersSubtitle: '过期物品语音警报',
    language: '语言',
    subscription: '订阅',
    rateApp: '评价应用',
    rateAppSubtitle: '帮助我们改进',
    help: '帮助与支持',
    helpSubtitle: '获取帮助',
    privacy: '隐私政策',
    privacySubtitle: '您的数据保护',
    clearData: '清除所有数据',
    clearDataSubtitle: '删除所有存储的物品',
    appVersion: '应用版本',
    madeWithLove: '用❤️制作',
    
    // Subscription
    freeTrial: '免费试用',
    monthlyPlan: '月度计划',
    yearlyPlan: '年度计划',
    lifetimePlan: '终身计划',
    month: '月',
    year: '年',
    lifetime: '终身',
    save8: '节省 ¥50',
    limitedTime: '限时优惠',
    upgradeToPremium: '升级到高级版',
    unlockAllFeatures: '解锁所有高级功能',
    freeTrial7Days: '7天免费试用',
    premiumFeatures: '高级功能',
    choosePlan: '选择您的计划',
    mostPopular: '最受欢迎',
    startFreeTrial: '开始免费试用',
    subscriptionDisclaimer: '随时取消，无需承诺。',
    
    // Premium Features
    unlimitedItems: '无限物品',
    smartNotifications: '智能过期通知',
    photoRecognition: '照片识别技术',
    multiDeviceSync: '多设备同步',
    advancedAnalytics: '高级物品分析',
    prioritySupport: '优先客户支持',
    premiumMember: '高级会员',
    freeUser: '免费用户',
    
    // Alerts
    deleteConfirmTitle: '删除物品',
    deleteConfirmMessage: '您确定要删除此物品吗？',
    delete: '删除',
    cancel: '取消',
    ok: '确定',
    error: '错误',
    success: '成功',
    
    // Trial Limit
    trialLimitTitle: '试用限制已达到',
    trialLimitMessage: '免费试用期间只能添加5个物品。升级以添加无限物品。',
    upgrade: '升级',
    
    // Validation
    nameRequired: '物品名称是必需的',
    expiryDateRequired: '过期日期是必需的',
    photoError: '拍照失败',
    saveError: '保存物品失败',
    itemSaved: '物品保存成功',
    saving: '保存中...',
    notSet: '未设置',
    
    // Data Management
    clearDataTitle: '清除所有数据',
    clearDataMessage: '这将永久删除您的所有物品数据。此操作无法撤销。',
    clear: '清除',
    dataCleared: '所有数据已清除',
    clearDataError: '清除数据失败',
    
    // Subscription Management
    subscriptionSuccess: '订阅成功',
    subscriptionSuccessMessage: '欢迎使用高级版！享受所有功能的无限访问。',
    subscriptionError: '订阅失败。请重试。',
    
    // Help & Support
    helpTitle: '帮助与支持',
    helpMessage: '如需支持，请联系我们：support@freshguard.com',
    
    // Privacy
    privacyTitle: '隐私政策',
    privacyMessage: '您的隐私对我们很重要。我们只在您的设备上本地存储数据。',
    
    // Rate App
    rateAppTitle: '评价新鲜卫士',
    rateAppMessage: '如果您喜欢使用新鲜卫士，请在应用商店给我们评分！',
    rate: '评分',
    later: '稍后',
    
    // Voice Settings
    voiceSettings: '语音设置',
    enableVoiceReminders: '启用语音提醒',
    voiceRemindersDescription: '自动播报过期警报',
    voiceLanguage: '语音语言',
    voiceLanguageDescription: '语音播报的语言',
    speechRate: '语音速度',
    speechPitch: '语音音调',
    speechVolume: '语音音量',
    testVoice: '测试语音',
    stopTest: '停止测试',
    
    // Onboarding
    smartRecognition: '智能识别',
    smartRecognitionDesc: '拍照自动识别食物类型和过期日期',
    expiryReminders: '过期提醒',
    expiryRemindersDesc: '及时提醒过期食物，避免浪费',
    privacyProtection: '隐私保护',
    privacyProtectionDesc: '所有数据本地存储，保护您的隐私',
    skip: '跳过',
    next: '下一步',
    getStarted: '开始使用',
    
    // Food List
    addFirstItem: '添加您的第一个物品',
    
    // Common
    item: '物品',
    items: '物品',
    addItem: '添加物品',
    captureItem: '拍摄物品',
    takePhoto: '拍照',
    pleaseAddSomeItemsFirst: '请先添加一些物品',
    
    // Privacy Policy
    privacyPolicyTitle: '隐私政策',
    privacyPolicySubtitle: '您的数据保护',
    lastUpdated: '最后更新: 2024年1月1日',
    introduction: '介绍',
    introductionText1: '欢迎使用新鲜卫士！我们理解隐私的重要性，因此制定了这份隐私政策来说明我们如何收集、使用、存储和保护您的个人信息。',
    introductionText2: '使用我们的应用即表示您同意本隐私政策的条款。如果您不同意本政策，请不要使用我们的服务。',
    informationWeCollect: '我们收集的信息',
    
    // Privacy Policy Content
    itemInformation: '物品信息',
    deviceInformation: '设备信息',
    usageData: '使用数据',
    howWeUseInformation: '我们如何使用信息',
    dataStorageAndSecurity: '数据存储与安全',
    localStorageNotice: '您的所有物品数据都存储在您的设备本地。我们不会将此信息上传到我们的服务器。',
    thirdPartyServices: '第三方服务',
    yourRights: '您的权利',
    childrensPrivacy: '儿童隐私保护',
    policyUpdates: '政策更新',
    contactUs: '联系我们',
    
    // Privacy Policy Details
    itemInfoDetails: '• 物品名称、类别、生产日期和过期日期\n• 您拍摄的物品照片\n• 存储位置和备注信息',
    deviceInfoDetails: '• 设备型号、操作系统版本\n• 应用版本和使用统计\n• 崩溃日志和错误报告（不包含个人信息）',
    usageDataDetails: '• 应用使用频率和功能偏好\n• 通知设置和语言偏好\n• 订阅状态和购买记录',
    howWeUseDetails: '我们使用收集的信息来：\n• 提供物品过期提醒服务\n• 改进应用功能和用户体验\n• 提供客户支持和技术服务\n• 发送重要服务通知\n• 分析使用趋势以优化产品',
    dataSecurityDetails: '• 所有数据都经过加密存储\n• 个人信息仅保存在您的设备上\n• 我们不会与第三方共享您的物品数据\n• 定期进行安全审计和更新',
    thirdPartyDetails: '我们可能使用以下第三方服务来改善应用体验：\n• 应用商店（用于应用分发和更新）\n• 崩溃报告服务（用于错误修复）\n• 支付处理服务（用于订阅管理）\n\n这些服务有自己的隐私政策，我们建议您查看其条款。',
    yourRightsDetails: '您有权：\n• 随时查看和修改您的物品数据\n• 删除应用中的所有个人信息\n• 选择接收或拒绝通知\n• 随时卸载应用并删除所有数据\n• 就隐私相关问题联系我们',
    childrensPrivacyDetails: '我们的服务面向13岁及以上的用户。我们不会故意收集13岁以下儿童的个人信息。如果您发现我们无意中收集了儿童信息，请立即联系我们。',
    policyUpdatesDetails: '我们可能会不时更新此隐私政策。重大变更将通过应用内通知或其他适当方式进行沟通。继续使用我们的服务表示接受更新后的政策。',
    contactUsDetails: '如果您对此隐私政策有任何问题或建议，请通过以下方式联系我们：',
    contactEmail: '邮箱：postmaster@patring.com',
    contactPhone: '客服电话：400-123-4567',
    contactAddress: '地址：30 N GOULD ST NUM 47701 SHERIDAN, WY',
    updateDate: '2024年1月1日',
    
    // Expiry Reminder Modal
    itemExpired: '物品已过期！',
    pleaseDisposeSafely: '请安全处理',
    itemExpiresToday: '物品今天过期！',
    pleaseUseImmediately: '请立即使用',
    itemExpiresTomorrow: '物品明天过期！',
    pleaseUseSoon: '请尽快使用',
    itemExpiresInDays: '物品{days}天后过期',
    pleaseNoteExpiryTime: '请注意过期时间',
    itemInGoodCondition: '物品状态良好',
    stayFresh: '保持新鲜',
    remindLater: '稍后提醒',
    viewDetails: '查看详情',
    
    // Voice Messages
    voiceExpired: '警告！您的物品已过期，请安全处理。',
    voiceExpiringToday: '紧急！您的物品今天过期，请立即使用。',
    voiceExpiringTomorrow: '注意！您的物品明天过期，请尽快使用。',
    voiceExpiringSoon: '提醒！您的物品将在{days}天后过期，请尽快使用。',
    voiceEnabled: '语音提醒已启用',
    voiceDisabled: '语音提醒已关闭',
  },
  ja: {
    // App
    appName: 'フレッシュガード',
    appTitle: 'フレッシュガード',
    homeSubtitle1: 'お金は木に生えない',
    homeSubtitle2: '「期限切れ」と戦い、「無駄」をなくす',
    
    // Navigation
    home: 'ホーム',
    addItem: 'アイテム追加',
    settings: '設定',
    
    // Home Screen
    expired: '期限切れ',
    expiringSoon: 'もうすぐ期限切れ',
    fresh: '新鮮',
    yourItems: 'あなたのアイテム',
    noItemsTitle: 'フレッシュな旅を始めよう',
    noItemsSubtitle: 'バーコードをスキャンするか写真を撮って開始',
    allItems: 'すべてのアイテム',
    noItemsFound: 'アイテムが見つかりません',
    today: '今日',
    tomorrow: '明日',
    days: '日',
    
    // Voice Messages
    voiceExpired: '警告！アイテムの期限が切れています。安全に処分してください。',
    voiceExpiringToday: '緊急！アイテムが今日期限切れになります。すぐに使用してください。',
    voiceExpiringTomorrow: '注意！アイテムが明日期限切れになります。お早めに使用してください。',
    voiceExpiringSoon: 'お知らせ！アイテムが{days}日後に期限切れになります。お早めに使用してください。',
    voiceEnabled: '音声リマインダーが有効になりました',
    voiceDisabled: '音声リマインダーが無効になりました',
    
    // Item Detail
    editItem: 'アイテムを編集',
    itemDetails: 'アイテム詳細',
    edit: '編集',
    save: '保存',
    itemName: 'アイテム名',
    enterItemName: 'アイテム名を入力',
    productionDate: '製造日',
    expiryDate: '賞味期限',
    expiryDays: '賞味期限までの日数',
    enterExpiryDays: '日数を入力',
    
    // Camera/Scan
    photoOverview: 'アイテム概要',
    photoOverviewInstructions: 'アイテムの鮮明な写真を撮影してください',
    validDaysRequired: '有効な日数を入力してください',
    retake: '再撮影',
    usePhoto: '写真を使用',
    loadingCamera: 'カメラを読み込み中...',
    cameraPermissionTitle: 'カメラ権限が必要です',
    cameraPermissionText: 'このアプリはバーコードスキャンと写真撮影のためにカメラアクセスが必要です',
    grantPermission: '権限を付与',
    
    // Settings
    notifications: '通知',
    notificationsSubtitle: '期限切れリマインダー',
    voiceReminders: '音声リマインダー',
    voiceRemindersSubtitle: '期限切れアイテムの音声アラート',
    language: '言語',
    subscription: 'サブスクリプション',
    rateApp: 'アプリを評価',
    rateAppSubtitle: '改善にご協力ください',
    help: 'ヘルプとサポート',
    helpSubtitle: 'サポートを受ける',
    privacy: 'プライバシーポリシー',
    privacySubtitle: 'データ保護について',
    clearData: 'すべてのデータを削除',
    clearDataSubtitle: '保存されたアイテムをすべて削除',
    appVersion: 'アプリバージョン',
    madeWithLove: '❤️で作られました',
    
    // Subscription
    freeTrial: '無料トライアル',
    monthlyPlan: '月額プラン',
    yearlyPlan: '年額プラン',
    lifetimePlan: '生涯プラン',
    month: '月',
    year: '年',
    lifetime: '生涯',
    save8: '¥800節約',
    limitedTime: '期間限定',
    upgradeToPremium: 'プレミアムにアップグレード',
    unlockAllFeatures: 'すべてのプレミアム機能をアンロック',
    freeTrial7Days: '7日間無料トライアル',
    premiumFeatures: 'プレミアム機能',
    choosePlan: 'プランを選択',
    mostPopular: '最も人気',
    startFreeTrial: '無料トライアルを開始',
    subscriptionDisclaimer: 'いつでもキャンセル可能。コミットメント不要。',
    
    // Premium Features
    unlimitedItems: '無制限アイテム',
    smartNotifications: 'スマート期限切れ通知',
    photoRecognition: '写真認識技術',
    multiDeviceSync: 'マルチデバイス同期',
    advancedAnalytics: '高度なアイテム分析',
    prioritySupport: '優先カスタマーサポート',
    premiumMember: 'プレミアム会員',
    freeUser: '無料ユーザー',
    
    // Alerts
    deleteConfirmTitle: 'アイテムを削除',
    deleteConfirmMessage: 'このアイテムを削除してもよろしいですか？',
    delete: '削除',
    cancel: 'キャンセル',
    ok: 'OK',
    error: 'エラー',
    success: '成功',
    
    // Trial Limit
    trialLimitTitle: 'トライアル制限に達しました',
    trialLimitMessage: '無料トライアル中は5個のアイテムのみ追加できます。無制限にアイテムを追加するにはアップグレードしてください。',
    upgrade: 'アップグレード',
    
    // Validation
    nameRequired: 'アイテム名は必須です',
    expiryDateRequired: '賞味期限は必須です',
    photoError: '写真の撮影に失敗しました',
    saveError: 'アイテムの保存に失敗しました',
    itemSaved: 'アイテムが正常に保存されました',
    saving: '保存中...',
    notSet: '未設定',
    
    // Data Management
    clearDataTitle: 'すべてのデータを削除',
    clearDataMessage: 'これによりすべてのアイテムデータが永久に削除されます。この操作は元に戻せません。',
    clear: '削除',
    dataCleared: 'すべてのデータが削除されました',
    clearDataError: 'データの削除に失敗しました',
    
    // Subscription Management
    subscriptionSuccess: 'サブスクリプション成功',
    subscriptionSuccessMessage: 'プレミアムへようこそ！すべての機能への無制限アクセスをお楽しみください。',
    subscriptionError: 'サブスクリプションに失敗しました。もう一度お試しください。',
    
    // Help & Support
    helpTitle: 'ヘルプとサポート',
    helpMessage: 'サポートについては、support@freshguard.comまでお問い合わせください',
    
    // Privacy
    privacyTitle: 'プライバシーポリシー',
    privacyMessage: 'あなたのプライバシーは私たちにとって重要です。データはデバイス上にのみローカルに保存されます。',
    
    // Rate App
    rateAppTitle: 'FreshGuardを評価',
    rateAppMessage: 'FreshGuardをお楽しみいただけましたら、App Storeで評価をお願いします！',
    rate: '評価',
    later: '後で',
    
    // Voice Settings
    voiceSettings: '音声設定',
    enableVoiceReminders: '音声リマインダーを有効にする',
    voiceRemindersDescription: '期限切れアラートを自動的に音声で通知',
    voiceLanguage: '音声言語',
    voiceLanguageDescription: '音声アナウンスの言語',
    speechRate: '音声速度',
    speechPitch: '音声ピッチ',
    speechVolume: '音声音量',
    testVoice: '音声テスト',
    stopTest: 'テスト停止',
    
    // Onboarding
    smartRecognition: 'スマート認識',
    smartRecognitionDesc: '写真を撮影して食品の種類と賞味期限を自動識別',
    expiryReminders: '期限切れリマインダー',
    expiryRemindersDesc: '期限切れ食品のタイムリーなリマインダーで無駄を回避',
    privacyProtection: 'プライバシー保護',
    privacyProtectionDesc: 'すべてのデータをローカルに保存してプライバシーを保護',
    skip: 'スキップ',
    next: '次へ',
    getStarted: '開始',
    
    // Food List
    addFirstItem: '最初のアイテムを追加',
    
    // Common
    item: 'アイテム',
    items: 'アイテム',
    addItem: 'アイテム追加',
    captureItem: 'アイテム撮影',
    takePhoto: '写真撮影',
    pleaseAddSomeItemsFirst: '最初にアイテムを追加してください',
    
    // Privacy Policy
    privacyPolicyTitle: 'プライバシーポリシー',
    privacyPolicySubtitle: 'データ保護について',
    lastUpdated: '最終更新: 2024年1月1日',
    introduction: 'はじめに',
    introductionText1: 'FreshGuardへようこそ！私たちはプライバシーの重要性を理解しており、個人情報の収集、使用、保存、保護方法を説明するためにこのプライバシーポリシーを作成しました。',
    introductionText2: 'アプリを使用することで、このプライバシーポリシーの条項に同意したことになります。このポリシーに同意しない場合は、サービスを使用しないでください。',
    informationWeCollect: '収集する情報',
    
    // Privacy Policy Content
    itemInformation: 'アイテム情報',
    deviceInformation: 'デバイス情報',
    usageData: '使用データ',
    howWeUseInformation: '情報の使用方法',
    dataStorageAndSecurity: 'データ保存とセキュリティ',
    localStorageNotice: 'すべてのアイテムデータはデバイス上にローカルに保存されます。この情報をサーバーにアップロードすることはありません。',
    thirdPartyServices: 'サードパーティサービス',
    yourRights: 'あなたの権利',
    childrensPrivacy: '子どものプライバシー保護',
    policyUpdates: 'ポリシーの更新',
    contactUs: 'お問い合わせ',
    
    // Privacy Policy Details
    itemInfoDetails: '• アイテム名、カテゴリ、製造日、賞味期限\n• 撮影したアイテムの写真\n• 保存場所とメモ情報',
    deviceInfoDetails: '• デバイスモデル、オペレーティングシステムバージョン\n• アプリバージョンと使用統計\n• クラッシュログとエラーレポート（個人情報は含まれません）',
    usageDataDetails: '• アプリ使用頻度と機能設定\n• 通知設定と言語設定\n• サブスクリプション状況と購入記録',
    howWeUseDetails: '収集した情報は以下の目的で使用します：\n• アイテム期限切れリマインダーサービスの提供\n• アプリ機能とユーザー体験の改善\n• カスタマーサポートと技術サービスの提供\n• 重要なサービス通知の送信\n• 使用傾向の分析による製品最適化',
    dataSecurityDetails: '• すべてのデータは暗号化して保存\n• 個人情報はデバイス上にのみ保存\n• アイテムデータを第三者と共有しません\n• 定期的なセキュリティ監査と更新を実施',
    thirdPartyDetails: 'アプリ体験向上のため、以下のサードパーティサービスを使用する場合があります：\n• アプリストア（アプリ配布と更新用）\n• クラッシュレポートサービス（バグ修正用）\n• 決済処理サービス（サブスクリプション管理用）\n\nこれらのサービスには独自のプライバシーポリシーがあり、その条項を確認することをお勧めします。',
    yourRightsDetails: 'あなたには以下の権利があります：\n• いつでもアイテムデータを表示・変更する\n• アプリ内のすべての個人情報を削除する\n• 通知の受信または拒否を選択する\n• いつでもアプリをアンインストールしてすべてのデータを削除する\n• プライバシー関連のサポートについてお問い合わせする',
    childrensPrivacyDetails: '当サービスは13歳以上のユーザーを対象としています。13歳未満の子どもから故意に個人情報を収集することはありません。誤って子どもの情報を収集したことが判明した場合は、直ちにお問い合わせください。',
    policyUpdatesDetails: 'このプライバシーポリシーは随時更新される場合があります。重要な変更については、アプリ内通知またはその他の適切な手段でお知らせします。サービスの継続利用は、更新されたポリシーへの同意を示します。',
    contactUsDetails: 'このプライバシーポリシーについてご質問やご提案がございましたら、以下の方法でお問い合わせください：',
    contactEmail: 'メール：postmaster@patring.com',
    contactPhone: 'カスタマーサービス：400-123-4567',
    contactAddress: '住所：30 N GOULD ST NUM 47701 SHERIDAN, WY',
    updateDate: '2024年1月1日',
    
    // Expiry Reminder Modal
    itemExpired: 'アイテムの期限が切れています！',
    pleaseDisposeSafely: '安全に処分してください',
    itemExpiresToday: 'アイテムが今日期限切れになります！',
    pleaseUseImmediately: 'すぐに使用してください',
    itemExpiresTomorrow: 'アイテムが明日期限切れになります！',
    pleaseUseSoon: 'お早めに使用してください',
    itemExpiresInDays: 'アイテムが{days}日後に期限切れになります',
    pleaseNoteExpiryTime: '期限にご注意ください',
    itemInGoodCondition: 'アイテムは良好な状態です',
    stayFresh: '新鮮さを保つ',
    remindLater: '後で通知',
    viewDetails: '詳細を見る',
  },
  ko: {
    // App
    appName: '프레시가드',
    appTitle: '프레시가드',
    homeSubtitle1: '돈은 나무에서 자라지 않는다',
    homeSubtitle2: '"유통기한"과 싸우고 "낭비"를 없애자',
    
    // Navigation
    home: '홈',
    addItem: '아이템 추가',
    settings: '설정',
    
    // Home Screen
    expired: '만료됨',
    expiringSoon: '곧 만료',
    fresh: '신선함',
    yourItems: '당신의 아이템',
    noItemsTitle: '신선한 여행을 시작하세요',
    noItemsSubtitle: '바코드를 스캔하거나 사진을 찍어 시작하세요',
    allItems: '모든 아이템',
    noItemsFound: '아이템을 찾을 수 없습니다',
    today: '오늘',
    tomorrow: '내일',
    days: '일',
    
    // Voice Messages
    voiceExpired: '경고! 아이템이 만료되었습니다. 안전하게 처리하세요.',
    voiceExpiringToday: '긴급! 아이템이 오늘 만료됩니다. 즉시 사용하세요.',
    voiceExpiringTomorrow: '주의! 아이템이 내일 만료됩니다. 빨리 사용하세요.',
    voiceExpiringSoon: '알림! 아이템이 {days}일 후에 만료됩니다. 빨리 사용하세요.',
    voiceEnabled: '음성 알림이 활성화되었습니다',
    voiceDisabled: '음성 알림이 비활성화되었습니다',
    
    // Item Detail
    editItem: '아이템 편집',
    itemDetails: '아이템 세부정보',
    edit: '편집',
    save: '저장',
    itemName: '아이템 이름',
    enterItemName: '아이템 이름 입력',
    productionDate: '제조일',
    expiryDate: '유통기한',
    expiryDays: '유통기한까지 일수',
    enterExpiryDays: '일수 입력',
    
    // Camera/Scan
    photoOverview: '아이템 개요',
    photoOverviewInstructions: '아이템의 선명한 사진을 촬영하세요',
    validDaysRequired: '유효한 일수를 입력하세요',
    retake: '다시 촬영',
    usePhoto: '사진 사용',
    loadingCamera: '카메라 로딩 중...',
    cameraPermissionTitle: '카메라 권한 필요',
    cameraPermissionText: '이 앱은 바코드 스캔과 사진 촬영을 위해 카메라 접근이 필요합니다',
    grantPermission: '권한 부여',
    
    // Settings
    notifications: '알림',
    notificationsSubtitle: '만료 알림',
    voiceReminders: '음성 알림',
    voiceRemindersSubtitle: '만료 아이템 음성 경고',
    language: '언어',
    subscription: '구독',
    rateApp: '앱 평가',
    rateAppSubtitle: '개선에 도움을 주세요',
    help: '도움말 및 지원',
    helpSubtitle: '지원 받기',
    privacy: '개인정보 보호정책',
    privacySubtitle: '데이터 보호',
    clearData: '모든 데이터 삭제',
    clearDataSubtitle: '저장된 모든 아이템 제거',
    appVersion: '앱 버전',
    madeWithLove: '❤️로 만들어짐',
    
    // Subscription
    freeTrial: '무료 체험',
    monthlyPlan: '월간 플랜',
    yearlyPlan: '연간 플랜',
    lifetimePlan: '평생 플랜',
    month: '월',
    year: '년',
    lifetime: '평생',
    save8: '₩10,000 절약',
    limitedTime: '한정 시간',
    upgradeToPremium: '프리미엄으로 업그레이드',
    unlockAllFeatures: '모든 프리미엄 기능 잠금 해제',
    freeTrial7Days: '7일 무료 체험',
    premiumFeatures: '프리미엄 기능',
    choosePlan: '플랜 선택',
    mostPopular: '가장 인기',
    startFreeTrial: '무료 체험 시작',
    subscriptionDisclaimer: '언제든지 취소 가능. 약정 없음.',
    
    // Premium Features
    unlimitedItems: '무제한 아이템',
    smartNotifications: '스마트 만료 알림',
    photoRecognition: '사진 인식 기술',
    multiDeviceSync: '멀티 디바이스 동기화',
    advancedAnalytics: '고급 아이템 분석',
    prioritySupport: '우선 고객 지원',
    premiumMember: '프리미엄 회원',
    freeUser: '무료 사용자',
    
    // Alerts
    deleteConfirmTitle: '아이템 삭제',
    deleteConfirmMessage: '이 아이템을 삭제하시겠습니까?',
    delete: '삭제',
    cancel: '취소',
    ok: '확인',
    error: '오류',
    success: '성공',
    
    // Trial Limit
    trialLimitTitle: '체험 한도 도달',
    trialLimitMessage: '무료 체험 중에는 5개의 아이템만 추가할 수 있습니다. 무제한 아이템을 추가하려면 업그레이드하세요.',
    upgrade: '업그레이드',
    
    // Validation
    nameRequired: '아이템 이름이 필요합니다',
    expiryDateRequired: '유통기한이 필요합니다',
    photoError: '사진 촬영에 실패했습니다',
    saveError: '아이템 저장에 실패했습니다',
    itemSaved: '아이템이 성공적으로 저장되었습니다',
    saving: '저장 중...',
    notSet: '설정되지 않음',
    
    // Data Management
    clearDataTitle: '모든 데이터 삭제',
    clearDataMessage: '모든 아이템 데이터가 영구적으로 삭제됩니다. 이 작업은 되돌릴 수 없습니다.',
    clear: '삭제',
    dataCleared: '모든 데이터가 삭제되었습니다',
    clearDataError: '데이터 삭제에 실패했습니다',
    
    // Other translations...
    item: '아이템',
    items: '아이템',
    addItem: '아이템 추가',
    captureItem: '아이템 촬영',
    takePhoto: '사진 촬영',
    pleaseAddSomeItemsFirst: '먼저 아이템을 추가해주세요',
    
    // Privacy Policy
    privacyPolicyTitle: '개인정보 보호정책',
    privacyPolicySubtitle: '데이터 보호',
    lastUpdated: '최종 업데이트: 2024년 1월 1일',
    introduction: '소개',
    introductionText1: 'FreshGuard에 오신 것을 환영합니다! 저희는 개인정보 보호의 중요성을 이해하고 있으며, 개인정보를 수집, 사용, 저장 및 보호하는 방법을 설명하기 위해 이 개인정보 보호정책을 만들었습니다.',
    introductionText2: '앱을 사용함으로써 이 개인정보 보호정책의 조건에 동의하는 것입니다. 이 정책에 동의하지 않으시면 서비스를 사용하지 마십시오.',
    informationWeCollect: '수집하는 정보',
    
    // Privacy Policy Content
    itemInformation: '아이템 정보',
    deviceInformation: '기기 정보',
    usageData: '사용 데이터',
    howWeUseInformation: '정보 사용 방법',
    dataStorageAndSecurity: '데이터 저장 및 보안',
    localStorageNotice: '모든 아이템 데이터는 기기에 로컬로 저장됩니다. 이 정보를 서버에 업로드하지 않습니다.',
    thirdPartyServices: '제3자 서비스',
    yourRights: '귀하의 권리',
    childrensPrivacy: '아동 개인정보 보호',
    policyUpdates: '정책 업데이트',
    contactUs: '문의하기',
    
    // Privacy Policy Details
    itemInfoDetails: '• 아이템 이름, 카테고리, 제조일, 유통기한\n• 촬영한 아이템 사진\n• 저장 위치 및 메모 정보',
    deviceInfoDetails: '• 기기 모델, 운영체제 버전\n• 앱 버전 및 사용 통계\n• 크래시 로그 및 오류 보고서 (개인정보 미포함)',
    usageDataDetails: '• 앱 사용 빈도 및 기능 설정\n• 알림 설정 및 언어 설정\n• 구독 상태 및 구매 기록',
    howWeUseDetails: '수집된 정보는 다음 목적으로 사용됩니다:\n• 아이템 만료 알림 서비스 제공\n• 앱 기능 및 사용자 경험 개선\n• 고객 지원 및 기술 서비스 제공\n• 중요한 서비스 알림 발송\n• 사용 동향 분석을 통한 제품 최적화',
    dataSecurityDetails: '• 모든 데이터는 암호화되어 저장\n• 개인정보는 기기에만 저장\n• 아이템 데이터를 제3자와 공유하지 않음\n• 정기적인 보안 감사 및 업데이트 수행',
    thirdPartyDetails: '앱 경험 개선을 위해 다음 제3자 서비스를 사용할 수 있습니다:\n• 앱 스토어 (앱 배포 및 업데이트용)\n• 크래시 리포팅 서비스 (버그 수정용)\n• 결제 처리 서비스 (구독 관리용)\n\n이러한 서비스는 자체 개인정보 보호정책을 가지고 있으며, 해당 약관을 검토하시기 바랍니다.',
    yourRightsDetails: '귀하는 다음과 같은 권리를 가집니다:\n• 언제든지 아이템 데이터를 보고 수정하기\n• 앱의 모든 개인정보 삭제하기\n• 알림 수신 또는 거부 선택하기\n• 언제든지 앱을 제거하고 모든 데이터 삭제하기\n• 개인정보 관련 지원 문의하기',
    childrensPrivacyDetails: '저희 서비스는 13세 이상의 사용자를 대상으로 합니다. 13세 미만 아동의 개인정보를 의도적으로 수집하지 않습니다. 실수로 아동 정보를 수집했다는 것을 발견하시면 즉시 연락해 주시기 바랍니다.',
    policyUpdatesDetails: '이 개인정보 보호정책은 수시로 업데이트될 수 있습니다. 중요한 변경사항은 앱 내 알림이나 기타 적절한 수단을 통해 알려드립니다. 서비스 계속 사용은 업데이트된 정책에 대한 동의를 의미합니다.',
    contactUsDetails: '이 개인정보 보호정책에 대한 질문이나 제안이 있으시면 다음 방법으로 연락해 주시기 바랍니다:',
    contactEmail: '이메일：postmaster@patring.com',
    contactPhone: '고객 서비스：400-123-4567',
    contactAddress: '주소：30 N GOULD ST NUM 47701 SHERIDAN, WY',
    updateDate: '2024년 1월 1일',
    
    // Expiry Reminder Modal
    itemExpired: '아이템이 만료되었습니다！',
    pleaseDisposeSafely: '안전하게 처리하세요',
    itemExpiresToday: '아이템이 오늘 만료됩니다！',
    pleaseUseImmediately: '즉시 사용하세요',
    itemExpiresTomorrow: '아이템이 내일 만료됩니다！',
    pleaseUseSoon: '빨리 사용하세요',
    itemExpiresInDays: '아이템이 {days}일 후에 만료됩니다',
    pleaseNoteExpiryTime: '만료 시간에 주의하세요',
    itemInGoodCondition: '아이템이 양호한 상태입니다',
    stayFresh: '신선함 유지',
    remindLater: '나중에 알림',
    viewDetails: '세부정보 보기',
  },
  es: {
    // App
    appName: 'FreshGuard',
    appTitle: 'FreshGuard',
    homeSubtitle1: 'El dinero no crece en los árboles',
    homeSubtitle2: 'Lucha contra la "caducidad"; elimina el "desperdicio"',
    
    // Navigation
    home: 'Inicio',
    addItem: 'Agregar Artículo',
    settings: 'Configuración',
    
    // Home Screen
    expired: 'Caducado',
    expiringSoon: 'Próximo a Caducar',
    fresh: 'Fresco',
    yourItems: 'Tus Artículos',
    noItemsTitle: 'Comienza tu Viaje Fresco',
    noItemsSubtitle: 'Escanea código de barras o toma una foto para comenzar',
    allItems: 'Todos los Artículos',
    noItemsFound: 'No se encontraron artículos',
    today: 'Hoy',
    tomorrow: 'Mañana',
    days: 'días',
    
    // Voice Messages
    voiceExpired: '¡Alerta! Tu artículo ha caducado. Por favor, deséchalo de forma segura.',
    voiceExpiringToday: '¡Urgente! Tu artículo caduca hoy. Por favor, úsalo inmediatamente.',
    voiceExpiringTomorrow: '¡Advertencia! Tu artículo caduca mañana. Por favor, úsalo pronto.',
    voiceExpiringSoon: '¡Atención! Tu artículo caduca en {days} días. Por favor, úsalo pronto.',
    voiceEnabled: 'Recordatorios de voz habilitados',
    voiceDisabled: 'Recordatorios de voz deshabilitados',
    
    // Item Detail
    editItem: 'Editar Artículo',
    itemDetails: 'Detalles del Artículo',
    edit: 'Editar',
    save: 'Guardar',
    itemName: 'Nombre del Artículo',
    enterItemName: 'Ingrese el nombre del artículo',
    productionDate: 'Fecha de Producción',
    expiryDate: 'Fecha de Caducidad',
    expiryDays: 'Días hasta la caducidad',
    enterExpiryDays: 'Ingrese el número de días',
    
    // Camera/Scan
    photoOverview: 'Vista General del Artículo',
    photoOverviewInstructions: 'Tome una foto clara de su artículo',
    validDaysRequired: 'Por favor ingrese un número válido de días',
    retake: 'Volver a Tomar',
    usePhoto: 'Usar Foto',
    loadingCamera: 'Cargando cámara...',
    cameraPermissionTitle: 'Permiso de Cámara Requerido',
    cameraPermissionText: 'Esta aplicación necesita acceso a la cámara para escanear códigos de barras y tomar fotos',
    grantPermission: 'Otorgar Permiso',
    
    // Settings
    notifications: 'Notificaciones',
    notificationsSubtitle: 'Recordatorios de caducidad',
    voiceReminders: 'Recordatorios de Voz',
    voiceRemindersSubtitle: 'Alertas de voz para artículos que caducan',
    language: 'Idioma',
    subscription: 'Suscripción',
    rateApp: 'Calificar App',
    rateAppSubtitle: 'Ayúdanos a mejorar',
    help: 'Ayuda y Soporte',
    helpSubtitle: 'Obtener asistencia',
    privacy: 'Política de Privacidad',
    privacySubtitle: 'Protección de datos',
    clearData: 'Borrar Todos los Datos',
    clearDataSubtitle: 'Eliminar todos los artículos almacenados',
    appVersion: 'Versión de la App',
    madeWithLove: 'Hecho con ❤️',
    
    // Subscription
    freeTrial: 'Prueba Gratuita',
    monthlyPlan: 'Plan Mensual',
    yearlyPlan: 'Plan Anual',
    lifetimePlan: 'Plan de por Vida',
    month: 'mes',
    year: 'año',
    lifetime: 'de por vida',
    save8: 'Ahorra €8',
    limitedTime: 'Tiempo Limitado',
    upgradeToPremium: 'Actualizar a Premium',
    unlockAllFeatures: 'Desbloquear todas las funciones premium',
    freeTrial7Days: '7 días de prueba gratuita',
    premiumFeatures: 'Funciones Premium',
    choosePlan: 'Elige tu Plan',
    mostPopular: 'Más Popular',
    startFreeTrial: 'Iniciar Prueba Gratuita',
    subscriptionDisclaimer: 'Cancela en cualquier momento. Sin compromiso.',
    
    // Premium Features
    unlimitedItems: 'Artículos ilimitados',
    smartNotifications: 'Notificaciones inteligentes de caducidad',
    photoRecognition: 'Tecnología de reconocimiento de fotos',
    multiDeviceSync: 'Sincronización multi-dispositivo',
    advancedAnalytics: 'Análisis avanzado de artículos',
    prioritySupport: 'Soporte prioritario al cliente',
    premiumMember: 'Miembro Premium',
    freeUser: 'Usuario Gratuito',
    
    // Alerts
    deleteConfirmTitle: 'Eliminar Artículo',
    deleteConfirmMessage: '¿Está seguro de que desea eliminar este artículo?',
    delete: 'Eliminar',
    cancel: 'Cancelar',
    ok: 'OK',
    error: 'Error',
    success: 'Éxito',
    
    // Trial Limit
    trialLimitTitle: 'Límite de Prueba Alcanzado',
    trialLimitMessage: 'Solo puede agregar 5 artículos durante la prueba gratuita. Actualice para agregar artículos ilimitados.',
    upgrade: 'Actualizar',
    
    // Validation
    nameRequired: 'El nombre del artículo es requerido',
    expiryDateRequired: 'La fecha de caducidad es requerida',
    photoError: 'Error al tomar la foto',
    saveError: 'Error al guardar el artículo',
    itemSaved: 'Artículo guardado exitosamente',
    saving: 'Guardando...',
    notSet: 'No establecido',
    
    // Data Management
    clearDataTitle: 'Borrar Todos los Datos',
    clearDataMessage: 'Esto eliminará permanentemente todos los datos de sus artículos. Esta acción no se puede deshacer.',
    clear: 'Borrar',
    dataCleared: 'Todos los datos han sido borrados',
    clearDataError: 'Error al borrar los datos',
    
    // Other translations...
    item: 'Artículo',
    items: 'Artículos',
    addItem: 'Agregar Artículo',
    captureItem: 'Capturar Artículo',
    takePhoto: 'Tomar Foto',
    pleaseAddSomeItemsFirst: 'Por favor agregue algunos artículos primero',
    
    // Privacy Policy
    privacyPolicyTitle: 'Política de Privacidad',
    privacyPolicySubtitle: 'Protección de datos',
    lastUpdated: 'Última actualización: 1 de enero de 2024',
    introduction: 'Introducción',
    introductionText1: '¡Bienvenido a FreshGuard! Entendemos la importancia de la privacidad, por lo que hemos creado esta política de privacidad para explicar cómo recopilamos, usamos, almacenamos y protegemos su información personal.',
    introductionText2: 'Al usar nuestra aplicación, acepta los términos de esta política de privacidad. Si no está de acuerdo con esta política, no use nuestros servicios.',
    informationWeCollect: 'Información que Recopilamos',
    
    // Privacy Policy Content
    itemInformation: 'Información de Artículos',
    deviceInformation: 'Información del Dispositivo',
    usageData: 'Datos de Uso',
    howWeUseInformation: 'Cómo Usamos la Información',
    dataStorageAndSecurity: 'Almacenamiento y Seguridad de Datos',
    localStorageNotice: 'Todos los datos de sus artículos se almacenan localmente en su dispositivo. No subimos esta información a nuestros servidores.',
    thirdPartyServices: 'Servicios de Terceros',
    yourRights: 'Sus Derechos',
    childrensPrivacy: 'Protección de Privacidad Infantil',
    policyUpdates: 'Actualizaciones de Política',
    contactUs: 'Contáctanos',
    
    // Privacy Policy Details
    itemInfoDetails: '• Nombres, categorías, fechas de producción y caducidad de artículos\n• Fotos que toma de artículos\n• Ubicación de almacenamiento e información de notas',
    deviceInfoDetails: '• Modelo de dispositivo, versión del sistema operativo\n• Versión de la aplicación y estadísticas de uso\n• Registros de fallos e informes de errores (sin información personal)',
    usageDataDetails: '• Frecuencia de uso de la aplicación y preferencias de funciones\n• Configuración de notificaciones y preferencias de idioma\n• Estado de suscripción y registros de compra',
    howWeUseDetails: 'Usamos la información recopilada para:\n• Proporcionar servicios de recordatorio de caducidad de artículos\n• Mejorar la funcionalidad de la aplicación y la experiencia del usuario\n• Proporcionar soporte al cliente y servicios técnicos\n• Enviar notificaciones importantes del servicio\n• Analizar tendencias de uso para optimizar el producto',
    dataSecurityDetails: '• Todos los datos se cifran para el almacenamiento\n• La información personal solo se guarda en su dispositivo\n• No compartimos sus datos de artículos con terceros\n• Se realizan auditorías de seguridad y actualizaciones regulares',
    thirdPartyDetails: 'Podemos usar los siguientes servicios de terceros para mejorar la experiencia de la aplicación:\n• Tiendas de aplicaciones (para distribución y actualizaciones de aplicaciones)\n• Servicios de informes de fallos (para corrección de errores)\n• Servicios de procesamiento de pagos (para gestión de suscripciones)\n\nEstos servicios tienen sus propias políticas de privacidad, y recomendamos revisar sus términos.',
    yourRightsDetails: 'Usted tiene derecho a:\n• Ver y modificar los datos de sus artículos en cualquier momento\n• Eliminar toda la información personal en la aplicación\n• Elegir recibir o rechazar notificaciones\n• Desinstalar la aplicación y eliminar todos los datos en cualquier momento\n• Contactarnos para soporte relacionado con la privacidad',
    childrensPrivacyDetails: 'Nuestros servicios están destinados a usuarios de 13 años en adelante. No recopilamos conscientemente información personal de niños menores de 13 años. Si descubre que hemos recopilado inadvertidamente información de niños, contáctenos inmediatamente.',
    policyUpdatesDetails: 'Podemos actualizar esta política de privacidad de vez en cuando. Los cambios significativos se comunicarán a través de notificaciones en la aplicación u otros medios apropiados. El uso continuado de nuestros servicios indica la aceptación de la política actualizada.',
    contactUsDetails: 'Si tiene alguna pregunta o sugerencia sobre esta política de privacidad, contáctenos a través de los siguientes métodos:',
    contactEmail: 'Correo：postmaster@patring.com',
    contactPhone: 'Servicio al Cliente：400-123-4567',
    contactAddress: 'Dirección：30 N GOULD ST NUM 47701 SHERIDAN, WY',
    updateDate: '1 de enero de 2024',
    
    // Expiry Reminder Modal
    itemExpired: '¡El artículo ha caducado!',
    pleaseDisposeSafely: 'Por favor, deséchelo de forma segura',
    itemExpiresToday: '¡El artículo caduca hoy!',
    pleaseUseImmediately: 'Por favor, úselo inmediatamente',
    itemExpiresTomorrow: '¡El artículo caduca mañana!',
    pleaseUseSoon: 'Por favor, úselo pronto',
    itemExpiresInDays: 'El artículo caduca en {days} días',
    pleaseNoteExpiryTime: 'Por favor, note el tiempo de caducidad',
    itemInGoodCondition: 'El artículo está en buenas condiciones',
    stayFresh: 'Manténgase fresco',
    remindLater: 'Recordar más tarde',
    viewDetails: 'Ver detalles',
  },
  fr: {
    // App
    appName: 'FreshGuard',
    appTitle: 'FreshGuard',
    homeSubtitle1: 'L\'argent ne pousse pas sur les arbres',
    homeSubtitle2: 'Combattez l\'«expiration»; éliminez le «gaspillage»',
    
    // Navigation
    home: 'Accueil',
    addItem: 'Ajouter un Article',
    settings: 'Paramètres',
    
    // Home Screen
    expired: 'Expiré',
    expiringSoon: 'Expire Bientôt',
    fresh: 'Frais',
    yourItems: 'Vos Articles',
    noItemsTitle: 'Commencez Votre Voyage Frais',
    noItemsSubtitle: 'Scannez le code-barres ou prenez une photo pour commencer',
    allItems: 'Tous les Articles',
    noItemsFound: 'Aucun article trouvé',
    today: 'Aujourd\'hui',
    tomorrow: 'Demain',
    days: 'jours',
    
    // Voice Messages
    voiceExpired: 'Alerte! Votre article a expiré. Veuillez le jeter en toute sécurité.',
    voiceExpiringToday: 'Urgent! Votre article expire aujourd\'hui. Veuillez l\'utiliser immédiatement.',
    voiceExpiringTomorrow: 'Attention! Votre article expire demain. Veuillez l\'utiliser bientôt.',
    voiceExpiringSoon: 'Attention! Votre article expire dans {days} jours. Veuillez l\'utiliser bientôt.',
    voiceEnabled: 'Rappels vocaux activés',
    voiceDisabled: 'Rappels vocaux désactivés',
    
    // Item Detail
    editItem: 'Modifier l\'Article',
    itemDetails: 'Détails de l\'Article',
    edit: 'Modifier',
    save: 'Sauvegarder',
    itemName: 'Nom de l\'Article',
    enterItemName: 'Entrez le nom de l\'article',
    productionDate: 'Date de Production',
    expiryDate: 'Date d\'Expiration',
    expiryDays: 'Jours jusqu\'à l\'expiration',
    enterExpiryDays: 'Entrez le nombre de jours',
    
    // Camera/Scan
    photoOverview: 'Aperçu de l\'Article',
    photoOverviewInstructions: 'Prenez une photo claire de votre article',
    validDaysRequired: 'Veuillez entrer un nombre de jours valide',
    retake: 'Reprendre',
    usePhoto: 'Utiliser la Photo',
    loadingCamera: 'Chargement de la caméra...',
    cameraPermissionTitle: 'Permission de Caméra Requise',
    cameraPermissionText: 'Cette application a besoin d\'accéder à la caméra pour scanner les codes-barres et prendre des photos',
    grantPermission: 'Accorder la Permission',
    
    // Settings
    notifications: 'Notifications',
    notificationsSubtitle: 'Rappels d\'expiration',
    voiceReminders: 'Rappels Vocaux',
    voiceRemindersSubtitle: 'Alertes vocales pour les articles qui expirent',
    language: 'Langue',
    subscription: 'Abonnement',
    rateApp: 'Évaluer l\'App',
    rateAppSubtitle: 'Aidez-nous à améliorer',
    help: 'Aide et Support',
    helpSubtitle: 'Obtenir de l\'assistance',
    privacy: 'Politique de Confidentialité',
    privacySubtitle: 'Protection des données',
    clearData: 'Effacer Toutes les Données',
    clearDataSubtitle: 'Supprimer tous les articles stockés',
    appVersion: 'Version de l\'App',
    madeWithLove: 'Fait avec ❤️',
    
    // Subscription
    freeTrial: 'Essai Gratuit',
    monthlyPlan: 'Plan Mensuel',
    yearlyPlan: 'Plan Annuel',
    lifetimePlan: 'Plan à Vie',
    month: 'mois',
    year: 'année',
    lifetime: 'à vie',
    save8: 'Économisez €8',
    limitedTime: 'Temps Limité',
    upgradeToPremium: 'Passer à Premium',
    unlockAllFeatures: 'Débloquer toutes les fonctionnalités premium',
    freeTrial7Days: '7 jours d\'essai gratuit',
    premiumFeatures: 'Fonctionnalités Premium',
    choosePlan: 'Choisissez Votre Plan',
    mostPopular: 'Le Plus Populaire',
    startFreeTrial: 'Commencer l\'Essai Gratuit',
    subscriptionDisclaimer: 'Annulez à tout moment. Aucun engagement.',
    
    // Premium Features
    unlimitedItems: 'Articles illimités',
    smartNotifications: 'Notifications intelligentes d\'expiration',
    photoRecognition: 'Technologie de reconnaissance photo',
    multiDeviceSync: 'Synchronisation multi-appareils',
    advancedAnalytics: 'Analyses avancées d\'articles',
    prioritySupport: 'Support client prioritaire',
    premiumMember: 'Membre Premium',
    freeUser: 'Utilisateur Gratuit',
    
    // Alerts
    deleteConfirmTitle: 'Supprimer l\'Article',
    deleteConfirmMessage: 'Êtes-vous sûr de vouloir supprimer cet article?',
    delete: 'Supprimer',
    cancel: 'Annuler',
    ok: 'OK',
    error: 'Erreur',
    success: 'Succès',
    
    // Trial Limit
    trialLimitTitle: 'Limite d\'Essai Atteinte',
    trialLimitMessage: 'Vous ne pouvez ajouter que 5 articles pendant l\'essai gratuit. Mettez à niveau pour ajouter des articles illimités.',
    upgrade: 'Mettre à Niveau',
    
    // Validation
    nameRequired: 'Le nom de l\'article est requis',
    expiryDateRequired: 'La date d\'expiration est requise',
    photoError: 'Échec de la prise de photo',
    saveError: 'Échec de la sauvegarde de l\'article',
    itemSaved: 'Article sauvegardé avec succès',
    saving: 'Sauvegarde...',
    notSet: 'Non défini',
    
    // Data Management
    clearDataTitle: 'Effacer Toutes les Données',
    clearDataMessage: 'Cela supprimera définitivement toutes les données de vos articles. Cette action ne peut pas être annulée.',
    clear: 'Effacer',
    dataCleared: 'Toutes les données ont été effacées',
    clearDataError: 'Échec de l\'effacement des données',
    
    // Other translations...
    item: 'Article',
    items: 'Articles',
    addItem: 'Ajouter un Article',
    captureItem: 'Capturer un Article',
    takePhoto: 'Prendre une Photo',
    pleaseAddSomeItemsFirst: 'Veuillez d\'abord ajouter quelques articles',
    
    // Privacy Policy
    privacyPolicyTitle: 'Politique de Confidentialité',
    privacyPolicySubtitle: 'Protection des données',
    lastUpdated: 'Dernière mise à jour: 1er janvier 2024',
    introduction: 'Introduction',
    introductionText1: 'Bienvenue sur FreshGuard! Nous comprenons l\'importance de la confidentialité, nous avons donc créé cette politique de confidentialité pour expliquer comment nous collectons, utilisons, stockons et protégeons vos informations personnelles.',
    introductionText2: 'En utilisant notre application, vous acceptez les termes de cette politique de confidentialité. Si vous n\'êtes pas d\'accord avec cette politique, veuillez ne pas utiliser nos services.',
    informationWeCollect: 'Informations que Nous Collectons',
    
    // Privacy Policy Content
    itemInformation: 'Informations sur les Articles',
    deviceInformation: 'Informations sur l\'Appareil',
    usageData: 'Données d\'Utilisation',
    howWeUseInformation: 'Comment Nous Utilisons les Informations',
    dataStorageAndSecurity: 'Stockage et Sécurité des Données',
    localStorageNotice: 'Toutes les données de vos articles sont stockées localement sur votre appareil. Nous ne téléchargeons pas ces informations sur nos serveurs.',
    thirdPartyServices: 'Services Tiers',
    yourRights: 'Vos Droits',
    childrensPrivacy: 'Protection de la Vie Privée des Enfants',
    policyUpdates: 'Mises à Jour de la Politique',
    contactUs: 'Nous Contacter',
    
    // Privacy Policy Details
    itemInfoDetails: '• Noms, catégories, dates de production et d\'expiration des articles\n• Photos que vous prenez des articles\n• Emplacement de stockage et informations de notes',
    deviceInfoDetails: '• Modèle d\'appareil, version du système d\'exploitation\n• Version de l\'application et statistiques d\'utilisation\n• Journaux de plantage et rapports d\'erreur (aucune information personnelle incluse)',
    usageDataDetails: '• Fréquence d\'utilisation de l\'application et préférences de fonctionnalités\n• Paramètres de notification et préférences de langue\n• Statut d\'abonnement et enregistrements d\'achat',
    howWeUseDetails: 'Nous utilisons les informations collectées pour :\n• Fournir des services de rappel d\'expiration d\'articles\n• Améliorer la fonctionnalité de l\'application et l\'expérience utilisateur\n• Fournir un support client et des services techniques\n• Envoyer des notifications de service importantes\n• Analyser les tendances d\'utilisation pour optimiser le produit',
    dataSecurityDetails: '• Toutes les données sont chiffrées pour le stockage\n• Les informations personnelles ne sont sauvegardées que sur votre appareil\n• Nous ne partageons pas vos données d\'articles avec des tiers\n• Des audits de sécurité et des mises à jour régulières sont effectués',
    thirdPartyDetails: 'Nous pouvons utiliser les services tiers suivants pour améliorer l\'expérience de l\'application :\n• Magasins d\'applications (pour la distribution et les mises à jour d\'applications)\n• Services de rapport de plantage (pour la correction de bugs)\n• Services de traitement des paiements (pour la gestion des abonnements)\n\nCes services ont leurs propres politiques de confidentialité, et nous recommandons de consulter leurs conditions.',
    yourRightsDetails: 'Vous avez le droit de :\n• Voir et modifier les données de vos articles à tout moment\n• Supprimer toutes les informations personnelles dans l\'application\n• Choisir de recevoir ou de refuser les notifications\n• Désinstaller l\'application et supprimer toutes les données à tout moment\n• Nous contacter pour un support lié à la confidentialité',
    childrensPrivacyDetails: 'Nos services sont destinés aux utilisateurs âgés de 13 ans et plus. Nous ne collectons pas sciemment d\'informations personnelles d\'enfants de moins de 13 ans. Si vous découvrez que nous avons collecté par inadvertance des informations d\'enfants, veuillez nous contacter immédiatement.',
    policyUpdatesDetails: 'Nous pouvons mettre à jour cette politique de confidentialité de temps à autre. Les changements significatifs seront communiqués par des notifications dans l\'application ou d\'autres moyens appropriés. L\'utilisation continue de nos services indique l\'acceptation de la politique mise à jour.',
    contactUsDetails: 'Si vous avez des questions ou des suggestions concernant cette politique de confidentialité, veuillez nous contacter par les méthodes suivantes :',
    contactEmail: 'Email：postmaster@patring.com',
    contactPhone: 'Service Client：400-123-4567',
    contactAddress: 'Adresse：30 N GOULD ST NUM 47701 SHERIDAN, WY',
    updateDate: '1er janvier 2024',
    
    // Expiry Reminder Modal
    itemExpired: 'L\'article a expiré!',
    pleaseDisposeSafely: 'Veuillez le jeter en toute sécurité',
    itemExpiresToday: 'L\'article expire aujourd\'hui!',
    pleaseUseImmediately: 'Veuillez l\'utiliser immédiatement',
    itemExpiresTomorrow: 'L\'article expire demain!',
    pleaseUseSoon: 'Veuillez l\'utiliser bientôt',
    itemExpiresInDays: 'L\'article expire dans {days} jours',
    pleaseNoteExpiryTime: 'Veuillez noter le temps d\'expiration',
    itemInGoodCondition: 'L\'article est en bon état',
    stayFresh: 'Restez frais',
    remindLater: 'Rappeler plus tard',
    viewDetails: 'Voir les détails',
  },
};

// IP地址到国家/语言的映射
const countryToLanguage: { [key: string]: keyof typeof translations } = {
  'CN': 'zh',
  'TW': 'zh',
  'HK': 'zh',
  'MO': 'zh',
  'JP': 'ja',
  'KR': 'ko',
  'ES': 'es',
  'MX': 'es',
  'AR': 'es',
  'CO': 'es',
  'PE': 'es',
  'VE': 'es',
  'CL': 'es',
  'EC': 'es',
  'GT': 'es',
  'CU': 'es',
  'BO': 'es',
  'DO': 'es',
  'HN': 'es',
  'PY': 'es',
  'SV': 'es',
  'NI': 'es',
  'CR': 'es',
  'PA': 'es',
  'UY': 'es',
  'FR': 'fr',
  'BE': 'fr',
  'CH': 'fr',
  'CA': 'fr',
  'LU': 'fr',
  'MC': 'fr',
};

// 获取用户IP地址和位置信息
async function detectUserLocation(): Promise<string> {
  try {
    // 使用免费的IP地理位置API
    const response = await fetch('https://ipapi.co/json/');
    const data = await response.json();
    return data.country_code || 'US';
  } catch (error) {
    console.log('Failed to detect location, using default:', error);
    // 如果API失败，尝试使用浏览器语言
    if (typeof navigator !== 'undefined') {
      const browserLang = navigator.language || navigator.languages?.[0] || 'en';
      if (browserLang.startsWith('zh')) return 'CN';
      if (browserLang.startsWith('ja')) return 'JP';
      if (browserLang.startsWith('ko')) return 'KR';
      if (browserLang.startsWith('es')) return 'ES';
      if (browserLang.startsWith('fr')) return 'FR';
    }
    return 'US';
  }
}

export function useLanguage() {
  const [language, setLanguage] = useState<keyof typeof translations>('en');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeLanguage();
  }, []);

  const initializeLanguage = async () => {
    try {
      // 首先检查用户是否已经设置过语言
      const savedLanguage = await foodStorage.getLanguage();
      
      if (savedLanguage && savedLanguage !== 'auto') {
        setLanguage(savedLanguage as keyof typeof translations);
        setIsLoading(false);
        return;
      }

      // 如果没有设置或设置为自动，则根据IP地址检测
      const countryCode = await detectUserLocation();
      const detectedLanguage = countryToLanguage[countryCode] || 'en';
      
      setLanguage(detectedLanguage);
      
      // 保存检测到的语言
      await foodStorage.setLanguage(detectedLanguage);
      
    } catch (error) {
      console.error('Failed to initialize language:', error);
      setLanguage('en');
    } finally {
      setIsLoading(false);
    }
  };

  const changeLanguage = async (newLanguage: keyof typeof translations | 'auto') => {
    try {
      if (newLanguage === 'auto') {
        // 重新检测语言
        const countryCode = await detectUserLocation();
        const detectedLanguage = countryToLanguage[countryCode] || 'en';
        setLanguage(detectedLanguage);
        await foodStorage.setLanguage('auto');
      } else {
        setLanguage(newLanguage);
        await foodStorage.setLanguage(newLanguage);
      }
    } catch (error) {
      console.error('Failed to change language:', error);
    }
  };

  const t = (key: string, params?: { [key: string]: string | number }): string => {
    let translation = translations[language][key as keyof typeof translations[typeof language]];
    
    // 如果当前语言没有翻译，回退到英语
    if (!translation) {
      translation = translations.en[key as keyof typeof translations.en];
    }
    
    // 如果还是没有，返回key本身
    if (!translation) {
      return key;
    }

    // 处理参数替换
    if (params) {
      let result = translation;
      Object.entries(params).forEach(([paramKey, value]) => {
        result = result.replace(`{${paramKey}}`, String(value));
      });
      return result;
    }

    return translation;
  };

  const getVoiceLanguage = (): string => {
    const voiceLanguageMap: { [key: string]: string } = {
      'en': 'en-US',
      'zh': 'zh-CN',
      'ja': 'ja-JP',
      'ko': 'ko-KR',
      'es': 'es-ES',
      'fr': 'fr-FR',
    };
    return voiceLanguageMap[language] || 'en-US';
  };

  const getSupportedLanguages = () => [
    { code: 'auto', name: 'Auto Detect', nativeName: '自动检测' },
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'zh', name: 'Chinese', nativeName: '中文' },
    { code: 'ja', name: 'Japanese', nativeName: '日本語' },
    { code: 'ko', name: 'Korean', nativeName: '한국어' },
    { code: 'es', name: 'Spanish', nativeName: 'Español' },
    { code: 'fr', name: 'French', nativeName: 'Français' },
  ];

  return { 
    language, 
    changeLanguage, 
    t, 
    isLoading,
    getVoiceLanguage,
    getSupportedLanguages,
  };
}
