import {
  addStatMutation,
  findVideoByIdAndUserIdQuery,
  updateStatMutation,
} from "../../lib/hasura";
import { getUserIdFromToken } from "../../lib/utils";

export default async function stats(req, res) {
  if (req.method !== "GET" && req.method !== "POST") {
    return res.status(400).send({ message: "Unsupported method." });
  }
  const token = req.cookies.token;
  if (!token) return res.status(401).send({ message: "Not logged in" });
  try {
    const userId = getUserIdFromToken(token);
    const { videoId } = req.query;
    const video = await findVideoByIdAndUserIdQuery(videoId, userId, token);
    if (req.method === "POST") {
      const { favorited, watched = true } = req.body;
      let data;
      if (video) {
        data = await updateStatMutation(
          { videoId, userId, favorited, watched },
          token
        );
      } else {
        data = await addStatMutation(
          { videoId, userId, favorited, watched },
          token
        );
      }
      res.send({ data });
    } else {
      if (video) {
        res.send({ video });
      } else {
        res.status(404).send({ message: "Video not found!" });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Something went wrong in stats!" });
  }
}
