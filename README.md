# StreamingApp — Container Orchestration Assignment

## 67-Step Implementation Guide

> **AWS Region:** `ap-south-1`  
> **Kubernetes Namespace:** `streamingapp`  
> **ECR Registry:** `508564775932.dkr.ecr.ap-south-1.amazonaws.com`

This README documents the end-to-end implementation of the StreamingApp container orchestration assignment, including Docker images, Amazon ECR, Amazon EKS, Kubernetes, AWS Load Balancer Controller/ALB ingress, Helm conversion, deployment and verification.

---

## 1. Project Overview

StreamingApp is a multi-service web application deployed as Docker containers and orchestrated using Kubernetes on Amazon EKS.

The application contains:

- Auth service
- Streaming service
- Admin service
- Chat service
- Frontend

---

## 2. Objectives

The assignment demonstrates:

- Containerization with Docker
- Local Docker Compose execution
- Amazon ECR image storage
- Amazon EKS cluster creation
- Kubernetes Deployments and Services
- ALB-based Ingress routing
- Frontend/API integration
- Helm chart packaging and deployment
- Application verification and troubleshooting

---

## 3. Technology Stack

- Docker / Docker Compose
- Kubernetes
- Amazon EKS
- Amazon ECR
- AWS Application Load Balancer
- Helm
- kubectl
- eksctl
- AWS CLI
- Node.js / React frontend and backend services

---

## 4. AWS Region

Use:

```cmd
aws configure set region ap-south-1
```

📸 **Screenshot – Step 4: AWS region configuration**

> Add screenshot here.

---

## 5. Verify AWS CLI

```cmd
aws --version
aws sts get-caller-identity
aws configure get region
```

📸 **Screenshot – Step 5: AWS CLI verification**

> Add screenshot here.

---

## 6. Verify Docker

```cmd
docker --version
docker compose version
docker info
```

📸 **Screenshot – Step 6: Docker verification**

> Add screenshot here.

---

## 7. Verify kubectl

```cmd
kubectl version --client
```

📸 **Screenshot – Step 7: kubectl verification**

> Add screenshot here.

---

## 8. Verify Helm

```cmd
helm version
```

📸 **Screenshot – Step 8: Helm verification**

> Add screenshot here.

---

## 9. Verify eksctl

```cmd
eksctl version
```

📸 **Screenshot – Step 9: eksctl verification**

> Add screenshot here.

---

## 10. Open the Project

```cmd
cd /d "H:\Vlearn-Herovired\aws\Orchestration&Scaling\StreamingApp (orchestration-assignment)"
```

📸 **Screenshot – Step 10: Project directory**

> Add screenshot here.

---

## 11. Project Structure

Typical structure:

```text
StreamingApp/
├── auth-service/
├── admin-service/
├── streaming-service/
├── chat-service/
├── frontend/
├── k8s/
├── helm/
├── docker-compose.yml
└── README.md
```

📸 **Screenshot – Step 11: Project structure**

> Add screenshot here.

---

## 12. Review Dockerfiles

Review each service Dockerfile and confirm that every application can be built independently.

```cmd
dir /S /B Dockerfile
```

📸 **Screenshot – Step 12: Dockerfiles**

> Add screenshot here.

---

## 13. Build Docker Images

Build the application images using the project's Docker Compose configuration:

```cmd
docker compose build
```

Verify:

```cmd
docker images
```

📸 **Screenshot – Step 13: Docker image build**

> Add screenshot here.

---

## 14. Run Locally

```cmd
docker compose up -d
```

Verify:

```cmd
docker compose ps
```

📸 **Screenshot – Step 14: Local containers**

> Add screenshot here.

---

## 15. Local Verification

Check application endpoints and frontend locally according to the project's Docker Compose port mappings.

```cmd
docker compose ps
```

📸 **Screenshot – Step 15: Local application verification**

> Add screenshot here.

---

## 16. Stop Local Containers

```cmd
docker compose down
```

📸 **Screenshot – Step 16: Docker Compose shutdown**

> Add screenshot here.

---

## 17. Create ECR Repositories

Create repositories for each application image:

