const swaggerUi = require('swagger-ui-express');
const swaggerDoc = {
  swagger: '2.0',
  info: {
    title: 'Encryption Server API',
    description: 'API for encryption and decryption services',
    version: '1.0.0'
  },
  host: `localhost:${3345}`,
  basePath: '/',
  schemes: ['http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  paths: {
    '/': {
      get: {
        summary: 'Welcome message',
        responses: {
          200: {
            description: 'Welcome message'
          }
        }
      }
    },
    '/encrypt': {
      post: {
        summary: 'Encrypt data',
        requestBody: {
          description: 'Data to encrypt',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: {
                    type: 'string'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Encrypted data'
          }
        }
      }
    },
    '/decrypt': {
      post: {
        summary: 'Decrypt data',
        requestBody: {
          description: 'Data to decrypt',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  data: {
                    type: 'string'
                  }
                }
              }
            }
          }
        },
        responses: {
          200: {
            description: 'Decrypted data'
          }
        }
      }
    }
  }
};


module.exports = swaggerUi.serve, swaggerUi.setup(swaggerDoc);
