import Head from "next/head";
import QuestionWiardView from "views/QuestionWizard";

export default function Homepage() {
  return (
    <>
      <Head>
        <title>Tomorrow Education Mini-app Test</title>
      </Head>
      <QuestionWiardView />
    </>
  );
}
