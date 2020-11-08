import axios from "axios";

const YOU_TUBE_API_KEY = "AIzaSyDXaMYXXjrXu-e1V8ZzF2_098WbvqbP-pgxxx";

export default axios.create({
  baseURL: "https://www.googleapis.com/youtube/v3/",
  params: {
    part: "snippet",
    type: "video",
    maxResults: 12,
    key: YOU_TUBE_API_KEY
  }
});
