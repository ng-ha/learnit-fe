import React from "react";
import Alert from "react-bootstrap/Alert";
const AlertMessage = ({ info }) => {
    return info ? <Alert variant={info.type}>{info.message}</Alert> : null;
};

export default AlertMessage;
