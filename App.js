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
import MailCore from 'react-native-mailcore';

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

  connect = () => {
    console.log(this.state);
    MailCore.sendMail({
      hostname: SMTP_HOST,
      port: SMTP_PORT,
      username: this.state.from,
      password: this.state.password,
      from: {
        addressWithDisplayName: "From label",
        mailbox: this.state.from
      },
      to: {
        addressWithDisplayName: "To label",
        mailbox: this.state.to
      },
      subject: 'Testing RN MailCore' + new Date(),
      htmlBody: `<h1> How is it going </h1>
                <p> Test message </p>
                `
    })
    .then(result => {
      alert(result.status);
    })
    .catch(error => {
      alert(error);
    });
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
          onChangeText={(message) => this.setState({message})}/>
        <TextInput
          placeholder="Type in your message"
          onChangeText={(message) => this.setState({message})}/>
        <Button
          title="Send"
          onPress={this.connect}/>
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
