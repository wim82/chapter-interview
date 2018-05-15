import * as firebase from "firebase";

//refactor this to .env file
import firebaseConfig from "./firebase.config";

firebase.initializeApp(firebaseConfig);

async function getQuestions() {
  try {
    const questions = await firebase
      .database()
      .ref("/questions")
      .once("value");
    return questions.val();
  } catch (error) {
    console.error(
      "Getting questions from firebase failed because of",
      error,
      "so returning a set of default dummy questions instead."
    );
    return [
      "What excites or interests you about coding?",
      "What’s hard about coding?",
      "Tell me about a project you’re particularly proud of? What did you do that worked out well?",
      "Tell me about a project that disappointed you? What would you change?",
      "What actions have you personally taken on recent projects to increase maintainability of your code? Any regrets on some actions already? Is all going fine? I just wanna check a long questio{"
    ];
  }
}

module.exports = getQuestions;
