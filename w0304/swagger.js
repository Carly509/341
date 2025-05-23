const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Task Management API',
    description: 'CRUD API for task management system',
    version: '1.0.0'
  },
  host: 'three41-1.onrender.com',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  definitions: {
    Task: {
      title: 'Task Title',
      description: 'Task Description',
      status: 'open',
      dueDate: '2023-10-01',
      createdAt: '2023-09-01',
      updatedAt: '2023-09-01',
      category: 'Work',
      priority: 'High'
    },
    TaskResponse: {
      success: true,
      message: 'Task created successfully',
      data: {
        $ref: '#/definitions/Task'
      }
    },
    Error: {
      success: false,
      message: 'Error message',
      error: 'Detailed error information'
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)
