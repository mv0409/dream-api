const app = require('../../src/app')
const request = require('supertest')
const { possibleTypes } = require('../../src/entities/dream/models/dream')
const mongoose = require('mongoose')
const config = require('../../src/config.default')

describe('🧪 Dream end to end test', () => {

    let dreamId

    beforeAll(async () => {
        // connect to test mongoose db
        await mongoose.connect(config.mongoUri, {
			// MongoDB configuration
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true,
			useUnifiedTopology: true,
		})
    });

    afterAll(async () => {
        // Closes the Mongoose connection
        await mongoose.connection.close();
      });
      
      

    it('Gets the public test endpoint', async() => {
        // Sends GET Request to /public endpoint
        const res = await request(app).get('/public')
        // check response
        expect(res.body.success).toBe(true)
    })

    it('should get dream types', async () => {
        // Sends GET Request to /dream/types endpoint
        const res = await request(app).get('/dream/types')
        // check response
        expect(res.body).toEqual(possibleTypes)
    })

    it('should create dream' , async() => {
        // Sends POST Request to /dream endpoint
        const dream = {
            title: 'Title number 1',
            description: 'Description number 1',
            date: '2017-12-12',
            type: 'happy',
        }
        // hit endpoint
        const res = await request(app).post('/dream').send(dream)
        // check reponse
        expect(res.body.title).toEqual(dream.title)
        // save dream id
        dreamId = res.body._id
    })
    it('should find dream', async () => {
        // Sends GET Request to /dream/:id endpoint
        const res = await request(app).get(`/dream/${dreamId}`)
        // check reponse
        expect(res.body._id).toEqual(dreamId)
    })

    it('should update dream', async() => {
        const dream = {
            title: 'Title number 100',
            description: 'Description number 100',
            date: '2017-12-12',
            type: 'happy',
        }
        // Sends PATCH Request to /dream/:id endpoint
        const res = await request(app).patch(`/dream/${dreamId}`).send(dream)
        // check reponse
        expect(res.body.title).toEqual(dream.title) 
    })

    it('should find dreams by date title or type ' , async() => {
        // Sends GET Request to /dream endpoint
        // hit endpoint
        const res = await request(app).post('/dream').send(dream)
        // check reponse
        expect(res.body.title).toEqual(dream.title)
    })

    it('should update dream', async() => {
        // Sends DELETE Request to /dream/:id endpoint
        const res = await request(app).delete(`/dream/${dreamId}`)
        // check reponse
        expect(res.body._id).toEqual(dreamId) 
    })

})
