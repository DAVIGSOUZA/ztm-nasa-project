const request = require('supertest')
const app = require('../../app')

describe('Test GET /launches', () => {
  test('Should respond 200 success', async () => {
    await request(app)
      .get('/launches')
      .expect('Content-Type', /json/)
      .expect(200)
  })
})

describe('Test POST /launches', () => {
  const partialLaunchData = {
    mission: 'test',
    rocket: 'Normandy SR-2',
    destination: 'Kepler-186 f',
  }

  const completeLaunchData = {
    ...partialLaunchData,
    launchDate: 'January 4, 2028'
  }

  test('Should respond 201 created', async () => {
    const response = await request(app)
      .post('/launches')
      .send(completeLaunchData)
      .expect('Content-Type', /json/)
      .expect(201)

  const requestDate = new Date(completeLaunchData.launchDate).valueOf()
  const responseDate = new Date(response.body.launchDate).valueOf()

  expect(responseDate).toBe(requestDate)

  expect(response.body).toMatchObject(partialLaunchData)
  })

  test('Should catch missing required properties', async() => {
    const response = await request(app)
      .post('/launches')
      .send(partialLaunchData)
      .expect('Content-Type', /json/)
      .expect(400)

    expect(response.body).toStrictEqual({error: 'Missing required property', launch: partialLaunchData})
  })

  test('Should catch invalid date', async() => {
    const invalidDate = 'invalid date'
    const response = await request(app)
      .post('/launches')
      .send({...partialLaunchData, launchDate: invalidDate})
      .expect('Content-Type', /json/)
      .expect(400)

    expect(response.body).toStrictEqual({error: 'Invalid Launch date'})
  })
})