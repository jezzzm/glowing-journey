const
  { buildSchema } = require('graphql'),
  Rule = require('./models/rules'),
  Offense = require('./models/offenses'),
  Player = require('./models/players');


const schema = buildSchema(`
  type Rule {
    _id: ID!
    name: String!
    description: String
    value: Int!
    offenses: [Offense]
  }
  input RuleInput {
    name: String!
    description: String
    value: Int!
  }

  type Offense {
    _id: ID!
    ruleId: ID!
    playerId: ID!
    comment: String
  }
  input OffenseInput {
    ruleId: ID!
    playerId: ID!
    comment: String
  }

  type Player {
    _id: ID!
    name: String!
    offenses: [Offense]
  }
  input PlayerInput {
    name: String!
  }

  type Query {
    rules: [Rule]
    offenses: [Offense]
    players: [Player]
    rule(ruleId: ID): Rule
    offense(offenseId: ID): Offense
    player(playerId: ID): Player
    playerByName(name: String): Player
  }

  type Mutation {
    createOffense(offenseInput: OffenseInput): Offense
    createPlayer(playerInput: PlayerInput): Player
    createRule(ruleInput: RuleInput): Rule
    deleteOffense(id: ID!): Offense
    deletePlayer(id: ID!): Player
    deleteRule(id: ID!): Rule
    updateRule(id: ID!, value: Int, name: String, description: String): Rule
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);

const rootValue = {
  rule: ({ ruleId }) => Rule.findById(ruleId),
  offense: ({ offenseId }) => Offense.findById(offenseId),
  player: ({ playerId }) => Player.findById(playerId),
  playerByName: ({ name }) => Player.findOne({ name }, (err, data) => data._id),
  rules: () => Rule.find().then(res => res),
  offenses: () => Offense.find().then(res => res),
  players: () => Player.find().then(res => res),

  createPlayer: ({ playerInput }) => {
    const player = new Player({ name: playerInput.name });
    return player.save().then(res => res).catch(err => console.error(err));
  },
  createRule: ({ ruleInput }) => {
    const { name, description, value } = ruleInput;
    const rule = new Rule({ name, description, value });
    return rule.save().then(res => res).catch(err => console.error(err));
  },
  createOffense: ({ offenseInput }) => {
    const { playerId, ruleId, comment } = offenseInput;
    const offense = new Offense({ playerId, ruleId, comment });
    return offense.save().then(res => res).catch(err => console.error(err));
  },
};

module.exports = { schema, rootValue };