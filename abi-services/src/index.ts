import express from 'express';
import { ABIServices, ABIResponse } from "../src/ABIServices";
import { EtherscanApiRequest } from "../src/EtherscanApiRequest";
import { backgroundJobLog as log } from "../log.config";
import * as dotenv from 'dotenv';
dotenv.config();


type LogMessage = {
    endpoint: string,
    params: Object,
    errors?: string
}

const app: express.Application = express();
app.use(express.json());

// Take a port 3000 for running server.
const port: number = 3010;

// use log instead
app.get('/findABI/:address/:cache', async (_req, _res) => {
    try {

        const address = _req.params.address;
        const cache = _req.params.cache;

        const abiServices = new ABIServices(new EtherscanApiRequest(process.env.ETHERSCAN_API_KEY as string));
        const result: ABIResponse | null = await abiServices.findABI(
            address as string, 
            { cache: cache == "true" ? true : false }
        );

        if (!result) {
            // logging:error
            log.error(() => JSON.stringify(({ endpoint: "/findABI", params: _req.params, errors: "ABI_Not_Found" } as LogMessage)))
            
            _res.status(404);
            _res.end("ABI_Not_Found");
        }

        if (result) {
            _res.status(200);
            log.info(() => JSON.stringify(({ endpoint: "/findABI", params: _req.params } as LogMessage)))
            _res.setHeader('Content-Type', 'application/json');
            _res.end(JSON.stringify(result));
        } 

        // logging:info
    } catch (e: any) {
        // logging:error
        log.error(() => JSON.stringify(({ endpoint: "/findABI", params: _req.params, errors: e.toString() } as LogMessage)))
        _res.status(404);
        _res.setHeader('Content-Type', 'text/json');
        _res.end(e.toString());
    }    
});

app.post("/importABIs", async (_req, _res) => {
    try {

        const addresses = _req.body.addresses;
        const names = _req.body.names;
        const abis = _req.body.abis;

        await ABIServices.importABIs(addresses, names, abis);
        log.info(() => JSON.stringify(({ endpoint: "/importABIs", params: _req.body } as LogMessage)));

        _res.status(200);
        _res.end("success");
    } catch (e: any) {
        log.error(() => JSON.stringify(({ endpoint: "/importABIs", params: _req.params, errors: e.toString() } as LogMessage)))
        _res.status(404);
        _res.end(e.toString());
    }
})

app.listen(port, () => {
    console.log(`The server is up at http://localhost:${port}/`);
});