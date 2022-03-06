import { useMemo, useState } from "react";
import { Input } from "./Input";
import { Emotions } from "./Emotions";
import { Responses } from "./Responses";
import {
    getBasicResponse,
    getColorResponse,
    getEmoji,
    getEmojiResponse,
    getEmotion,
    getFeelingResponse,
    getParaphraseResponse
} from "./GetEmotions";

const { Configuration, OpenAIApi } = require("openai");

export function AppMain() {
    // Output feeling
    const [emotion, setEmotion] = useState(null);
    const [emoji, setEmoji] = useState(null);

    // Output suggested responses
    const [responses, setResponses] = useState([]);

    // UI setter
    const [color, setColor] = useState("#FFECB3");

    // Compute the OpenAIApi interface once and store it for later
    const openai = useMemo(() => {
        const configuration = new Configuration({
            apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`,
        });

        return new OpenAIApi(configuration);
    }, []);

    const update = async (relationship, message) => {
        const newResponses = [];
        const addResponse = (resp) => {
            // Only display non-empty responses
            if (resp) {
                newResponses.push(resp);
            }
        }

        await Promise.all([
            // Query the emotion, then after we have it, get the corresponding emoji and color
            getEmotion(openai, relationship, message)
                .then((em) => {
                    setEmotion(em);
                    return Promise.all([
                        getEmoji(openai, em),
                        getColorResponse(openai, em),
                    ]);
                })
                .then((results) => {
                    setEmoji(results[0]);
                    setColor(results[1]);
                }),

            // Query the basic response, then after we have it, get the emoji response
            getBasicResponse(openai, relationship, message)
                .then((resp) => {
                    addResponse(resp);
                    return getEmojiResponse(openai, resp);
                })
                .then(addResponse),

            // Get the feeling response directly
            getFeelingResponse(openai, relationship, message)
                .then(addResponse),

            // Get the paraphrase response directly
            getParaphraseResponse(openai, message)
                .then(addResponse),
        ]);

        console.log(newResponses);

        setResponses(newResponses);
    }

    return (
        <>
            <h1 className="text-center">Title</h1>
            <Input onSubmit={update} />
            <Emotions emotion={emotion} emoji={emoji}/>
            <Responses responses={responses}/>
        </>
    );
}