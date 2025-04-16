import {kubernetesQuestions} from "./kubernetes/kubernetesQuestionsV1";
import { kubernetesQuestionsTwo } from "./kubernetes/kubernetesQuestionsV2";
import { kubernetesQuestionsThree } from "./kubernetes/kubernetesQuestionsV3";

const allQuestionSets = {
  kubernetesV1: {
    title: "Kubernetes Quiz 1",
    currentQuizSet: "kubernetes",
    version: 1,
    questions: kubernetesQuestions,
  },
  kubernetesV2: {
    title: "Kubernetes Quiz 2",
    currentQuizSet: "kubernetes",
    version: 2,
    questions: kubernetesQuestionsTwo,
  },
  kubernetesV3: {  
    title: "Kubernetes Quiz 3 (Services and MicroServices)",
    currentQuizSet: "kubernetes",
    version: 3,
    questions: kubernetesQuestionsThree
  },

};

export default allQuestionSets;