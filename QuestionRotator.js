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
      question: "Welcome", //intro message
      animation: new Animated.Value(0)
    };
  }

  async componentWillMount() {
    const questions = await getQuestions();
    this.setState({ questions });
  }

  getRandomQuestion = () => sample(this.state.questions);

  animateTimerBar = () => {
    this.setState({ animation: new Animated.Value(0) }, () => {
      Animated.timing(this.state.animation, {
        toValue: 1,
        duration: 10 * 1000
      }).start();
    });
  };

  getAnimatedBackgroundColor = () => ({
    backgroundColor: this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["#00aaFF", "#adccdb"]
    })
  });

  getAnimatedWidth = () => ({
    width: this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0%", "100%"]
    })
  });

  onPress = () => {
    this.setState({
      question: this.getRandomQuestion()
    });
    this.animateTimerBar();
  };

  render() {
    return (
      <View style={styles.main}>
        <Animated.ScrollView
          style={this.getAnimatedBackgroundColor()}
          contentContainerStyle={[styles.container]}
        >
          <Text
            onPress={this.state.questions && this.onPress}
            style={styles.question}
          >
            {this.state.question}
          </Text>
        </Animated.ScrollView>
        <Animated.View style={[styles.timer, this.getAnimatedWidth()]} />
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
    color: "#FFFFFFEE",
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
