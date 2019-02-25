/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import RNSmtpMailer from "react-native-smtp-mailer";

const IMAP_HOST = "imap.googlemail.com";
const IMAP_PORT = 993;
const SMTP_HOST = "smtp.gmail.com";
const SMTP_PORT = 465;

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      from:'',
      password:'',
      to:'',
      message:'',
      connection: null
    };
  }

  checkState = () => {
    alert(this.state.from + ' ' + this.state.password + ' ' + this.state.to + ' ' + this.state.message);
  }

  connect = () => {
    RNSmtpMailer.sendMail({
      mailhost: "smtp.gmail.com",
      port: "465",
      ssl: true,
      username: this.state.from,
      password: this.state.password,
      from: this.state.from,
      recipients: this.state.to,
      subject: "SMTP Test",
      htmlBody: this.state.message,
      attachmentPaths: [],
      attachmentNames: [], 
      attachmentTypes: []
    })
      .then(success => alert(success))
      .catch(err => alert(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="Type in your email address"
          onChangeText={(from) => this.setState({from})}/>
        <TextInput
          placeholder="Type in your password"
          secureTextEntry={true}
          onChangeText={(password) => this.setState({password})}/>
        <TextInput
          placeholder="Type in recepient address"
          onChangeText={(to) => this.setState({to})}/>
        <TextInput
          placeholder="Type in your message"
          onChangeText={(message) => this.setState({message})}/>
        <Button
          title="Send"
          onPress={this.connect}/>
          <Button
          title="Check state"
          onPress={this.checkState}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
