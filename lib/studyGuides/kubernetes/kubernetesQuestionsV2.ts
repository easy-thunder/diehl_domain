
const questions = [
    {
        id: "concept-replication-controller",
        prompt: "CONCEPT: Ensures a specified number of pod replicas are running at all times. Automatically replaces pods that fail or are deleted.",
        answer: "replication controller",
        hint: ["replica set", "scheduler","replication controller", "deployment"],
    },
    {
        id: "concept-rc-spec",
        prompt: "CONCEPT: In a ReplicationController spec, this section defines the pod template used to create replicas.",
        answer: "template",
        hint: ["template", "pod", "replica", "selector"],
    },
    {
        id: "concept-spec-replicas",
        prompt: "CONCEPT: Field in the ReplicationController spec that sets how many copies of a pod should be running.",
        answer: "replicas",
        hint: [ "count", "pods","replicas", "instances"],
      },
      {
        id: "concept-rc-existing-pod",
        prompt: "CONCEPT: True or False — The pod used in a ReplicationController must already exist before the controller can use it.",
        answer: "false",
        hint: ["true", "false"],
      },
      {
        id: "concept-imagepullbackoff",
        prompt: "CONCEPT: What does the ImagePullBackOff pod state mean?",
        answer: "kubernetes failed to pull the container image",
        hint: [
          "pod is terminated",
          "image was deleted from the disk",
          "container port is not exposed",
          "kubernetes failed to pull the container image"
        ],
      },
      {
        id: "concept-replicaset-apiversion",
        prompt: "CONCEPT: What apiVersion should be used with ReplicaSet objects?",
        answer: "apps/v1",
        hint: ["apps/v1", "v1", "batch/v1", "extensions/v1beta1"],
      },
      {
        id: "concept-replicaset",
        prompt: "CONCEPT: A newer controller that ensures the desired number of pod replicas using set-based selectors. Often used under Deployments.",
        answer: "replicaset",
        hint: ["replicaset", "replicationcontroller", "deployment", "autoscaler"],
      },
      {
        id: "concept-replicationcontroller",
        prompt: "CONCEPT: An older controller that ensures the desired number of pod replicas using simple label matching.",
        answer: "replicationcontroller",
        hint: ["replicationcontroller", "replicaset", "podcontroller", "scheduler"],
      },
      {
        id: "kubectl create rc",
        prompt: "TERMINAL: How can we create a ReplicationController using a file named rc-definition.yaml?",
        answer: "kubectl create -f rc-definition.yaml",
        hint: ["kubectl apply -f rc-definition.yaml", "kubectl create -f rc-definition.yaml", "kubectl build -f rc-definition.yaml", "kubectl deploy rc-definition.yaml"],
      },
      {
        id: "kubectl create yaml",
        prompt: "TERMINAL: What command creates a resource from a file named yamlfile.yaml?",
        answer: "kubectl create -f yamlfile.yaml",
        hint: ["kubectl apply -f yamlfile.yaml", "kubectl create -f yamlfile.yaml", "kubectl run yamlfile.yaml", "kubectl deploy yamlfile.yaml"],
      },
      {
        id: "concept-rollout-start",
        prompt: "CONCEPT: What is the first step to starting a new rollout in Kubernetes?",
        answer: "change the image tag in yaml",
        hint: ["change the image tag in yaml", "scale the pods", "apply a pod yaml", "delete old pods"],
      },
      {
        id: "kubectl apply yaml",
        prompt: "TERMINAL: What command applies changes from a YAML file named yamlfile.yaml to a resource? Second step in rollingout changes.",
        answer: "kubectl apply -f yamlfile.yaml",
        hint: ["kubectl apply -f yamlfile.yaml", "kubectl create -f yamlfile.yaml", "kubectl patch yamlfile.yaml", "kubectl edit yamlfile.yaml"],
      },
      {
        id: "concept-create-vs-apply",
        prompt: "CONCEPT: What is the difference between 'kubectl create' and 'kubectl apply'?",
        answer: "create fails if resource exists, apply updates if it does",
        hint: [
          "create fails if resource exists, apply updates if it does",
          "create deletes old resources, apply makes new ones",
          "apply only works on deployments",
          "create is used for debugging"
        ],
      },
      {
        id: "concept-rollout-strategy",
        prompt: "CONCEPT: Why do we use a rollout strategy in deployments when releasing a new version?",
        answer: "to avoid downtime and ensure a smooth transition",
        hint: [
          "to avoid downtime and ensure a smooth transition",
          "to delete old pods before new ones",
          "to run everything at once",
          "to reduce CPU usage"
        ],
      },
      {
        id: "kubectl rollout undo specific",
        prompt: "TERMINAL: What command rolls back a deployment named 'deploymentname-deployment'?",
        answer: "kubectl rollout undo deployment/deploymentname-deployment",
        hint: [
          "kubectl rollback deployment/deploymentname-deployment",
          "kubectl rollout undo deployment/deploymentname-deployment",
          "kubectl revert deployment/deploymentname-deployment",
          "kubectl undo deploy deploymentname-deployment"
        ],
      },
      {
        id: "concept-bad-image-rollout",
        prompt: "CONCEPT: What happens if you rollout a deployment with a bad image?",
        answer: "kubernetes deletes a pod and tries to create more, but they stay in crash state",
        hint: [
          "kubernetes deletes a pod and tries to create more, but they stay in crash state",
          "kubernetes reverts automatically",
          "nothing happens",
          "the image gets fixed on the fly"
        ],
      }
  ];


  export const kubernetesQuestionsTwo = questions