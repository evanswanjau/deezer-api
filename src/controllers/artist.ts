import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config();
import axios from "axios";

const URL = process.env.DEEZER_API_URL;

/**
 * Function that gets artist info
 */
export const getArtist = async (req: any, res: any) => {
    try {
        const { data }: { data: any } = await axios.get(
            URL + "/artist/" + req.params.id
        );

        const artist = (({ id, name, nb_fan, picture_medium }) => ({
            id,
            name,
            nb_fan,
            picture_medium,
        }))(data);

        if (data.error) throw new Error(data.error.message);

        res.send({ artist });
    } catch (error) {
        res.send({
            error: true,
            message: error.message,
        });
    }
};

/**
 * Funtion that get's artists top tracks
 */
export const getArtistTopTracks = async (req: any, res: any) => {
    try {
        const { data } = await axios.get(
            URL + `/artist/${req.params.id}/top`
        );

        data.data = data.data.map((track) => {
            return (({ id, title, duration }) => ({
                id,
                title,
                duration,
            }))(track);
        });

        res.send(data);
    } catch (error) {
        res.send({
            error: true,
            message: error.message,
        });
    }
};

/**
 * Function that gets artists albums
 */
export const getArtistAlbums = async (req: any, res: any) => {
    try {
        const { data } = await axios.get(
            URL + `/artist/${req.params.id}/albums`
        );

        data.data = data.data.map((album) => {
            return (({ id, title, release_date, cover_medium }) => ({
                id,
                title,
                release_date,
                cover_medium,
            }))(album);
        });

        res.send(data);
    } catch (error) {
        res.send({
            error: true,
            message: error.message,
        });
    }
};
