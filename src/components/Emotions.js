import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Heading } from "./Common";
import ListGroup from "react-bootstrap/ListGroup";

const defaultMessage = "We're not sure yet!";

export function Emotions({ emotion, emoji, colorScheme }) {
    return (
        <Row>
            <Heading colorScheme={colorScheme}>
                They might be feeling...
            </Heading>
            <Col md={12}>
                <ListGroup className="text-secondary">
                    <Emotion
                        emotion={emotion ?? defaultMessage}
                        emoji={emoji}
                    />
                </ListGroup>
            </Col>
        </Row>
    );
}

function Emotion({ emotion, emoji }) {
    return (
        <ListGroup.Item action className="border-0 fs-5">
            { emotion }
            {" "}{ emoji }
        </ListGroup.Item>
    );
}
