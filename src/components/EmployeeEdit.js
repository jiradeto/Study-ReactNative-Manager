import _ from 'lodash';
import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { connect } from 'react-redux';
import {
  employeeUpdate,
  employeeCreate,
  employeeSave,
  employeeDelete
} from '../actions';
import Input from './common/Input';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Button from './common/Button';
import EmployeeForm from './EmployeeForm';
import Communications from 'react-native-communications';
import Confirm from './common/Confirm';

class EmployeeEdit extends Component {
  state = {
    showModal: false
  };
  onAccept() {
    const { uid } = this.props.employee;
    this.props.employeeDelete({ uid });
  }

  onDecline() {
    this.onDelete();
  }
  componentWillMount() {
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onSave() {
    const { name, phone, shift } = this.props;
    this.props.employeeSave({
      name,
      phone,
      shift,
      uid: this.props.employee.uid
    });
  }
  onTextPress() {
    const { phone, shift } = this.props;
    console.log('onTextPress', phone);
    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }
  onDelete() {
    this.setState({
      showModal: !this.state.showModal
    });
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <View style={{ flex: 1 }}>
            <Button onPress={this.onSave.bind(this)}>Save</Button>
          </View>
        </CardSection>
        <CardSection>
          <View style={{ flex: 1 }}>
            <Button onPress={this.onTextPress.bind(this)}>Text Schedule</Button>
          </View>
        </CardSection>
        <CardSection>
          <View style={{ flex: 1 }}>
            <Button onPress={this.onDelete.bind(this)}>Fire</Button>
          </View>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept.bind(this)}
          onDecline={this.onDecline.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  pickerText: {
    fontSize: 18,
    paddingTop: 5,
    paddingLeft: 20
  }
});

const mapStateToProps = state => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps, {
  employeeUpdate,
  employeeCreate,
  employeeSave,
  employeeDelete
})(EmployeeEdit);
