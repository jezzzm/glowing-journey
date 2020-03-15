const
  getResults = require('./get-results'),
  express = require('express'),
  bodyParser = require('body-parser'),
  graphqlHTTP = require('express-graphql'),
  mongo = require('mongoose'),
  { buildSchema } = require('graphql');

// Database config
mongo
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

// graphql config
const schema = buildSchema(`
  type Query {
    hello: String
    yep(arg: String): String
  }
`);

const root = {
  hello: () => 'hello world!',
  yep: ({ arg }) => `yep ${arg}`,
};

// express config
const app = express();
app.use(bodyParser.json());

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
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



// selectors
const myTeam = {
  club: 'LNCOV',
  age: 'R:MAA',
  team: 'MAA2 A' // TODO: tbc
};

const demoTeam = {
  club: 'LNCOV',
  age: 'R:U08SAPL',
  team: 'U8 SAL'
};

// getResults(demoTeam);
