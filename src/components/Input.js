import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Heading } from "./Common";
import "../styles/input.css";

const defaultRelationshipValue = "friend";

export function Input({ onSubmit }) {
    const [message, setMessage] = useState("");
    const [relationship, setRelationship] = useState(defaultRelationshipValue);

    const relationshipInput = (
        <RelationshipInput
            value={relationship}
            onValueChange={setRelationship}
        />
    );

    return (
        <Row>
            <Col md={12}>
                <Form>
                    <Heading>
                        My {relationshipInput} said to me ...
                    </Heading>
                    <MessageInput value={message} onValueChange={setMessage}/>
                </Form>
            </Col>
            <Col md={12} className="text-end">
                <Button
                    variant="dark"
                    className="mt-3"
                    onClick={() => onSubmit(relationship, message)}
                >
                    Go!
                </Button>
            </Col>
        </Row>
    );
}

function MessageInput({ value, onValueChange }) {
    return (
        <Form.Control
            as="textarea"
            rows={5}
            value={value}
            className="fs-5 w-100 p-3 rounded-2 overflow-scroll message-input"
            onChange={(event) => {
                onValueChange(event.target.value);
            }}
            style={{ resize: "none" }}
        />
    );
}

function RelationshipInput({ value, onValueChange }) {
    // Code to make the width dynamic:
    // https://towardsdev.com/dynamic-input-length-react-component-536495154830

    const [visible, setVisible] = useState(false);
    const [width, setWidth] = useState(20);
    const measurer = useRef();

    useEffect(() => {
        setVisible(true);
    }, [value]);

    useLayoutEffect(() => {
        if (visible && measurer?.current) {
            const rect = measurer.current.getBoundingClientRect();
            setWidth(rect.width + 20);
            setVisible(false);
        }
    }, [visible]);

    return (
        <>
            <span ref={measurer}>
                {visible && value}
            </span>
            <input
                type="text"
                className="text-input relationship-input"
                value={value}
                onChange={(event) => {
                    onValueChange(event.target.value);
                }}
                maxLength={25}
                style={{
                    width: width,
                }}
            />
        </>
    );
}