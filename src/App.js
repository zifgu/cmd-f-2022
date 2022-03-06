import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppMain } from "./components/AppMain";
import { Footer } from "./components/Footer";
import { useState } from "react";
import { getColourScheme, getHexCodeFromRGBArray } from "./components/ColourScheme";
import { Header } from "./components/Header";

const appName = "emPath";
const appDescription = "Leveraging AI to detect emotional undertones.";
export const defaultColor = "#FFECB3";
export const defaultColorScheme = [[241,241,237],[225,193,151],[244,227,182],[199,134,96],[148,85,96]];

function App() {
    const [colorScheme, setColorScheme] = useState(defaultColorScheme);

    return (
        <div className="d-flex flex-column min-vh-100"
             style={{
                 backgroundColor: getHexCodeFromRGBArray(colorScheme[2]),
             }}
        >
            <Container className="pb-3">
                <Row className="justify-content-center">
                    <Col md={9}>
                        <Header title={appName} subtitle={appDescription} colorScheme={colorScheme}/>
                        <AppMain
                            colorChanged={async (color) => {
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
