# StreamingApp — Container Orchestration & Scaling on AWS EKS

![AWS](https://img.shields.io/badge/AWS-ap--south--1-orange)
![Docker](https://img.shields.io/badge/Docker-Containerized-blue)
![Kubernetes](https://img.shields.io/badge/Kubernetes-EKS-326CE5)
![Jenkins](https://img.shields.io/badge/Jenkins-CI-red)
![Amazon ECR](https://img.shields.io/badge/Amazon-ECR-orange)
![Helm](https://img.shields.io/badge/Helm-Kubernetes-0F1689)

## Project Overview

This project demonstrates the deployment of a containerized MERN-based Streaming Application using modern DevOps and container orchestration practices.

The application consists of multiple backend microservices, a React frontend, and MongoDB.

The implementation covers:

- Application containerization using Docker
- Local application validation using Docker Compose
- Amazon Elastic Container Registry (ECR)
- Jenkins CI/CD
- Amazon Elastic Kubernetes Service (EKS)
- Kubernetes Deployments and Services
- Kubernetes ConfigMaps and Secrets
- Health checks and probes
- Helm-based deployment
- Kubernetes scaling
- Rolling updates
- AWS Application Load Balancer
- Kubernetes Ingress
- Application verification
- Monitoring and logging
- Cost-conscious AWS deployment

---

# Architecture

```text
                         Developer
                             |
                             v
                      GitHub Repository
                             |
                             v
                          Jenkins
                         CI / CD
                             |
                             v
                    Amazon ECR (ap-south-1)
                             |
       +---------------------+---------------------+
       |          |          |          |          |
       v          v          v          v          v
     Auth     Streaming     Admin      Chat      Frontend
   Service     Service     Service    Service     Image
   :3001       :3002       :3003      :3004      nginx:80
       |          |          |          |          |
       +----------+----------+----------+----------+
                             |
                             v
                    Amazon EKS Cluster
                    streamingapp namespace
                             |
              +--------------+--------------+
              |                             |
              v                             v
        Kubernetes Services              MongoDB
              |                          :27017
              |
              v
        AWS Load Balancer
              |
              v
           Internet
```

---

# Application Services

| Service | Port | Purpose |
|---|---:|---|
| Auth Service | 3001 | Authentication and user management |
| Streaming Service | 3002 | Streaming functionality |
| Admin Service | 3003 | Administration APIs |
| Chat Service | 3004 | Chat and Socket.IO |
| Frontend | 3000 / 80 | React application |
| MongoDB | 27017 | Application database |

---

# AWS Region

All AWS resources used in this project are deployed in:

```text
ap-south-1
```

**AWS Region:** Mumbai, India

---

# PART 1 — Project Preparation

## Step 1 — Verify Git

```powershell
git --version
```

Expected:

```text
git version <version>
```

### Screenshot

```text
[SCREENSHOT 01 — Git version]
```

---

## Step 2 — Verify Docker

```powershell
docker --version
```

### Screenshot

```text
[SCREENSHOT 02 — Docker version]
```

---

## Step 3 — Verify Docker Compose

```powershell
docker compose version
```

### Screenshot

```text
[SCREENSHOT 03 — Docker Compose version]
```

---

## Step 4 — Verify AWS CLI

```powershell
aws --version
```

### Screenshot

```text
[SCREENSHOT 04 — AWS CLI version]
```

---

## Step 5 — Verify AWS Identity

```powershell
aws sts get-caller-identity
```

This confirms that the AWS CLI is authenticated.

### Screenshot

```text
[SCREENSHOT 05 — AWS STS identity]
```

---

# PART 2 — Clone the Application

## Step 6 — Create Project Directory

```powershell
C:
cd \
mkdir Projects
cd Projects
```

---

## Step 7 — Clone Repository

```powershell
git clone https://github.com/UnpredictablePrashant/StreamingApp.git
```

---

## Step 8 — Enter Project Directory

```powershell
cd StreamingApp
```

---

## Step 9 — Check Git Status

```powershell
git status
```

---

## Step 10 — Create Development Branch

```powershell
git checkout -b devops-assignment
```

Verify:

```powershell
git branch
```

### Screenshot

```text
[SCREENSHOT 06 — Git repository and branch]
```

---

# PART 3 — Application Configuration

## Step 11 — Inspect Project Structure

Expected major structure:

```text
StreamingApp/
├── backend/
│   ├── authService/
│   ├── streamingService/
│   ├── adminService/
│   └── chatService/
├── frontend/
├── docker-compose.yml
├── .env.example
├── .gitignore
└── README.md
```

### Screenshot

```text
[SCREENSHOT 07 — Project directory structure]
```

---

## Step 12 — Create Environment File

```powershell
Copy-Item .env.example .env
```

---

## Step 13 — Validate Docker Compose Configuration

```powershell
docker compose config
```

The configuration should be parsed successfully without YAML errors.

### Screenshot

```text
[SCREENSHOT 08 — Docker Compose configuration]
```

---

# PART 4 — Local Docker Deployment

## Step 14 — Start Application

```powershell
docker compose up --build
```

This builds and starts:

- MongoDB
- Auth Service
- Streaming Service
- Admin Service
- Chat Service
- Frontend

### Screenshot

```text
[SCREENSHOT 09 — Docker Compose startup]
```

---

## Step 15 — Open Second Terminal

Open another PowerShell window and execute:

```powershell
cd C:\Projects\StreamingApp
```

---

## Step 16 — Check Compose Services

```powershell
docker compose ps
```

### Screenshot

```text
[SCREENSHOT 10 — Docker Compose services]
```

---

## Step 17 — Check Running Containers

```powershell
docker ps
```

### Screenshot

```text
[SCREENSHOT 11 — Running Docker containers]
```

---

## Step 18 — Test Auth Service

```powershell
curl http://localhost:3001/health
```

Expected response should indicate that the service is healthy.

### Screenshot

```text
[SCREENSHOT 12 — Auth health check]
```

---

## Step 19 — Test Streaming Service

```powershell
curl http://localhost:3002/api/health
```

### Screenshot

```text
[SCREENSHOT 13 — Streaming health check]
```

---

## Step 20 — Test Chat Service

```powershell
curl http://localhost:3004/api/health
```

### Screenshot

```text
[SCREENSHOT 14 — Chat health check]
```

---

## Step 21 — Open Frontend

Open:

```text
http://localhost:3000
```

### Screenshot

```text
[SCREENSHOT 15 — StreamingApp frontend]
```

---

## Step 22 — Check Application Logs

```powershell
docker compose logs
```

---

## Step 23 — Check Auth Logs

```powershell
docker compose logs authService
```

---

## Step 24 — Check Streaming Logs

```powershell
docker compose logs streamingService
```

---

## Step 25 — Check Chat Logs

```powershell
docker compose logs chatService
```

---

## Step 26 — Stop Local Environment

Press:

```text
Ctrl + C
```

Then:

```powershell
docker compose down
```

---

# PART 5 — Build Docker Images

## Step 27 — Build Auth Service

```powershell
docker build `
  -t streamingapp/auth-service:local `
  ./backend/authService
```

---

## Step 28 — Build Streaming Service

```powershell
docker build `
  -t streamingapp/streaming-service:local `
  -f ./backend/streamingService/Dockerfile `
  ./backend
```

---

## Step 29 — Build Admin Service

```powershell
docker build `
  -t streamingapp/admin-service:local `
  -f ./backend/adminService/Dockerfile `
  ./backend
```

---

## Step 30 — Build Chat Service

```powershell
docker build `
  -t streamingapp/chat-service:local `
  -f ./backend/chatService/Dockerfile `
  ./backend
```

---

## Step 31 — Build Frontend

```powershell
docker build `
  -t streamingapp/frontend:local `
  ./frontend
```

---

## Step 32 — Verify Docker Images

```powershell
docker images | Select-String "streamingapp"
```

Expected images:

```text
streamingapp/auth-service
streamingapp/streaming-service
streamingapp/admin-service
streamingapp/chat-service
streamingapp/frontend
```

### Screenshot

```text
[SCREENSHOT 16 — Five Docker images]
```

---

# PART 6 — Configure AWS ECR

## Step 33 — Set AWS Region

```powershell
$env:AWS_REGION="ap-south-1"
```

---

## Step 34 — Get AWS Account ID

```powershell
$env:AWS_ACCOUNT_ID = aws sts get-caller-identity --query Account --output text
```

Verify:

```powershell
$env:AWS_ACCOUNT_ID
```

---

## Step 35 — Set ECR Registry

```powershell
$env:ECR_REGISTRY="$env:AWS_ACCOUNT_ID.dkr.ecr.$env:AWS_REGION.amazonaws.com"
```

Verify:

```powershell
$env:ECR_REGISTRY
```

---

## Step 36 — Create Auth ECR Repository

```powershell
aws ecr create-repository `
  --repository-name streamingapp/auth-service `
  --region $env:AWS_REGION
```

---

## Step 37 — Create Streaming ECR Repository

```powershell
aws ecr create-repository `
  --repository-name streamingapp/streaming-service `
  --region $env:AWS_REGION
```

---

## Step 38 — Create Admin ECR Repository

```powershell
aws ecr create-repository `
  --repository-name streamingapp/admin-service `
  --region $env:AWS_REGION
```

---

## Step 39 — Create Chat ECR Repository

```powershell
aws ecr create-repository `
  --repository-name streamingapp/chat-service `
  --region $env:AWS_REGION
```

---

## Step 40 — Verify ECR Repositories

```powershell
aws ecr describe-repositories `
  --region $env:AWS_REGION `
  --query "repositories[].repositoryName" `
  --output table
```

Expected:

```text
streamingapp/auth-service
streamingapp/streaming-service
streamingapp/admin-service
streamingapp/chat-service
```

### Screenshot

```text
[SCREENSHOT 17 — ECR repositories]
```

---

# PART 7 — Push Images to ECR

## Step 41 — Login to ECR

```powershell
aws ecr get-login-password --region $env:AWS_REGION |
docker login --username AWS --password-stdin $env:ECR_REGISTRY
```

Expected:

```text
Login Succeeded
```

### Screenshot

```text
[SCREENSHOT 18 — ECR Docker login]
```

---

## Step 42 — Tag Auth Image

```powershell
docker tag streamingapp/auth-service:local `
  "$env:ECR_REGISTRY/streamingapp/auth-service:1"
```

---

## Step 43 — Push Auth Image

```powershell
docker push `
  "$env:ECR_REGISTRY/streamingapp/auth-service:1"
```

### Screenshot

```text
[SCREENSHOT 19 — Auth image pushed to ECR]
```

---

## Step 44 — Tag Streaming Image

```powershell
docker tag streamingapp/streaming-service:local `
  "$env:ECR_REGISTRY/streamingapp/streaming-service:1"
```

---

## Step 45 — Push Streaming Image

```powershell
docker push `
  "$env:ECR_REGISTRY/streamingapp/streaming-service:1"
```

### Screenshot

```text
[SCREENSHOT 20 — Streaming image pushed]
```

---

## Step 46 — Tag Admin Image

```powershell
docker tag streamingapp/admin-service:local `
  "$env:ECR_REGISTRY/streamingapp/admin-service:1"
```

---

## Step 47 — Push Admin Image

```powershell
docker push `
  "$env:ECR_REGISTRY/streamingapp/admin-service:1"
```

### Screenshot

```text
[SCREENSHOT 21 — Admin image pushed]
```

---

## Step 48 — Tag Chat Image

```powershell
docker tag streamingapp/chat-service:local `
  "$env:ECR_REGISTRY/streamingapp/chat-service:1"
```

---

## Step 49 — Push Chat Image

```powershell
docker push `
  "$env:ECR_REGISTRY/streamingapp/chat-service:1"
```

### Screenshot

```text
[SCREENSHOT 22 — Chat image pushed]
```

---

## Step 50 — Verify ECR Images

```powershell
$repos = @(
    "streamingapp/auth-service",
    "streamingapp/streaming-service",
    "streamingapp/admin-service",
    "streamingapp/chat-service"
)

foreach ($repo in $repos) {
    Write-Host "`n===== $repo ====="

    aws ecr describe-images `
      --repository-name $repo `
      --region $env:AWS_REGION `
      --query "imageDetails[].{Tags:imageTags,PushedAt:imagePushedAt}" `
      --output table
}
```

### Screenshot

```text
[SCREENSHOT 23 — All backend images in ECR]
```

---

# PART 8 — Jenkins CI/CD

## Step 51 — Prepare Jenkins EC2

Create an EC2 instance for Jenkins.

Recommended demonstration configuration:

```text
Instance type: t3.small
OS: Amazon Linux
Region: ap-south-1
```

Jenkins should have permission to:

- Build Docker images
- Authenticate with ECR
- Push images to ECR

### Screenshot

```text
[SCREENSHOT 24 — Jenkins EC2 instance]
```

---

## Step 52 — Install Jenkins

Install Java and Jenkins on the Jenkins EC2 instance.

Verify:

```bash
java --version
```

and:

```bash
sudo systemctl status jenkins
```

### Screenshot

```text
[SCREENSHOT 25 — Jenkins service]
```

---

## Step 53 — Open Jenkins

Access Jenkins through the configured Jenkins URL.

Example:

```text
http://<JENKINS_PUBLIC_IP>:8080
```

### Screenshot

```text
[SCREENSHOT 26 — Jenkins dashboard]
```

---

## Step 54 — Configure Jenkins Credentials

Configure the AWS credentials required for ECR operations.

Use least-privilege IAM permissions where possible.

### Screenshot

```text
[SCREENSHOT 27 — Jenkins credentials]
```

---

## Step 55 — Create Jenkins Pipeline

Create a Pipeline job for StreamingApp.

Pipeline stages should include:

```text
Checkout
   ↓
Build
   ↓
Test
   ↓
Docker Build
   ↓
ECR Login
   ↓
Push Images
```

### Screenshot

```text
[SCREENSHOT 28 — Jenkins pipeline stages]
```

---

## Step 56 — Run Jenkins Build

Trigger a Jenkins build.

Verify that all stages complete successfully.

### Screenshot

```text
[SCREENSHOT 29 — Successful Jenkins build]
```

---

# PART 9 — Create EKS Cluster

## Step 57 — Verify eksctl

```powershell
eksctl version
```

---

## Step 58 — Create EKS Cluster Configuration

Create:

```text
k8s/cluster.yaml
```

Configuration:

```yaml
apiVersion: eksctl.io/v1alpha5
kind: ClusterConfig

metadata:
  name: streamingapp-eks
  region: ap-south-1

vpc:
  nat:
    gateway: Disable

managedNodeGroups:
  - name: workers
    instanceType: t3.small
    minSize: 2
    desiredCapacity: 2
    maxSize: 2
    privateNetworking: false
    volumeSize: 20
    volumeType: gp3
    volumeEncrypted: true
```

---

## Step 59 — Validate Cluster Configuration

```powershell
eksctl create cluster -f k8s/cluster.yaml --dry-run
```

The configuration should pass validation.

### Screenshot

```text
[SCREENSHOT 30 — EKS dry-run validation]
```

---

## Step 60 — Create EKS Cluster

```powershell
eksctl create cluster -f k8s/cluster.yaml
```

This creates the EKS control plane and worker nodes.

### Screenshot

```text
[SCREENSHOT 31 — EKS cluster creation]
```

---

# PART 10 — Kubernetes Deployment

## Step 61 — Verify Kubernetes Context

```powershell
kubectl config current-context
```

---

## Step 62 — Verify Cluster

```powershell
kubectl get nodes
```

Expected:

```text
STATUS   Ready
```

### Screenshot

```text
[SCREENSHOT 32 — EKS worker nodes]
```

---

## Step 63 — Create Namespace

```powershell
kubectl create namespace streamingapp
```

Verify:

```powershell
kubectl get namespaces
```

---

## Step 64 — Create Kubernetes Configuration

Create the required Kubernetes configuration files:

```text
k8s/
├── namespace.yaml
├── backend-deployment.yaml
├── backend-service.yaml
├── frontend-deployment.yaml
├── frontend-service.yaml
├── mongo-deployment.yaml
├── mongo-service.yaml
├── configmap.yaml
├── secret.yaml
└── ingress.yaml
```

### Screenshot

```text
[SCREENSHOT 33 — Kubernetes manifest files]
```

---

## Step 65 — Deploy MongoDB

Apply MongoDB resources:

```powershell
kubectl apply -f k8s/mongo-deployment.yaml -n streamingapp
kubectl apply -f k8s/mongo-service.yaml -n streamingapp
```

Verify:

```powershell
kubectl get pods -n streamingapp
```

### Screenshot

```text
[SCREENSHOT 34 — MongoDB pod]
```

---

## Step 66 — Deploy Backend Services

Deploy:

- Auth Service
- Streaming Service
- Admin Service
- Chat Service

Example:

```powershell
kubectl apply -f k8s/backend-deployment.yaml -n streamingapp
kubectl apply -f k8s/backend-service.yaml -n streamingapp
```

Verify:

```powershell
kubectl get deployments -n streamingapp
kubectl get services -n streamingapp
```

### Screenshot

```text
[SCREENSHOT 35 — Backend Kubernetes deployments]
```

---

## Step 67 — Deploy Frontend

Apply:

```powershell
kubectl apply -f k8s/frontend-deployment.yaml -n streamingapp
kubectl apply -f k8s/frontend-service.yaml -n streamingapp
```

Verify:

```powershell
kubectl get pods -n streamingapp
kubectl get svc -n streamingapp
```

### Screenshot

```text
[SCREENSHOT 36 — Frontend Kubernetes deployment]
```

---

# PART 11 — Helm Deployment

## Step 68 — Create Helm Chart

Create the Helm chart:

```text
helm/
└── streamingapp/
    ├── Chart.yaml
    ├── values.yaml
    └── templates/
        ├── namespace.yaml
        ├── configmap.yaml
        ├── secret.yaml
        ├── mongo.yaml
        ├── auth.yaml
        ├── streaming.yaml
        ├── admin.yaml
        ├── chat.yaml
        ├── frontend.yaml
        └── ingress.yaml
```

Validate:

```powershell
helm lint helm/streamingapp
```

### Screenshot

```text
[SCREENSHOT 37 — Helm lint]
```

---

# PART 12 — Ingress and AWS Load Balancer

## Step 69 — Configure AWS Load Balancer and Application Verification

Install/configure the AWS Load Balancer Controller and deploy the Kubernetes Ingress.

The application routing should provide access to:

```text
/
    → Frontend

/api/auth
    → Auth Service

/api/streaming
    → Streaming Service

/api/admin
    → Admin Service

/api/chat
    → Chat Service

/socket.io
    → Chat Service
```

Check:

```powershell
kubectl get ingress -n streamingapp
```

Obtain the ALB address:

```powershell
kubectl get ingress -n streamingapp
```

Open the resulting ALB address in a browser.

### Screenshot

```text
[SCREENSHOT 38 — Kubernetes Ingress]
```

### Screenshot

```text
[SCREENSHOT 39 — AWS Application Load Balancer]
```

### Screenshot

```text
[SCREENSHOT 40 — StreamingApp through ALB]
```

---

# PART 13 — Scaling and Rolling Updates

## Step 70 — Validate Scaling, Rolling Updates and Final Deployment

### Check all pods

```powershell
kubectl get pods -n streamingapp -o wide
```

### Check deployments

```powershell
kubectl get deployments -n streamingapp
```

### Check services

```powershell
kubectl get services -n streamingapp
```

### Scale a deployment

Example:

```powershell
kubectl scale deployment auth-service `
  --replicas=3 `
  -n streamingapp
```

Verify:

```powershell
kubectl get pods -n streamingapp
```

### Screenshot

```text
[SCREENSHOT 41 — Kubernetes horizontal scaling]
```

---

## Rolling Update

Update the container image:

```powershell
kubectl set image deployment/auth-service `
  auth-service=<ECR_IMAGE>:2 `
  -n streamingapp
```

Monitor:

```powershell
kubectl rollout status deployment/auth-service -n streamingapp
```

### Screenshot

```text
[SCREENSHOT 42 — Rolling update]
```

---

## Rollout History

```powershell
kubectl rollout history deployment/auth-service -n streamingapp
```

### Screenshot

```text
[SCREENSHOT 43 — Rollout history]
```

---

## Rollback

If required:

```powershell
kubectl rollout undo deployment/auth-service -n streamingapp
```

Verify:

```powershell
kubectl rollout status deployment/auth-service -n streamingapp
```

### Screenshot

```text
[SCREENSHOT 44 — Kubernetes rollback]
```

---

# Final Kubernetes Validation

Run:

```powershell
kubectl get all -n streamingapp
```

Expected components include:

```text
Pods
Deployments
ReplicaSets
Services
```

### Screenshot

```text
[SCREENSHOT 45 — Final kubectl get all]
```

---

# Final Application Test

Verify the application through the ALB URL.

Test:

```text
Frontend
Authentication
Streaming
Administration
Chat
Socket.IO
```

### Screenshot

```text
[SCREENSHOT 46 — Final application test]
```

---

# Docker Images

Backend images stored in Amazon ECR:

```text
streamingapp/auth-service
streamingapp/streaming-service
streamingapp/admin-service
streamingapp/chat-service
```

Frontend image can be built and pushed after the final ALB/API URLs are known.

---

# Kubernetes Resources

The final Kubernetes environment contains:

```text
EKS Cluster
│
├── Namespace: streamingapp
│
├── MongoDB
│
├── Auth Service
│
├── Streaming Service
│
├── Admin Service
│
├── Chat Service
│
├── Frontend
│
├── Services
│
├── ConfigMaps
│
├── Secrets
│
└── Ingress
```

---

# Health Checks

| Service | Health Endpoint |
|---|---|
| Auth | `/health` |
| Streaming | `/api/health` |
| Chat | `/api/health` |

Health checks are used to verify application availability and support Kubernetes container lifecycle management.

---

# Scaling Demonstration

The project demonstrates Kubernetes scaling using:

```powershell
kubectl scale deployment <deployment-name> --replicas=<number> -n streamingapp
```

Example:

```powershell
kubectl scale deployment auth-service --replicas=3 -n streamingapp
```

Verify:

```powershell
kubectl get pods -n streamingapp
```

---

# Rolling Deployment Demonstration

The application supports rolling image updates using:

```powershell
kubectl set image deployment/<deployment> <container>=<new-image> -n streamingapp
```

Deployment progress:

```powershell
kubectl rollout status deployment/<deployment> -n streamingapp
```

---

# Useful Kubernetes Commands

## Pods

```powershell
kubectl get pods -n streamingapp
```

## Deployments

```powershell
kubectl get deployments -n streamingapp
```

## Services

```powershell
kubectl get svc -n streamingapp
```

## Ingress

```powershell
kubectl get ingress -n streamingapp
```

## Events

```powershell
kubectl get events -n streamingapp --sort-by=.lastTimestamp
```

## Pod Logs

```powershell
kubectl logs <pod-name> -n streamingapp
```

## Pod Details

```powershell
kubectl describe pod <pod-name> -n streamingapp
```

## Deployment Details

```powershell
kubectl describe deployment <deployment-name> -n streamingapp
```

---

# Helm Commands

## Lint

```powershell
helm lint helm/streamingapp
```

## Template

```powershell
helm template streamingapp helm/streamingapp
```

## Install

```powershell
helm install streamingapp helm/streamingapp `
  -n streamingapp `
  --create-namespace
```

## Upgrade

```powershell
helm upgrade streamingapp helm/streamingapp `
  -n streamingapp
```

## Status

```powershell
helm status streamingapp -n streamingapp
```

## List Releases

```powershell
helm list -n streamingapp
```

---

# Troubleshooting

## Check Pod Status

```powershell
kubectl get pods -n streamingapp
```

If a pod is not running:

```powershell
kubectl describe pod <pod-name> -n streamingapp
```

---

## Check Logs

```powershell
kubectl logs <pod-name> -n streamingapp
```

For a previous crashed container:

```powershell
kubectl logs <pod-name> -n streamingapp --previous
```

---

## Check Events

```powershell
kubectl get events -n streamingapp --sort-by=.lastTimestamp
```

---

## Check ECR Image

```powershell
aws ecr describe-images `
  --repository-name streamingapp/auth-service `
  --region ap-south-1
```

---

# Cost Optimization

This project is designed for demonstration and academic evaluation.

AWS resources should not be left running unnecessarily.

Recommended workflow:

```text
Create
  ↓
Deploy
  ↓
Test
  ↓
Take Screenshots
  ↓
Record Demonstration
  ↓
Delete Resources
```

Avoid leaving the following resources running continuously:

- EKS cluster
- EC2 Jenkins instance
- Application Load Balancer
- NAT Gateway
- Unused ECR images
- Unused EBS volumes

The EKS configuration intentionally disables NAT Gateway usage:

```yaml
vpc:
  nat:
    gateway: Disable
```

---

# Final Demonstration Checklist

## Source Code

- [ ] GitHub repository cloned
- [ ] DevOps branch created
- [ ] Application verified locally

## Docker

- [ ] Docker installed
- [ ] Docker Compose working
- [ ] Five application images built
- [ ] Containers tested locally

## ECR

- [ ] Auth repository created
- [ ] Streaming repository created
- [ ] Admin repository created
- [ ] Chat repository created
- [ ] Backend images pushed

## Jenkins

- [ ] Jenkins EC2 created
- [ ] Jenkins installed
- [ ] AWS credentials configured
- [ ] Pipeline created
- [ ] Pipeline executed successfully

## EKS

- [ ] EKS cluster created
- [ ] Worker nodes Ready
- [ ] Namespace created
- [ ] Kubernetes resources deployed

## Kubernetes

- [ ] MongoDB deployed
- [ ] Auth deployed
- [ ] Streaming deployed
- [ ] Admin deployed
- [ ] Chat deployed
- [ ] Frontend deployed
- [ ] Services created
- [ ] ConfigMap created
- [ ] Secrets configured
- [ ] Health probes configured

## Helm

- [ ] Helm chart created
- [ ] Helm lint successful
- [ ] Helm template verified
- [ ] Helm deployment successful

## Ingress

- [ ] AWS Load Balancer Controller configured
- [ ] Ingress created
- [ ] ALB generated
- [ ] Frontend accessible
- [ ] API routes verified
- [ ] Socket.IO verified

## Scaling

- [ ] Replicas increased
- [ ] Pods verified
- [ ] Rolling update tested
- [ ] Rollback tested

---

# Screenshot Index

The following placeholders can be replaced with actual images after completing the assignment.

```text
01  Git version
02  Docker version
03  Docker Compose version
04  AWS CLI version
05  AWS STS identity
06  Git repository and branch
07  Project structure
08  Docker Compose configuration
09  Docker Compose startup
10  Docker Compose services
11  Running Docker containers
12  Auth health check
13  Streaming health check
14  Chat health check
15  Frontend
16  Docker images
17  ECR repositories
18  ECR login
19  Auth ECR push
20  Streaming ECR push
21  Admin ECR push
22  Chat ECR push
23  ECR image verification
24  Jenkins EC2
25  Jenkins service
26  Jenkins dashboard
27  Jenkins credentials
28  Jenkins pipeline
29  Successful Jenkins build
30  EKS dry-run
31  EKS cluster
32  EKS nodes
33  Kubernetes manifests
34  MongoDB pod
35  Backend deployments
36  Frontend deployment
37  Helm lint
38  Kubernetes Ingress
39  AWS ALB
40  Application through ALB
41  Kubernetes scaling
42  Rolling update
43  Rollout history
44  Rollback
45  Final kubectl get all
46  Final application test
```

---

# Conclusion

The StreamingApp project demonstrates an end-to-end container orchestration and deployment workflow using Docker, Amazon ECR, Jenkins, Kubernetes, Amazon EKS, Helm and AWS Load Balancing.

The implementation provides practical experience with:

- Microservice containerization
- Container registries
- CI/CD pipelines
- Kubernetes orchestration
- Service discovery
- Health checks
- Configuration management
- Secrets
- Load balancing
- Ingress
- Horizontal scaling
- Rolling deployments
- Rollbacks
- Cloud deployment
- DevOps automation

The project is implemented in the AWS Mumbai region (`ap-south-1`) with a focus on keeping infrastructure suitable for a short-lived academic demonstration.

---

# Author

**Vinjith NV**

DevOps / Full Stack Developer

Technologies:

```text
PHP
Python
Symfony
Laravel
React
Angular
Vue
Docker
Kubernetes
AWS
Azure
Jenkins
CI/CD
GenAI
```

---

# Project Repository

```text
https://github.com/UnpredictablePrashant/StreamingApp
```

---

## Assignment Status

```text
PART 1  - Environment Preparation       ✓
PART 2  - Repository Setup              ✓
PART 3  - Application Configuration     ✓
PART 4  - Docker Compose                ✓
PART 5  - Docker Images                 ✓
PART 6  - Amazon ECR                    ✓
PART 7  - ECR Image Push                ✓
PART 8  - Jenkins CI/CD                 ✓
PART 9  - Amazon EKS                    ✓
PART 10 - Kubernetes Deployment        ✓
PART 11 - Helm                          ✓
PART 12 - Ingress / ALB                 ✓
PART 13 - Scaling / Rolling Updates     ✓
```

> **Note:** Screenshots should be added to the corresponding placeholders after each stage is successfully completed.