
const questions = [
    {
        id: "concept-nodeport-service",
        prompt: "CONCEPT: A type of service that exposes a pod on a static port on each node's IP, allowing access from outside the cluster",
        answer: "node port service",
        hint: ["node port service", "load balancer", "cluster ip", "external name"],
    },
    {
        id: "concept-clusterip-service",
        prompt: "CONCEPT: A type of service that exposes a pod on an internal IP, only accessible within the cluster. Allows your front end to access backend and back end to access database.",
        answer: "cluster ip",
        hint: ["cluster ip", "node port service", "load balancer", "external name"],
    },
    {
        id: "concept-loadbalancer-service",
        prompt: "CONCEPT: A service that exposes an application to the internet using a cloud provider's external load balancer",
        answer: "load balancer",
        hint: ["load balancer", "cluster ip", "node port service", "ingress"],
    },
    {
        id: "concept-target-port",
        prompt: "CONCEPT: In a Kubernetes service, this specifies the port on the pod that the service should forward traffic to.",
        answer: "target port",
        hint: ["target port", "node port", "container port", "entry port"],
    },
    {
    id: "concept-target-port",
    prompt: "CONCEPT: What is the port called on the node-service.",
    answer: "port",
    hint: ["port", "node port", "container port", "entry port"],
    },
    {
        id: "concept-target-port",
        prompt: "CONCEPT: What is the port called on the node?",
        answer: "node port",
        hint: ["node port", "node port", "container port", "entry port"],
    },
    {
        id: "yaml-kind-nodeport",
        prompt: "YAML: What is the kind used in a YAML file to define a NodePort service?",
        answer: "service",
        hint: ["service", "nodeport", "deployment", "expose"],
    },
    {
        id: "yaml-spec-nodeport-type",
        prompt: "YAML: What value do we use for 'type' in the service spec to expose it as a NodePort?",
        answer: "NodePort",
        hint: ["NodePort", "ClusterIP", "LoadBalancer", "ExternalName"],
    },
    {
        id: "yaml-service-port-fields-meaning",
        prompt: "YAML: If your targetPort is 80 and nodePort is 30008, what are targetPort, port, and nodePort in your service spec? (Separate with commas in that order)",
        answer: "targetPort: 80, port: 80, nodePort: 30008",
        hint: [
          "targetPort: 80, port: 80, nodePort: 30008",
          "targetPort: 8080, port: 80, nodePort: 30000",
          "targetPort: 80, port: 30000, nodePort: 80",
          "targetPort: 3000, port: 80, nodePort: 31000"
        ],
    },
    {
        id: "concept-nodeport-range",
        prompt: "CONCEPT: What is the valid port range for NodePort services in Kubernetes?",
        answer: "30000-32767",
        hint: ["30000-32767", "20000-29999", "1000-1999", "32768-65535"],
    },
    {
        id: "yaml-service-selector-myapp",
        prompt: "YAML: Within spec.selector, how do you select all apps that have the metadata label 'myapp'?",
        answer: "app: myapp",
        hint: ["app: myapp", "name: myapp", "label: app=myapp", "selector: myapp"],
    },
    {
        id: "concept-selector-true-false-reversed",
        prompt: "CONCEPT: True or False — A NodePort service with selector app: myapp, tier: frontend, and env: production will select a pod with only the label app: myapp.",
        answer: "false",
        hint: ["true", "false"],
    },
    {
        id: "concept-selector-true-false",
        prompt: "CONCEPT: True or False — A NodePort service with selector app: myapp will select a pod with labels app: myapp, tier: frontend, and env: production.",
        answer: "true",
        hint: ["true", "false"],
    },
    {
        id: "terminal-get-service-url",
        prompt: "TERMINAL: After creating a new service called myapp-service, how can you get the URL to access it?",
        answer: "minikube service myapp-service --url",
        hint: [
          "kubectl get service",
          "kubectl describe service",
          "minikube service myapp-service --url",
          "minikube expose service"
        ],
      },
      {
        id: "yaml-service-type-clusterip",
        prompt: "YAML: What type do you put in spec to create a ClusterIP service?",
        answer: "ClusterIP",
        hint: ["ClusterIP", "NodePort", "LoadBalancer", "InternalIP"],
      },
      {
        id: "yaml-port-targetport-values",
        prompt: "YAML: If the container runs on port 8080 and the service is exposed on port 80, what should your targetPort and port be set to respectively?",
        answer: "targetPort: 8080, port: 80",
        hint: [
          "port: 80, targetPort: 8080",
          "targetPort: 8080, port: 80",
          "targetPort: 80, port: 8080",
          "targetPort: 8081, port: 80"
        ],
      },
      {
        id: "docker-run-voting-app",
        prompt: "TERMINAL: What docker command runs the voting-app on port 5000 and maps it to container port 80?",
        answer: "docker run -d --name=vote -p 5000:80 voting-app",
        hint: [
          "docker run -d --name=vote -p 5000:80 result-app",
          "docker run -d --name=vote -p 5000:80 voting-app",
          "docker run voting-app",
          "docker build voting-app"
        ],
      },
      {
        id: "docker-run-result-app",
        prompt: "TERMINAL: What docker command runs the result-app on port 5001 and maps it to container port 80?",
        answer: "docker run -d --name=result -p 5001:80 result-app",
        hint: [
          "docker run -d --name=result -p 5001:80 result-app",
          "docker start result-app",
          "docker build result-app",
          "docker run -p 80:5001 result-app"
        ],
      },
      {
        id: "docker-run-postgres",
        prompt: "TERMINAL: What docker command runs a postgres container with a name of 'db'?",
        answer: "docker run -d --name=db postgres",
        hint: [
          "docker run -d --name=db postgres",
          "docker build postgres",
          "docker pull postgres",
          "docker run postgres-db"
        ],
      },
      {
        id: "docker-run-redis",
        prompt: "TERMINAL: What docker command runs a redis container in detached mode named 'redis'?",
        answer: "docker run -d --name=redis redis",
        hint: [
          "docker run redis",
          "docker run -d --name=redis redis",
          "docker redis run",
          "docker build redis"
        ],
      },
      {
        id: "docker-run-worker",
        prompt: "TERMINAL: What docker command runs a container named 'worker' using an image called 'worker'?",
        answer: "docker run -d --name=worker worker",
        hint: [
          "docker start worker",
          "docker run -d --name=worker worker",
          "docker build worker",
          "docker run worker:latest"
        ],
      },
      {
        id: "docker-link-redis-voting",
        prompt: "TERMINAL: How could you connect the redis container to the voting-app container using --link (even though it's deprecated)?",
        answer: "docker run -d --name=vote --link redis:redis -p 5000:80 voting-app",
        hint: [
          "docker run -d --name=vote --link redis:redis -p 5000:80 voting-app",
          "docker build --link redis voting-app",
          "docker run -d --name=vote -p 5000:80 redis",
          "docker connect redis vote"
        ],
      },
      {
        id: "concept-deployment-needs-pod",
        prompt: "CONCEPT: True or False — In Kubernetes, a deployment requires a separate pod definition outside of the deployment spec.",
        answer: "false",
        hint: ["true", "false"],
      },

  ];


  export const kubernetesQuestionsThree = questions









