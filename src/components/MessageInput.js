import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useMemo, useState } from "react";

const { Configuration, OpenAIApi } = require("openai");

function generatePrompt(textMessage) {
    return `Decide whether the emotion in a text message is happy, angry, or sad.\n\nText message: "${textMessage}"\nEmotion:`;
}

export function MessageInput() {
    const [message, setMessage] = useState("");

    const [emotion, setEmotion] = useState(null);

    // Compute the OpenAIApi interface once and store it for later
    const openai = useMemo(() => {
        const configuration = new Configuration({
            apiKey: `${process.env.REACT_APP_OPENAI_API_KEY}`,
        });

        return new OpenAIApi(configuration);
    }, []);

    const updateEmotion = async () => {
        const response = await openai.createCompletion("text-davinci-001", {
            prompt: generatePrompt(message),
            temperature: 0,
            max_tokens: 5,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        });

        console.log(response);

        setEmotion(response.data.choices[0].text.trim());
    }

    return (
        <Form>
            <h4>
                Message text:
            </h4>
            <Form.Control as="textarea"
                          rows={5}
                          value={message}
                          onChange={(event) => {
                              setMessage(event.target.value);
                          }}
            />
            <Button className="mt-3"
                    onClick={() => {
                        updateEmotion();
                    }}
            >
                Enter
            </Button>
            <div className="my-5"/>
            <h4>
                They might be feeling...
            </h4>
            <p>
                { emotion ?? "Not sure yet!" }
            </p>
        </Form>
    );
}