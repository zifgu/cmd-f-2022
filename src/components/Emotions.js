import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Heading } from "./Common";
import ListGroup from "react-bootstrap/ListGroup";

export function Emotions({ emotion }) {
    return (
        <Row>
            <Heading>
                They might be feeling...
            </Heading>
            <Col md={12}>
                <ListGroup className="text-secondary">
                    <Emotion emotion={emotion ?? "Not sure yet!"}/>
                </ListGroup>
            </Col>
        </Row>
    );
}

function Emotion({ emotion }) {
    return (
        <ListGroup.Item action className="border-0">
            { emotion }
        </ListGroup.Item>
    );
}
