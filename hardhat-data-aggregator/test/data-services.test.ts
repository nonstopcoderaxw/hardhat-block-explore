import { assert, expect } from "chai";
import { DataServices } from "../src/data-services"
import { Address } from "../src/hardhat-types";
import { File } from "./utils/utils";


// require prisma connection
describe('data.ts', function () {
  let services: DataServices;
  before(async function(){
     services = new DataServices();
  });

  it('getAddresses', async function () {
    // load mock data
    const signers = File.readAsJson("./test/data/signers.json");
    const addresses = services.getAddresses(signers);
    expect(addresses).to.have.lengthOf.at.least(1);
    expect(addresses[0]).to.have.property("value");
    expect(addresses[0].value).to.not.be.empty;
  });

  it("#createAccounts", async function(){
    const signers = File.readAsJson("./test/data/signers.json");
    const addresses: Address[] = services.getAddresses(signers);
    await services.createAccounts(addresses);
    assert.isOk('everything', 'everything is ok');
  })
  
});

