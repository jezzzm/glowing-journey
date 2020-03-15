const
  { buildSchema } = require('graphql'),
  Fine = require('./models/fines'),
  Offense = require('./models/offenses'),
  Player = require('./models/players');


const schema = buildSchema(`
  type Fine {
    name: String!
    description: String
    value: Int!
    offenses: [Offense]
  }
  type Offense {
    fineId: ID!
    playerId: ID!
  }
  type Player {
    name: String!
    offenses: [Offense]
  }
  type Query {
    fines: [Fine]
    offenses: [Offense]
    players: [Player]
    fine(fineId: ID): Fine
    offense(offenseId: ID): Offense
    player(playerId: ID): Player
  }

  type Mutation {
    addOffense(playerId: ID!, fineId: ID!): Offense
    addPlayer(name: String!): Player
    addFine(name: String!, description: String, value: Int!): Fine
    deleteOffense(id: ID!): Offense
    deletePlayer(id: ID!): Player
    deleteFine(id: ID!): Fine
    updateFine(id: ID!, value: Int, name: String, description: String): Fine
  }
`);

const rootValue = {
  Query: {
    fine: ({ fineId }) => Fine.findById(fineId),
    offense: ({ offenseId }) => Offense.findById(offenseId),
    player: ({ playerId }) => Player.findById(playerId),
    fines: () => Fine.find({}),
    offenses: () => Offense.find({}),
    players: () => Player.find({})
  },
  Mutation: {
    addPlayer: ({ name }) => new Player({ name }).save(),
    addFine: ({ name, description, value }) => new Fine({ name, description, value }).save(),
    addOffense: ({ playerId, fineId }) => new Offense({ playerId, fineId }).save(),
  }
};

module.exports = { schema, rootValue };