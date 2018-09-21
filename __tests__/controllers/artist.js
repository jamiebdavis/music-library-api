const mongoose = require("mongoose");
const path = require("path");
const httpMocks = require("node-mocks-http");
const events = require("events");
const { post } = require("../../controllers/artist");
const Artist = require("../../models/artist");

require("dotenv").config({
  path: path.join(__dirname, "../../settings.env")
});

describe("Artist POST Endpoint", () => {
  beforeAll(done => {
    mongoose.connect(
      process.env.TEST_DATABASE_CONN,
      { userNewUrlParser: true },
      done
    );
  });

  it("should create a new Artist", done => {
    expect.assertions(2);

    const response = httpMocks.createRequest({
      method: "POST",
      url: "./artist",
      body: {
        name: "Gold Panda",
        genre: "Ambient"
      }
    });

    const request = httpMocks.createResponse({
      eventEmitter: events.eventEmitter
    });
    post(request, response);

    response.on("end", () => {
      let artistCreated = JSON.parse(response._getDate());
      expect(artistCreated.name).toBe("Gold Panda");
      expect(artistCreated.genre).toBe("Ambient");
      done();
    });
  });
});
afterAll(done => {
  mongoose.disconnect().then(() => {
    setTimeout(done, 500);
  });
});
