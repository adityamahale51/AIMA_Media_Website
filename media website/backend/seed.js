const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

async function seed() {
  const dataDir = path.join(__dirname, 'data');
  if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('demo123', salt);
  const adminPassword = await bcrypt.hash('admin123', salt);

  // ===== MEMBERSHIP PLANS =====
  const plans = [
    {
      id: 'plan_student',
      name: 'Student',
      price: 399,
      duration: '1 year',
      duration_days: 365,
      features: [
        'Digital ID',
        'Member profile',
        'Limited publishing access',
        'Directory listing',
      ],
      is_popular: false,
      createdAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'plan_standard',
      name: 'Standard',
      price: 499,
      duration: '1 year',
      duration_days: 365,
      features: [
        'Digital ID + printable',
        'Publish articles (with approval)',
        'Profile page',
        'Job board access',
        'Directory listing',
      ],
      is_popular: true,
      createdAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'plan_pro',
      name: 'Pro',
      price: 999,
      duration: '1 year',
      duration_days: 365,
      features: [
        'Priority article approval',
        'Featured profile',
        '1 webinar included',
        'Portfolio boost',
        'All Standard features',
      ],
      is_popular: false,
      createdAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'plan_institutional',
      name: 'Institutional',
      price: 2999,
      duration: '1 year',
      duration_days: 365,
      features: [
        'Organization page',
        'Multiple contributors',
        'Homepage feature eligibility',
        'All Pro features',
      ],
      is_popular: false,
      createdAt: '2026-01-01T00:00:00.000Z',
    },
  ];
  fs.writeFileSync(path.join(dataDir, 'plans.json'), JSON.stringify(plans, null, 2));

  // ===== CATEGORIES =====
  const categories = [
    { id: 'cat_politics', name: 'Politics', slug: 'politics' },
    { id: 'cat_tech', name: 'Technology', slug: 'technology' },
    { id: 'cat_business', name: 'Business', slug: 'business' },
    { id: 'cat_local', name: 'Local News', slug: 'local-news' },
    { id: 'cat_national', name: 'National', slug: 'national' },
    { id: 'cat_international', name: 'International', slug: 'international' },
    { id: 'cat_sports', name: 'Sports', slug: 'sports' },
    { id: 'cat_entertainment', name: 'Entertainment', slug: 'entertainment' },
    { id: 'cat_education', name: 'Education', slug: 'education' },
    { id: 'cat_health', name: 'Health', slug: 'health' },
    { id: 'cat_crime', name: 'Crime', slug: 'crime' },
    { id: 'cat_media', name: 'Media', slug: 'media' },
    { id: 'cat_general', name: 'General', slug: 'general' },
    { id: 'cat_other', name: 'Other', slug: 'other' },
  ];
  fs.writeFileSync(path.join(dataDir, 'categories.json'), JSON.stringify(categories, null, 2));

  // ===== USERS =====
  const users = [
    {
      id: 'admin001',
      firstName: 'Admin',
      lastName: 'IDMA',
      email: 'admin@idma.org',
      mobile: '9999999990',
      state: 'Punjab',
      city: 'Chandigarh',
      organization: 'IDMA',
      designation: 'Administrator',
      password: adminPassword,
      membershipId: 'IDMA000001',
      joinedDate: '01/01/2026',
      bio: 'IDMA Platform Administrator',
      avatar: '',
      role: 'admin',
      membershipStatus: 'approved',
      verification_status: 'verified',
      selectedPlan: 'plan_pro',
      selectedPlanName: 'Pro',
      membership_start: '2026-01-01T00:00:00.000Z',
      membership_expiry: '2027-01-01T00:00:00.000Z',
      postsCount: 0,
      membersCount: 0,
      viewsCount: 0,
      readersCount: 0,
      createdAt: '2026-01-01T00:00:00.000Z',
    },
    {
      id: 'demo001',
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@aimamedia.org',
      mobile: '9999999999',
      state: 'Uttar Pradesh',
      city: 'Meerut',
      organization: 'AIMA Media',
      designation: 'Journalist',
      password: hashedPassword,
      membershipId: 'AIMA100001',
      joinedDate: '14/02/2026',
      bio: 'Demo account for AIMA Media platform',
      avatar: '',
      role: 'member',
      membershipStatus: 'approved',
      verification_status: 'verified',
      selectedPlan: 'plan_standard',
      selectedPlanName: 'Standard',
      membership_start: '2026-01-01T00:00:00.000Z',
      membership_expiry: '2027-01-01T00:00:00.000Z',
      linkedin: '',
      website: '',
      skills: 'Journalism, Reporting, Photography',
      postsCount: 12,
      membersCount: 48,
      viewsCount: 156,
      readersCount: 8,
      createdAt: '2026-01-01T00:00:00.000Z',
    },
  ];
  fs.writeFileSync(path.join(dataDir, 'users.json'), JSON.stringify(users, null, 2));

  // ===== NEWS (latest from aimamedia.org) =====
  const news = [
    {
      id: 'news001',
      authorId: '203414',
      author: 'BABULAL PALEI',
      avatar: 'https://aimamedia.org/fotos/aimaself/_self203414.jpg',
      location: 'Kendujhar, Orissa (OR)',
      date: '15/02/2026 09:11 AM',
      title: 'ସमୟକୁ ସଠିକ୍ ଉପଯୋଗ କରିପାରିଲେ ଭଲ ମଣିଷଟିଏ ହୋଇପାରିବ - ଅତିଥି ବୃନ୍ଦ',
      slug: 'samayaku-sathik-upayoga-karipaarile',
      body: 'ରାଧାକୃଷ୍ଣ ବିଦ୍ୟାପୀଠ କୁଣ୍ଡାପିଠାର ବିଦାୟକାଳୀନ ଉତ୍ସବ ଘଟଗାଁ, କେନ୍ଦୁଝର ୧୪/୨ : ସ୍ଥାନୀୟ ରାଧାକୃଷ୍ଣ ବିଦ୍ୟାପୀଠ କୁଣ୍ଡାପିଠାର ଚଳିତ ବର୍ଷ ଦଶମ ଶ୍ରେଣୀର ଛାତ୍ରଛାତ୍ରୀ ମାନଙ୍କୁ ବିଦାୟକାଳୀନ ଉତ୍ସବ ଅନୁଷ୍ଠିତ ହୋଇଯାଇଛି। ବିଦ୍ୟାଳୟର ପ୍ରଧାନଶିକ୍ଷକ ସୁରେନ୍ଦ୍ରନାଥ ସାହୁଙ୍କ ପୌରହିତ୍ୟରେ ମୁଖ୍ୟ ଅତିଥି ରୂପେ ବିଦ୍ୟାଳୟର ପୂର୍ବତନ ଅବସରପ୍ରାପ୍ତ ପ୍ରଧାନ ଶିକ୍ଷକ, ଅଲ୍ ଇଣ୍ଡିଆ ମେଡିଆ ଆସୋସିଏସନ୍ କେନ୍ଦୁଝର ଜିଲ୍ଲାର କାର୍ଯ୍ୟକାରୀ ସଦସ୍ୟ ତଥା ଓଡ଼ିଆ ଭାଷା ସାହିତ୍ୟର ନବ ଉନ୍ମେଷ ସଂଯୋଗୀ ସଜଫୁଲର ସଂପାଦକ ବାବୁଲାଲ ପଲେଇ।',
      image: 'https://aimamedia.org/fotos/aimanewsphoto1/727e1e2d-b1ed-4cec-92fc-94f6f7c1d860.jpg',
      extraImages: [
        'https://aimamedia.org/fotos/aimanewsphoto2/f6ddfa8d-37ff-4c10-88ba-e19d8613da32.jpg',
        'https://aimamedia.org/fotos/aimanewsphoto3/e5e51511-f596-491e-acdc-6f0898cde3a8.jpg',
      ],
      audio: null, category: 'Local News', state: 'Orissa',
      tags: ['education', 'orissa', 'local'],
      status: 'published',
      is_featured: false,
      is_trending: false,
      published_at: '2026-02-15T09:11:00.000Z',
      likes: 1, views: 0, shares: 0, comments: 0, likedBy: [],
      createdAt: '2026-02-15T09:11:00.000Z',
    },
    {
      id: 'news002',
      authorId: '51664',
      author: 'Kuldeep Singh',
      avatar: 'https://aimamedia.org/fotos/aimaself/_self51664.jpg',
      location: 'Saharanpur, Uttar Pradesh (UP)',
      date: '15/02/2026 09:10 AM',
      title: 'समस्त देशवासियो को महाशिवरात्रि की अनंत शुभकामनाए....🌹🌹',
      slug: 'mahashivratri-ki-shubhkamnaye',
      body: 'समस्त देशवासियो को महाशिवरात्रि की अनंत शुभकामनायें....🌹🌹आज के दिन ही ब्रम्हाण्ड मे बहुत ही खूबसूरत घटना हुईं थी...आज ही शिव और शक्ति का मिलन हुआ था💞🙏 अगर प्रेम ही करना है तो ऐसा कीजिये कि जहाँ विश्वास और भरोसा हो... चंद लाइनो मे शिव और पार्वती माँ कि प्रेम कहानी लिख रही हूँ ❣️❣️ज़ब माता पार्वती माता सती के रूप मे थी तो उन्हें भगवान शिव से प्रेम हो गया तो उन्होंने भगवान शिव से विवाह कर लिया।',
      image: 'https://aimamedia.org/fotos/aimanewsphoto1/838bd2ee-f7d9-4eb8-b9a1-10ea5fa3c67f.jpg',
      extraImages: [],
      audio: null, category: 'Local News', state: 'Uttar Pradesh',
      tags: ['festival', 'shivratri'],
      status: 'published',
      is_featured: true,
      is_trending: true,
      published_at: '2026-02-15T09:10:00.000Z',
      likes: 1, views: 58, shares: 0, comments: 0, likedBy: [],
      createdAt: '2026-02-15T09:10:00.000Z',
    },
    {
      id: 'news003',
      authorId: '156168',
      author: 'Bhatt Harikrushna Priyavadan',
      avatar: 'https://aimamedia.org/fotos/aimaself/_self156168.jpg',
      location: 'Surat, Gujarat (GJ)',
      date: '15/02/2026 09:07 AM',
      title: 'રિપોર્ટર હરિકૃષ્ણ ભટ્ટ ગુજરાત સુરત ઓલપાડ',
      slug: 'reporter-harikrushna-bhatt-gujarat-surat',
      body: 'ચોર્યાસી વિધાનસભા મત વિસ્તારમાં સમાવિષ્ટ સચીન ખાતે આવેલ શ્રી રામચંદ્રજી મહાદેવજી હનુમાનજી મંદિર ટ્રસ્ટ સંચાલિત રામજી મંદિરની દિવાલો ખાડી પુરના પાણીથી ધરાશાયી થવાની દુર્ભાગ્યપૂર્ણ ઘટનાને પગલે ભારત સરકારના કેન્દ્રીય જળ શક્તિ મંત્રી C. R. Patil સાહેબના માર્ગદર્શન હેઠળ સ્થળ મુલાકાત લઈ પરિસ્થિતિનું નિરીક્ષણ કરવામાં આવ્યું.',
      image: 'https://aimamedia.org/fotos/aimanewsphoto1/940d0acc-1c91-48c0-8785-73900649e995.jpg',
      extraImages: [],
      audio: null, category: 'Local News', state: 'Gujarat',
      tags: ['gujarat', 'local'],
      status: 'published',
      is_featured: false,
      is_trending: true,
      published_at: '2026-02-15T09:07:00.000Z',
      likes: 1, views: 0, shares: 0, comments: 0, likedBy: [],
      createdAt: '2026-02-15T09:07:00.000Z',
    },
    {
      id: 'news004',
      authorId: '187923',
      author: 'Sheikh Shahwaz Usmani',
      avatar: 'https://aimamedia.org/fotos/aimaself/_self187923.jpg',
      location: 'Shivpuri, Madhya Pradesh (MP)',
      date: '15/02/2026 09:02 AM',
      title: 'शिवपुरी जिले तमाम पत्रकार शिवपुरी जिले की आवाज क्यों नहीं उठाते',
      slug: 'shivpuri-jile-tamam-patrkar',
      body: 'शिवपुरी जिले तमाम पत्रकार शिवपुरी जिले की आवाज क्यों नहीं उठाते नेताओं से सवाल क्यों नहीं पूछते विकास कार्य क्यों नहीं हो रहे शिवपुरी में। शिवपुरी के विकास कार्य कोई काम नहीं हो रहा नगर पालिका भ्रष्टाचार से लिफ्ट।',
      image: null,
      extraImages: [],
      audio: null, category: 'Politics', state: 'Madhya Pradesh',
      tags: ['politics', 'madhya-pradesh'],
      status: 'published',
      is_featured: false,
      is_trending: false,
      published_at: '2026-02-15T09:02:00.000Z',
      likes: 0, views: 0, shares: 0, comments: 0, likedBy: [],
      createdAt: '2026-02-15T09:02:00.000Z',
    },
  ];
  fs.writeFileSync(path.join(dataDir, 'news.json'), JSON.stringify(news, null, 2));

  // ===== MEMBERS =====
  const members = [
    { id: 'm001', name: 'BABULAL PALEI', shortName: 'BABULAL ..', avatar: 'https://aimamedia.org/fotos/aimaself/_self203414.jpg', location: 'Orissa (OR)', state: 'Orissa', isActive: true },
    { id: 'm002', name: 'Kuldeep Singh', shortName: 'Kuldeep ..', avatar: 'https://aimamedia.org/fotos/aimaself/_self51664.jpg', location: 'Uttar Pradesh (UP)', state: 'Uttar Pradesh', isActive: true },
    { id: 'm003', name: 'Bhatt Harikrushna Priyavadan', shortName: 'Bhatt Ha..', avatar: 'https://aimamedia.org/fotos/aimaself/_self156168.jpg', location: 'Gujarat (GJ)', state: 'Gujarat', isActive: true },
    { id: 'm004', name: 'Sheikh Shahwaz Usmani', shortName: 'Sheikh S..', avatar: 'https://aimamedia.org/fotos/aimaself/_self187923.jpg', location: 'Madhya Pradesh (MP)', state: 'Madhya Pradesh', isActive: true },
    { id: 'm005', name: 'Rajendra', shortName: 'Rajendra', avatar: 'https://ui-avatars.com/api/?name=Rajendra&background=1a237e&color=fff&size=160', location: 'Madhya Pradesh (MP)', state: 'Madhya Pradesh', isActive: true },
    { id: 'm006', name: 'Jay Prakash Verma', shortName: 'Jay Prak..', avatar: 'https://ui-avatars.com/api/?name=Jay+Prakash+Verma&background=c62828&color=fff&size=160', location: 'Uttar Pradesh (UP)', state: 'Uttar Pradesh', isActive: true },
    { id: 'm007', name: 'Mahesh Sharma', shortName: 'Mahesh S..', avatar: 'https://ui-avatars.com/api/?name=Mahesh+Sharma&background=1a237e&color=fff&size=160', location: 'Uttar Pradesh (UP)', state: 'Uttar Pradesh', isActive: false },
    { id: 'm008', name: 'Navneet Kumar', shortName: 'Navneet ..', avatar: 'https://aimamedia.org/fotos/aimaself/_self22inbound5839734774398350429.jpg', location: 'Uttar Pradesh (UP)', state: 'Uttar Pradesh', isActive: false },
    { id: 'm009', name: 'Atul Kumar Tyagi', shortName: 'Atul Kum..', avatar: 'https://aimamedia.org/fotos/aimaself/_self103305.jpg', location: 'Uttar Pradesh (UP)', state: 'Uttar Pradesh', isActive: false },
    { id: 'm010', name: 'Manoj Sharma', shortName: 'Manoj Sh..', avatar: 'https://aimamedia.org/fotos/aimaself/_self4401003062372.jpg', location: 'Chandigarh (CH)', state: 'Chandigarh', isActive: false },
    { id: 'm011', name: 'Pramod Bhargav', shortName: 'Pramod B..', avatar: 'https://aimamedia.org/fotos/aimaself/_self3811000341342.jpg', location: 'Rajasthan (RJ)', state: 'Rajasthan', isActive: false },
    { id: 'm012', name: 'Raj Kumar Sharma', shortName: 'Raj Kuma..', avatar: 'https://ui-avatars.com/api/?name=Raj+Kumar+Sharma&background=2e7d32&color=fff&size=160', location: 'Chandigarh (CH)', state: 'Chandigarh', isActive: false },
    { id: 'm013', name: 'Kaidapu Raghunath', shortName: 'Kaidapu ..', avatar: 'https://aimamedia.org/fotos/aimaself/_self187530.jpg', location: 'Telangana (TL)', state: 'Telangana', isActive: false },
    { id: 'm014', name: 'Burra Kirankumara', shortName: 'Burra Ki..', avatar: 'https://aimamedia.org/fotos/aimaself/_self60796.jpg', location: 'Telangana (TL)', state: 'Telangana', isActive: false },
  ];
  fs.writeFileSync(path.join(dataDir, 'members.json'), JSON.stringify(members, null, 2));

  // ===== GALLERY =====
  const gallery = [
    { id: 'g001', url: 'https://aimamedia.org/fotos/aimaprogram/10.jpg', caption: 'AIMA Hindi Patrkarita Divas', category: 'Events' },
    { id: 'g002', url: 'https://aimamedia.org/fotos/aimaprogram/5.jpg', caption: 'ADG DK Thakur addressing', category: 'Events' },
    { id: 'g003', url: 'https://aimamedia.org/fotos/aimaprogram/9.jpg', caption: 'MLA Amit Agarwal felicitation', category: 'Awards' },
    { id: 'g004', url: 'https://aimamedia.org/fotos/aimaprogram/6.jpg', caption: 'Ravi Prakash Tiwari honoured', category: 'Awards' },
    { id: 'g005', url: 'https://aimamedia.org/fotos/aimaprogram/1.jpg', caption: 'Rajendra Singh felicitation', category: 'Awards' },
    { id: 'g006', url: 'https://aimamedia.org/fotos/aimaprogram/3.jpg', caption: 'Pushpendra Sharma honoured', category: 'Awards' },
    { id: 'g007', url: 'https://aimamedia.org/fotos/aimaprogram/1_11.jpg', caption: 'Ramkumar Sharma felicitation', category: 'Awards' },
    { id: 'g008', url: 'https://aimamedia.org/fotos/aimaprogram/12.jpg', caption: 'Rajesh Sharma honoured', category: 'Awards' },
    { id: 'g009', url: 'https://aimamedia.org/fotos/aimaprogram/13.jpg', caption: 'Arun Jindal felicitation', category: 'Awards' },
    { id: 'g010', url: 'https://aimamedia.org/fotos/aimaprogram/2.jpg', caption: 'Surendra Sharma honoured', category: 'Awards' },
    { id: 'g011', url: 'https://aimamedia.org/fotos/aimaprogram/4.jpg', caption: 'Gyan Dixit felicitation', category: 'Awards' },
    { id: 'g012', url: 'https://aimamedia.org/fotos/aimaprogram/14.jpg', caption: 'AIMA Group Photo', category: 'Events' },
  ];
  fs.writeFileSync(path.join(dataDir, 'gallery.json'), JSON.stringify(gallery, null, 2));

  // ===== TRANSACTIONS (empty) =====
  fs.writeFileSync(path.join(dataDir, 'transactions.json'), '[]');

  fs.writeFileSync(path.join(dataDir, 'contacts.json'), '[]');

  console.log('Database seeded successfully!');
  console.log('  Demo login:  demo@aimamedia.org / demo123');
  console.log('  Admin login: admin@idma.org / admin123');
  console.log('  Plans: ' + plans.length + ' | Categories: ' + categories.length);
  console.log('  News: ' + news.length + ' | Members: ' + members.length + ' | Gallery: ' + gallery.length);
}

seed().catch(console.error);
