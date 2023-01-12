/* global describe beforeEach it */

const { expect } = require('chai');
const request = require('supertest');
const {
  db,
  models: { Product },
} = require('../../../server/db');
const seed = require('../../../script/seed');
const app = require('../../../server/app');

describe('product routes', () => {
  beforeEach(async () => {
    await seed();
  });

  describe('/api/productRoute/', () => {
    xit('GET /api/productRoute', async () => {
      const res = await request(app).get('/api/productRoute').expect(200);

      expect(res.body).to.be.an('array');
      expect(res.body.length).to.equal(2);
    });
  }); // end describe('/api/users')
}); // end describe('User routes')