```cmd
aws ecr create-repository --repository-name streamingapp/auth-service --region ap-south-1
aws ecr create-repository --repository-name streamingapp/admin-service --region ap-south-1
aws ecr create-repository --repository-name streamingapp/streaming-service --region ap-south-1
aws ecr create-repository --repository-name streamingapp/chat-service --region ap-south-1
aws ecr create-repository --repository-name streamingapp/frontend --region ap-south-1
```

📸 **Screenshot – Step 17: ECR repositories**

> Add screenshot here.

---

## 18. ECR Docker Login

```cmd
aws ecr get-login-password --region ap-south-1 | docker login --username AWS --password-stdin 508564775932.dkr.ecr.ap-south-1.amazonaws.com
```

📸 **Screenshot – Step 18: ECR login**

> Add screenshot here.

---

## 19. Tag Auth Image

```cmd
docker tag streamingapp/auth-service:1 508564775932.dkr.ecr.ap-south-1.amazonaws.com/streamingapp/auth-service:1
```

📸 **Screenshot – Step 19**

> Add screenshot here.

---

## 20. Tag Admin Image

```cmd
docker tag streamingapp/admin-service:1 508564775932.dkr.ecr.ap-south-1.amazonaws.com/streamingapp/admin-service:1
```

📸 **Screenshot – Step 20**

> Add screenshot here.

---

## 21. Tag Streaming Image

```cmd
docker tag streamingapp/streaming-service:1 508564775932.dkr.ecr.ap-south-1.amazonaws.com/streamingapp/streaming-service:1
```

📸 **Screenshot – Step 21**

> Add screenshot here.

---

## 22. Tag Chat Image

```cmd
docker tag streamingapp/chat-service:1 508564775932.dkr.ecr.ap-south-1.amazonaws.com/streamingapp/chat-service:1
```

📸 **Screenshot – Step 22**

> Add screenshot here.

---

## 23. Tag Frontend Image

```cmd
docker tag streamingapp/frontend:1 508564775932.dkr.ecr.ap-south-1.amazonaws.com/streamingapp/frontend:1
```

📸 **Screenshot – Step 23**

> Add screenshot here.

---

## 24. Push Auth Image

```cmd
docker push 508564775932.dkr.ecr.ap-south-1.amazonaws.com/streamingapp/auth-service:1
```

📸 **Screenshot – Step 24**

> Add screenshot here.

---

## 25. Push Admin Image

```cmd
docker push 508564775932.dkr.ecr.ap-south-1.amazonaws.com/streamingapp/admin-service:1
```

📸 **Screenshot – Step 25**

> Add screenshot here.

---

## 26. Push Streaming Image

```cmd
docker push 508564775932.dkr.ecr.ap-south-1.amazonaws.com/streamingapp/streaming-service:1
```

📸 **Screenshot – Step 26**

> Add screenshot here.

---

## 27. Push Chat Image

```cmd
docker push 508564775932.dkr.ecr.ap-south-1.amazonaws.com/streamingapp/chat-service:1
```

📸 **Screenshot – Step 27**

> Add screenshot here.

---

## 28. Push Frontend Image

```cmd
docker push 508564775932.dkr.ecr.ap-south-1.amazonaws.com/streamingapp/frontend:1
```

📸 **Screenshot – Step 28**

> Add screenshot here.

---

## 29. Verify ECR Images

```cmd
aws ecr describe-repositories --region ap-south-1
aws ecr list-images --repository-name streamingapp/auth-service --region ap-south-1
aws ecr list-images --repository-name streamingapp/admin-service --region ap-south-1
aws ecr list-images --repository-name streamingapp/streaming-service --region ap-south-1
aws ecr list-images --repository-name streamingapp/chat-service --region ap-south-1
aws ecr list-images --repository-name streamingapp/frontend --region ap-south-1
```

📸 **Screenshot – Step 29: ECR images**

> Add screenshot here.

---

## 30. Prepare EKS Cluster Configuration

Create or review the EKS cluster configuration used by the assignment.

Example validation command:

```cmd
eksctl create cluster -f k8s/cluster.yaml --dry-run
```

