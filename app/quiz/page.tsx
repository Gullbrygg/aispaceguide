"use client"
import React, { useState } from 'react';



interface quizQuestions {
    id: number;
    question: string;
    options: string[];
    correctAnswer: number;
    explanation: string;
}

const quizQuestions: quizQuestions[] = [
    {
     id: 1,
    question: "What is an appropriate use of AI tools like ChatGPT in academic work?",
    options: [
      "Writing your entire essay and submitting it as your own work",
      "Using it to understand difficult concepts and get explanations",
      "Having it complete all your homework assignments",
      "Using it to take online exams"
    ],
    correctAnswer: 1,
    explanation: "AI should be used as a learning aid to help you understand concepts better, not to replace your own work and learning process."
  },
  {
    id: 2,
    question: "If you use AI to help improve the grammar in your assignment, what should you do?",
    options: [
      "Nothing, it's just grammar correction",
      "Cite the AI tool and explain how you used it",
      "Keep it secret to avoid penalties",
      "Only mention it if asked by the teacher"
    ],
    correctAnswer: 1,
    explanation: "Transparency is key. You should always disclose AI assistance and cite it appropriately, even for grammar improvements."
  },
  {
    id: 3,
    question: "Which statement best describes the relationship between AI and critical thinking?",
    options: [
      "AI can replace the need for critical thinking",
      "AI outputs should always be accepted without question",
      "You should critically evaluate and verify AI-generated information",
      "Critical thinking is only needed when AI is not available"
    ],
    correctAnswer: 2,
    explanation: "AI can make mistakes and produce biased or incorrect information. You must always apply critical thinking and verify the information."
  },
  {
    id: 4,
    question: "What is the main risk of relying too heavily on AI for academic work?",
    options: [
      "It takes too much time to use AI tools",
      "AI tools are too expensive for students",
      "You may not develop your own skills and understanding",
      "Teachers will always know when you use AI"
    ],
    correctAnswer: 2,
    explanation: "Over-reliance on AI can prevent you from developing critical thinking skills, deep understanding, and independent problem-solving abilities."
  },
  {
    id: 5,
    question: "How should you approach AI-generated code for programming assignments?",
    options: [
      "Copy and paste it directly without modifications",
      "Use it to understand the logic, then write your own implementation",
      "Submit it as-is since it's correct code",
      "Only use AI after you've completed the assignment"
    ],
    correctAnswer: 1,
    explanation: "AI-generated code should be used as a learning tool to understand approaches and logic, but you should write and understand your own code."
  },
  {
    id: 6,
    question: "What is academic integrity in the context of AI use?",
    options: [
      "Never using AI tools under any circumstances",
      "Using AI tools honestly, transparently, and within ethical boundaries",
      "Only using AI when it's explicitly allowed by teachers",
      "Keeping your AI usage secret to protect your grades"
    ],
    correctAnswer: 1,
    explanation: "Academic integrity with AI means using it honestly and ethically, being transparent about its use, and ensuring it supports rather than replaces learning."
  },
  {
    id: 7,
    question: "When is it acceptable to use AI during an exam?",
    options: [
      "When the exam is particularly difficult",
      "When other students are doing it",
      "Only when explicitly permitted by the instructor",
      "As long as you don't get caught"
    ],
    correctAnswer: 2,
    explanation: "Using AI during exams without permission is cheating. Only use AI if the instructor explicitly allows it as part of the exam format."
  },
  {
    id: 8,
    question: "What's the best way to use AI for research paper writing?",
    options: [
      "Have AI write the entire paper based on your topic",
      "Use AI to brainstorm ideas, outline structure, and check citations",
      "Let AI find and summarize all your sources",
      "Use AI to paraphrase existing papers to avoid plagiarism"
    ],
    correctAnswer: 1,
    explanation: "AI works best as a brainstorming and organizational tool. You should do the actual research, critical analysis, and writing yourself."
  },
  {
    id: 9,
    question: "How can teachers effectively use AI in their teaching?",
    options: [
      "To grade all assignments automatically without review",
      "To create personalized learning materials and explain concepts differently",
      "To replace classroom lectures entirely",
      "To monitor students' AI usage secretly"
    ],
    correctAnswer: 1,
    explanation: "Teachers can use AI to enhance teaching through personalized content, alternative explanations, and creative lesson planning, while maintaining human oversight.",
  },
  {
    id: 10,
    question: "What should you do if you're unsure whether AI use is allowed for an assignment?",
    options: [
      "Use AI anyway and hope for the best",
      "Ask your instructor for clarification before using AI",
      "Check with other students and follow their lead",
      "Avoid AI completely to be safe"
    ],
    correctAnswer: 1,
    explanation: "When in doubt, always ask your instructor. Clear communication prevents misunderstandings and demonstrates academic integrity."
}
];

function QuizPage() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showExplanation, setShowExplanation] = useState(false);

    const currentQuestion = quizQuestions[currentQuestionIndex];
    const handleOptionSelect = (index: number) => {
        setSelectedOption(index);
        setShowExplanation(true);
    };  
    const handleNextQuestion = () => {
        setSelectedOption(null);
        setShowExplanation(false);
        if (currentQuestionIndex < quizQuestions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            alert("Quiz completed! Thank you for participating.");
            setCurrentQuestionIndex(0); // Reset to the first question
        }   };
    return (
        <div className="flex-1 -mx-[calc((100vw-100%)/2)] bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
            </div>

            <div className="relative z-10 w-full max-w-2xl mx-auto px-4 py-16">
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 text-center">AI Ethics Quiz</h1>
                <p className="text-gray-300 text-center mb-8">
                    Question {currentQuestionIndex + 1} of {quizQuestions.length}
                </p>

                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                    <h2 className="text-lg font-semibold mb-4 text-white">{currentQuestion.question}</h2>
                    <ul className="space-y-3">
                        {currentQuestion.options.map((option, index) => (
                            <li key={index}>
                                <button
                                    className={`w-full text-left px-4 py-3 rounded-lg border transition-all duration-200 ${
                                        selectedOption === index
                                            ? index === currentQuestion.correctAnswer
                                                ? 'bg-green-500/30 border-green-400 text-white'
                                                : 'bg-red-500/30 border-red-400 text-white'
                                            : 'bg-white/10 border-white/20 text-gray-200 hover:bg-white/20'
                                    }`}
                                    onClick={() => handleOptionSelect(index)}
                                    disabled={selectedOption !== null}
                                >
                                    {option}
                                </button>
                            </li>
                        ))}
                    </ul>
                    {showExplanation && (
                        <div className="mt-4 p-4 bg-white/10 border-l-4 border-white/40 rounded-r-lg">
                            <p className="font-semibold text-white">{selectedOption === currentQuestion.correctAnswer ? "✅ Correct!" : "❌ Incorrect."}</p>
                            <p className="text-gray-300 mt-1">{currentQuestion.explanation}</p>
                        </div>
                    )}
                    {selectedOption !== null && (
                        <button
                            className="mt-4 px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 text-white rounded-xl font-semibold hover:bg-white/20 hover:scale-105 transition-all duration-300"
                            onClick={handleNextQuestion}
                        >
                            {currentQuestionIndex < quizQuestions.length - 1 ? 'Next Question →' : 'Finish Quiz'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );  


    

}




export default QuizPage;
