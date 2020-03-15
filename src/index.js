const
  express = require('express'),
  bodyParser = require('body-parser'),
  graphqlHTTP = require('express-graphql'),
  db = require('./db'),
  { schema, rootValue } = require('./schema');


db();

// express config
const app = express();
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
  schema,
  rootValue,
  graphiql: true,
}))

app.post('/webhook', (req, res) => {
  let body = req.body;
  if (body.object === 'page') {
    body.entry.forEach(function (entry) {
      let webhook_event = entry.messaging[0];
      console.log(webhook_event);
    })

    res.status(200).send('event received');

  } else {
    res.sendStatus(400);
  }
})

app.get('/webhook', (req, res) => {
  let VERIFY_TOKEN = process.env.LESTER_KEY;
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  if (mode && token) {
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {
      console.log('webhook verified');
      res.status(200).send(challenge);
    } else {
      res.sendStatus(403);
    }
  }
})

app.listen(process.env.PORT || 1337, () => console.log('app is listening'));
