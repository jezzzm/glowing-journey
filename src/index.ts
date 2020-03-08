const
  getResults = require('./get-results'),
  express = require('express'),
  bodyParser = require('body-parser'),
  app = express().use(bodyParser.json());

app.listen(process.env.PORT || 1337, () => console.log('webhook is listening'));

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
