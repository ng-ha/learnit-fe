import React, { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";
import { AuthContext } from "../contexts/AuthContext";
import {
    Spinner,
    Card,
    Button,
    Container,
    Row,
    Col,
    OverlayTrigger,
    Tooltip,
    Toast,
} from "react-bootstrap";
import SinglePost from "../components/posts/SinglePost";
import AddPostModal from "../components/posts/AddPostModal";
import UpdatePostModal from "../components/posts/UpdatePostModal";
import addIcon from "../assets/plus-circle-fill.svg";
const Dashboard = () => {
    // Contexts
    const {
        authState: {
            user: { username },
        },
    } = useContext(AuthContext);

    const {
        postState: { post, posts, postsLoading },
        getPosts,
        setShowAddPostModal,
        showToast: { show, message, type },
        setShowToast,
    } = useContext(PostContext);

    // Start: get all posts
    useEffect(() => {
        getPosts();
    }, []);

    let body = null;

    if (postsLoading) {
        body = (
            <div className="spinner-container">
                <Spinner animation="border" variant="info" />
            </div>
        );
    } else if (posts.length === 0) {
        body = (
            <Card className="text-center m-5">
                <Card.Header as="h1">Hi {username}</Card.Header>
                <Card.Body>
                    <Card.Title>Welcome to LearnIt</Card.Title>
                    <Card.Text>
                        Click the button below to track your first skill to
                        learn.
                    </Card.Text>
                    <Button
                        variant="primary"
                        onClick={setShowAddPostModal.bind(this, true)}
                    >
                        LearnIt!
                    </Button>
                </Card.Body>
            </Card>
        );
    } else {
        body = (
            <Container>
                <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
                    {posts.map((post) => (
                        <Col key={post._id} className="my-2">
                            <SinglePost post={post} />
                        </Col>
                    ))}
                </Row>
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip variant="danger">
                            Add a new thing to learn
                        </Tooltip>
                    }
                >
                    <Button
                        className="btn-floating"
                        onClick={setShowAddPostModal.bind(this, true)}
                    >
                        <img
                            src={addIcon}
                            alt="add-post"
                            width="60"
                            height="60"
                        />
                    </Button>
                </OverlayTrigger>
            </Container>
        );
    }

    return (
        <>
            {body}
            <AddPostModal />
            {post !== null && <UpdatePostModal />}
            {/* After post is added, show toast */}
            <Toast
                show={show}
                style={{ position: "fixed", top: "20%", right: "10px" }}
                className="text-white me-auto"
                bg={type}
                delay="3000"
                autohide
                onClose={setShowToast.bind(this, {
                    show: false,
                    message: "",
                    type: null,
                })}
            >
                <Toast.Header>Notification</Toast.Header>
                <Toast.Body>{message}</Toast.Body>
            </Toast>
        </>
    );
};

export default Dashboard;
