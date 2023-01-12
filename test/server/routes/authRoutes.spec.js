const supertest = require('supertest')(require('../../../server/app'));
const expect = require('chai').expect;
const seed = require('../../../script/seed');
const {
  models: { User },
} = require('../../../server/db');

describe('Auth Routes', () => {
  beforeEach(async () => {
    await seed();
  });

  describe('user Sign up', () => {
    xit('POST /auth/signup response with token', () => {
      return supertest
        .post('/auth/signup')
        .send({
          name: 'miya',
          email: 'miya@example.com',
          password: '123456',
          passwordConfirm: '123456',
        })
        .expect(201)
        .expect((res) => {
          expect(res.body).to.have.property('token');
          expect(res.body.token.length).to.greaterThan(0);
        });
    });

    xit('if the user this email already exist, return 401 ', () => {
      return supertest
        .post('/auth/signup')
        .send({
          name: 'Cindy',
          email: 'cindy@example.com',
          password: '123456',
          passwordConfirm: '123456',
        })
        .expect(401);
    });
  });

  describe('user login ', () => {
    xit('POST /auth/login response with token', () => {
      return supertest
        .post('/auth/login')
        .send({
          email: 'cindy@example.com',
          password: '123456',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body).to.have.property('token');
          expect(res.body.token.length).to.greaterThan(0);
        });
    });

    xit('if req.body do not include email, return 400', () => {
      return supertest
        .post('/auth/login')
        .send({
          password: '123456xxxxx',
        })
        .expect(400);
    });

    xit('if req.body do not include password, return 400', () => {
      return supertest
        .post('/auth/login')
        .send({
          email: 'ddddd@example.com',
        })
        .expect(400);
    });

    xit('if there is not user exist in db with this email, response with 401', () => {
      return supertest
        .post('/auth/login')
        .send({
          email: 'ddddd@example.com',
          password: '123456xxxxx',
        })
        .expect(401);
    });

    xit('if passoword is incorrect, response with 401 ', () => {
      return supertest
        .post('/auth/login')
        .send({
          email: 'cindy@example.com',
          password: '123456xxxxx',
        })
        .expect(401);
    });
  });

  describe.only('protect middleware to get logged in user infomration ', () => {
    let token;
    beforeEach(async () => {
      const john = await User.findOne({
        where: {
          email: 'john@example.com',
        },
      });
      token = john.generateToken();
    });

    xit('get user information when send token inside request headers.', () => {
      return supertest
        .get('/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(function (res) {
          expect(res.body.user.name).to.equal('John');
          expect(res.body.user.email).to.equal('john@example.com');
          expect(res.body.user.role).to.equal('user');
        });
    });

    xit("response with 401 if request don't have token inside the request headers", () => {
      return supertest.get('/auth/me').expect(401);
    });

    xit('response with 401 if token is invalid', () => {
      supertest
        .get('/auth/me')
        .set('Authorization', 'Bearer xxxxx')
        .expect(401);
    });

    xit('response with 401 if the user belongs to this token does no longer exist', async () => {
      const teddy = await User.create({
        name: 'teddy',
        email: 'teddy@example.com',
        password: '123456',
        passwordConfirm: '123456',
      });
      const token = teddy.generateToken();
      await User.destroy({
        where: {
          id: teddy.id,
        },
      });

      setTimeout(() => {
        supertest
          .get('/auth/me')
          .set('Authorization', `Bearer ${token}`)
          .expect(401);
      }, 2000);
    });

    xit('response 401 if user changed password after token was issued', async () => {
      const teddy = await User.create({
        name: 'teddy',
        email: 'teddy@example.com',
        password: '123456',
        passwordConfirm: '123456',
      });

      const token = teddy.generateToken();

      setTimeout(async () => {
        teddy.password = 'xxxxxx';
        teddy.passwordConfirm = 'xxxxxx';
        await teddy.save();

        return supertest
          .get('/auth/me')
          .set('Authorization', `Bearer ${token}`)
          .expect(401);
      }, 1000);
    });
  });
});
