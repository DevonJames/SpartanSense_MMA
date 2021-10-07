const request = require("request");
const https = require('https')
const converter = require("json-2-csv");
const flatten = require("flat");
const fs = require("fs");

function writeCsv(jsonData, alg) {
  converter.json2csv(jsonData, (err, csv) => {
    if (err) {
      throw err;
    }

    //fs.writeFileSync("./data/" + alg + ".csv", csv);
    fs.appendFile("./data/" + alg + ".csv", csv, (err) => {
      if (err) {
        throw err;
      }
      console.log("SAVED!");
    });
  });
}

function writeJson(jsonData, alg) {
  var now = Date.now();
  var entry = {};
  entry[now] = jsonData;
  fs.appendFile(
    "./data/" + alg + ".json",
    JSON.stringify(entry) + `\r\n`,'utf8',
    (err) => {
      if (err) {
        throw err;
      }
      console.log("SAVED!");
    }
  );
}

async function dogehashrate(){
  return await new Promise((resolve, reject) => {
    https.get('https://api.cryptoapis.io', (response) => {
      let body = ''
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        try {
        let difficulty = JSON.parse(body);
        let hashrate = difficulty * Math.pow(2, 32) / 60
        console.log('doge data:',hashrate)
        // let PriceUsdPerBtcOnCoinbase = 
          // Math.round((data.data.rates.USD)*1e2)/1e2;
          // console.log('PriceUsdPerBtcOnCoinbase Right Here!:', PriceUsdPerBtcOnCoinbase)
          // resolve(PriceUsdPerBtcOnCoinbase);
        if(!data) 
          console.log('Something wrong with the api or syntax');
        
          
        }catch(error) { // no coinbase data
          // let PriceUsdPerBtcOnCoinbase;
          // resolve(PriceUsdPerBtcOnCoinbase)
        }
      });
    }).on("error", (error) => {
      console.log("Error: " + error.message);
      reject("Error: " + error.message)
    })
  })
}





async function dogehashrate(){
  return await new Promise((resolve, reject) => {
    https.get('https://dogechain.info/chain/Dogecoin/q/getdifficulty', (response) => {
      let body = ''
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        try {
        let difficulty = JSON.parse(body);
        let hashrate = difficulty * Math.pow(2, 32) / 60
        console.log('doge data:',hashrate)
        // let PriceUsdPerBtcOnCoinbase = 
          // Math.round((data.data.rates.USD)*1e2)/1e2;
          // console.log('PriceUsdPerBtcOnCoinbase Right Here!:', PriceUsdPerBtcOnCoinbase)
          // resolve(PriceUsdPerBtcOnCoinbase);
        if(!data) 
          console.log('Something wrong with the api or syntax');
        
          
        }catch(error) { // no coinbase data
          // let PriceUsdPerBtcOnCoinbase;
          // resolve(PriceUsdPerBtcOnCoinbase)
        }
      });
    }).on("error", (error) => {
      console.log("Error: " + error.message);
      reject("Error: " + error.message)
    })
  })
}

async function priceusdperbtconcoinbase() {
  return await new Promise((resolve, reject) => {
    https.get('https://api.coinbase.com/v2/exchange-rates?currency=BTC', (response) => {
      let body = ''
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        try {
        let data = JSON.parse(body);
        // console.log('coinbase data:',data)
        let PriceUsdPerBtcOnCoinbase = 
          Math.round((data.data.rates.USD)*1e2)/1e2;
          // console.log('PriceUsdPerBtcOnCoinbase Right Here!:', PriceUsdPerBtcOnCoinbase)
          resolve(PriceUsdPerBtcOnCoinbase);
        if(!data) 
          console.log('Something wrong with the api or syntax');
        
          
        }catch(error) { // no coinbase data
          let PriceUsdPerBtcOnCoinbase;
          resolve(PriceUsdPerBtcOnCoinbase)
        }
      });
    }).on("error", (error) => {
      console.log("Error: " + error.message);
      reject("Error: " + error.message)
    });
  });
}




// async function priceusdperbtconcoinbase() {
//   return await new Promise((resolve, reject) => {
//     let url = `https://api.coinbase.com/v2/prices/BTC-USD/spot`

//   let option = { json: true };

//   let resp = request(url, option, (error, res, body) => {
//     if (error) {
//       return console.log(error);
//     }
//     // console.log(res.statusCode)
//     if (res.statusCode == 200) {
//       let priceUSDperBTC = body.data.amount
//       console.log("priceUSDperBTC:",priceUSDperBTC)
//       // return
//       // return priceUSDperBTC
//     }
//   });
// })
// // .on("error", (error) => {
// //   console.log("Error: " + error.message);
// //   reject("Error: " + error.message)
// // });
// }

async function pricePerToken(token) {

  let priceUSDperBTConCoinbase = await priceusdperbtconcoinbase()

  let url = `https://api.bittrex.com/api/v1.1/public/getticker?market=BTC-${token}`

let option = { json: true };

let resp = request(url, option, (error, res, body) => {
  if (error) {
    return console.log(error);
  }
  // console.log("bittrex code:",res.statusCode)
  if (res.statusCode == 200) {

    
    let priceBTCperTOKEN = body.result.Last
    let priceUSDperTOKEN = Math.floor(priceBTCperTOKEN * priceUSDperBTConCoinbase*1e2)/1e2
    console.log(token,"priceBTCperTOKEN:",priceBTCperTOKEN, "priceUSDperTOKEN:", priceUSDperTOKEN)
    
  }
});
}



