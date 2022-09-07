const swaggerDocument = {
  "openapi": "3.0.0",

  "info": {
    "title": "Mono Assignment API",
    "description": "Mono Assignment API",
    "contact": {
      "name": "Bello Ajibola",
      "email": "bellohargbola13@gmail.com"
    }
  },

  "components": {
    "securitySchemes": {
      "bearerAuth": {
        "type": "http",
        "scheme": "bearer",
        "bearerFormat": "JWT",
        "description": "Bearer {token}"
      }
    },

    "schemas": {
      "SuccessResponse": {
        "properties": {
          "success": {
            "type": "boolean",
            "default": true
          },
          "message": {
            "type": "string"
          },
        }
      },

      "ErrorResponse": {
        "properties": {
          "success": {
            "type": "boolean",
            "default": false
          },
          "message": {
            "type": "string"
          },
          "error": {
            "type": "object",
          }
        }
      },

      "AuthErrorResponse": {
        "properties": {
          "success": {
            "type": "boolean",
            "default": false
          },
          "message": {
            "type": "string"
          }
        }
      },

      "PaginationDetails": {
        "properties": {
          "totalContent": {
            "type": "integer",
          },
          // "offset": {
          //   "type": "integer",
          // },
          "limit": {
            "type": "integer",
          },
          // "totalPages": {
          //   "type": "integer",
          // },
          "page": {
            "type": "integer",
          },
          // "hasPrevPage": {
          //   "type": "boolean",
          // },
          // "hasNextPage": {
          //   "type": "boolean",
          // }
        }
      },

      "User": {
        "properties": {
          "_id": {
            "type": "string"
          },
          "firstName": {
            "type": "string"
          },
          "lastName": {
            "type": "string"
          },
          "email": {
            "type": "string"
          }
        }
      },

      "Account": {
        "properties": {
          "_id": {
            "type": "string"
          },
          "userId": {
            "type": "string"
          },
          "accountId": {
            "type": "string"
          },
          "isLinked": {
            "type": "boolean"
          },
          "dataStatus": {
            "type": "string"
          },
          "authMethod": {
            "type": "string"
          },
          "accountName": {
            "type": "string"
          },
          "currency": {
            "type": "string"
          },
          "accountType": {
            "type": "string"
          },
          "accountNumber": {
            "type": "string"
          },
          "balance": {
            "type": "number"
          },
          "bvn": {
            "type": "string"
          },
          "bankName": {
            "type": "string"
          },
          "bankCode": {
            "type": "string"
          },
          "bankType": {
            "type": "string"
          },
        }
      },

      "Transaction": {
        "properties": {
          "_id": {
            "type": "string"
          },
          "type": {
            "type": "string"
          },
          "amount": {
            "type": "number"
          },
          "narration": {
            "type": "string"
          },
          "date": {
            "type": "string"
          },
          "balance": {
            "type": "number"
          },
          "currency": {
            "type": "number"
          },
          "category": {
            "type": "number"
          }
        }
      }
    }
  },

  "paths": {
    "/api/users/signup": {
      "post": {
        "summary": "User signup",
        "description": "User signup",
        "tags": ["User Authentication"],

        "requestBody": {
          "description": "User details for signup",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "properties": {
                  "firstName": {
                    "type": "string"
                  },
                  "lastName": {
                    "type": "string"
                  },
                  "email": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },

        "responses": {
          "200": {
            "description": "User signup successful",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SuccessResponse"
                }
              }
            }
          },

          "400": {
            "description": "User signup failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },

    "/api/users/login": {
      "post": {
        "summary": "User login",
        "description": "User login",
        "tags": ["User Authentication"],

        "requestBody": {
          "description": "User details for login",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "properties": {
                  "email": {
                    "type": "string"
                  },
                  "password": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },

        "responses": {
          "200": {
            "description": "User login successful",
            "content": {
              "application/json": {
                "schema": {
                  'allOf': [
                    {
                      "$ref": "#/components/schemas/SuccessResponse",
                    },
                    {
                      "type": "object",
                      "properties": {
                        "data": {
                          "type": "object",
                          "properties": {
                            "token": {
                              "type": "string"
                            },
                            "refreshToken": {
                              "type": "string"
                            }
                          }
                        }
                      }
                    }
                  ]
                }
              }
            }
          },

          "400": {
            "description": "User login failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          }
        }
      }
    },

    "/api/users/deleteaccount": {
      "patch": {
        "security": [
          {
            "bearerAuth": []
          }
        ],

        "summary": "Delete user account",
        "description": "Delete user account",
        "tags": ["User Management"],

        "responses": {
          "200": {
            "description": "Delete user account successful",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SuccessResponse"
                }
              }
            }
          },

          "400": {
            "description": "Delete user account failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },

          "401": {
            "description": "Authentication failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthErrorResponse"
                }
              }
            }
          }
        }

      }
    },

    "/api/accounts/linkaccount": {
      "post": {
        "security": [
          {
            "bearerAuth": []
          }
        ],

        "summary": "Link bank account",
        "description": "Link bank account",
        "tags": ["Accounts Management"],

        "requestBody": {
          "description": "Account code",
          "required": true,
          "content": {
            "application/json": {
              "schema": {
                "properties": {
                  "code": {
                    "type": "string"
                  }
                }
              }
            }
          }
        },

        "responses": {
          "200": {
            "description": "Account linked successful",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SuccessResponse"
                }
              }
            }
          },

          "400": {
            "description": "Account linking failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },

          "401": {
            "description": "Authentication failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthErrorResponse"
                }
              }
            }
          }
        }
      }
    },

    "/api/accounts/linkedaccounts": {
      "get": {
        "security": [
          {
            "bearerAuth": []
          }
        ],

        "summary": "Get linked bank accounts",
        "description": "Get linked bank accounts",
        "tags": ["Accounts Management"],

        "parameters": [
          {
            "in": "query",
            "name": "page",
            "description": "Pagination page number",
            "schema": {
              "type": "integer",
            }
          },
          {
            "in": "query",
            "name": "size",
            "description": "Pagination size",
            "schema": {
              "type": "integer",
            }
          }
        ],

        "responses": {
          "200": {
            "description": "Accounts retrieved successfully",
            "content": {
              "application/json": {
                "schema": {
                  'allOf': [
                    {
                      "$ref": "#/components/schemas/SuccessResponse",
                    },
                    {
                      "type": "object",
                      "allOf": [
                        {
                          "$ref": "#/components/schemas/PaginationDetails",
                        },
                        {
                          "type": "object",
                          "properties": {
                            "content": {
                              "type": "array",
                              "items": {
                                "$ref": "#/components/schemas/Account"
                              }
                            }
                          }
                        }
                      ]
                    }
                  ]
                }
              }
            }
          },

          "400": {
            "description": "Accounts retrieving failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },

          "401": {
            "description": "Authentication failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthErrorResponse"
                }
              }
            }
          }

        }
      }
    },

    "/api/accounts/transactions/{accountId}": {
      "get": {
        "security": [
          {
            "bearerAuth": []
          }
        ],

        "summary": "Get transactions of linked bank account",
        "description": "Get transactions of linked bank account",
        "tags": ["Accounts Management"],

        "parameters": [
          {
            "in": "path",
            "name": "accountId",
            "required": true,
            "description": "accountId of connected account",
            "schema": {
              "type": "string",
            }
          },

          {
            "in": "query",
            "name": "page",
            "description": "Pagination page number",
            "schema": {
              "type": "integer",
            }
          },

          {
            "in": "query",
            "name": "size",
            "description": "Pagination size",
            "schema": {
              "type": "integer",
            }
          }
        ],

        "responses": {
          "200": {
            "description": "Transactions retrieved successfully",
            "content": {
              "application/json": {
                "schema": {
                  'allOf': [
                    {
                      "$ref": "#/components/schemas/SuccessResponse",
                    },
                    {
                      "type": "object",
                      "allOf": [
                        {
                          "$ref": "#/components/schemas/PaginationDetails",
                        },
                        {
                          "type": "object",
                          "properties": {
                            "content": {
                              "type": "array",
                              "items": {
                                "$ref": "#/components/schemas/Transaction"
                              }
                            }
                          }
                        },
                        {
                          "type": "object",
                          "properties": {
                            "accountDetails": {
                              "$ref": "#/components/schemas/Account"
                            }
                          }
                        }
                      ]
                    }
                  ]
                }
              }
            }
          },

          "400": {
            "description": "Accounts retrieving failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },

          "401": {
            "description": "Authentication failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthErrorResponse"
                }
              }
            }
          }
        }

      }
    },

    "/api/accounts/unlink/{_id}/{accountId}": {
      "patch": {
        "security": [
          {
            "bearerAuth": []
          }
        ],

        "summary": "Unlink bank account",
        "description": "Unlink bank account",
        "tags": ["Accounts Management"],

        "parameters": [
          {
            "in": "path",
            "name": "_id",
            "required": true,
            "description": "_id of connected account",
            "schema": {
              "type": "string",
            }
          },
          {
            "in": "path",
            "name": "accountId",
            "required": true,
            "description": "accountId of connected account",
            "schema": {
              "type": "string",
            }
          },
        ],

        "responses": {
          "200": {
            "description": "Account unlinked successfully",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/SuccessResponse",
                }
              }
            }
          },

          "400": {
            "description": "Account unlinking failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/ErrorResponse"
                }
              }
            }
          },

          "401": {
            "description": "Authentication failed",
            "content": {
              "application/json": {
                "schema": {
                  "$ref": "#/components/schemas/AuthErrorResponse"
                }
              }
            }
          }
        }

      }
    }
  }
}

export default swaggerDocument