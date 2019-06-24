const expect = require("chai").expect;
const request = require ("supertest");
const app = require("../server");

describe("Unit test for REST API GET requests", () => {

    it("Check Admin GET", (done) => {
        request(app).get("/api/admin").send().then(  res => {
            expect(res.status).to.equal(200)
            done();
        }).catch( err  => {
            done(err)
        })
    })

    it("Check Instructor GET", (done) => {
        request(app).get("/api/instructor").send().then(  res => {
            expect(res.status).to.equal(200)
            done();
        }).catch( err  => {
            done(err)
        })
    })

    it("Check Student GET", (done) => {
        request(app).get("/api/student").send().then(  res => {
            expect(res.status).to.equal(200)
            done();
        }).catch( err  => {
            done(err)
        })
    })

    it("Check Course GET", (done) => {
        request(app).get("/api/course").send().then(  res => {
            expect(res.status).to.equal(200)
            done();
        }).catch( err  => {
            done(err)
        })
    })

    it("Check Notifications GET", (done) => {
        request(app).get("/api/notification").send().then(  res => {
            expect(res.status).to.equal(200)
            done();
        }).catch( err  => {
            done(err)
        })
    })





    // it("Check Body", (done) => {
    //     request(app).get("/api/addUser").send().then( res => {
    //         expect(res.body).to.contain.property("datas")
    //         done()
    //     }).catch( err => {
    //         done(err)
    //     })
    // })


})