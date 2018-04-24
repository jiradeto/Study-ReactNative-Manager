import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Card from './common/Card';

import CardSection from './common/CardSection';
import Button from './common/Button';
import Input from './common/Input';
import Spinner from './common/Spinner';

import { loginUser, emailChanged, passwordChanged } from '../actions';

class LoginForm extends Component {
  renderButton() {
    if (this.props.loading) {
      return <Spinner />;
    }
    return <Button onPress={this.onLogin.bind(this)}>Login</Button>;
  }
  onChangedEmail(text) {
    this.props.emailChanged(text);
  }
  onChangePassword(text) {
    this.props.passwordChanged(text);
  }

  onLogin() {
    const { email, password } = this.props;
    this.props.loginUser({ email, password });
  }

  renderError() {
    if (this.props.error) {
      return (
        <View style={{ backgroundColor: 'white' }}>
          <Text style={styles.errorText}>{this.props.error}</Text>
        </View>
      );
    }
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Email"
            placeholder="example@email.com"
            value={this.props.email}
            onChangeText={this.onChangedEmail.bind(this)}
          />
        </CardSection>
        <CardSection>
          <Input
            label="Password"
            secureTextEntry
            value={this.props.password}
            placeholder="example@email.com"
            onChangeText={this.onChangePassword.bind(this)}
          />
        </CardSection>
        {this.renderError()}
        <CardSection>
          <View style={{ flex: 1 }}>{this.renderButton()}</View>
        </CardSection>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  errorText: {
    alignSelf: 'center',
    color: 'red',
    fontSize: 20
  }
});

const mapStateToProps = state => {
  return {
    email: state.auth.email,
    password: state.auth.password,
    error: state.auth.error,
    loading: state.auth.loading
  };
};

export default connect(mapStateToProps, {
  loginUser,
  emailChanged,
  passwordChanged
})(LoginForm);
