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
  input OffenseInput {
    fineId: ID!
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
    fines: [Fine]
    offenses: [Offense]
    players: [Player]
    fine(fineId: ID): Fine
    offense(offenseId: ID): Offense
    player(playerId: ID): Player
    playerByName(name: String): Player
  }

  type Mutation {
    createOffense(offenseInput: OffenseInput): Offense
    createPlayer(playerInput: PlayerInput): Player
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
  playerByName: ({ name }) => Player.findOne({ name }),
  fines: () => Fine.find().then(res => res),
  offenses: () => Offense.find().then(res => res),
  players: () => Player.find().then(res => res),

  createPlayer: ({ playerInput }) => {
    const player = new Player({ name: playerInput.name });
    return player.save().then(res => res).catch(err => console.error(err));
  },
  createFine: ({ fineInput }) => {
    const { name, description, value } = fineInput;
    const fine = new Fine({ name, description, value });
    return fine.save().then(res => res).catch(err => console.error(err));
  },
  createOffense: ({ offenseInput }) => {
    const { playerId, fineId, comment } = offenseInput;
    const offense = new Offense({ playerId, fineId, comment });
    return offense.save().then(res => res).catch(err => console.error(err));
  },
};

module.exports = { schema, rootValue };