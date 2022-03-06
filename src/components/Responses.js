import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import "../styles/response_card.css";
import { IoCopy } from "react-icons/io5";
import { useState } from "react";
import { Heading } from "./Common";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

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
                        <Col key={res}>
                            <ResponseCard
                                responseText={res}
                            />
                        </Col>
                    ))
                }
            </Row>
        </>
    );
}

export function ResponseCard({ responseText, bodyText: popupText }) {
    return (
        <Card className="shadow-sm response-card overflow-scroll">
            <Card.Body>
                <Card.Text>{responseText}</Card.Text>
                {
                    popupText ?
                        <Card.Text>{popupText}</Card.Text> : null
                }
                <CopyButton textToCopy={responseText}/>
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
                <span
                    className="copy-button px-1"
                    onClick={async () => {
                        await navigator.clipboard.writeText(textToCopy);

                        setCopied(true);

                        setTimeout(() => setCopied(false), 2000);
                    }}
                >
                    <IoCopy />
                </span>
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