📸 **Screenshot – Step 30: EKS cluster configuration**

> Add screenshot here.

---

## 31. Validate EKS Configuration

```cmd
eksctl create cluster -f k8s/cluster.yaml --dry-run
```

If AWS credentials are expired, refresh the AWS session before continuing.

```cmd
aws sts get-caller-identity
```

📸 **Screenshot – Step 31: EKS validation**

> Add screenshot here.

---

## 32. Create the EKS Cluster

```cmd
eksctl create cluster -f k8s/cluster.yaml
```

📸 **Screenshot – Step 32: EKS cluster creation**

> Add screenshot here.

---

## 33. Update kubeconfig

```cmd
aws eks update-kubeconfig --region ap-south-1 --name <EKS-CLUSTER-NAME>
```

📸 **Screenshot – Step 33: kubeconfig update**

> Add screenshot here.

---

## 34. Verify EKS Nodes

```cmd
kubectl get nodes
```

📸 **Screenshot – Step 34: EKS nodes**

> Add screenshot here.

---

## 35. Create/Verify Namespace

```cmd
kubectl create namespace streamingapp --dry-run=client -o yaml | kubectl apply -f -
```

Verify:

```cmd
kubectl get namespace streamingapp
```

📸 **Screenshot – Step 35: Namespace**

> Add screenshot here.

---

## 36. Review ConfigMap and Secret

Verify the application configuration used by the Kubernetes manifests.

```cmd
kubectl get configmap -n streamingapp
kubectl get secret -n streamingapp
```

📸 **Screenshot – Step 36: ConfigMap and Secret**

> Add screenshot here.

---

## 37. Apply Application Configuration

Apply the project's configuration resources, if they are maintained separately from the deployments.

```cmd
kubectl apply -f k8s/ -n streamingapp
```

> If using Helm exclusively, apply only the required non-Helm configuration and avoid creating duplicate application resources.

📸 **Screenshot – Step 37: Kubernetes configuration**

> Add screenshot here.

---

## 38. Deploy Auth Service

```cmd
kubectl apply -f k8s/auth.yaml -n streamingapp
```

📸 **Screenshot – Step 38: Auth deployment**

> Add screenshot here.

---

## 39. Deploy Admin Service

```cmd
kubectl apply -f k8s/admin.yaml -n streamingapp
```

📸 **Screenshot – Step 39: Admin deployment**

> Add screenshot here.

---

## 40. Deploy Streaming Service

```cmd
kubectl apply -f k8s/streaming.yaml -n streamingapp
```

📸 **Screenshot – Step 40: Streaming deployment**

> Add screenshot here.

---

## 41. Deploy Chat Service

```cmd
kubectl apply -f k8s/chat.yaml -n streamingapp
```

📸 **Screenshot – Step 41: Chat deployment**

> Add screenshot here.

---

## 42. Deploy Frontend

```cmd
kubectl apply -f k8s/frontend.yaml -n streamingapp
```

📸 **Screenshot – Step 42: Frontend deployment**

> Add screenshot here.

---

## 43. Verify Pods

```cmd
kubectl get pods -n streamingapp -o wide
```

All application pods should eventually show `Running` and `READY` as expected.

📸 **Screenshot – Step 43: Pods running**

> Add screenshot here.

---

## 44. Verify Services

```cmd
kubectl get svc -n streamingapp
```

Expected application services include:

- `auth` — 3001
- `streaming` — 3002
- `admin` — 3003
- `chat` — 3004
- `frontend` — 80

📸 **Screenshot – Step 44: Services**

> Add screenshot here.

---

## 45. Verify Deployments

```cmd
kubectl get deployments -n streamingapp
```

📸 **Screenshot – Step 45: Deployments**

> Add screenshot here.

---

## 46. Check Application Logs

Example:

```cmd
kubectl logs deployment/auth -n streamingapp
kubectl logs deployment/streaming -n streamingapp
kubectl logs deployment/admin -n streamingapp
kubectl logs deployment/chat -n streamingapp
kubectl logs deployment/frontend -n streamingapp
```

📸 **Screenshot – Step 46: Application logs**

> Add screenshot here.

