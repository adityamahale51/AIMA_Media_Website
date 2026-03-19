const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const path = require('path');

// Load env vars
dotenv.config({ path: path.join(__dirname, '.env') });

const User = require('./models/User');
const MembershipPlan = require('./models/MembershipPlan');
const Category = require('./models/Category');
const NewsArticle = require('./models/NewsArticle');
const Gallery = require('./models/Gallery');

async function seed() {
  try {
    const mongoUri = process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in .env file');
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await MembershipPlan.deleteMany({});
    await Category.deleteMany({});
    await NewsArticle.deleteMany({});
    await Gallery.deleteMany({});

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
        durationInDays: 365,
        features: [
          'Digital ID',
          'Member profile',
          'Limited publishing access',
          'Directory listing',
        ],
        is_popular: false,
      },
      {
        id: 'plan_standard',
        name: 'Standard',
        price: 499,
        duration: '1 year',
        durationInDays: 365,
        features: [
          'Digital ID + printable',
          'Publish articles (with approval)',
          'Profile page',
          'Job board access',
          'Directory listing',
        ],
        is_popular: true,
      },
      {
        id: 'plan_pro',
        name: 'Pro',
        price: 999,
        duration: '1 year',
        durationInDays: 365,
        features: [
          'Priority article approval',
          'Featured profile',
          '1 webinar included',
          'Portfolio boost',
          'All Standard features',
        ],
        is_popular: false,
      },
      {
        id: 'plan_institutional',
        name: 'Institutional',
        price: 2999,
        duration: '1 year',
        durationInDays: 365,
        features: [
          'Organization page',
          'Multiple contributors',
          'Homepage feature eligibility',
          'All Pro features',
        ],
        is_popular: false,
      },
    ];
    await MembershipPlan.insertMany(plans);

    // ===== CATEGORIES =====
    const categories = [
      { name: 'Politics', slug: 'politics' },
      { name: 'Technology', slug: 'technology' },
      { name: 'Business', slug: 'business' },
      { name: 'Local News', slug: 'local-news' },
      { name: 'National', slug: 'national' },
      { name: 'International', slug: 'international' },
      { name: 'Sports', slug: 'sports' },
      { name: 'Entertainment', slug: 'entertainment' },
      { name: 'Education', slug: 'education' },
      { name: 'Health', slug: 'health' },
      { name: 'Crime', slug: 'crime' },
      { name: 'Media', slug: 'media' },
      { name: 'General', slug: 'general' },
      { name: 'Other', slug: 'other' },
    ];
    await Category.insertMany(categories);

    // ===== USERS =====
    const adminUser = await User.create({
      firstName: 'Admin',
      lastName: 'IDMA',
      name: 'Admin IDMA',
      email: 'admin@idma.org',
      mobile: '9999999990',
      state: 'Punjab',
      city: 'Chandigarh',
      organization: 'IDMA',
      designation: 'Administrator',
      password: 'admin123', // Will be hashed by pre-save hook
      membershipId: 'IDMA000001',
      role: 'admin',
      membershipStatus: 'approved',
      verification_status: 'verified',
      selectedPlan: 'plan_pro',
      selectedPlanName: 'Pro',
      membership_expiry: new Date('2027-01-01'),
    });

    const demoUser = await User.create({
      firstName: 'Demo',
      lastName: 'User',
      name: 'Demo User',
      email: 'demo@idmfmedia.org',
      mobile: '9999999999',
      state: 'Uttar Pradesh',
      city: 'Meerut',
      organization: 'AIMA Media',
      designation: 'Journalist',
      password: 'demo123', // Will be hashed by pre-save hook
      membershipId: 'AIMA100001',
      role: 'member',
      membershipStatus: 'approved',
      verification_status: 'verified',
      selectedPlan: 'plan_standard',
      selectedPlanName: 'Standard',
      membership_expiry: new Date('2027-01-01'),
      linkedin: '',
      website: '',
      skills: 'Journalism, Reporting, Photography',
      postsCount: 12,
      membersCount: 48,
      viewsCount: 156,
      readersCount: 8,
    });

    // ===== NEWS =====
    const news = [
      {
        author: demoUser._id,
        authorName: 'Demo User',
        title: 'ସମୟକୁ ସଠିକ୍ ଉପଯୋଗ କରିପାରିଲେ ଭଲ ମଣିଷଟିଏ ହୋଇପାରିବ - ଅତିଥି ବୃନ୍ଦ',
        slug: 'samayaku-sathik-upayoga-karipaarile',
        content: 'ରାଧାକୃଷ୍ଣ ବିଦ୍ୟାପୀଠ କୁଣ୍ଡାପିଠାର ବିଦାୟକାଳୀନ ଉତ୍ସବ ଘଟଗାଁ, କେନ୍ଦୁଝର ୧୪/୨ : ସ୍ଥାନୀୟ ରାଧାକୃଷ୍ଣ ବିଦ୍ୟାପୀଠ କୁଣ୍ଡାପିଠାର ଚଳିତ ବର୍ଷ ଦଶମ ଶ୍ରેଣୀର ଛାତ୍ରଛାત୍ରୀ ମାନଙ୍କୁ ବିଦାୟକାଳୀନ ଉତ୍ସବ ଅନୁଷ୍ଠିત ହୋଇଯାଇଛି। ବିଦ୍ୟାଳୟର ପ୍ରଧାନଶିକ୍ଷକ ସୁରେନ୍ଦ୍ରନାଥ ସାହୁଙ୍କ ପୌରହିତ୍ୟରେ ମୁଖ୍ୟ ଅତିଥି ରୂପେ ବିଦ୍ୟାଳୟର ପୂର୍ବତନ ଅବସરପ୍ରାପ୍ତ ପ୍ରଧାନ ଶିକ୍ષକ, ଅଲ୍ ଇଣ୍ଡିଆ ମେଡିଆ ଆସୋସିଏସନ୍ କେନ୍ଦୁଝର ଜିଲ୍ଲାର କାର୍ଯ୍ୟକାରୀ ସଦସ୍ୟ ତଥା ଓଡ଼ିଆ ଭାଷା ସାହିତ୍ୟର ନବ ଉନ୍ମେଷ ସଂଯୋଗୀ ସଜଫୁଲର ସଂପାଦକ ବାବୁଲାଲ ପଲେଇ।',
        image: 'https://aimamedia.org/fotos/aimanewsphoto1/727e1e2d-b1ed-4cec-92fc-94f6f7c1d860.jpg',
        images: [
          'https://aimamedia.org/fotos/aimanewsphoto2/f6ddfa8d-37ff-4c10-88ba-e19d8613da32.jpg',
          'https://aimamedia.org/fotos/aimanewsphoto3/e5e51511-f596-491e-acdc-6f0898cde3a8.jpg',
        ],
        category: 'Local News',
        state: 'Orissa',
        tags: ['education', 'orissa', 'local'],
        status: 'published',
        isApproved: true,
        published_at: new Date('2026-02-15T09:11:00.000Z'),
        likes: 1,
        views: 0,
      },
      {
        author: demoUser._id,
        authorName: 'Demo User',
        title: 'समस्त देशवासियो को महाशिवरात्रि की अनंत शुभकामनाए....🌹🌹',
        slug: 'mahashivratri-ki-shubhkamnaye',
        content: 'समस्त देशवासियो को महाशिवरात्रि की अनंत शुभकामनायें....🌹🌹आज के दिन ही ब्रम्हाण्ड मे बहुत ही खूबसूरत घटना हुईं थी...आज ही शिव और शक्ति का मिलન हुआ था💞🙏 अगर प्रेम ही करना है तो ऐसा कीजिये कि जहाँ विश्वास और भरोसा हो... चंद लाइनो मे शिव और पार्वती माँ कि प्रेम कहानी लिख रही हूँ ❣️❣️ज़ब माता पार्वती माता सती के रूप मे थी तो उन्हें भगवान शिव से प्रेम हो गया तो उन्होंने भगवान शिव से विवाह कर लिया।',
        image: 'https://aimamedia.org/fotos/aimanewsphoto1/838bd2ee-f7d9-4eb8-b9a1-10ea5fa3c67f.jpg',
        category: 'Local News',
        state: 'Uttar Pradesh',
        tags: ['festival', 'shivratri'],
        status: 'published',
        isApproved: true,
        is_featured: true,
        is_trending: true,
        published_at: new Date('2026-02-15T09:10:00.000Z'),
        likes: 1,
        views: 58,
      },
    ];
    await NewsArticle.insertMany(news);

    // ===== GALLERY =====
    const gallery = [
      { title: 'AIMA Hindi Patrkarita Divas', image: 'https://aimamedia.org/fotos/aimaprogram/10.jpg', category: 'Events' },
      { title: 'ADG DK Thakur addressing', image: 'https://aimamedia.org/fotos/aimaprogram/5.jpg', category: 'Events' },
      { title: 'MLA Amit Agarwal felicitation', image: 'https://aimamedia.org/fotos/aimaprogram/9.jpg', category: 'Awards' },
      { title: 'Ravi Prakash Tiwari honoured', image: 'https://aimamedia.org/fotos/aimaprogram/6.jpg', category: 'Awards' },
      { title: 'Rajendra Singh felicitation', image: 'https://aimamedia.org/fotos/aimaprogram/1.jpg', category: 'Awards' },
      { title: 'Pushpendra Sharma honoured', image: 'https://aimamedia.org/fotos/aimaprogram/3.jpg', category: 'Awards' },
      { title: 'Ramkumar Sharma felicitation', image: 'https://aimamedia.org/fotos/aimaprogram/1_11.jpg', category: 'Awards' },
      { title: 'Rajesh Sharma honoured', image: 'https://aimamedia.org/fotos/aimaprogram/12.jpg', category: 'Awards' },
      { title: 'Arun Jindal felicitation', image: 'https://aimamedia.org/fotos/aimaprogram/13.jpg', category: 'Awards' },
      { title: 'Surendra Sharma honoured', image: 'https://aimamedia.org/fotos/aimaprogram/2.jpg', category: 'Awards' },
      { title: 'Gyan Dixit felicitation', image: 'https://aimamedia.org/fotos/aimaprogram/4.jpg', category: 'Awards' },
      { title: 'AIMA Group Photo', image: 'https://aimamedia.org/fotos/aimaprogram/14.jpg', category: 'Events' },
    ];
    await Gallery.insertMany(gallery);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
}

seed();
