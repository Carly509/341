const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Contacts API',
        description: 'API for managing contacts',
    },
    host: 'https://three41-tqb8.onrender.com/',
    schemes: ['https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
        {
        name: 'Contacts',
        description: 'Operations related to contacts',
        },
        {
        name: 'Users',
        description: 'Operations related to users',
        },
    ],
}

const outputFile = './swagger_output.json';
const endpointsFiles = ['./routes/index.js'];

// Generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
    console.log('Swagger documentation generated successfully!');
});
