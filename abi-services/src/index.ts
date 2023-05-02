import express from 'express';
import { ABIServices, ABIResponse, Log, DecodedLog } from "./ABIServices";
import { EtherscanApiRequest } from "./EtherscanApiRequest";
import { Address } from "./Address";
import { backgroundJobLog as log } from "./log.config";
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
            new Address(address), 
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

app.post("/decodeLogs", async (_req, _res) => {
    try {
        const logs: Log[] = _req.body.logs as Log[]
        const fromAddresses: Address[] = _req.body.fromList.map((item: any) => {
            return new Address(item);
        })

        const abiServices = new ABIServices(new EtherscanApiRequest(process.env.ETHERSCAN_API_KEY as string));

        const decoodedLogs: DecodedLog[] | null = await abiServices.decodeLogs(fromAddresses, logs);
        
        log.info(() => JSON.stringify(({ endpoint: "/decodeLogs", params: _req.body } as LogMessage)))

        _res.status(200);
        _res.setHeader('Content-Type', 'application/json');
        if (decoodedLogs) _res.end(JSON.stringify(decoodedLogs));
        if (!decoodedLogs) _res.end(null);

    } catch (e: any) {
        log.error(() => JSON.stringify(({ endpoint: "/decodeLogs", params: _req.body, errors: e.toString() } as LogMessage)))
        _res.status(404);
        _res.setHeader('Content-Type', 'text/json');
        _res.end("FAILED");
    }
})

app.post("/importABIs", async (_req, _res) => {
    try {

        const addresses: Address[] = _req.body.addresses.map((item: any) => {
            return new Address(item);
        });
        const names: string[] = _req.body.names;
        const abis: string[] = _req.body.abis;
        await ABIServices.importABIs(addresses, names, abis);
        log.info(() => JSON.stringify(({ endpoint: "/importABIs", params: _req.body } as LogMessage)));

        _res.status(200);
        _res.end("success");
    } catch (e: any) {
        log.error(() => JSON.stringify(({ endpoint: "/importABIs", params: _req.params, errors: e.toString() } as LogMessage)))
        _res.status(404);
        _res.end("FAILED");
    }
})

app.listen(port, () => {
    console.log(`The server is up at http://localhost:${port}/`);
});