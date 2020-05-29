const chakram = require('chakram');
const expect = chakram.expect;

describe("Main PoC Get with FAIL:", function () {
  let response;
  before(async () => {

    const url = "http://httpbin.org/get?isGood=true&isBad=true";
    response = await chakram.get(url);

  });

  it("1- First assert - Status 200", function () {
    expect(response).to.have.status(200);
  });

  it("2- Second assert - Response OK", function () {
    let args = response.body.args;
    expect(args.isGood).to.equal("true");
    expect(args.isBad).to.equal("false");
  });
})
;