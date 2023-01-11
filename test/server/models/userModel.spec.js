const { expect } = require('chai');

const {
  db,
  models: { User },
} = require('../../../server/db');
const jwt = require('jsonwebtoken');
const seed = require('../../../script/seed');

describe('User model', () => {
  let users;
  beforeEach(async () => {
    users = (await seed()).users;
  });

  describe('instance methods', () => {
    describe('generateToken', () => {
      it('return a token with the id of the user', async () => {
        const token = users.john.generateToken();
        const { id } = await jwt.verify(token, process.env.JWT_SECRET);
        expect(id).to.equal(users.john.id);
      });
    });
  });
});
