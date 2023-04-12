import express from 'express';
import { ABIServices, ABIResponse } from "../src/ABIServices";
import { EtherscanApiRequest } from "../src/EtherscanApiRequest";
import { backgroundJobLog as log } from "../log.config";
import * as dotenv from 'dotenv';
dotenv.config();


type LogMessage = {
    endpoint: string,
    param: Object,
    error?: string
}

const app: express.Application = express();
// Take a port 3000 for running server.
const port: number = 3010;

// use log instead
app.get('/findABI', async (_req, _res) => {
    try {

        const abiServices = new ABIServices(new EtherscanApiRequest(process.env.ETHERSCAN_API_KEY as string));
        const result: ABIResponse | null = await abiServices.findABI(
            _req.query.address as string, 
            { cache: _req.query.cache == "true" ? true : false }
        );

        if (!result) {
            // logging:error
            log.error(() => JSON.stringify(({ endpoint: "/findABI", param: _req.query, error: "ABI_Not_Found" } as LogMessage)))
            
            _res.status(404);
            _res.end("ABI_Not_Found");
        }

        if (result) {
            _res.status(200);
            log.info(() => JSON.stringify(({ endpoint: "/findABI", param: _req.query } as LogMessage)))
            _res.setHeader('Content-Type', 'application/json');
            _res.end(JSON.stringify(result));
        } 

        // logging:info
    } catch (e: any) {
        // logging:error
        log.error(() => JSON.stringify(({ endpoint: "/findABI", param: _req.query, error: e.toString() } as LogMessage)))
        _res.status(404);
        _res.setHeader('Content-Type', 'text/json');
        _res.end(e.toString());
    }    
});

app.listen(port, () => {
    console.log(`The server is up at http://localhost:${port}/`);
});