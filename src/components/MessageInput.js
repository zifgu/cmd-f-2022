import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMemo, useState } from "react";

const { Configuration, OpenAIApi } = require("openai");

function parseFeeling(relationType, textMessage) {
    return `My "${relationType}" said to me: "${textMessage}"\n My "${relationType}" is feeling:`;
}

function parseEmoji(parsedFeeling) {
    return `Convert into emoji.\n happy:😀\n scared:😨\n mischievous:😜\n"${parsedFeeling}":`;
}

function generateBasicResponse(relationType, textMessage) {
    return `"${relationType}": "${textMessage}"\n me:`;
}

function generateEmojiResponse(basicResponse) {
    return `Convert text into emoji.\nBack to the Future:👨👴🚗🕒\nBatman:🤵🦇\nTransformers:🚗🤖\n"${basicResponse}":`;
}

function generateFeelingResponse(relationType, textMessage) {
    return `My "${relationType}" said to me: "${textMessage}"\n Hearing this makes me feel: `;
}

function generateParaphraseResponse(textMessage) {
    return `Paraphrase this for a second-grade student:\n"${textMessage}"\n`;
}

function getMoodColor(parsedEmotion) {
    return `The CSS code for a color like "${parsedEmotion}":\n\n background-color:\n`;
}

export function MessageInput() {
    // inputs
    const [message, setMessage] = useState("");
    const [relation, setRelation] = useState("");

    // output feeling
    const [emotion, setEmotion] = useState(null);
    const [emoji, setEmoji] = useState(null);

    // output suggested responses
    const [basicResponse, setBasicResponse] = useState(null);
    const [emojiResponse, setEmojiResponse] = useState(null);
    const [feelingResponse, setFeelingResponse] = useState(null);
    const [paraphraseResponse, setParaphraseResponse] = useState(null);

    // ui setter
    const [color, setColor] = useState("#FFECB3");


    // Compute the OpenAIApi interface once and store it for later
    const openai = useMemo(() => {
        const configuration = new Configuration({
            apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`,
        });

        return new OpenAIApi(configuration);
    }, []);

    const update = async () => {
        const emotion = await openai.createCompletion("text-davinci-001", {
            prompt: parseFeeling(relation, message),
            temperature: 0,
            max_tokens: 15,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        const emoji = await openai.createCompletion("text-davinci-001", {
            prompt: parseEmoji(emotion),
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["\n"],
        });

        const basicResponse = await openai.createCompletion("text-davinci-001", {
            prompt: generateBasicResponse(relation, message),
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["\n"],
        });

        const emojiResponse = await openai.createCompletion("text-davinci-001", {
            prompt: generateEmojiResponse(basicResponse),
            temperature: 0.8,
            max_tokens: 60,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: ["\n"],
        });

        const feelingResponse = await openai.createCompletion("text-davinci-001", {
            prompt: generateFeelingResponse(relation, message),
            temperature: 0.3,
            max_tokens: 40,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        const paraphraseResponse = await openai.createCompletion("text-davinci-001", {
            prompt: generateParaphraseResponse(message),
            temperature: 0.7,
            max_tokens: 64,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
        });

        const color = await openai.createCompletion("text-davinci-001", {
            prompt: getMoodColor(emotion),
            temperature: 0,
            max_tokens: 64,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0,
            stop: [";"],
        });

        setEmotion(emotion.data.choices[0].text.trim());
        setEmoji(emoji.data.choices[0].text.trim());
        setBasicResponse(basicResponse.data.choices[0].text.trim());
        setEmojiResponse(emojiResponse.data.choices[0].text.trim());
        setFeelingResponse(feelingResponse.data.choices[0].text.trim());
        setParaphraseResponse(paraphraseResponse.data.choices[0].text.trim());

    }

    return (
        <Form>
            <h4>
                Message text:
            </h4>
            <Form.Control as="textarea"
                          rows={5}
                          value={relation}
                          onChange={(event) => {
                              setRelation(event.target.value);
                          }}
            />
            <Form.Control as="textarea"
                          rows={5}
                          value={message}
                          onChange={(event) => {
                              setMessage(event.target.value);
                          }}
            />
            <Button className="mt-3"
                    onClick={() => {
                        update();
                    }}
            >
                Enter
            </Button>
            <div className="my-5"/>
            <h4>
                They might be feeling...
            </h4>
            <p>
                { feelingResponse ?? "Not sure yet!" }
            </p>
        </Form>
    );
}