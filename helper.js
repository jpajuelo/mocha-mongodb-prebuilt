const mocha = require('mocha')
const run = mocha.prototype.run
const { MongodHelper } = require('mongodb-prebuilt')
const mongoose = require('mongoose')

mocha.prototype.run = function (done) {
  console.log('called before loading of test cases')
  let helper = new MongodHelper(['--port', '27017', '--dbpath', __dirname + '/tmp'])

  helper.run()
  .then(_ => {
    console.log('mongod is running')
    mongoose.connect('mongodb://localhost:27017/test', err => {
      if (err) {
        console.log('mongoose error', err)
      } else {
        mongoose.connection.dropDatabase()
        .then(_ => {
          run.call(this, function () {
            mongoose.connection.close()
            .then(_ => {
              console.log('called after all test completes (regardless of errors)')
              helper.mongoBin.childProcess.kill()
              done.apply(this, arguments)
            })
          })
        })
      }
    })
  })
  .catch(err => console.log('mongodb error', err))

}

module.exports.initDb = _ => {
  return mongoose.connection.collection('logs').insert([
    {
      level: 'info'
    }
  ])
}

module.exports.dropDb = _ => {
  return mongoose.connection.collection('logs').drop()
}
