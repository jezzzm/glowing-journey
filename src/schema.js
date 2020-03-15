const
  { buildSchema } = require('graphql'),
  Fine = require('./models/fines'),
  Offense = require('./models/offenses'),
  Player = require('./models/players');


const schema = buildSchema(`
  type Fine {
    _id: ID!
    name: String!
    description: String
    value: Int!
    offenses: [Offense]
  }
  input FineInput {
    name: String!
    description: String
    value: Int!
  }
  type Offense {
    _id: ID!
    fineId: ID!
    playerId: ID!
    comment: String
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
    createOffense(playerId: ID!, fineId: ID!): Offense
    createPlayer(name: String!): Player
    createFine(fineInput: FineInput): Fine
    deleteOffense(id: ID!): Offense
    deletePlayer(id: ID!): Player
    deleteFine(id: ID!): Fine
    updateFine(id: ID!, value: Int, name: String, description: String): Fine
  }

  schema {
    query: Query
    mutation: Mutation
  }
`);

const rootValue = {
  fine: ({ fineId }) => Fine.findById(fineId),
  offense: ({ offenseId }) => Offense.findById(offenseId),
  player: ({ playerId }) => Player.findById(playerId),
  fines: () => Fine.find().then(res => res),
  offenses: () => Offense.find().then(res => res),
  players: () => Player.find().then(res => res),

  createPlayer: ({ name }) => (
    new Player({ name }).save().then(res => res)
  ),
  createFine: ({ fineInput }) => {
    const { name, description, value } = fineInput;
    const fine = new Fine({ name, description, value })
    return fine.save().then(res => {
      console.log(res);
      return res;
    }).catch(err => {
      console.log(err);
      throw err;
    })
  },
  createOffense: ({ playerId, fineId }) => (
    new Offense({ playerId, fineId }).save().then(res => res)
  ),
};

module.exports = { schema, rootValue };