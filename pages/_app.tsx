import { ChakraProvider } from "@chakra-ui/react";

import theme from "themes/default";
import { QuestionProvider } from "hooks/useQuestion";

function MyApp({ Component, pageProps }) {
  return (
    <QuestionProvider>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QuestionProvider>
  );
}

export default MyApp;
