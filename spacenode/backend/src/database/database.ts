const fetch = require("node-fetch");
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./assets/amp.db");

export async function getTravelData() {
  //fetch json data from https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices
  const fetchedData = await fetch(
    "https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices"
  )
    .then((response: { json: () => any }) => response.json())
    .then((data: any) => {
      db.serialize(() => {
        db.run(
          `CREATE TABLE IF NOT EXISTS traveldata (id INTEGER PRIMARY KEY AUTOINCREMENT, validuntil, json)`
        );

        //insert json data into database
        db.run(
          `INSERT INTO traveldata (validuntil, json) VALUES (?, ?)`,
          [data.validUntil, JSON.stringify(fetchedData)],
          function (err: any) {
            if (err) {
              return console.log(err.message);
            }
          }
        );
      });
      db.close();
    });
}

export async function readValidTravelData(now: string) {
  // let retRows: any[] = [];
  let sql = `SELECT rowid AS id, park, name, date, time, produced, consumed FROM solarpark WHERE park = "${park}" AND date = "${date}"`;

  // const data = (await db.all(sql, [])).map((row: any) => {id: row.id, park: row.park, name: row.name, date: row.date, time: row.time, produced: row.produced, consumed: row.consumed});
  // // const data = (await db.all(sql, []));

  return new Promise((resolve, reject) => {
    db.serialize(() => {
      db.all(sql, [], (err: any, rows: unknown) => {
        if (err) reject(err);
        resolve(rows);
      });
    });
  });
}

// let currentDate = Date.now();
// console.log(currentDate);

// let sometime = Date.parse("2022-12-02T05:25:07.2879605Z");
// console.log(sometime);

// console.log(currentDate < sometime);
