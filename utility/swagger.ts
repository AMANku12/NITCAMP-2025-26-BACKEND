import swaggerJsdoc from "swagger-jsdoc";


const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'NITCAMP MENTORSHIP PROGRAM BACKEND API',
      version: '1.0.0',
      description: 'API documentation for the Mentorship program',
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server',
      },
    ],
  },
  apis: ['./docs/*.swagger.yaml'], // Path to your route files (adjust if needed)
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;