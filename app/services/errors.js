
const errors = {
  badRequest: {
    code: 400,
    message: 'Bad Request'
  },
  unauthorized: {
    code: 401,
    message: 'Unauthorized'
  },
  forbidden: {
    code: 403,
    message: 'Forbidden'
  },
  notFound: {
    code: 404,
    message: 'Not Found'
  },
  // Mongoose error
  invalidObjectId: {
    code: 400,
    message: 'Invalid Object Id.'
  }
}

class TodoError extends Error {
  constructor(error) {
    super(error);
    this.code = error.code;
    this.message = error.message;
    Error.stackTraceLimit = 5;
  }
}

Object.keys(errors).forEach(function(type) {
  TodoError[type] = () => new TodoError(errors[type]);
});

module.exports = TodoError;
