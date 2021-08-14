import { FC } from "react";
import { Container, Stack, useToast } from "@chakra-ui/react";

import { useQuestion } from "hooks/useQuestion";
import AnswerPreview from "views/AnswerPreview";

import Loader from "./Loader";
import QuestionItem from "./QuestionItem";

const QuestionWizardView: FC = () => {
  const { error, isFetching, questions, isAnswersPreview } = useQuestion();
  const toast = useToast();

  if (error) {
    toast({
      position: "bottom",
      status: "error",
      title: error,
    });
  }

  if (isAnswersPreview) {
    return <AnswerPreview />;
  }

  return (
    <Container minH="100vh" maxW="container.md">
      <Stack align="stretch" justify="stretch" h="full" py="10vh" spacing={0}>
        {isFetching && <Loader />}
        {!isFetching &&
          questions.map((props) => <QuestionItem key={props.id} {...props} />)}
      </Stack>
    </Container>
  );
};

export default QuestionWizardView;
