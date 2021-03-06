import React, { Component } from 'react';
import { View, Text, ListView } from 'react-native';
import CardSection from './common/CardSection';
import { connect } from 'react-redux';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';
import _ from 'lodash';

class EmployeeList extends Component {
  componentWillMount() {
    this.props.employeesFetch();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  createDataSource({ employees }) {
    console.log('createDataSource', employees);

    const ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2
    });
    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee) {
    return <ListItem employee={employee} />;
  }

  render() {
    return <ListView dataSource={this.dataSource} renderRow={this.renderRow} />;
  }
}

const mapStateToProps = state => {
  const employees = _.map(state.employeesList, (val, uid) => {
    return { ...val, uid };
  });
  return { employees };
};
export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
