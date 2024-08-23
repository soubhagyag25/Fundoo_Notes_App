const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const options = {
    definition: {
        openapi: '3.0.1',
        info: {
            title: 'Fundoo Notes',
            description: 'This is the replica of Google Keep. Users can register, log in, request a password reset, and perform note CRUD operations.',
            version: '1.0.0',
        },
        servers: [
            {
                url: 'http://localhost:5051/api/v1',
            }
        ],
        tags: [
            {
                name: 'Notes',
                description: 'Operations related to notes',
            },
            {
                name: 'User',
                description: 'Operations related to user management',
            }
        ],
    },
    paths: {
        '/users': {
            post: {
                tags: ['User'],
                description: 'Register a new user',
                requestBody: {
                    description: 'User registration details',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/User',
                            }
                        }
                    },
                    required: true,
                },
                responses: {
                    '201': {
                        description: 'User created successfully',
                    },
                    '400': {
                        description: 'Bad request',
                    },
                    '500': {
                        description: 'Internal server error',
                    }
                }
            }
        },
        '/users/login': {
            post: {
                tags: ['User'],
                description: 'User login',
                requestBody: {
                    description: 'User login credentials',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/login',
                            }
                        }
                    },
                    required: true,
                },
                responses: {
                    '200': {
                        description: 'Successfully logged in',
                    },
                    '400': {
                        description: 'Bad request',
                    },
                    '404': {
                        description: 'Email or password doesn\'t match',
                    },
                    '500': {
                        description: 'Internal server error',
                    }
                }
            }
        },
        '/users/forgotpassword': {
            post: {
                tags: ['User'],
                summary: 'Request password reset link',
                requestBody: {
                    description: 'Email to send reset link',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ForgetPassword',
                            }
                        }
                    },
                    required: true,
                },
                responses: {
                    '200': {
                        description: 'Reset password link sent successfully',
                    },
                    '400': {
                        description: 'Bad request',
                    },
                    '500': {
                        description: 'Could not send email',
                    }
                }
            }
        },
        '/users/resetPassword': {
            post: {
                tags: ['User'],
                summary: 'Reset user password',
                requestBody: {
                    description: 'New password',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/ResetPassword',
                            }
                        }
                    },
                    required: true,
                },
                responses: {
                    '200': {
                        description: 'Password reset successfully',
                    },
                    '400': {
                        description: 'Bad request',
                    },
                    '500': {
                        description: 'Internal server error',
                    }
                },
                security: [
                    {
                        JWT: [],
                    }
                ]
            }
        },
        '/notes': {
            get: {
                tags: ['Notes'],
                summary: 'Get all notes',
                responses: {
                    '200': {
                        description: 'Notes fetched successfully',
                    },
                    '400': {
                        description: 'Bad request',
                    },
                    '500': {
                        description: 'Internal server error',
                    }
                },
                security: [
                    {
                        JWT: [],
                    }
                ]
            },
            post: {
                tags: ['Notes'],
                summary: 'Create a new note',
                requestBody: {
                    description: 'Note details',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Note',
                            }
                        }
                    },
                    required: true,
                },
                responses: {
                    '201': {
                        description: 'Note created successfully',
                    },
                    '400': {
                        description: 'Bad request',
                    },
                    '500': {
                        description: 'Internal server error',
                    }
                },
                security: [
                    {
                        JWT: [],
                    }
                ]
            }
        },
        '/notes/{_id}': {
            get: {
                tags: ['Notes'],
                summary: 'Get a single note by ID',
                parameters: [
                    {
                        name: '_id',
                        in: 'path',
                        required: true,
                        description: 'Note ID',
                        schema: {
                            type: 'string',
                        }
                    }
                ],
                responses: {
                    '200': {
                        description: 'Note fetched successfully',
                    },
                    '400': {
                        description: 'Bad request',
                    },
                    '500': {
                        description: 'Internal server error',
                    }
                },
                security: [
                    {
                        JWT: [],
                    }
                ]
            },
            put: {
                tags: ['Notes'],
                summary: 'Update a note',
                parameters: [
                    {
                        name: '_id',
                        in: 'path',
                        required: true,
                        description: 'Note ID',
                        schema: {
                            type: 'string',
                        }
                    }
                ],
                requestBody: {
                    description: 'Note details to update',
                    content: {
                        'application/json': {
                            schema: {
                                $ref: '#/components/schemas/Note',
                            }
                        }
                    },
                    required: true,
                },
                responses: {
                    '202': {
                        description: 'Note updated successfully',
                    },
                    '400': {
                        description: 'Bad request',
                    },
                    '500': {
                        description: 'Internal server error',
                    }
                },
                security: [
                    {
                        JWT: [],
                    }
                ]
            },
            delete: {
                tags: ['Notes'],
                summary: 'Delete a note',
                parameters: [
                    {
                        name: '_id',
                        in: 'path',
                        required: true,
                        description: 'Note ID',
                        schema: {
                            type: 'string',
                        }
                    }
                ],
                responses: {
                    '202': {
                        description: 'Note deleted successfully',
                    },
                    '400': {
                        description: 'Bad request',
                    },
                    '500': {
                        description: 'Internal server error',
                    }
                },
                security: [
                    {
                        JWT: [],
                    }
                ]
            }
        },
        '/notes/isArchived/{_id}': {
            post: {
                tags: ['Notes'],
                summary: 'Archive a note',
                parameters: [
                    {
                        name: '_id',
                        in: 'path',
                        required: true,
                        description: 'Note ID',
                        schema: {
                            type: 'string',
                        }
                    }
                ],
                responses: {
                    '202': {
                        description: 'Note archived successfully',
                    },
                    '400': {
                        description: 'Bad request',
                    },
                    '500': {
                        description: 'Internal server error',
                    }
                },
                security: [
                    {
                        JWT: [],
                    }
                ]
            }
        },
        '/notes/isTrashed/{_id}': {
            post: {
                tags: ['Notes'],
                summary: 'Move a note to trash',
                parameters: [
                    {
                        name: '_id',
                        in: 'path',
                        required: true,
                        description: 'Note ID',
                        schema: {
                            type: 'string',
                        }
                    }
                ],
                responses: {
                    '202': {
                        description: 'Note moved to trash successfully',
                    },
                    '400': {
                        description: 'Bad request',
                    },
                    '500': {
                        description: 'Internal server error',
                    }
                },
                security: [
                    {
                        JWT: [],
                    }
                ]
            }
        }
    },
    components: {
        schemas: {
            User: {
                type: 'object',
                properties: {
                    fName: {
                        type: 'string',
                    },
                    lName: {
                        type: 'string',
                    },
                    email: {
                        type: 'string',
                    },
                    password: {
                        type: 'string',
                    }
                }
            },
            login: {
                type: 'object',
                properties: {
                    email: {
                        type: 'string',
                    },
                    password: {
                        type: 'string',
                    }
                }
            },
            ForgetPassword: {
                type: 'object',
                properties: {
                    email: {
                        type: 'string',
                    }
                }
            },
            ResetPassword: {
                type: 'object',
                properties: {
                    password: {
                        type: 'string',
                    }
                }
            },
            Note: {
                type: 'object',
                properties: {
                    title: {
                        type: 'string',
                    },
                    description: {
                        type: 'string',
                    },
                    color: {
                        type: 'string',
                    }
                }
            }
        },
        securitySchemes: {
            JWT: {
                type: 'apiKey',
                name: 'Authorization',
                in: 'header',
            }
        }
    }
};
const swaggerSpec = swaggerJsdoc(options);
module.exports = {
    swaggerUi,
    swaggerSpec,
};
