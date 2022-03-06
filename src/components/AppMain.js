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

// TODO: fill these in
export const BASIC = 0;
export const PARAPHRASE = 1;
export const FEELING = 2;
export const EMOJI = 3;

export const responseTypeInfo = {
    [BASIC]: {
        description: "We think this is one way you could reply in a regular conversation.",
    },
    [PARAPHRASE]: {
        description: "Paraphrasing makes the other person feel validated and understood.",
    },
    [FEELING]: {
        description: "Describe your feelings to promote a sense of connection.",
    },
    [EMOJI]: {
        description: "Emojis can be a simple and powerful way to communicate.",
    }
};

export function AppMain({ colorChanged }) {
    // Output feeling
    const [emotion, setEmotion] = useState(null);
    const [emoji, setEmoji] = useState(null);

    // Output suggested responses
    const [responses, setResponses] = useState([]);

    // Compute the OpenAIApi interface once and store it for later
    const openai = useMemo(() => {
        const configuration = new Configuration({
            apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`,
        });

        return new OpenAIApi(configuration);
    }, []);

    const update = async (relationship, message) => {
        const newResponses = [];
        const addResponse = (resp, type) => {
            // Only display non-empty responses
            if (resp) {
                newResponses.push({
                    text: resp,
                    type: type,
                });
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
                    colorChanged(results[1]);
                }),

            // Query the basic response, then after we have it, get the emoji response
            getBasicResponse(openai, relationship, message)
                .then((resp) => {
                    addResponse(resp, BASIC);
                    return getEmojiResponse(openai, resp);
                })
                .then((resp) => {
                    addResponse(resp, EMOJI);
                }),

            // Get the feeling response directly
            getFeelingResponse(openai, relationship, message)
                .then((resp) => {
                    addResponse(resp, FEELING);
                }),

            // Get the paraphrase response directly
            getParaphraseResponse(openai, message)
                .then((resp) => {
                    addResponse(resp, PARAPHRASE);
                }),
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