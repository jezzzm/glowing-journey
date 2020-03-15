mongo = require('mongoose');

module.exports = () => mongo
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(res => {
    console.log('db connected')
  })
  .catch(err => {
    console.log(Error, err.message)
  });