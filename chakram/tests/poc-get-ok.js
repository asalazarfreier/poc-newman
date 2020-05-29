const chakram = require('chakram');
const expect = chakram.expect;

describe("Main PoC Get with OK:", function () {
  let response;
  before(async () => {
    const url = "http://httpbin.org/get?isGood=true&isBad=false";
    response = await chakram.get(url);

  });

  it("1- Fires assert - Have status 200 and Is God=true and is Bad=false ", function () {
    expect(response).to.have.status(200);
    expect(response).not.to.have.header('non-existing-header');
    let args = response.body.args;
    expect(args.isGood).to.equal("true");
    expect(args.isBad).to.equal("false");
  });
})
;