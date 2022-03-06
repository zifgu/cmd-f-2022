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
import { getHexCodeFromRGBArray } from "./ColourScheme";

export function Responses({ responses, colorScheme }) {
    return (
        <>
            <Row>
                <Heading colorScheme={colorScheme}>
                    I could respond with...
                </Heading>
            </Row>
            <Row className="g-2 row-cols-2">
                {
                    responses.sort((a, b) => a.type - b.type)
                        .map((res) => (
                        <Col key={res.type}>
                            <ResponseCard
                                responseText={res.text}
                                responseType={res.type}
                                colorScheme={colorScheme}
                            />
                        </Col>
                    ))
                }
            </Row>
        </>
    );
}

export function ResponseCard({ responseText, responseType, colorScheme }) {

    return (
        <Card
            className="shadow-sm response-card overflow-scroll"
            style={{
                backgroundColor: "white",
                borderColor: getHexCodeFromRGBArray(colorScheme[1]),
            }}
        >
            <Card.Body>
                <Card.Title className="mt-1 mb-4">{responseText}</Card.Title>
                <CopyButton textToCopy={responseText} colorScheme={colorScheme}/>
                <OverlayButton popoverText={responseTypeInfo[responseType].description} colorScheme={colorScheme}/>
            </Card.Body>
        </Card>
    );
}

export function OverlayButton({popoverText, colorScheme}) {
    const popover = (
        <Popover id="popover-basic">
            <Popover.Header as="h3">Why this response?</Popover.Header>
            <Popover.Body>
                {popoverText}
            </Popover.Body>
        </Popover>
    );

    return (
        <OverlayTrigger trigger={["hover", "focus"]} placement="right" overlay={popover}>
            <Button
                className="float-end"
                style={{
                    backgroundColor: getHexCodeFromRGBArray(colorScheme[3]),
                    borderColor: getHexCodeFromRGBArray(colorScheme[4]),
                }}
            >
                Learn more
            </Button>
        </OverlayTrigger>
    );
}

export function CopyButton({ textToCopy, colorScheme }) {
    const [copied, setCopied] = useState(false);

    return (
        <>
            <OverlayTrigger
                placement="bottom"
                delay={{ show: 200, hide: 400 }}
                overlay={
                    <Tooltip id="copy-tooltip">Copy this response!</Tooltip>
                }
            >
                <Button
                    style={{
                        backgroundColor: getHexCodeFromRGBArray(colorScheme[2]),
                        borderColor: getHexCodeFromRGBArray(colorScheme[4]),
                    }}
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