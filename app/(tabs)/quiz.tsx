import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const questions = [
  // Array of quiz questions, each with a question, options, and the correct answer
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris",
  },
  // ...other questions
];

export default function QuizScreen() {
  const router = useRouter(); // Used for navigation between screens
  const [currentQuestion, setCurrentQuestion] = useState(0); // Tracks the current question index
  const [score, setScore] = useState(0); // Tracks the user's score
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // Tracks the currently selected answer
  const [userAnswers, setUserAnswers] = useState<{question: string, correct: boolean}[]>([]); // Stores user's answers and correctness

  const handleSelect = (answer: string) => {
    // Called when a user selects an answer
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    // Checks if the selected answer is correct
    const isCorrect = selectedAnswer === questions[currentQuestion].answer;

    // Save the current answer result
    setUserAnswers([...userAnswers, {
      question: questions[currentQuestion].question,
      correct: isCorrect
    }]);

    // Update score if answer is correct
    if (isCorrect) {
      setScore(score + 1);
    }

    // Reset selected answer for the next question
    setSelectedAnswer(null);

    if (currentQuestion < questions.length - 1) {
      // Move to the next question
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate to the results screen with final score and answers
      router.push({
        pathname: "/results",
        params: { 
          score: isCorrect ? score + 1 : score,
          answers: JSON.stringify(userAnswers.concat([{
            question: questions[currentQuestion].question,
            correct: isCorrect
          }]))
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionCount}>
        {/* Displays current question number out of total */}
        Question {currentQuestion + 1}/{questions.length}
      </Text>
      <Text style={styles.question}>
        {/* Displays the current question */}
        {questions[currentQuestion].question}
      </Text>

      {/* Renders answer options as buttons */}
      {questions[currentQuestion].options.map((option, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.option,
            selectedAnswer === option && styles.selectedOption // Highlights selected option
          ]}
          onPress={() => handleSelect(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      ))}

      {/* Submit button is disabled until an answer is selected */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          !selectedAnswer && styles.disabledButton
        ]}
        onPress={handleSubmit}
        disabled={!selectedAnswer}
      >
        <Text style={styles.submitButtonText}>
          {currentQuestion < questions.length - 1 ? "Submit & Next" : "Submit & Finish"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: "#fff",
    },
    questionCount: {
      fontSize: 18,
      color: "#666",
      marginBottom: 20,
    },
    question: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 30,
    },
    option: {
      backgroundColor: "#f0f0f0",
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },
    selectedOption: {
      backgroundColor: "#d4e6ff",
      borderWidth: 1,
      borderColor: "#3498db",
    },
    optionText: {
      fontSize: 18,
    },
    submitButton: {
      backgroundColor: "#3498db",
      padding: 15,
      borderRadius: 10,
      marginTop: 20,
      alignItems: "center",
    },
    disabledButton: {
      backgroundColor: "#cccccc",
    },
    submitButtonText: {
      color: "white",
      fontSize: 18,
      fontWeight: "600",
    },
  });