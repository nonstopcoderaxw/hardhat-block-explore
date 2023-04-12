import axios from "axios";
import { ABIServices } from "../src/ABIServices";


// this test requires express server running!
describe("index.test.ts", () => {
	
	test('/findABI', async () => {
		// delete cache
		await ABIServices.clearCache();
		await expect(
			axios.get("http://localhost:3010/findABI?address=0x6B175474E89094C44Da98b954EedeAC495271d0F&cache=true")
		).resolves.not.toThrow();

		await expect(
			axios.get("http://localhost:3010/findABI?address=0x6B175474E89094C44Da98b954EedeAC495271d0F&cache=false")
		).resolves.not.toThrow();

		await expect(
			axios.get("http://localhost:3010/findABI?address=0x6B175474E89094C44Da98b954EedeAC495271d0E&cache=false")
		).rejects.toThrow();

		var result;
		result = await axios.get("http://localhost:3010/findABI?address=0x6B175474E89094C44Da98b954EedeAC495271d0F&cache=false");
		expect(result.data).toHaveProperty("fromCache", false);

		result = await axios.get("http://localhost:3010/findABI?address=0x6B175474E89094C44Da98b954EedeAC495271d0F&cache=true");
		expect(result.data).toHaveProperty("fromCache", true);
	})
})