---

## 47. Troubleshoot Pods if Required

```cmd
kubectl describe pod <POD-NAME> -n streamingapp
kubectl get events -n streamingapp --sort-by=.lastTimestamp
```

For image pull issues, verify ECR repository names, tags, node permissions and AWS region.

📸 **Screenshot – Step 47: Troubleshooting**

> Add screenshot here.

---

## 48. Configure ALB Ingress

The application ingress routes:

```text
/api/auth       -> auth:3001
/api/streaming  -> streaming:3002
/api/admin      -> admin:3003
/api/chat       -> chat:3004
/               -> frontend:80
```

📸 **Screenshot – Step 48: Ingress configuration**

> Add screenshot here.

---

## 49. Apply Ingress

```cmd
kubectl apply -f k8s/ingress.yaml -n streamingapp
```

📸 **Screenshot – Step 49: Ingress applied**

> Add screenshot here.

---

## 50. Verify Ingress

```cmd
kubectl get ingress -n streamingapp
kubectl describe ingress streamingapp-ingress -n streamingapp
```

📸 **Screenshot – Step 50: Ingress verification**

> Add screenshot here.

---

## 51. Verify AWS Application Load Balancer

Wait for the Ingress ADDRESS/hostname to be populated:

```cmd
kubectl get ingress streamingapp-ingress -n streamingapp -w
```

📸 **Screenshot – Step 51: ALB hostname**

> Add screenshot here.

---

## 52. Verify Frontend Through ALB

Open the ALB URL in a browser.

Example:

```text
http://<ALB-DNS-NAME>/
```

📸 **Screenshot – Step 52: StreamingApp frontend**

> Add screenshot here.

---

## 53. Verify Auth API

```text
http://<ALB-DNS-NAME>/api/auth
```

Use the application's supported authentication endpoint as defined by the service.

📸 **Screenshot – Step 53: Auth API**

> Add screenshot here.

---

## 54. Verify Streaming API

```text
http://<ALB-DNS-NAME>/api/streaming
```

📸 **Screenshot – Step 54: Streaming API**

> Add screenshot here.

---

## 55. Verify Admin API

```text
http://<ALB-DNS-NAME>/api/admin
```

📸 **Screenshot – Step 55: Admin API**

> Add screenshot here.

---

## 56. Verify Chat API

```text
http://<ALB-DNS-NAME>/api/chat
```

📸 **Screenshot – Step 56: Chat API**

> Add screenshot here.

---

## 57. Verify Frontend API Configuration

Confirm that the frontend does not still point to localhost for deployed API calls.

Search the source:

```cmd
findstr /S /N /I "STREAMING_API_URL" frontend\*.js frontend\*.jsx frontend\*.ts frontend\*.tsx
```

The deployed configuration should use the ALB/API URL appropriate for the application.

📸 **Screenshot – Step 57: Frontend API configuration**

> Add screenshot here.

---

# Helm Deployment

## 58. Helm Chart Structure

Recommended structure:

```text
helm/
└── streamingapp/
    ├── Chart.yaml
    ├── values.yaml
    └── templates/
        ├── auth.yaml
        ├── admin.yaml
        ├── streaming.yaml
        ├── chat.yaml
        ├── frontend.yaml
        └── ingress.yaml
```

📸 **Screenshot – Step 58: Helm chart structure**

> Add screenshot here.

---

## 59. Chart.yaml

Example:

```yaml
apiVersion: v2
name: streamingapp
description: StreamingApp Kubernetes deployment
version: 0.1.0
appVersion: "1.0"
```

📸 **Screenshot – Step 59: Chart.yaml**

> Add screenshot here.

---

## 60. values.yaml

Centralize configurable values such as namespace, ECR registry, image repositories/tags, services, resources and ingress settings.

Example base values:

```yaml
namespace: streamingapp

imageRegistry: 508564775932.dkr.ecr.ap-south-1.amazonaws.com

configMap:
  name: streamingapp-config

secret:
  name: streamingapp-secret
```

📸 **Screenshot – Step 60: values.yaml**

> Add screenshot here.

---

## 61. Convert Kubernetes Manifests to Helm Templates

