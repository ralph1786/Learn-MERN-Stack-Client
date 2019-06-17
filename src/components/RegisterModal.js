import React, { Component, Fragment } from "react";
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
  Alert
} from "reactstrap";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { register } from "../store/actions/authActions";
import { clearErrors } from "../store/actions/errorActions";

class RegisterModal extends Component {
  state = {
    isOpen: false,
    name: "",
    email: "",
    password: "",
    message: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps, prevState) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      if (error.id === "REGISTER_FAIL") {
        this.setState({
          message: error.message.message
        });
      } else {
        this.setState({
          message: null
        });
      }
    }

    if (this.state.isOpen) {
      if (isAuthenticated) {
        this.modalToggle();
      }
    }
  }

  modalToggle = () => {
    //clears errors
    this.props.clearErrors();
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmitHandler = e => {
    e.preventDefault();
    const { name, email, password } = this.state;
    const newUser = {
      name,
      email,
      password
    };
    this.props.register(newUser);
  };

  render() {
    return (
      <Fragment>
        <NavLink onClick={this.modalToggle} href="#">
          Register
        </NavLink>
        <Modal isOpen={this.state.isOpen} toggle={this.modalToggle}>
          <ModalHeader toggle={this.modalToggle}>Register</ModalHeader>
          <ModalBody>
            {this.state.message ? (
              <Alert color="danger">{this.state.message}</Alert>
            ) : null}
            <Form onSubmit={this.onSubmitHandler}>
              <FormGroup>
                <Label for="name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={this.onChangeHandler}
                  className="mb-3"
                />
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={this.onChangeHandler}
                  className="mb-3"
                />
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={this.onChangeHandler}
                  className="mb-3"
                />
                <Button color="success" style={{ marginTop: "25px" }} block>
                  Register
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

const mapDispatchToProps = dispatch => ({
  register: newUser => dispatch(register(newUser)),
  clearErrors: () => dispatch(clearErrors())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterModal);
