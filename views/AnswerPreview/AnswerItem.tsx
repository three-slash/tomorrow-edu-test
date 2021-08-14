import { FC } from "react";
import {
  Box,
  HStack,
  VStack,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";

import { useQuestion } from "hooks/useQuestion";

type AnswersItemProps = {
  questionId: string;
  answerIds: string[];
};

const AnswersItemView: FC<AnswersItemProps> = ({ questionId, answerIds }) => {
  const { questions } = useQuestion();
  const question = questions.find((item) => item.id === questionId);
  const answers = question.answers.filter((item) =>
    answerIds.includes(item.id)
  );
  console.log({ question, answers, questionId, answerIds });

  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <strong>Question</strong>: {question.text}
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        <VStack align="stretch" justify="stretch" spacing={2} p={2}>
          <Box as="strong">Answers</Box>
          {answers.map(({ id, image, text }) => (
            <HStack
              key={id}
              spacing={2}
              align="center"
              border="1px solid"
              borderColor="gray.200"
              borderRadius="5px"
              overflow="hidden"
            >
              {image && (
                <Box flexShrink={0} flexBasis="75px" h="75px">
                  <Image src={image} alt="" width={75} height={75} />
                </Box>
              )}
              <Text p={2}>{text}</Text>
            </HStack>
          ))}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
};

export default AnswersItemView;
