import { useRouter } from "expo-router";
import { useState, useEffect, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { questionlist } from "../(tabs)/questions"


//let questions: any[] = [];
let questions = questionlist
let index = -1
let quest = -1;
let answerArray: any[] = []
let rndNums: any[] = []



export default function QuizScreen() {
  const router = useRouter(); // Used for navigation between screens
  const [currentQuestion, setCurrentQuestion] = useState(0); // Tracks the current question index
  const [score, setScore] = useState(0); // Tracks the user's score
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null); // Tracks the currently selected answer
  const [userAnswers, setUserAnswers] = useState<{question: string, correct: boolean, answer: string}[]>([]); // Stores user's answers and correctness

const pickedQuestions = useMemo(() => {
   // Pick 10 random questions at the start
    //let allNums = [];
    //let reducedNums = [];
    //let rndNums = [];

    let pickedIndexes = [];

    /*for(let i = 0; i < questions.length+1; i++){
      allNums[i] = i; // [0,1,2,3...]
    }*/
    //console.log("All nums array: "+allNums);
    for(let i = 0; i < 10; i++){
      let rand = Math.floor(Math.random() * questions.length);
      while (true) { 
        if (pickedIndexes.includes(rand)) {
          rand = Math.floor(Math.random() * questions.length); 
          continue;
        } else {
          pickedIndexes.push(rand);
          break;
        }
      }

       // random number between 0 - 99 (Using length of allNums)
      //console.log("Random number generated: "+rand);
      //rndNums[i] = rand;
      //console.log("Random nums array: "+rndNums);

      /*let reducedCount = 0;
      reducedNums = [];
      for(let j = 0; j < allNums.length; j++){
        if(allNums[j] != allNums[rand]){
          reducedNums[reducedCount] = allNums[j];
          reducedCount++;
        }
      }*/
      

      //console.log("Reduced nums array: "+reducedNums);
      //allNums = reducedNums;
      //console.log("All nums updated: "+allNums);
    }

    return pickedIndexes;
  }, []);

    /*
    let rndOption = [1, 2, 3, 4];
    let reducedOption = [];

    reducedOption = rndOption;
    //questions = [questionlist[rndNums[0], rndNums[1], rndNums[2], rndNums[3], rndNums[4], rndNums[5], rndNums[6], rndNums[7], rndNums[8], rndNums[9]]]
    console.log([questionlist[rndNums[0]], questionlist[rndNums[1]], questionlist[rndNums[2]], questionlist[rndNums[3]], questionlist[rndNums[4]], questionlist[rndNums[5]], questionlist[rndNums[6]], questionlist[rndNums[7]], questionlist[rndNums[8]], questionlist[rndNums[9]]])
    
    console.log(rndNums)

    let passNum = 0;
    for(let i = 4; i > 0; i--){
      let rand = Math.floor(Math.random() * i);
        //console.log(rand);

        let chosenOption = reducedOption[rand];

        if(passNum == 0){
            console.log("A. "+questions[rndNums[index]].options[chosenOption - 1]);
        }
        else if(passNum == 1){
            console.log("B. "+questions[rndNums[index]].options[chosenOption - 1]);
        }
        else if(passNum == 2){
            console.log("C. "+questions[rndNums[index]].options[chosenOption - 1]);
        }
        else if(passNum == 3){
            console.log("D. "+questions[rndNums[index]].options[chosenOption - 1]);
        }

        passNum++;

        rndOption[rand] = -1
        let reducedCount = 0;
        for (let j = 0; j < rndOption.length; j++){
            if(rndOption[j] != -1){
                reducedOption[reducedCount] = rndOption[j];
                reducedCount++;
                //console.log(reducedOption);
            }
        }
      }
      console.log(questions[rndNums[index]].options)
    //console.log("All random nums: "+rndNums);
    return rndNums;
  }, []);*/

  useEffect(() => {
  rndArrangement(); // Randomise answer order for each question
  }, [currentQuestion]);

  //randomly rearranges the answers
  const rndArrangement = () => {

    
  }

  //creates an array of 10 random questions

  
  const handleSelect = (answer: string) => {
    // Called when a user selects an answer
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    // Checks if the selected answer is correct
    const isCorrect = selectedAnswer === questions[pickedQuestions[currentQuestion]].answer;

    // Save the current answer result
    setUserAnswers([...userAnswers, {
      question: questions[pickedQuestions[currentQuestion]].question,
      correct: isCorrect,
      answer: questions[pickedQuestions[currentQuestion]].answer
    }]);

    // Update score if answer is correct
    if (isCorrect) {
      setScore(score + 1);
    }

    // Reset selected answer for the next question
    setSelectedAnswer(null);

    if (currentQuestion < 9) {
      // Move to the next question
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate to the results screen with final score and answers
      router.push({
        pathname: "/results",
        params: { 
          score: isCorrect ? score + 1 : score,
          answers: JSON.stringify(userAnswers.concat([{
            question: questions[pickedQuestions[currentQuestion]].question,
            correct: isCorrect,
            answer: questions[pickedQuestions[currentQuestion]].answer
          }]))
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.questionCount}>
        {/* Displays current question number out of total */}
        Question {currentQuestion + 1}/{10}
      </Text>
      <Text style={styles.question}>
        {/* Displays the current question */}
        {questions[pickedQuestions[currentQuestion]].question}
      </Text>

      {/* Renders answer options as buttons */}
      
      {questions[pickedQuestions[currentQuestion]].options.map((option, index) => (
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
          {currentQuestion < 9 ? "Submit & Next" : "Submit & Finish"}
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