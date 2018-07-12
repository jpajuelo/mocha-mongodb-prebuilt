
function middleware (handler) {
  return (req, res, next) => {
    handler(req, res)
      .then(() => next())
      .catch(next)
  }
}

function controller (action, status) {
  return (req, res, next) => {
    handler(req, res)
      .then(body => {
        res.status(status).json(body)
      })
      .catch(next)
  }
}

router
  .route('/')
  .get((req, res, next) => {
    verifyToken(req, res)
      .then(() => next())
      .catch(next)
  })
  .get(findEntry)

const methods = {
  aspect: 'get',
  remove: 'delete'
}

const statusCodes = {
  aspect: HttpStatus.OK
}

exports = resourceRouter({
  '*': [],
  '/': {
    'aspect': [ // 200
      verifyToken,
      getEntry
    ],
    'remove': [], // 204
    'search': [], // 200
    'update': [], // 201
    'create': []  // 201
  }
})
