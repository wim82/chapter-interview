import React from "react";
import { Text, View, Button, YellowBox, StyleSheet } from "react-native";
import QuestionRotator from "./QuestionRotator";
import { StackNavigator } from "react-navigation";
import CandidatePage from "./CandidatePage";

YellowBox.ignoreWarnings(["Warning: isMounted(...) is deprecated"]);

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => ({
    title: "Interview",
    headerRight: (
      <Button
        navigation={navigation}
        onPress={() => navigation.navigate("Profile")}
        title="Who"
        color="red"
      />
    )
  });

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <QuestionRotator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default StackNavigator(
  {
    Home: { screen: App },
    Profile: { screen: CandidatePage }
  },
  {
    initialRouteName: "Home"
  }
);