async function algoinfo(alg) {
  return await new Promise((resolve, reject) => {
    https.get('https://api2.nicehash.com/main/api/v2/mining/algorithms', (response) => {
      let body = ''
      response.on('data', (chunk) => {
        body += chunk;
      });
      response.on('end', () => {
        try {
        let data = JSON.parse(body);
        // console.log(data)
        let algoInfo = data.miningAlgorithms.filter(function(item){
          return item.algorithm == alg
        })
        let miningFactor = algoInfo[0].miningFactor
        let displayMiningFactor = algoInfo[0].displayMiningFactor
        // console.log(algoInfo)
        // console.log(alg,'mining factor:',miningFactor, `(`,displayMiningFactor,`)`)

        resolve (algoInfo);
        if(!data) 
          console.log('Something wrong with the api or syntax');
        
          
          // let PriceUsdPerBtcOnCoinbase = 
          // Math.round((data.data.rates.USD)*1e2)/1e2;
          // console.log('PriceUsdPerBtcOnCoinbase Right Here!:', PriceUsdPerBtcOnCoinbase)
          // resolve(PriceUsdPerBtcOnCoinbase);
        }catch(error) { // no coinbase data
          // let PriceUsdPerBtcOnCoinbase;
          // resolve(PriceUsdPerBtcOnCoinbase)
        }
      });
    }).on("error", (error) => {
      console.log("Error: " + error.message);
      reject("Error: " + error.message)
    });
  });
}


async function getMiningMarketOrders(algo) {
  const algoInfo = await algoinfo(algo)
  // console.log('hello there!', algoInfo)
  let miningFactor = algoInfo[0].miningFactor
  
  let displayMiningFactor = algoInfo[0].displayMiningFactor

  console.log(algo, miningFactor, displayMiningFactor)
  let url = `https://api2.nicehash.com/main/api/v2/hashpower/orders/summaries?algorithm=${algo}`;

  let option = { json: true };

  let resp = request(url, option, (error, res, body) => {
    if (error) {
      return console.log(error);
    }

    if (res.statusCode == 200) {

      
      // console.log(algo,miningFactor, displayMiningFactor);
      let EU_N_speed_rented=body.summaries[`EU_N,${algo}`].profs[1].speed;
      let EU_N_price_rented=body.summaries[`EU_N,${algo}`].profs[1].price;
      let EU_speed_rented=body.summaries[`EU,${algo}`].profs[1].speed;
      let EU_price_rented=body.summaries[`EU,${algo}`].profs[1].price;
      let USA_speed_rented=body.summaries[`USA,${algo}`].profs[1].speed;
      let USA_price_rented=body.summaries[`USA,${algo}`].profs[1].price;
      let USA_E_speed_rented=body.summaries[`USA_E,${algo}`].profs[1].speed;
      let USA_E_price_rented=body.summaries[`USA_E,${algo}`].profs[1].price;

      let timestamp = Date.now();
      let summary = {
        table: []
      };
      summary.table.push({algo, timestamp,EU_N_speed_rented,EU_N_price_rented,EU_speed_rented,EU_price_rented,USA_speed_rented,USA_price_rented,USA_E_speed_rented,USA_E_price_rented})
      console.log(summary)
      // console.log("SAVING:", algo)
      // writeJson(body, algo);
      /*
      body.datetime = Date.now();
      let flat_json = flatten(body);
      console.log("200", flat_json);
      writeCsv(flat_json, algo);
      */
    } else {
      console.log("Not 200 code!", res);
    }
  });
}

async function getMiningMarketAvail(algo) {
  let url = `https://api2.nicehash.com/main/api/v2/hashpower/orderBook?algorithm=${algo}`;

  let option = { json: true };

  let resp = request(url, option, (error, res, body) => {
    if (error) {
      return console.log(error);
    }

    if (res.statusCode == 200) {
      // console.log(algo,body);
      let marketFactor = body.stats["EU_N"].marketFactor;
      let EU_N_speed_avail=body.stats["EU_N"].totalSpeed * marketFactor;
      // let EU_N_price_avail=body.stats["EU_N"].totalSpeed / marketFactor;
      let EU_speed_avail=body.stats["EU"].totalSpeed * marketFactor;
      // let EU_price_avail=body.summaries[`EU,${algo}`].profs[1].price;
      let USA_speed_avail=body.stats["USA"].totalSpeed * marketFactor;
      // let USA_price_avail=body.summaries[`USA,${algo}`].profs[1].price;
      let USA_E_speed_avail=body.stats["USA_E"].totalSpeed * marketFactor;
      // let USA_E_price_avail=body.summaries[`USA_E,${algo}`].profs[1].price;

      let timestamp = Date.now();
      let summary = {
        table: []
      };
      summary.table.push({algo, timestamp,EU_N_speed_avail,EU_speed_avail,USA_speed_avail,USA_E_speed_avail})
      // summary.table.push({algo, timestamp,EU_N_speed_avail})

      console.log(summary)
      // console.log("SAVING:", algo)
      // writeJson(body, algo);
      /*
      body.datetime = Date.now();
      let flat_json = flatten(body);
      console.log("200", flat_json);
      writeCsv(flat_json, algo);
      */
    } else {
      console.log("Not 200 code!", res);
    }
  });
}

let algos = ["SCRYPT", "SHA256", "KAWPOW"];
let tokens = ["LTC","DOGE","ETH","ETC","BCH","RVN","FLO"]


tokens.forEach(async (token) => {
  
  // let priceUSDperBTConCoinbase = await priceusdperbtconcoinbase()
  // console.log(token,priceUSDperBTConCoinbase)
  // console.log("price:", priceUSDperBTConCoinbase)
  pricePerToken(token);
})

algos.forEach(async (alg) => {
  dogehashrate();
  // ltc();
  getMiningMarketOrders(alg);
  getMiningMarketAvail(alg);
});
