import axios from "axios" 
import { Interface, FormatTypes } from "@ethersproject/abi";


describe("MyErc20.sol", () => {
    beforeEach(async () => {
        const MyErc20 = await ethers.getContractFactory("MyErc20");
        const deployed = await MyErc20.deploy();
        //deploy abi
        await axios.post("http://localhost:3010/importABIs", {
                addresses: [
                    deployed.address  
                ], 
                names: [
                    "MYErc20"
                ], 
                abis: [
                    MyErc20.interface.format(FormatTypes.json)
                ]
            }, {
                headers: { 'Content-Type': 'application/json' }
            })
    })

    it("#redeploy", async () => {})
    
})