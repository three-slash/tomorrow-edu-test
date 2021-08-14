import { FC } from "react";
import Image from "next/image";
import {
  HStack,
  VStack,
  Heading,
  Icon,
  Text,
  Box,
  Button,
  IconButton,
} from "@chakra-ui/react";
import { TiInfoLarge as InfoIcon } from "react-icons/ti";
import { FiArrowLeft as PrevIcon } from "react-icons/fi";

import { useQuestion, Question } from "hooks/useQuestion";
import Answer from "components/Answer";

type QuestionWizardItemProps = Question & {};

const QuestionWizardItem: FC<QuestionWizardItemProps> = ({
  id,
  answers,
  description,
  text,
  image,
}) => {
  const {
    isSubmitting,
    currentQuestion,
    prevQuestion,
    selectAnswer,
    continueOrChange,
    validAnswers,
    invalidAnswers,
    hasValidAnswers,
    hasInvalidAnswers,
    viewPrevQuestion,
  } = useQuestion();

  return (
    <HStack
      display={currentQuestion?.id !== id ? "none" : null}
      align="flex-start"
      h="full"
    >
      <VStack align="stretch" justify="stretch" minH="80vh" spacing={6}>
        <HStack align="center" justify="flex-start" spacing={1}>
          <Icon as={InfoIcon} color="blue.300" w={22} h="auto" />
          <Text color="gray.400">{description}</Text>
        </HStack>

        <VStack align="flex-start" spacing={2}>
          <Heading
            as="h3"
            fontSize="1.75rem"
            fontFamily="serif"
            lineHeight={1.2}
          >
            {text}
          </Heading>
          {image && <Image src={image} alt={text} width={500} height={300} />}
        </VStack>

        <Text
          textTransform="uppercase"
          fontSize="0.85rem"
          color="gray.500"
          fontWeight={700}
          mb={4}
        >
          Select one or more
        </Text>

        <VStack
          align="stretch"
          spacing={4}
          userSelect={hasValidAnswers || hasInvalidAnswers ? "none" : null}
          pointerEvents={hasValidAnswers || hasInvalidAnswers ? "none" : null}
        >
          {answers.map(({ id, text, image }) => (
            <Answer
              key={id}
              isValid={validAnswers.includes(id)}
              isInvalid={invalidAnswers.includes(id)}
              onChange={() => selectAnswer(id)}
            >
              <VStack align="stretch" justify="stretch" spacing={4}>
                {text && <Text>{text}</Text>}
                {image && (
                  <Box>
                    <Image src={image} alt="" width={400} height={350} />
                  </Box>
                )}
              </VStack>
            </Answer>
          ))}
        </VStack>

        <Box mt="auto!important">
          <VStack mt={4} align="stretch" justify="stretch" spacing={4}>
            {hasInvalidAnswers && (
              <VStack ml={12} align="flex-start" spacing={1}>
                <HStack>
                  <Box as="span">😭 </Box>
                  <Text
                    fontSize="0.85rem"
                    fontWeight={700}
                    color="red.400"
                    textTransform="uppercase"
                  >
                    Incorrect Answer(s)
                  </Text>
                </HStack>
                <Text>Not quite. You need to distinguish customer needs.</Text>
              </VStack>
            )}
            <HStack align="stretch" justify="stretch">
              <IconButton
                aria-label="Previous Question"
                icon={<PrevIcon />}
                colorScheme="yellow"
                isDisabled={!prevQuestion}
                onClick={viewPrevQuestion}
              />
              <Button
                flex={1}
                onClick={continueOrChange}
                isLoading={isSubmitting}
                textTransform="uppercase"
                colorScheme="yellow"
                loadingText="Submitting Answer"
              >
                {hasInvalidAnswers
                  ? "Change Answers"
                  : hasValidAnswers
                  ? "Continue"
                  : "Submit"}
              </Button>
            </HStack>
          </VStack>
        </Box>
      </VStack>
    </HStack>
  );
};

export default QuestionWizardItem;
