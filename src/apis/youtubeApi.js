import axios from "axios";

const KEY = "AIzaSyD6Q0keD3k2PY4cbYWVJd4kYtkZ3nLXSZU";
export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    maxResults: "5",
    order: "viewCount",
    key: KEY
  }
});
