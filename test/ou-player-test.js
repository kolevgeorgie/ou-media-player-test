/*!
  OU Media Player tests - with "chai-http".

  @link http://chaijs.com/plugins/chai-http
*/

var chai = require('chai')
  , chaiHttp = require('chai-http')
  , R = require("../oump-test-config")
  ;

chai.use(chaiHttp);


/*chai.simple_get = function (path, callback) {
  var that = this;
  it("...", function (done) {
    that.get(path).end(function (err, res) {
      var page = res.text;

      callback(err, res, page, done);
    });
  });
  return that;
}*/


var page = chai.request(R.base).get
  , expect = chai.expect
  , should = chai.should();


describe("Test OU Media Player - embedded player", function () {
  this.timeout(R.timeout);

  it("...Should return a 200 code, and contain HTML", function (done) {

    page("/embed/pod/student-experiences/db6cc60d6b").end(function (err, res) {
      var doc = res && res.text;

      expect(err).to.be.null;
      expect(res).to.not.be.null;
      //expect(resp.statusCode, "HTTP status code").to.equal(200);
      res.should.have.a.status(200);
      res.should.be.html;

      //expect(doc).to.match(/^<!doctype/);
      //doc.should.not.contain("error-php");

      doc.should.contain("<!doctype");
      doc.should.contain(
        "//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js");

      doc.should.contain/*.htmlClass*/("mtype-video");
      doc.should.contain/*.htmlClass*/("ctx-Podcast_player");
      doc.should.contain/*.htmlElement*/("<video");
      doc.should.contain("mejs.MediaElementPlayer");

      done();
    });
  });
});

describe("Test a restricted-access player", function () {

return;

  this.timeout(R.timeout);

  it("...", function (done) {

//http://embed.open.ac.uk/oembed?format=json&url=http%3A//podcast.open.ac.uk/pod/learn-about-fair-2009%23%210a49a38de2&theme=oup-light&callback=jsonp1420555891885
    page("/embed/pod/learn-about-fair-2009/0a49a38de2").end(function (err, res) {
      var doc = res && res.text;
      //console.log("Restricted: " + doc);

      expect(err).to.be.null;
      expect(res).to.not.be.null;

      res.should.have.a.status(200);
      res.should.be.html;

      //doc.should.contain('"commit":');
      done;
    });  
  });

});


describe("Test JSON, Javascript etc.", function () {
  this.timeout(R.timeout);

  it("Version JSON", function (done) {

    page("/version.json").end(function (err, res) {
      var doc = res && res.text;
      //console.log("version.JSON: " + doc);

      expect(err).to.be.null;
      expect(res).to.not.be.null;

      res.should.have.a.status(200);
      res.should.be.json;

      doc.should.match(/^\{\"/);
      doc.should.contain('"commit":');

      done();
    });
  });


  it("jQuery", function (done) {

    page("/engines/mediaelement/build/jquery.js").end(function (err, res) {
      var doc = res && res.text;
      //console.log("version.JSON: " + doc);

      expect(err).to.be.null;
      expect(res).to.not.be.null;

      res.should.have.a.status(200);
      //res.should.be.javascript;
      res.headers["content-type"].should.contain("text/javascript");

      doc.should.match(/^\/\*\!/);
      doc.should.contain('core_version = "1.9.1",');

      done();
    });
  });


  it("oEmbed JSON response.", function (done) {

    page("/oembed?format=json&callback=CB&url=" + R.podcast +
      "/pod/student-experiences/db6cc60d6b").end(function (err, res) {
      var doc = res && res.text;
      //console.log(res.path);
      //console.log("oEmbed JSON: " + doc);

      expect(err).to.be.null;
      expect(res).to.not.be.null;

      res.should.have.a.status(200);
      //res.should.be.javascript;
      //res.should.be.utf8;
      res.headers["content-type"].should.contain("text/javascript");
      //res.headers.should.not.contain("x-powered-by");
      res.headers["x-powered-by"].should.not.contain("PHP/");

      doc.should.match(/^CB\(\{"/);
      doc.should.contain('"version":"1.0"');
      doc.should.contain('"html":"<iframe ');

      done();
    });
  });

});


return;

/*
describe("Testing OU Podcasts ...", function () {
  this.timeout(timeout_ms);

  it("...Should return a 200 code and contain an RSS feed", function (done) {

    podcast("/feeds/student-experiences/player.xml").end(function (err, res) {
      var doc = res.text;
      console.log(res);

      expect(err).to.be.null;
      res.should.have.a.status(200);
      //res.should.be.xml;
      expect(res.headers["content-type"]).to.contain("application/xml");

      /*
      doc.should.contain('<?xml version="1.0" encoding="UTF-8"?>');
      doc.should.contain("<rss xmlns:");
      doc.should.contain("<channel>");
      *-/

      done();
    });
  });
});
*/
