import React from "react";
import sample from "lodash/sample";
import { ScrollView, StyleSheet, Text, View, Animated } from "react-native";
import getQuestions from "./Questions";
import TimerMixin from "react-timer-mixin";
import reactMixin from "react-mixin";

export default class QuestionRotator extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      question: "Welcome",
      timesUp: false
    };
    //width of bar indicates timer, starts with 0 width til 100%
    this.widthOfTimerBar = new Animated.Value(0);
    this.backgroundColor = new Animated.Value(0);
  }

  async componentWillMount() {
    const questions = await getQuestions();
    this.setState({ questions });
  }

  getRandomQuestion = () => sample(this.state.questions);

  animateTimerBar = () => {
    this.backgroundColor = new Animated.Value(0);
    Animated.timing(this.backgroundColor, {
      toValue: 100,
      duration: 1000 * 60 * 1
    }).start();

    this.widthOfTimerBar = new Animated.Value(0);
    Animated.timing(this.widthOfTimerBar, {
      toValue: 1,
      duration: 1000 * 60 * 1
    }).start();
  };

  getCurrentColorOfBackground = () => ({
    backgroundColor: this.backgroundColor.interpolate({
      inputRange: [0, 1],
      outputRange: ["#00aaFF", "#808080"]
    })
  });

  getCurrentWidthOfTimerBar = () => ({
    width: this.widthOfTimerBar.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"]
    })
  });

  onPress = () => {
    this.setState({
      timesUp: false,
      question: this.getRandomQuestion()
    });
    this.animateTimerBar();
  };

  render() {
    return (
      <View style={styles.main}>
        <Animated.ScrollView
          contentContainerStyle={[
            styles.container,
            this.getCurrentColorOfBackground()
          ]}
        >
          <Text onPress={this.onPress} style={styles.question}>
            {this.state.question}
          </Text>
        </Animated.ScrollView>
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
    alignItems: "center",
    justifyContent: "center"
  },
  timer: {
    height: 8,
    backgroundColor: "white",
    alignSelf: "flex-start"
  }
});
