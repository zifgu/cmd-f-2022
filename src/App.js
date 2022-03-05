import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import 'bootstrap/dist/css/bootstrap.min.css';
import { MessageInput } from "./components/MessageInput";

function App() {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Container>
                <Row className="my-3 justify-content-center">
                    <Col lg={8} className="text-center">
                        <MessageInput />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default App;
