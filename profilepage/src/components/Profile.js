import classes from "./Profile.module.css";
import { useState } from "react";

export async function getProfileData(fetchOffset = 0, prevData = []) {
  let transactionData = prevData;
  let returnData = [];
  let queryString = `
    query {
      user (where: {id: {_eq: 290}}) {
        id
        login
        transactions (where: {type: {_in: ["up", "down"]}}, , offset:${fetchOffset} limit:20 order_by:{createdAt: asc}) {
          createdAt
          type
          path
        }
      }
    }
    `;

  fetch("https://01.kood.tech/api/graphql-engine/v1/graphql", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      query: queryString,
    }),
  })
    .then((res) => res.json())
    .then((data) => {
      returnData.push(data.data.user[0].id);
      returnData.push(data.data.user[0].login);
      data.data.user[0].transactions.forEach((element) => {
        transactionData.push(element);
      });

      if (data.data.user[0].transactions.length === 20) {
        getProfileData(fetchOffset + 20, transactionData);
      }
    });
  returnData.push(transactionData);
  return returnData;
}

export default function Profile(props) {
  const [fetchData, setFetchData] = useState([]);

  props.profileData.then((data) => {
    setFetchData(data);
  });

  if ((fetchData !== undefined && fetchData.length === 0) || fetchData === undefined) {
    return <div className={classes.profile}>Loading...</div>;
  } else {
    return (
      <div className={classes.profile}>
        <div>
          Student name: <b>Erkki Tikk</b>
        </div>
        <div>
          Student age: <b>39</b>
        </div>
        <div>
          Resides in: <b>Tartu, Estonia</b>
        </div>
        <div>
          User id nr: <b className={classes.fetched}>{fetchData[1]}</b>
        </div>
        <div>
          Username: <b className={classes.fetched}>{fetchData[2]}</b>
        </div>
        <div>
          Number of received audits:{" "}
          <b className={classes.fetched}>
            {fetchData[0].filter((element) => element.type === "down").length}
          </b>
        </div>
        <div>
          Number of outgoing audits:{" "}
          <b className={classes.fetched}>
            {fetchData[0].filter((element) => element.type === "up").length}
          </b>
          <br></br>
          <p className={classes.fetched}>
            NB! Blue fields are fetched using a recursive, nested, filtered graphql query.
          </p>
        </div>
      </div>
    );
  }
}
