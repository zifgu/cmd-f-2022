import Col from "react-bootstrap/Col";
import { getHexCodeFromRGBArray } from "./ColourScheme";

export function Heading(props) {
    return (
        <Col md={12}>
            <h4
                className="my-4"
                style={{
                    textColor: getHexCodeFromRGBArray(props.colorScheme[4]),
                }}
            >
                {props.children}
            </h4>
        </Col>
    );
}