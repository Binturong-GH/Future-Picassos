const { expect, assert } = require('chai');

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
    console.log('---------------------');
  });

  describe('User model hooks', () => {
    describe('before save to hash password ', () => {
      xit('hash password before save', async () => {
        const liliy = {
          name: 'liliya',
          email: 'liliya@example.com',
          password: '123456',
          passwordConfirm: '123456',
        };
        const user = await User.create(liliy);
        expect(user.password).to.not.equal('123456');
      });

      xit("user's password won't change if update is not happend at password field", async () => {
        const passwordBeforeUpdate = users.john.password;
        const [_, updatedUser] = await User.update(
          { name: 'John doe' },
          {
            where: {
              id: users.john.id,
            },
            returning: true,
          }
        );
        expect(updatedUser[0].name).to.equal('John doe');
        expect(updatedUser[0].password).to.equal(passwordBeforeUpdate);
      });
    });
  });

  describe('instance methods', () => {
    describe('generateToken', () => {
      xit('return a token with the id of the user', async () => {
        const token = users.john.generateToken();
        const { id } = await jwt.verify(token, process.env.JWT_SECRET);
        expect(id).to.equal(users.john.id);
      });
    });

    describe('excludePasswordField', () => {
      xit('the user that find by User.findOne include password,passwordConfirm field  ', async () => {
        const user = await User.findOne({ where: { id: users.john.id } });
        expect(user).to.have.property('password');
        expect(user).to.have.property('passwordConfirm');
      });

      xit("user don't have passoword, passwordConfirm field", async () => {
        const user = await User.findOne({ where: { id: users.john.id } });
        user.excludePasswordField();
        expect(user.password).to.equal(undefined);
        expect(user.passwordConfirm).to.equal(undefined);
      });
    });

    describe('correctPassword', () => {
      let user;
      beforeEach(async () => {
        const liliy = {
          name: 'liliya',
          email: 'liliya@example.com',
          password: '123456',
          passwordConfirm: '123456',
        };
        user = await User.create(liliy);
      });
      xit('if user entered correct Password, return true', async () => {
        expect(await user.correctPassword('123456')).to.be.true;
      });
      xit('if user entered incorrect Password, return false', async () => {
        expect(await user.correctPassword('12345xxx')).to.be.false;
      });
    });
  });
});