Convert the working Kubernetes resources into parameterized Helm templates.

Templates:

```text
helm/streamingapp/templates/auth.yaml
helm/streamingapp/templates/admin.yaml
helm/streamingapp/templates/streaming.yaml
helm/streamingapp/templates/chat.yaml
helm/streamingapp/templates/frontend.yaml
helm/streamingapp/templates/ingress.yaml
```

Use expressions such as:

```text
{{ .Values.auth.image.repository }}
{{ .Values.auth.image.tag }}
{{ .Values.auth.service.port }}
```

📸 **Screenshot – Step 61: Helm templates**

> Add screenshot here.

---

## 62. Helm Lint

```cmd
helm lint helm/streamingapp
```

The chart should report a successful lint result.

📸 **Screenshot – Step 62: helm lint**

> Add screenshot here.

---

## 63. Render Helm Templates

```cmd
helm template streamingapp helm/streamingapp > rendered.yaml
```

Inspect:

```cmd
findstr /N /I "streamingapp-ingress api/auth api/streaming api/admin api/chat frontend" rendered.yaml
```

📸 **Screenshot – Step 63: Rendered Helm YAML**

> Add screenshot here.

---

## 64. Install or Upgrade Helm Release

```cmd
helm upgrade --install streamingapp helm/streamingapp --namespace streamingapp --create-namespace
```

Verify:

```cmd
helm list -n streamingapp
```

📸 **Screenshot – Step 64: Helm deployment**

> Add screenshot here.

---

## 65. Verify Helm-Managed Resources

```cmd
helm status streamingapp -n streamingapp
kubectl get all -n streamingapp
kubectl get ingress -n streamingapp
```

If an existing resource was created by `kubectl` and Helm reports ownership conflicts, remove only the conflicting application resource and rerun the Helm deployment. Do not delete the namespace unnecessarily.

📸 **Screenshot – Step 65: Helm-managed resources**

> Add screenshot here.

---

## 66. Final Application Verification

Run:

```cmd
kubectl get pods -n streamingapp
kubectl get svc -n streamingapp
kubectl get ingress -n streamingapp
helm status streamingapp -n streamingapp
```

Then verify the frontend and API routes through the ALB URL.

📸 **Screenshot – Step 66: Final application verification**

> Add screenshot here.

---

## 67. Final Evidence and Submission

Capture final evidence showing:

1. EKS cluster/nodes
2. ECR repositories and images
3. Kubernetes pods
4. Kubernetes services
5. Helm release
6. Ingress and ALB DNS
7. Frontend application running through ALB
8. API verification
9. Helm chart structure
10. `helm lint` success
11. `helm template` output
12. Final `helm status`

📸 **Screenshot – Step 67: Final submission evidence**

> Add screenshot here.

---

# Architecture Overview

```text
                         Internet
                            |
                            v
                 AWS Application Load Balancer
                            |
                       Kubernetes Ingress
                            |
          +-----------------+------------------+
          |                 |                  |
          v                 v                  v
      Frontend          Backend APIs       Backend APIs
        :80          auth/streaming       admin/chat
                         :3001-3004
                            |
                            v
                       Application DB
```

---

# Helm Architecture

```text
helm/streamingapp/
|
+-- Chart.yaml
+-- values.yaml
|
+-- templates/
    +-- auth.yaml
    +-- admin.yaml
    +-- streaming.yaml
    +-- chat.yaml
    +-- frontend.yaml
    +-- ingress.yaml
```

Helm provides repeatable installation and allows environment-specific configuration through `values.yaml`.

---

# ECR Images

| Service | Repository | Tag |
|---|---|---|
| Auth | `streamingapp/auth-service` | `1` |
| Admin | `streamingapp/admin-service` | `1` |
| Streaming | `streamingapp/streaming-service` | `1` |
| Chat | `streamingapp/chat-service` | `1` |
| Frontend | `streamingapp/frontend` | `1` |

---

# Useful Verification Commands

```cmd
aws sts get-caller-identity
kubectl get nodes
kubectl get pods -n streamingapp
kubectl get svc -n streamingapp
kubectl get ingress -n streamingapp
helm list -n streamingapp
helm status streamingapp -n streamingapp
```

