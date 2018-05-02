import React from "react";
import sample from "lodash/sample";
import { ScrollView, StyleSheet, Text, View, Animated } from "react-native";
import questions from "./Questions";
import TimerMixin from "react-timer-mixin";
import reactMixin from "react-mixin";

export default class QuestionRotator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.question = "Welcome";
    //timer equals width of the bar
    this.widthOfTimerBar = new Animated.Value(0);
  }

  getRandomQuestion = () => sample(questions);

  animateTimerBar = () => {
    this.widthOfTimerBar = new Animated.Value(0);
    Animated.timing(this.widthOfTimerBar, {
      toValue: 1,
      duration: 100 * 60 * 1
    }).start();
  };

  getCurrentWidthOfTimerBar = () => ({
    width: this.widthOfTimerBar.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"]
    })
  });

  onPress = () => {
    this.setState({ question: this.getRandomQuestion() });
    this.animateTimerBar();
  };

  render() {
    return (
      <View style={styles.main}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text onPress={this.onPress} style={styles.question}>
            {this.state.question}{" "}
          </Text>
        </ScrollView>
        <Animated.View
          style={[styles.timer, this.getCurrentWidthOfTimerBar()]}
        />
      </View>
    );
  }
}

reactMixin.onClass(QuestionRotator, TimerMixin);

const styles = StyleSheet.create({
  main: {
    backgroundColor: "#00aaFF",
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between"
  },
  question: {
    fontSize: 48,
    padding: "5% 5% 5% 5%",
    color: "white",
    fontWeight: "bold"
  },
  container: {
    flexGrow: 1,
    backgroundColor: "#00aaFF",
    alignItems: "center",
    justifyContent: "center"
  },
  timer: {
    height: 8,
    backgroundColor: "white",
    alignSelf: "flex-start"
  }
});
