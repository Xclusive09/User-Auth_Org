const request = require('supertest');
const app = require('../server');  

let token;

beforeAll(async () => {
  const res = await request(app)
    .post('/api/auth/login')
    .send({
      email: 'john.doe@example.com',
      password: 'password123'
    });

  token = res.body.data.accessToken;
});

describe('Organisation API', () => {
  it('should create a new organisation', async () => {
    const res = await request(app)
      .post('/api/organisations')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'New Organisation',
        description: 'A new organisation'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
  });

  it('should get user organisations', async () => {
    const res = await request(app)
      .get('/api/organisations')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });
});
