const path = require('path');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'AIMA Media API',
    version: '1.0.0',
    description: 'Backend API documentation for Media Membership Website',
  },
  servers: [
    {
      url: 'http://localhost:5000',
      description: 'Local server',
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: [path.join(__dirname, '..', 'routes', '*.js')],
};

module.exports = options;
