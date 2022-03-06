import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import "../styles/response_card.css";
import { useState } from "react";
import { Heading } from "./Common";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { responseTypeInfo } from "./AppMain";
import Popover from "react-bootstrap/Popover";
import Button from "react-bootstrap/Button";

export function Responses({ responses }) {
    return (
        <>
            <Row>
                <Heading>
                    I could respond with...
                </Heading>
            </Row>
            <Row className="g-2 row-cols-2">
                {
                    responses.map((res) => (
                        <Col key={res.type}>
                            <ResponseCard
                                responseText={res.text}
                                responseType={res.type}
                            />
                        </Col>
                    ))
                }
            </Row>
        </>
    );
}

export function ResponseCard({ responseText, responseType }) {
    const popover = responseType ? (
        <Popover>
            <Popover.Header>
                What is this response?
            </Popover.Header>
            <Popover.Body>
                {responseTypeInfo[responseType].description}
            </Popover.Body>
        </Popover>
    ): null;

    return (
        <Card className="shadow-sm response-card overflow-scroll">
            <Card.Body>
                <Card.Text>{responseText}</Card.Text>
                <CopyButton textToCopy={responseText}/>
                <OverlayTrigger
                    trigger="click"
                    placement="right"
                    overlay={popover}
                    delay={{ show: 0, hide: 400 }}
                >
                    <Button variant="outline-dark" className="float-end">Learn more</Button>
                </OverlayTrigger>
            </Card.Body>
        </Card>
    );
}

export function CopyButton({ textToCopy }) {
    const [copied, setCopied] = useState(false);

    return (
        <>
            <OverlayTrigger
                placement="right"
                delay={{ show: 200, hide: 400 }}
                overlay={
                    <Tooltip id="copy-tooltip">Copy this response!</Tooltip>
                }
            >
                <Button
                    variant="outline-dark"
                    className="copy-button"
                    onClick={async () => {
                        await navigator.clipboard.writeText(textToCopy);

                        setCopied(true);

                        setTimeout(() => setCopied(false), 2000);
                    }}
                >
                    Copy
                </Button>
            </OverlayTrigger>
            {
                copied ?
                    <span className="small mx-2 opacity-50" style={{ display: "inline-block" }}>
                        Copied!
                    </span> : null
            }
        </>
    );
}