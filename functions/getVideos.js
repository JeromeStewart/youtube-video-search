import axios from "axios";

const KEY = "AIzaSyD6Q0keD3k2PY4cbYWVJd4kYtkZ3nLXSZU";

exports.handler = (event, context, callback) => {
  const send = body => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    });
  };

  axios
    .get("https://www.googleapis.com/youtube/v3/search", {
      params: {
        part: "snippet",
        q: event.queryStringParameters.q,
        maxResult: "5",
        order: "viewCount",
        key: KEY
      }
    })
    .then(res => send(res.data))
    .catch(err => send(err));
};
