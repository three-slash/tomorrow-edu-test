import { FC, useState, useMemo, createContext, useContext } from "react";
import { useFetch } from "use-http";

type Answer = {
  id: string;
  text?: string;
  image?: string;
};

export type Question = {
  id: string;
  text: string;
  image?: string;
  description: string;
  answers: Answer[];
};

type AnswerCollection = {
  [key: string]: string[];
};

type SubmitResponse = {
  valid: string[];
  invalid: string[];
};

type QuestionContextType = {
  isFetching: boolean;
  isSubmitting: boolean;
  error: string;
  questions: Question[];
  currentQuestion: Question;
  prevQuestion: Question;
  selectAnswer: (id: string) => void;
  submitAnswer: () => Promise<void>;
  validAnswers: string[];
  invalidAnswers: string[];
  hasValidAnswers: boolean;
  hasInvalidAnswers: boolean;
  continueOrChange: () => Promise<void>;
  viewPrevQuestion: () => void;
  isAnswersPreview: boolean;
  answers: AnswerCollection;
};

const QuestionContext = createContext<QuestionContextType>({
  isFetching: false,
  error: null,
  questions: [],
  currentQuestion: undefined,
  prevQuestion: undefined,
  selectAnswer: () => {},
  isSubmitting: false,
  submitAnswer: async () => {},
  validAnswers: [],
  invalidAnswers: [],
  hasValidAnswers: false,
  hasInvalidAnswers: false,
  continueOrChange: async () => {},
  viewPrevQuestion: () => {},
  isAnswersPreview: false,
  answers: {},
});

export const useQuestion = () => useContext(QuestionContext);

export const QuestionProvider: FC = ({ children }) => {
  const {
    loading: isFetching,
    error: isFetchError,
    data: fetchData,
  } = useFetch("/api/test", {}, []);

  const {
    loading: isSubmitting,
    error: isSubmitError,
    response: submitResponse,
    post,
  } = useFetch<SubmitResponse>("/api/test");

  const error = useMemo(
    () => isFetchError?.message || isSubmitError?.message,
    [isFetchError, isSubmitError]
  );

  const questions = useMemo<Question[]>(
    () => fetchData?.data ?? [],
    [fetchData]
  );

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = useMemo<Question>(
    () => questions[currentQuestionIndex],
    [currentQuestionIndex, questions]
  );

  const [selectedAnswer, setSelectedAnswers] = useState<string[]>([]);
  const [answers, setAnswers] = useState<AnswerCollection>({});
  const [validAnswers, setValidAnswers] = useState([]);
  const hasValidAnswers = validAnswers.length > 0;
  const [invalidAnswers, setInvalidAnswers] = useState([]);
  const hasInvalidAnswers = invalidAnswers.length > 0;

  const [isAnswersPreview, setAnswersPreviewStatus] = useState(false);

  console.log({
    answers,
  });

  const prevQuestion = useMemo<Question>(() => {
    const currentIndex = questions.findIndex(
      (item) => item.id === currentQuestion?.id
    );
    return questions?.[currentIndex - 1];
  }, [currentQuestion, questions]);

  /**
   * Check or uncheck the answer(s)
   * @param id Answers Id
   */
  const selectAnswer = (id: string) => {
    setSelectedAnswers((answers) => {
      const findIndex = answers.findIndex((item) => item === id);
      if (findIndex >= 0) {
        answers.splice(findIndex, 1);
      } else {
        answers.push(id);
      }

      console.log({ answers });
      return answers;
    });
  };

  /**
   * Submitting our current answer
   */
  const submitAnswer = async () => {
    if (!currentQuestion) return;
    if (!selectedAnswer.length) return;

    await post({
      id: currentQuestion.id,
      answers: selectedAnswer,
    });

    if (submitResponse.ok) {
      setValidAnswers(submitResponse.data.valid);
      setInvalidAnswers(submitResponse.data.invalid);
    }
  };

  /**
   * Combine 3 functions to be consumed in button on click
   */
  const continueOrChange = async () => {
    // On submit
    if (!hasValidAnswers && !hasInvalidAnswers) {
      await submitAnswer();
      return;
    }

    // On Change answers
    if (hasInvalidAnswers) {
      setValidAnswers([]);
      setInvalidAnswers([]);
      return;
    }

    // On Continue
    if (hasValidAnswers) {
      const nextQuestionIndex = currentQuestionIndex + 1;
      if (!questions[nextQuestionIndex]) {
        setAnswersPreviewStatus(true);
        return;
      }

      setAnswers((answers) => ({
        ...answers,
        [currentQuestion.id]: selectedAnswer,
      }));
      setSelectedAnswers([]);
      setValidAnswers([]);
      setInvalidAnswers([]);
      setCurrentQuestionIndex(nextQuestionIndex);
    }
  };

  const viewPrevQuestion = () => {
    const prevQuestionIndex = currentQuestionIndex - 1;
    const prevQuestion = questions[prevQuestionIndex];
    if (!prevQuestion) {
      return;
    }

    const selectedAnswers = answers[prevQuestion.id];
    setSelectedAnswers(selectedAnswers);
    setValidAnswers(selectedAnswers);
    setInvalidAnswers([]);
    setCurrentQuestionIndex(prevQuestionIndex);
  };

  const value = {
    isFetching,
    error,
    questions,
    answers,
    currentQuestion,
    selectAnswer,
    isSubmitting,
    submitAnswer,
    prevQuestion,
    validAnswers,
    invalidAnswers,
    hasValidAnswers,
    hasInvalidAnswers,
    continueOrChange,
    viewPrevQuestion,
    isAnswersPreview,
  };

  return (
    <QuestionContext.Provider value={value}>
      {children}
    </QuestionContext.Provider>
  );
};