---

# Common Troubleshooting

## AWS ExpiredToken

If you see:

```text
ExpiredToken: The security token included in the request is expired
```

Refresh the AWS credentials/session and verify:

```cmd
aws sts get-caller-identity
```

Then refresh kubeconfig:

```cmd
aws eks update-kubeconfig --region ap-south-1 --name <EKS-CLUSTER-NAME>
```

## Kubernetes Unauthorized

```cmd
aws sts get-caller-identity
aws eks update-kubeconfig --region ap-south-1 --name <EKS-CLUSTER-NAME>
kubectl get nodes
```

## Helm Resource Ownership Conflict

Typical error:

```text
exists and cannot be imported into the current release
```

Inspect the conflicting resource and, when appropriate, delete only that old resource before reinstalling/upgrading the Helm release.

Example:

```cmd
kubectl delete ingress streamingapp-ingress -n streamingapp
helm upgrade --install streamingapp helm/streamingapp -n streamingapp --create-namespace
```

## Pods Not Starting

```cmd
kubectl get pods -n streamingapp
kubectl describe pod <POD-NAME> -n streamingapp
kubectl logs <POD-NAME> -n streamingapp
kubectl get events -n streamingapp --sort-by=.lastTimestamp
```

## ImagePullBackOff

Check:

- ECR repository name
- Image tag
- ECR region
- Node IAM permissions
- Image existence in ECR

## Ingress Has No Address

```cmd
kubectl describe ingress streamingapp-ingress -n streamingapp
kubectl get events -n streamingapp --sort-by=.lastTimestamp
```

Also verify that the AWS Load Balancer Controller is installed and healthy.

---

# Screenshot Naming Convention

Recommended names:

```text
screenshots/
├── step-04-aws-region.png
├── step-05-aws-cli.png
├── step-13-docker-build.png
├── step-17-ecr-repositories.png
├── step-29-ecr-images.png
├── step-32-eks-cluster.png
├── step-34-eks-nodes.png
├── step-43-pods.png
├── step-44-services.png
├── step-50-ingress.png
├── step-51-alb.png
├── step-52-frontend.png
├── step-58-helm-structure.png
├── step-62-helm-lint.png
├── step-63-helm-template.png
├── step-64-helm-deployment.png
├── step-66-final-verification.png
└── step-67-submission.png
```

Replace each placeholder with Markdown such as:

```markdown
![Step 32 – EKS cluster creation](screenshots/step-32-eks-cluster.png)
```

---

# Final Submission Checklist

- [ ] Docker images build successfully
- [ ] Application runs locally
- [ ] ECR repositories created
- [ ] All five images pushed to ECR
- [ ] EKS cluster created
- [ ] kubeconfig configured
- [ ] Kubernetes nodes are Ready
- [ ] Namespace `streamingapp` exists
- [ ] All application pods are Running/Ready
- [ ] Services are available
- [ ] ALB Ingress is configured
- [ ] ALB DNS is available
- [ ] Frontend opens through ALB
- [ ] Backend routes are verified
- [ ] Helm chart created
- [ ] `helm lint` succeeds
- [ ] `helm template` succeeds
- [ ] Helm release is installed
- [ ] Final screenshots added
- [ ] README submitted with the assignment

---

# Cleanup

When the assignment/demo is complete, clean up AWS resources to avoid unnecessary charges.

For Helm:

```cmd
helm uninstall streamingapp -n streamingapp
```

Delete the EKS cluster only when you are completely finished:

```cmd
eksctl delete cluster --name <EKS-CLUSTER-NAME> --region ap-south-1
```

ECR repositories can also be removed when no longer required.

---

# Conclusion

The StreamingApp assignment demonstrates a complete container-to-cloud orchestration workflow: application containers are built with Docker, stored in Amazon ECR, deployed to Amazon EKS with Kubernetes, exposed through an AWS Application Load Balancer, and finally packaged into a reusable Helm chart.

The screenshot placeholders in this README are intentionally left empty so the actual evidence from the completed environment can be added later.
