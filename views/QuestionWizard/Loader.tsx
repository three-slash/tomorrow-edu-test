import { FC } from "react";
import { HStack, VStack, Text, Box, Spinner } from "@chakra-ui/react";

const QuestionWizardLoader: FC = () => {
  return (
    <VStack align="center" justify="center" w="full" h="80vh" spacing={4}>
      <Spinner size="xl" />
      <HStack spacing={3} align="stretch">
        <Box as="span">👋</Box>
        <Text>hold still, we're picking up the questions...</Text>
      </HStack>
    </VStack>
  );
};

export default QuestionWizardLoader;
