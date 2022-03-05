import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useState } from "react";

export function MessageInput() {
    const [message, setMessage] = useState("");

    // Now, when the button is submitted, try to call the API

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
            Contents of the "message" variable:
            <p>
                {message}
            </p>
            <Button className="mt-3" type="submit">
                Enter
            </Button>
        </Form>
    );
}