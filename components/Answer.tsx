import { FC, useState } from "react";
import { HStack, Checkbox, Box, Icon } from "@chakra-ui/react";
import {
  IoCheckmarkCircleSharp as ValidIcon,
  IoRemoveCircle as InvalidIcon,
} from "react-icons/io5";

type AnswerProps = {
  onChange?: (isChecked: boolean) => void;
  isValid?: boolean;
  isInvalid?: boolean;
};

const Answer: FC<AnswerProps> = ({
  isValid,
  isInvalid,
  children,
  onChange = () => {},
}) => {
  const [isChecked, setChecked] = useState(false);
  const handleChange = (isChecked: boolean) => {
    onChange(isChecked);
    setChecked(isChecked);
  };

  return (
    <HStack
      p={3}
      align="flex-start"
      justify="space-between"
      spacing={4}
      border="3px solid"
      color={isValid ? "green.500" : isInvalid ? "red.400" : null}
      borderColor={
        isValid
          ? "green.500"
          : isInvalid
          ? "red.400"
          : isChecked
          ? "blue.500"
          : "gray.200"
      }
      borderRadius="5px"
      cursor="pointer"
      onClick={() => handleChange(!isChecked)}
      _hover={!isChecked && { borderColor: "gray.300" }}
    >
      <Box>{children}</Box>
      {!isValid && !isInvalid && (
        <Checkbox mt={4} isChecked={isChecked} pointerEvents="none" />
      )}
      {isValid && <Icon w="22px" h="auto" color="green.500" as={ValidIcon} />}
      {isInvalid && <Icon w="22px" h="auto" color="red.400" as={InvalidIcon} />}
    </HStack>
  );
};

export default Answer;
