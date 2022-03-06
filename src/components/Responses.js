import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import "../styles/response_card.css";
import { IoCopy } from "react-icons/io5";
import { useState } from "react";
import { Heading } from "./Common";

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

export function ResponseCard({ responseText, bodyText }) {
    return (
        <Card className="shadow-sm response-card">
            <Card.Body>
                <Card.Text>{responseText}</Card.Text>
                {
                    bodyText ?
                        <Card.Text>{bodyText}</Card.Text> : null
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
            <IoCopy
                className="copy-button"
                size={20}
                onClick={async () => {
                    await navigator.clipboard.writeText(textToCopy);

                    setCopied(true);

                    setTimeout(() => setCopied(false), 2000);
                }}
            />
            {
                copied ?
                    <span className="small mx-2 opacity-50" style={{ display: "inline-block" }}>
                        Copied!
                    </span> : null
            }
        </>
    );
}