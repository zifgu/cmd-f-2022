import { useMemo, useState } from "react";
import { Input } from "./Input";
import { Emotions } from "./Emotions";
import { Responses } from "./Responses";

const { Configuration, OpenAIApi } = require("openai");

function generatePrompt(relationship, textMessage) {
    return `Decide whether the emotion in a text message is happy, angry, or sad.\n\nText message: "${textMessage}"\nEmotion:`;
}

async function getEmotion(openai, relationship, message) {
    const response = await openai.createCompletion("text-davinci-001", {
        prompt: generatePrompt(relationship, message),
        temperature: 0,
        max_tokens: 5,
        top_p: 1,
        frequency_penalty: 0.5,
        presence_penalty: 0,
    });

    console.log(response);

    return response.data.choices[0].text.trim();
}

export function AppMain() {
    const [emotion, setEmotion] = useState(null);

    // Compute the OpenAIApi interface once and store it for later
    const openai = useMemo(() => {
        const configuration = new Configuration({
            apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`,
        });

        return new OpenAIApi(configuration);
    }, []);

    const updateEmotion = async (relationship, message) => {
        const emotion = await getEmotion(openai, relationship, message);
        setEmotion(emotion);
    }

    return (
        <>
            <h1 className="text-center">Title</h1>
            <Input onSubmit={updateEmotion} />
            <Emotions emotion={emotion}/>
            <Responses responses={[
                {
                    text: "Basic response",
                },
                {
                    text: "😊😗",
                },
                {
                    text: "This makes me feel...",
                },
                {
                    text: "Paraphrase what they said",
                },
            ]}/>
        </>
    );
}