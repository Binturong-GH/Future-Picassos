const supertest = require('supertest')(require('../../../server/app'));
const expect = require('chai').expect;
const seed = require('../../../script/seed');

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
});
