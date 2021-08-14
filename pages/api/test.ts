import { NextApiRequest, NextApiResponse } from "next";
import testMock from "mocks/test.json";
import omit from "lodash/omit";

export default (req: NextApiRequest, res: NextApiResponse) => {
  let response;

  switch (req.method) {
    case "POST":
      try {
        const { id: questionId, answers: answerIds = [] } = req.body || {};
        if (!questionId) {
          throw new Error("Question `id` is required");
        }

        const currentQuestion = testMock.data.find(
          ({ id }) => id === questionId
        );
        if (!currentQuestion) {
          throw new Error("Invalid question `id`");
        }

        const correctAnswers = currentQuestion.answers
          .filter(({ isValid }) => isValid)
          .map(({ id }) => id);

        const valid: string[] = [];
        const invalid: string[] = [];

        for (const answerId of answerIds) {
          const answer = currentQuestion.answers.find(
            (item) => item.id === answerId
          );

          if (!answer) {
            throw new Error(`Answer id \`${answerId}\` doesn't exists`);
          }

          if (correctAnswers.includes(answerId)) {
            valid.push(answerId);
          } else {
            invalid.push(answerId);
          }
        }

        res.status(200).json({
          valid,
          invalid,
        });
      } catch (err) {
        console.error(err);
        res.status(500).json({
          message: err.message,
        });
      }
      break;

    case "GET":
      response = {
        data: testMock.data.map((item) => ({
          ...item,
          answers: item.answers.map((item) => omit(item, ["isValid"])),
        })),
      };
      res.status(200).json(response);
      break;
  }
};
