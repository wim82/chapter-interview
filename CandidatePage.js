import React from "react";

import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  LayoutAnimation,
  TouchableHighlight,
  DatePickerIOS
} from "react-native";

export default class CandidatePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      date: new Date(),
      isDatePickerOpen: false,
      position: ""
    };
  }

  setDate = newDate => {
    console.log("setting new date", newDate);
    this.setState({ date: newDate });
  };

  toggleDatePicker = previousState => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    console.log("togglin", this.state.isDatePickerOpen);
    this.setState({ isDatePickerOpen: !this.state.isDatePickerOpen });
  };

  render() {
    return (
      <View style={styles.main}>
        <ScrollView contentContainerStyle={[styles.container]}>
          <Text style={styles.question}>name</Text>
          <TextInput
            placeholder="Enter your name"
            onChangeText={name => this.setState({ name })}
            value={this.state.text}
            style={styles.nameInputField}
          />
          <Text style={styles.question}>date</Text>
          <TouchableHighlight
            underlayColor="#ddd"
            onPress={this.toggleDatePicker}
          >
            <Text style={styles.dateInputField}>
              {`${this.state.date.getDate()}/${this.state.date.getMonth() +
                1}/${this.state.date.getFullYear()}`}
            </Text>
          </TouchableHighlight>
          <View
            style={
              this.state.isDatePickerOpen
                ? styles.datePickerOpen
                : styles.datePickerClosed
            }
          >
            <DatePickerIOS
              mode="date"
              date={this.state.date}
              onDateChange={this.setDate}
            />
          </View>

          <View>
            <Text style={styles.question}>position</Text>
          </View>
          <TextInput
            placeholder="For which position"
            onChangeText={position => this.setState({ position })}
            value={this.state.position}
            style={styles.nameInputField}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#00aaFF",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  question: {
    fontSize: 12,
    padding: "5% 0% 0% 5%",
    color: "#424242",
    opacity: 0.9,
    height: 8,
    fontVariant: ["small-caps"],
    marginBottom: -5
  },
  container: {
    flexGrow: 1,
    backgroundColor: "white"
  },
  nameInputField: {
    paddingBottom: 8,
    paddingTop: 5,
    marginRight: "5%",
    marginLeft: "5%",
    height: 40,
    fontSize: 24,
    color: "#424242"
  },
  dateInputField: {
    paddingBottom: 8,
    paddingTop: 5,
    marginRight: "5%",
    marginLeft: "5%",
    height: 40,
    fontSize: 24,
    color: "#424242"
  },
  datePickerClosed: {
    height: 0,
    overflow: "hidden"
  },
  datePickerOpen: {
    overflow: "hidden",
    flex: 0
  }
});
