
import {  superoak,  } from "../../deps-test.ts";
import { assertArrayIncludes, assertEquals, assertExists, path } from "../../deps.ts";
import { AppController } from "../../src/app.controller.ts";

const AppControl = new AppController()
const app = AppControl.app
try{
  Deno.removeSync(path.join(Deno.cwd(),'data', 'objects', 'apps', 'installed.json'))
}catch (e) {

}
Deno.test("GET /apps/list", async () => {
  const request = await superoak(app);
  const data = await request.get("/apps/list").expect(200);
  assertEquals(data.text, "{}")
});

Deno.test("GET /apps/marketplace", async () => {
  const request = await superoak(app);
  const data = await request.get("/apps/marketplace").expect(200);
  const market = JSON.parse(data.text)
  assertEquals(market['version'], 1)
  assertEquals(market['apps'][0]['name'], 'Application Server')
  assertEquals(market['apps'][0]['type'], 'core')
  assertEquals(market['apps'][0]['pkg'], 'https://raw.githubusercontent.com/dAppServer/server/main/.itw3.json')
  assertArrayIncludes(market['dirs'], ['blockchain'])
});

Deno.test("GET /apps/marketplace - Category", async () => {
  const request = await superoak(app);
  const data = await request.get("/apps/marketplace?dir=blockchain").expect(200);
  const market = JSON.parse(data.text)
  assertEquals(market['version'], 1)
  assertEquals(market['apps'][0]['name'], 'Lethean Blockchain')
  assertEquals(market['apps'][0]['type'], 'bin')
  assertEquals(market['apps'][0]['pkg'], 'https://raw.githubusercontent.com/letheanVPN/blockchain-iz/main/.itw3.json')
  assertArrayIncludes(market['dirs'], [])
});

//Deno.test("POST /apps/install", async () => {
//  const request = await superoak(app);
//  const data = await request.post("/apps/install")
//    .set("Content-Type", "application/json")
//    .send(`{"name": "server", "pkg": "https://raw.githubusercontent.com/dAppServer/server/main/.itw3.json"}`)
//    .expect(200)
//    .expect("true");
//
//});

//Deno.test("POST /apps/remove", async () => {
//  const request = await superoak(app);
//  const data = await request.post("/apps/remove")
//    .set("Content-Type", "application/json")
//    .send(`{"name": "test"}`)
//    .expect(200)
//    .expect("true");
//
//});
