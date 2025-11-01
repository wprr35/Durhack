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
  {
    question: "In which city were the first modern Olympic Games held?",
    options: ["Paris", "Athens", "London", "Rome"],
    answer: "Athens",
  },
  {
    question: "How often are the Summer Olympic Games held?",
    options: ["Every 2 years", "Every 4 years", "Every 6 years", "Every year"],
    answer: "Every 4 years",
  },
  {
    question: "Which colors appear on the Olympic rings?",
    options: ["Red, Blue, Green, Yellow, Black", "Pink, Orange, White, Grey, Brown", "Red, Green, Purple, Blue, Gold", "Only Gold"],
    answer: "Red, Blue, Green, Yellow, Black",
  },
  {
    question: "Which city hosted the 2012 Summer Olympics?",
    options: ["Beijing", "London", "Rio de Janeiro", "Tokyo"],
    answer: "London",
  },
  {
    question: "What do the five Olympic rings represent?",
    options: ["Five sports", "Five continents", "Five medals", "Five Olympic cities"],
    answer: "Five continents",
  },
  {
    question: "Which country has won the most Olympic gold medals?",
    options: ["China", "Russia", "United States", "Germany"],
    answer: "United States",
  },
  {
    question: "What metal is used for the first-place Olympic medal?",
    options: ["Gold", "Silver", "Bronze", "Platinum"],
    answer: "Gold",
  },
  {
    question: "Where were the 2020 (held in 2021) Summer Olympics hosted?",
    options: ["Tokyo", "Paris", "Beijing", "Seoul"],
    answer: "Tokyo",
  },
  {
    question: "Which sport uses a pool and involves swimming, cycling, and running?",
    options: ["Pentathlon", "Triathlon", "Decathlon", "Biathlon"],
    answer: "Triathlon",
  },
  {
    question: "Which of these is a Winter Olympic sport?",
    options: ["Bobsleigh", "Basketball", "Surfing", "Skateboarding"],
    answer: "Bobsleigh",
  },
  {
    question: "Which city will host the 2028 Summer Olympics?",
    options: ["Paris", "Los Angeles", "Rome", "Berlin"],
    answer: "Los Angeles",
  },
  {
    question: "What is the symbol of the Olympic Games called?",
    options: ["The Olympic Flag", "The Olympic Torch", "The Olympic Rings", "The Olympic Flame"],
    answer: "The Olympic Rings",
  },
  {
    question: "Who lights the Olympic flame during the opening ceremony?",
    options: ["A famous athlete", "The president of the host country", "The mayor of the host city", "An audience member"],
    answer: "A famous athlete",
  },
  {
    question: "Which season does figure skating belong to?",
    options: ["Summer Olympics", "Winter Olympics", "Autumn Games", "Spring Games"],
    answer: "Winter Olympics",
  },
  {
    question: "In what year were women first allowed to compete in the Olympic Games?",
    options: ["1896", "1900", "1920", "1948"],
    answer: "1900",
  }
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