import express from "express";
import { searchTrack } from "../controllers/search";
import {
    getArtist,
    getArtistAlbums,
    getArtistTopTracks,
} from "../controllers/artist";

const router = express.Router();

router.route("/search/track").post(searchTrack);
router.route("/artist/:id").get(getArtist);
router.route("/artist/:id/top").get(getArtistTopTracks);
router.route("/artist/:id/albums").get(getArtistAlbums);

export default router;
