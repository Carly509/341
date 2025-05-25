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
      status: 'Pending',
      dueDate: '2023-10-01T00:00:00Z',
      createdAt: '2023-09-01T00:00:00Z',
      updatedAt: '2023-09-01T00:00:00Z',
      category: 'Work',
      priority: 'High'
    },
    User: {
      username: 'John_Doe',
      email: 'jhon@email.com',
      name: 'John Doe'
    }
  },
  tags: [
    {
      name: 'Tasks',
      description: 'Task management operations'
    },
    {
      name: 'Users',
      description: 'User management operations'
    }
  ],
  TaskResponse: {
    success: true,
    message: 'Task created successfully',
    data: {
         $ref: '#/definitions/Task'
    },
    },
    UserResponse: {
        success: true,
        message: 'User created successfully',
        data: {
            $ref: '#/definitions/User'
        },
    },
    error: {
        success: false,
        message: 'Error creating task',
        error: 'Error details here'
    }
};
const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc)
