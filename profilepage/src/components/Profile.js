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
        transactions (where: {type: {_in: ["up", "down", "xp"]}}, , offset:${fetchOffset} limit:50 order_by:{createdAt: asc}) {
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

      if (data.data.user[0].transactions.length === 50) {
        getProfileData(fetchOffset + 50, transactionData);
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
        <p>
          <b className={classes.fetched}>Data</b> fetched from kood/Jõhvi server with
          graphql query.
        </p>
        <div className={classes.table}>
          <table>
            <tbody>
              <tr>
                <td>Student name:</td>
                <td>
                  <b>Erkki Tikk</b>
                </td>
              </tr>
              <tr>
                <td>Student age:</td>
                <td>
                  <b>39</b>
                </td>
              </tr>
              <tr>
                <td>Resides in:</td>
                <td>
                  <b>Tartu, Estonia</b>
                </td>
              </tr>
              <tr>
                <td>User id nr:</td>
                <td>
                  <b className={classes.fetched}>{fetchData[1]}</b>
                </td>
              </tr>
              <tr>
                <td>Username:</td>
                <td>
                  <b className={classes.fetched}>{fetchData[2]}</b>
                </td>
              </tr>
              <tr>
                <td>Number of received audits: </td>
                <td>
                  <b className={classes.fetched}>
                    {fetchData[0].filter((element) => element.type === "down").length}
                  </b>
                </td>
              </tr>
              <tr>
                <td>Number of performed audits: </td>
                <td>
                  <b className={classes.fetched}>
                    {fetchData[0].filter((element) => element.type === "up").length}
                  </b>
                </td>
              </tr>
              <tr>
                <td>Total number of coding tasks completed: </td>
                <td>
                  <b className={classes.fetched}>
                    {fetchData[0].filter((element) => element.type === "up").length +
                      fetchData[0].filter((element) => element.type === "down").length /
                        5 +
                      fetchData[0].filter((element) => element.type === "xp").length}
                  </b>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
