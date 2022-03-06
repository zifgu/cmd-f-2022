import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import 'bootstrap/dist/css/bootstrap.min.css';
import { AppMain } from "./components/AppMain";
import { Footer } from "./components/Footer";
import React, { useState } from "react";
import { getColourScheme } from "./components/ColourScheme";
import withSplashScreen from './components/withSplashScreen';
import { Header } from "./components/Header";

export const defaultColor = "#FFECB3";
export const defaultColorScheme = [
    [237,244,244],[203,211,180],[245,231,184],[188,168,124],[131,125,105]
];

const appTitle = "Me, An Empath";
const appDescription = "Leveraging AI to detect emotional undertones.";

function AppInner() {
    const [color, setColor] = useState(defaultColor);

    const [colorScheme, setColorScheme] = useState(defaultColorScheme);

    return (
        <div className="d-flex flex-column min-vh-100" style={{ backgroundColor: color, }}>
            <Container className="pb-3">
                <Row className="justify-content-center">
                    <Col md={9}>
                        <Header title={appTitle} subtitle={appDescription} colorScheme={colorScheme}/>
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

export default withSplashScreen(AppInner);

