import { FC } from "react";
import {
  VStack,
  Heading,
  Accordion,
  Container,
  Button,
} from "@chakra-ui/react";

import { useQuestion } from "hooks/useQuestion";

import AnswerItem from "./AnswerItem";

const AnswersPreviewView: FC = () => {
  const { answers } = useQuestion();

  return (
    <Container minH="100vh" maxW="container.md">
      <VStack align="center" py="10vh" spacing={6}>
        <Heading as="h3" fontSize="1.75rem" fontFamily="serif" lineHeight={1.2}>
          Preview &amp; Submit your Answers
        </Heading>

        <Accordion>
          {Object.keys(answers).map((id) => (
            <AnswerItem key={id} questionId={id} answerIds={answers[id]} />
          ))}
        </Accordion>

        <Button
          colorScheme="yellow"
          size="lg"
          onClick={() =>
            alert(
              "The MVP of this mini app end here!\nWe can now submit the data to backend!"
            )
          }
        >
          Submit Answers!
        </Button>
      </VStack>
    </Container>
  );
};

export default AnswersPreviewView;
