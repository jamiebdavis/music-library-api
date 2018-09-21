const mongoose = require("mongoose");
const path = require("path");
const nodeMocks = require("node-mocks-http");
const events = require("events");
const { put } = require("../../controllers/artist");
const Artist = require("../../models/artist");

require("dotenv").config({
  path: path.join(__dirname, "../../settings.env")
});

describe("PUT Artist endpoint", () => {
  beforeAll(done => {
    mongoose.connect(
      process.env.TEST_DATABASE_CONN,
      done
    );
  });

  it("should update an artist record when PUT endpoint is called", done => {
    const artist = new Artist({ name: "Coldplay", genre: "Sad" });
    artist.save((err, artistCreated) => {
      if (err) {
        console.log(err, "stuff went wrong");
      }
      //here more dragons.
    });
    const request = httpMocks.createRequest({
      method: "PUT",
      URL: "/artist/1234",
      params: {
        artistId: artistCreated._id
        //es-lint disable line
      },
      body: {
        name: "Coldplay",
        genre: "Rock"
      }
    });
    const response = httpMocks.createResponse({
      eventEmitter: events.EventEmitter
    });

    put(request, response);

    response.on("end", () => {
      const updatedArtist = JSON.parse(response._getData()); //es-lint disable line
      expect(updateArtist).toEqual({
        _v: 0,
        _id: artistCreated._idString(),
        name: "Coldplay",
        genre: "Rock"
      });
      done();
    });
  });

  afterEach(done => {
    Artist.collection.drop(e => {
      if (e) {
        console.log(e);
      }
      done();
    });
  });
  afterAll(() => {
    mongoose.connect.close();
  });
});
