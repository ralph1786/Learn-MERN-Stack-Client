import React, { Component, Fragment } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";
import { connect } from "react-redux";
import { createReminder } from "../store/actions/actions";

class ReminderModal extends Component {
  state = {
    title: "",
    isOpen: false
  };

  modalToggle = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  };

  onSubmitHandler = e => {
    e.preventDefault();
    this.props.createReminder(this.state.title);
    this.modalToggle();
  };

  onChangeHandler = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <Fragment>
        <Button
          color="primary"
          style={{ marginBottom: "20px" }}
          onClick={this.modalToggle}
        >
          Add Reminder
        </Button>
        <Modal isOpen={this.state.isOpen} toggle={this.modalToggle}>
          <ModalHeader toggle={this.modalToggle}>
            Add To Reminder List
          </ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmitHandler}>
              <FormGroup>
                <Label for="title">Reminder</Label>
                <Input
                  type="text"
                  name="title"
                  id="reminder"
                  placeholder="Add Reminder"
                  onChange={this.onChangeHandler}
                />
                <Button color="success" style={{ marginTop: "25px" }} block>
                  Create
                </Button>
              </FormGroup>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createReminder: reminder => dispatch(createReminder(reminder))
});

export default connect(
  null,
  mapDispatchToProps
)(ReminderModal);
