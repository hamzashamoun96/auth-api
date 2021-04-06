'use strict';
require('dotenv').config();
const server = require('../src/server.js');
const supergoose = require('@code-fellows/supergoose');
const request = supergoose(server.server);

describe('Server', () => {

    it('Handler Bad Routes', async () => {
        const response = await request.get('/*');
        expect(response.status).toEqual(404);
    });

    it('Handler Bad Methods for food', async () => {
        const response = await request.patch('/food');
        expect(response.status).toEqual(404);
    });
    it('Handler Bad Methods for clothes', async () => {
        const response = await request.patch('/cloth');
        expect(response.status).toEqual(404);
    });
});

describe('Routes', () => {
    let ID1;
    let ID2;
    it('Create record using POST', async () => {
        const response = await request.post(`/api/v1/food`).send({ name: "apple", calories: 20 })

        expect(response.body.name).toEqual('apple')
        ID1 = response.body._id
    });

    it('Read a list of record using GET', async () => {
        const response = await request.get(`/api/v1/food`)
        let DATA = response.body.find((obj) => obj._id === ID1);
        expect(DATA._id).toEqual(ID1)
    });

    it('Read a record using GET', async () => {
        const response = await request.get(`/api/v1/food/${ID1}`)
        expect(response.body._id).toEqual(ID1)
    });

    it('Update a record using PUT', async () => {
        const response = await request.put(`/api/v1/food/${ID1}`).send({ name: "banana" })
        expect(response.body.name).toEqual('banana')
    });

    it('Destroy a record using DELETE', async () => {
        const response = await request.delete(`/api/v1/food/${ID1}`)
        expect(response.body).toEqual({})
    });




    it('Create record using POST', async () => {
        const response = await request.post(`/api/v1/clothes`).send({ name: "shirt", color: "red" ,size:"large"})
        expect(response.body.name).toEqual('shirt')
        expect(response.body.color).toEqual('red')
        expect(response.body.size).toEqual('large')
        ID2 = response.body._id
    });

    it('Read a list of record using GET', async () => {
        const response = await request.get(`/api/v1/clothes`)
        let DATA = response.body.find((obj) => obj._id === ID2);
        expect(DATA._id).toEqual(ID2)
    });

    it('Read a record using GET', async () => {
        const response = await request.get(`/api/v1/clothes/${ID2}`)
        expect(response.body._id).toEqual(ID2)
    });

    it('Update a record using PUT', async () => {
        const response = await request.put(`/api/v1/clothes/${ID2}`).send({ name: "hat" })
        expect(response.body.name).toEqual('hat')
    });

    it('Destroy a record using DELETE', async () => {
        const response = await request.delete(`/api/v1/clothes/${ID2}`)
        expect(response.body).toEqual({})
    });


});