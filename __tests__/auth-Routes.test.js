'use strict';

process.env.SECRET = "toes";

const server = require('../src/server.js').server;
const supergoose = require('@code-fellows/supergoose');
const bearer = require('../src/middleware/bearer.js');

const mockRequest = supergoose(server);

let users = {
    admin: { username: 'admin', password: 'password', role: "admin" },
    editor: { username: 'editor', password: 'password', role: "editor" },
    user: { username: 'user', password: 'password', role: "user" },
};

describe('Auth Router', () => {
    Object.keys(users).forEach(userType => {
        describe(`${userType} users`, () => {
            it('can create one', async () => {
                const response = await mockRequest.post('/api/v2/signup').send(users[userType]);
                const userObject = response.body;
                expect(response.status).toBe(201);
                expect(userObject.token).toBeDefined();
                expect(userObject.user._id).toBeDefined();
                expect(userObject.user.username).toEqual(users[userType].username)
            });
            it('can signin with basic', async () => {
                const response = await mockRequest.post('/api/v2/signin')
                    .auth(users[userType].username, users[userType].password);
                const userObject = response.body;
                expect(response.status).toBe(200);
                expect(userObject.token).toBeDefined();
                expect(userObject.user._id).toBeDefined();
                expect(userObject.user.username).toEqual(users[userType].username)
            });
            it('can signin with bearer', async () => {
                const response = await mockRequest.post('/api/v2/signin')
                    .auth(users[userType].username, users[userType].password);
                const token = response.body.token;
                const bearerResponse = await mockRequest
                    .get('/api/v2/users')
                    .set('Authorization', `Bearer ${token}`)
                if (!(userType === 'admin')) {
                    expect(bearerResponse.status).toBe(500);
                } else {
                    expect(bearerResponse.status).toBe(200);
                }
            });
        });
        describe('bad logins', () => {
            it('basic fails with known user and wrong password ', async () => {
                const response = await mockRequest.post('/api/v2/signin')
                    .auth('admin', 'xyz')
                const userObject = response.body;
                expect(response.status).toBe(403);
                expect(userObject.user).not.toBeDefined();
                expect(userObject.token).not.toBeDefined();
            });
            it('basic fails with unknown user', async () => {
                const response = await mockRequest.post('/api/v2/signin')
                    .auth('nobody', 'xyz')
                const userObject = response.body;
                expect(response.status).toBe(403);
                expect(userObject.user).not.toBeDefined();
                expect(userObject.token).not.toBeDefined()
            });
            it('bearer fails with an invalid token', async () => {
                const response = await mockRequest.post('/api/v2/signin')
                    .auth(users[userType].username, users[userType].password);
                const token = response.body.token;
                const bearerResponse = await mockRequest
                    .get('/api/v2/users')
                    .set('Authorization', `Bearer ${token}1`)
                expect(bearerResponse.status).toBe(500);
            })
        })
    });
});





let users2 = {
    admin2: { username: 'admin2', password: 'password', role: "admin" },
    editor2: { username: 'editor2', password: 'password', role: "editor" },
    user2: { username: 'user2', password: 'password', role: "user" },
};
let not = 'be';
let ID;
let Token;
describe('Auth Router', () => {
    Object.keys(users2).forEach(userType => {

        describe(`${userType} users`, () => {
            if (userType === 'user2') {
                not = 'NOT be'
            }
            it(`Should ${not} able to CREATE and sould be able to READ`, async () => {
                const response = await mockRequest.post('/api/v2/signup').send(users2[userType]);
                const userObject = response.body;
                Token = userObject.token;

                const response2 = await mockRequest.post(`/api/v2/food`)
                    .send({ name: "apple", calories: 20 })
                    .set('Authorization', `Bearer ${Token}`)
                if (userType === 'admin2' || userType === 'editor2') {
                    ID = response2.body._id
                    expect(response2.body.name).toEqual('apple')
                } else {
                    expect(response2.body.error).toEqual('Access Denied')
                }
                const response3 = await mockRequest.get(`/api/v2/food`)
                    .set('Authorization', `Bearer ${Token}`)
                expect(response3.status).toEqual(200)

            });



            it(`Should ${not} able to UPDATE`, async () => {

                const response3 = await mockRequest.put(`/api/v2/food/${ID}`)
                    .send({ name: "banana", calories: 40 })
                    .set('Authorization', `Bearer ${Token}`)
                if (userType === 'admin2' || userType === 'editor2') {
                    expect(response3.status).toEqual(200)
                } else {
                    expect(response3.status).toEqual(500)
                }

            });
            if (!(userType === 'admin2')) {
                not = 'NOT be'
            }
            it(`Should ${not} able to DELETE`, async () => {

                const response3 = await mockRequest.delete(`/api/v2/food/${ID}`)
                    .set('Authorization', `Bearer ${Token}`)
                if (userType === 'admin2') {
                    expect(response3.status).toEqual(200)
                } else {
                    expect(response3.status).toEqual(500)
                }

            });

        });
    });
});