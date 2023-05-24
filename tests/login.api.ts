import request from 'supertest';

const baseURL = 'http://localhost:3000';

describe('login', () => {
  const newTodo = {
    id: crypto.randomUUID(),
    item: 'Drink water',
    completed: false,
  };
  console.log('hi');
  beforeAll(async () => {
    await request(baseURL).post('/login').send(newTodo);
  });
  // afterAll(async () => {
  //   await request(baseURL).delete(`/logout/`);
  // });
  it('should return 200', async () => {
    const response = await request(baseURL).get('/todos');
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe(null);
  });
});
