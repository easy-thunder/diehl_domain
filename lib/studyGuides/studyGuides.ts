import {kubernetesQuestions} from "./kubernetesQuestionsV1";
import { kubernetesQuestionsTwo } from "./kubernetesQuestionsV2";
const allQuestionSets = {
  kubernetesV1: {
    title: "Kubernetes Quiz 1",
    questions: kubernetesQuestions,
  },
  kubernetesV2: {
    title: "Kubernetes Quiz 2",
    questions: kubernetesQuestionsTwo,
  },
};

export default allQuestionSets;