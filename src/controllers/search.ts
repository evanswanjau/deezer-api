import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import axios from "axios";

export const searchTrack = async (req: any, res: any) => {
    try {
        const { data } = await axios.get(
            process.env.DEEZER_API_URL + "/search?q=track:" + req.body.keyword
        );

        const tracks = data.data.map((track) => {
            track.cover_medium = track.album.cover_medium;
            track.album = track.album.title;
            track.artist = track.artist.name;

            return (({ id, title, duration, album, artist, cover_medium }) => ({
                id,
                title,
                duration,
                album,
                artist,
                cover_medium,
            }))(track);
        });

        res.send(tracks);
    } catch (error) {
        res.send({
            error: true,
            message: error.message,
        });
    }
};
