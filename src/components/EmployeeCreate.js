import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { employeeClearForm, employeeUpdate, employeeCreate } from '../actions';
import Input from './common/Input';
import Card from './common/Card';
import CardSection from './common/CardSection';
import Button from './common/Button';
import EmployeeForm from './EmployeeForm';

class EmployeeCreate extends Component {
  componentWillMount() {
    this.props.employeeClearForm();
  }

  onButtonPress() {
    const { name, phone, shift } = this.props;
    this.props.employeeCreate({ name, phone, shift: shift || 'Monday' });
  }

  render() {
    return (
      <Card>
        <EmployeeForm {...this.props} />
        <CardSection>
          <View style={{ flex: 1 }}>
            <Button onPress={this.onButtonPress.bind(this)}>Create</Button>
          </View>
        </CardSection>
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
  employeeClearForm,
  employeeUpdate,
  employeeCreate
})(EmployeeCreate);
