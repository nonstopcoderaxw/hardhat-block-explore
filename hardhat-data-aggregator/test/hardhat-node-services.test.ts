import { assert, expect } from "chai";
import { HardhatNode } from "../src/hardhat-node-services";
import { File } from "./utils/utils";

// require the hardhat node running
describe.skip('hardhat-node.ts', function () {
  let hh: HardhatNode;

  before(async function (){
    hh = new HardhatNode("http://localhost:8545");
    await hh.init(); 

    expect(hh).to.be.an("object");

  });

  it('HardhatNode#getSigners', async function () {
    expect(hh.signers).to.be.an("array")
                      .to.have.lengthOf.at.least(1);
    expect(hh.signers[0]).to.have.property("address");
    expect(hh.signers[0].address).to.not.be.empty;

  });

  // create mock data
  after(function () {
    File.write("test/data/signers.json", JSON.stringify(hh.signers, null, 4));
  })


});

