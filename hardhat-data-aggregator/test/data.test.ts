import { assert, expect } from "chai";
import { Data } from "../src/data"
import { File } from "./utils/utils";

describe.skip('data.ts', function () {

  before(async function(){
     
  });

  it('Data#getAccounts', async function () {
    // load mock data
    let signers = File.readAsJson("./test/data/signers.json");
    const accounts = Data.getAccounts(signers);
    expect(accounts).to.have.lengthOf.at.least(1);
    expect(accounts[0]).to.have.property("value");
    expect(accounts[0].value).to.not.be.empty;
  });

  



});

