import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppMain } from "./components/AppMain";
import { Footer } from "./components/Footer";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import { getColourScheme } from "./components/ColourScheme";

export const defaultColor = "#FFECB3";

function App() {
    const [color, setColor] = useState(defaultColor);

    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: color, }}>
            <Container>
                <Row className="my-3 justify-content-center">
                    <Col md={8}>
                        <AppMain colorChanged={setColor}/>
                    </Col>
                </Row>
            </Container>
            <Button
                onClick={() => {
                    getColourScheme(color);
                }}
            >
                Testing
            </Button>
            <Footer />
        </div>
    );
}

export default App;
