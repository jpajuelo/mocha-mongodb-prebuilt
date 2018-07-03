const expect = require('chai').expect
const { Log } = require('./log')
const helper = require('./helper')

describe('log', () => {

  beforeEach(() => helper.initDb())

  afterEach(() => helper.dropDb())

  it('should find all logs', done => {
    Log.find().then(res => {
      expect(res.length).to.equal(1)
      done()
    })
  })
})
