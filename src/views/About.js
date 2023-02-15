import React from "react";
import { Button, Row, Col, Container } from "react-bootstrap";

const About = () => {
    return (
        <Container>
            <Row className="mt-5">
                <Col className="text-center">
                    <Button
                        href="https://www.youtube.com/channel/UCKuxFA5hiiVJyD8QTbf3Z0g"
                        variant="primary"
                        size="lg"
                    >
                        Visit my chanel for more information!
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default About;
