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
      email: 'john@email.com',
      name: 'John Doe',
      password: 'securepassword'
    },
    UserResponse: {
      success: true,
      message: 'User created successfully',
      data: {
        $ref: '#/definitions/User'
      }
    },
    LoginResponse: {
      success: true,
      message: 'Login successful',
      token: 'JWT_TOKEN_HERE'
    },
    ErrorResponse: {
      success: false,
      message: 'Error message here',
      error: 'Error details here'
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
  paths: {
    '/api/users/create': {
      post: {
        tags: ['Users'],
        summary: 'Create a new user',
        description: 'Registers a new user with username, email, name, and password',
        parameters: [
          {
            name: 'user',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/User'
            }
          }
        ],
        responses: {
          201: {
            description: 'User created successfully',
            schema: {
              $ref: '#/definitions/UserResponse'
            }
          },
          400: {
            description: 'Invalid input',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          },
          500: {
            description: 'Internal server error',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          }
        }
      }
    },
    '/api/users/login': {
      post: {
        tags: ['Users'],
        summary: 'Login a user',
        description: 'Authenticates a user and returns a JWT token',
        parameters: [
          {
            name: 'credentials',
            in: 'body',
            required: true,
            schema: {
              type: 'object',
              properties: {
                email: {
                  type: 'string',
                  example: 'john@email.com'
                },
                password: {
                  type: 'string',
                  example: 'securepassword'
                }
              }
            }
          }
        ],
        responses: {
          200: {
            description: 'Login successful',
            schema: {
              $ref: '#/definitions/LoginResponse'
            }
          },
          401: {
            description: 'Invalid credentials',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          },
          500: {
            description: 'Internal server error',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          }
        }
      }
    },
     '/api/users/logout': {
      post: {
        tags: ['Users'],
        summary: 'Logout a user',
        description: 'Logs out the user. Client must delete the JWT token.',
        responses: {
          200: {
            description: 'Logout successful',
            schema: { $ref: '#/definitions/LogoutResponse' }
          }
        }
      }
    },
    '/api/users': {
      get: {
        tags: ['Users'],
        summary: 'Get all users',
        description: 'Retrieves a list of all users',
        responses: {
          200: {
            description: 'List of users retrieved successfully',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/User'
              }
            }
          },
          500: {
            description: 'Internal server error',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          }
        }
      }
    },
    '/api/users/{id}': {
      get: {
        tags: ['Users'],
        summary: 'Get a specific user',
        description: 'Retrieves user details by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'User ID'
          }
        ],
        responses: {
          200: {
            description: 'User retrieved successfully',
            schema: {
              $ref: '#/definitions/User'
            }
          },
          404: {
            description: 'User not found',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          },
          500: {
            description: 'Internal server error',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          }
        }
      },
      put: {
        tags: ['Users'],
        summary: 'Update a user',
        description: 'Updates user details',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'User ID'
          },
          {
            name: 'user',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/User'
            }
          }
        ],
        responses: {
          200: {
            description: 'User updated successfully',
            schema: {
              $ref: '#/definitions/UserResponse'
            }
          },
          404: {
            description: 'User not found',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          },
          500: {
            description: 'Internal server error',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          }
        }
      },
      delete: {
        tags: ['Users'],
        summary: 'Delete a user',
        description: 'Deletes a user by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'User ID'
          }
        ],
        responses: {
          200: {
            description: 'User deleted successfully',
            schema: {
              $ref: '#/definitions/UserResponse'
            }
          },
          404: {
            description: 'User not found',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          },
          500: {
            description: 'Internal server error',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          }
        }
      }
    },
    '/api/tasks': {
      get: {
        tags: ['Tasks'],
        summary: 'Get all tasks',
        description: 'Retrieves a list of all tasks',
        responses: {
          200: {
            description: 'List of tasks retrieved successfully',
            schema: {
              type: 'array',
              items: {
                $ref: '#/definitions/Task'
              }
            }
          },
          500: {
            description: 'Internal server error',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          }
        }
      },
      post: {
        tags: ['Tasks'],
        summary: 'Create a new task',
        description: 'Creates a new task with title, description, status, etc.',
        parameters: [
          {
            name: 'task',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/Task'
            }
          }
        ],
        responses: {
          201: {
            description: 'Task created successfully',
            schema: {
              $ref: '#/definitions/Task'
            }
          },
          400: {
            description: 'Invalid input',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          },
          500: {
            description: 'Internal server error',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          }
        }
      }
    },
    '/api/tasks/{id}': {
      get: {
        tags: ['Tasks'],
        summary: 'Get a specific task',
        description: 'Retrieves task details by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Task ID'
          }
        ],
        responses: {
          200: {
            description: 'Task retrieved successfully',
            schema: {
              $ref: '#/definitions/Task'
            }
          },
          404: {
            description: 'Task not found',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          },
          500: {
            description: 'Internal server error',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          }
        }
      },
      put: {
        tags: ['Tasks'],
        summary: 'Update a task',
        description: 'Updates task details',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Task ID'
          },
          {
            name: 'task',
            in: 'body',
            required: true,
            schema: {
              $ref: '#/definitions/Task'
            }
          }
        ],
        responses: {
          200: {
            description: 'Task updated successfully',
            schema: {
              $ref: '#/definitions/Task'
            }
          },
          404: {
            description: 'Task not found',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          },
          500: {
            description: 'Internal server error',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          }
        }
      },
      delete: {
        tags: ['Tasks'],
        summary: 'Delete a task',
        description: 'Deletes a task by ID',
        parameters: [
          {
            name: 'id',
            in: 'path',
            required: true,
            type: 'string',
            description: 'Task ID'
          }
        ],
        responses: {
          200: {
            description: 'Task deleted successfully',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          },
          404: {
            description: 'Task not found',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          },
          500: {
            description: 'Internal server error',
            schema: {
              $ref: '#/definitions/ErrorResponse'
            }
          }
        }
      }
    }
  }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
