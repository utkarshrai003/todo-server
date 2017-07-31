
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
  }
}

class TodoError extends Error {
  constructor(error) {
    super(error);
    this.code = code;
    Error.stackTraceLimit = 5;
  }
}

Object.keys(errors).forEach(function(type) {
  TodoError[type] = () => new TodoError(errors[type]);
});

module.exports = TodoError;
