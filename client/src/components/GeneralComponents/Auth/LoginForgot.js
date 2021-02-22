import React, { useState } from "react";
import axios from "axios";
// import Form from "../../components/Form";
// import Row from "../../components/Row";
// import Input from "../../components/Input";
// import Button from "../../components/Button";
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label,
    Input,
    NavLink,
    Alert,
    NavItem,
    Row
} from 'reactstrap'

import {withRouter , Link} from 'react-router-dom';
import { connect } from 'react-redux';

const LoginForgot = ({forgot}) => {

    const [email, setEmail] = useState("");
    const [emailSent, setEmailSent] = useState(false);

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
  
    const forgotPasswordHandler = async (e) => {
      e.preventDefault();
  
      const config = {
        header: {
          "Content-Type": "application/json",
        },
      };
  
      try {
        const { data } = await axios.post(
          "/api/users/forgotpassword",
          { email },
          config
        );
  
        setSuccess(data.data);
        setEmailSent(true);
      } catch (error) {
        setError(error.response.data.error);
        setEmail("");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
    };
    // const submitHandler = (e) => {
    //     e.preventDefault();
    //     console.log("button")
    //     const body = {
    //         email,
    //     };
    //     axios({
    //         url: "api/users/forgot",
    //         data: body,
    //         method: "post",
    //     }).then(res => {
    //         setEmailSent(true);
    //     })
        // forgot(body.email)
        // .then(res => {
        //     setEmailSent(true);
        // })
    // }

    let body;
    if (emailSent) {
        body = (
            <span>An email with reset instructions is on its way</span>
        );
    } else {
        body = (
            <Form onSubmit={forgotPasswordHandler}>
                <Row>
                    <Input
                        name="email"
                        placeholder="email"
                        type="text"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </Row>
                <Row>
                    <Button>Get reset link</Button>
                </Row>
            </Form>
        );
    }

    return (
        body
    );
};

export default LoginForgot;