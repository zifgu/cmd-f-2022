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
    getFeelingResponse, getParaphraseResponse,
} from "./GetEmotions";
import { getHexCodeFromRGBArray } from "./ColourScheme";

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

export function AppMain({ colorChanged, colorScheme }) {
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
        const triggered = /down|sad|depress|kill|suicid/.test(message);

        const addResponse = (resp, type) => {
            // Only display non-empty responses
            console.log(resp)
            if (resp.length > 1) {
                const obj = {
                    text: resp,
                    type: type,
                };

                if (triggered && type === FEELING) {
                    obj.helpText = (
                        <>
                            Mental health help resources: <a href="https://cmha.bc.ca/mental-health/find-help/">https://cmha.bc.ca/mental-health/find-help/</a>
                        </>
                    );
                }

                newResponses.push(obj);
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
        <div
            className="py-3 px-4"
            style={{
                backgroundColor: getHexCodeFromRGBArray(colorScheme[0]),
            }}
        >
            <h1 className="text-center">Title</h1>
            <Input onSubmit={update} colorScheme={colorScheme} />
            <Emotions emotion={emotion} emoji={emoji} colorScheme={colorScheme}/>
            <Responses responses={responses} colorScheme={colorScheme}/>
        </div>
    );
}