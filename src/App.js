import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppMain } from "./components/AppMain";
import { Footer } from "./components/Footer";
import { useState } from "react";
import { getColourScheme } from "./components/ColourScheme";

export const defaultColor = "#FFECB3";
export const defaultColorScheme = [
    [
        232,
        241,
        236
    ],
    [
        191,
        216,
        182
    ],
    [
        249,
        230,
        177
    ],
    [
        210,
        110,
        94
    ],
    [
        149,
        119,
        115
    ]
];

function App() {
    const [color, setColor] = useState(defaultColor);

    const [colorScheme, setColorScheme] = useState(defaultColorScheme);

    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: color, }}>
            <Container className="pb-3">
                <Row className="justify-content-center">
                    <Col md={9}>
                        <AppMain
                            colorChanged={async (color) => {
                                setColor(color);
                                setColorScheme(await getColourScheme(color));
                            }}
                            colorScheme={colorScheme}
                        />
                    </Col>
                </Row>
            </Container>
            <Footer colorScheme={colorScheme} />
        </div>
    );
}

export default App;
