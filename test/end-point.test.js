const request = require("supertest");
const app = require("../app");

const token = process.env.AUTH_TOKEN
const taskID = "65d239444dc9afc4d4c197d1"
const userID = "65d242a2191063f974fd8cf6"

describe("/Tasks", () => {
    test("GET task by ID", async () => {
        return request(app)
            .get(`/api/tasks/get/${taskID}`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    })

    test("GET all tasks", async () => {
        return request(app)
            .get("/api/tasks/get-all")
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    })

    test("CREATE Task", async () => {
        return request(app)
            .post("/api/tasks/create")
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "Responsive Issues"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    })

    test("UPDATE Task", async () => {
        return request(app)
            .put(`/api/tasks/update/${taskID}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                status: "completed"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    })

    test("DELETE Task", async () => {
        return request(app)
            .delete("/api/tasks/delete/1")
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            // .expect(200)
            .then((res) => {
                // expect(res.statusCode).toBe(200);
            })
    })
})

describe("/User", () => {

    test("GET user by ID", async () => {
        return request(app)
            .get(`/api/users/get/${userID}`)
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    })

    test("GET all users", async () => {
        return request(app)
            .get("/api/users/get-all")
            .set('Authorization', `Bearer ${token}`)
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    })

    test("LOGIN", async () => {
        return request(app)
            .post("/api/users/login")
            .send({
                email: "staffone@gmail.com",
                password: "user123"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .then((res) => {
                expect(res.statusCode).toBe(200);
            })
    })

    // test("REGISTER", async () => {
    //     return request(app)
    //         .post("/api/users/register")
    //         .send({
    //             email: "staffone@gmail.com",
    //             password: "user123",
    //             name: "staff one",
    //             user_role: "staff",
    //         })
    //         .expect('Content-Type', /json/)
    //         .expect(200)
    //         .then((res) => {
    //             expect(res.statusCode).toBe(200);
    //         })
    // })
})