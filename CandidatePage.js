import React from "react";

import { ScrollView, StyleSheet, Text, View, TextInput } from "react-native";

export default class CandidatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "hoi"
    };
  }

  render() {
    return (
      <View style={styles.main}>
        <ScrollView contentContainerStyle={[styles.container]}>
          <Text onPress={this.onPress} style={styles.question}>
            name
          </Text>
          <TextInput
            placeholder="Enter your name"
            onChangeText={name => this.setState({ name })}
            value={this.state.text}
            style={styles.nameInputField}
          />
          <Text onPress={this.onPress} style={styles.question}>
            date
          </Text>
          <TextInput
            placeholder="Still needs a datepicker"
            onChangeText={name => this.setState({ name })}
            value={this.state.text}
            style={styles.nameInputField}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "white",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  question: {
    fontSize: 12,
    padding: "5% 0% 0% 5%",
    color: "#424242",
    opacity: 0.9,
    height: 12,
    fontVariant: ["small-caps"]
  },
  container: {
    flexGrow: 1,
    backgroundColor: "white"
  },
  nameInputField: {
    paddingBottom: 6,
    marginRight: "5%",
    marginLeft: "5%",
    height: 36,
    fontSize: 24,
    color: "#424242"
  }
});
