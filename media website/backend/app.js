require('express-async-errors');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const authRoutes = require('./routes/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerOptions = require('./config/swagger');
const { errorHandler, notFound } = require('./middleware/error');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Swagger setup
const swaggerSpec = swaggerJSDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
const path = require('path');

// serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Multer error handler to give precise error messages
app.use((err, req, res, next) => {
	if (err && err.name === 'MulterError') {
		// send clearer multer errors
		const message = err.code ? `${err.code}: ${err.message}` : err.message;
		return res.status(400).json({ success: false, message });
	}
	next(err);
});

const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);
const newsRoutes = require('./routes/newsRoutes');
app.use('/api/news', newsRoutes);
const membersRoutes = require('./routes/members');
app.use('/api/members', membersRoutes);
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);
const galleryRoutes = require('./routes/gallery');
app.use('/api/gallery', galleryRoutes);
const planRoutes = require('./routes/planRoutes');
app.use('/api/plans', planRoutes);
const membershipRoutes = require('./routes/membershipRoutes');
app.use('/api/memberships', membershipRoutes);
const transactionRoutes = require('./routes/transactionRoutes');
app.use('/api/transactions', transactionRoutes);
const commentRoutes = require('./routes/commentRoutes');
app.use('/api/comments', commentRoutes);
const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);

app.get('/', (req, res) => res.send({ success: true, message: 'API running' }));

app.use('/api/auth', authRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
