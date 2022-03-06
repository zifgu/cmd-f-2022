import Col from "react-bootstrap/Col";

export function Heading(props) {
    return (
        <Col md={12}>
            <h4 className="text-secondary my-4">
                {props.children}
            </h4>
        </Col>
    );
}