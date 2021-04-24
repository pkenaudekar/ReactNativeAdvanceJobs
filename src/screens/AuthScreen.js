import React, { Component } from 'react';
import { View, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AuthScreen extends Component {
  componentDidMount() {
    this.props.facebookLogin();
    //AsyncStorage.removeItem('fb_token');
    this.onAuthComplete(this.props);
  }

  componentDidUpdate(prevProps) {
    if (this.props.token !== prevProps.token) {
      this.onAuthComplete(this.props);
    }
  }

  onAuthComplete(props) {
    if (props.token) {
      this.props.navigation.navigate('Map');
    }
  }

  render() {
    return <View />;
  }
}

function mapStateToProps({ auth }) {
  return { token: auth.token };
}

export default connect(mapStateToProps, actions)(AuthScreen);
