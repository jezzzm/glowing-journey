const getResults = require('./get-results');

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

getResults(demoTeam);