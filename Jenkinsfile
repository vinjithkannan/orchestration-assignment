pipeline {

    agent any

    environment {

        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '508564775932'

        ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

        AUTH_REPO = "${ECR_REGISTRY}/streamingapp/auth-service"
        STREAMING_REPO = "${ECR_REGISTRY}/streamingapp/streaming-service"
        ADMIN_REPO = "${ECR_REGISTRY}/streamingapp/admin-service"
        CHAT_REPO = "${ECR_REGISTRY}/streamingapp/chat-service"
        FRONTEND_REPO = "${ECR_REGISTRY}/streamingapp/frontend"

        IMAGE_TAG = "${BUILD_NUMBER}"

        EKS_CLUSTER_NAME = 'streamingapp-eks'
        K8S_NAMESPACE = 'streamingapp'

        HELM_RELEASE = 'streamingapp'
        HELM_CHART = './helm/streamingapp'
    }

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out source code...'
                checkout scm
            }
        }

        stage('Verify Tools') {
            steps {
                sh '''
                    set -e

                    echo "AWS:"
                    aws --version

                    echo "Docker:"
                    docker --version

                    echo "Kubectl:"
                    kubectl version --client

                    echo "Helm:"
                    helm version

                    echo "Git:"
                    git --version
                '''
            }
        }

        stage('AWS Authentication') {
            steps {
                sh '''
                    set -e

                    echo "Checking AWS identity..."
                    aws sts get-caller-identity

                    echo "Logging into ECR..."

                    aws ecr get-login-password \
                        --region "$AWS_REGION" |
                    docker login \
                        --username AWS \
                        --password-stdin "$ECR_REGISTRY"
                '''
            }
        }

        stage('Build Docker Images') {
            parallel {

                stage('Build Auth') {
                    steps {
                        sh '''
                            docker build \
                                -t "$AUTH_REPO:$IMAGE_TAG" \
                                ./backend/authService
                        '''
                    }
                }

                stage('Build Streaming') {
                    steps {
                        sh '''
                            docker build \
                                -t "$STREAMING_REPO:$IMAGE_TAG" \
                                -f backend/streamingService/Dockerfile \
                                ./backend
                        '''
                    }
                }

                stage('Build Admin') {
                    steps {
                        sh '''
                            docker build \
                                -t "$ADMIN_REPO:$IMAGE_TAG" \
                                -f backend/adminService/Dockerfile \
                                ./backend
                        '''
                    }
                }

                stage('Build Chat') {
                    steps {
                        sh '''
                            docker build \
                                -t "$CHAT_REPO:$IMAGE_TAG" \
                                -f backend/chatService/Dockerfile \
                                ./backend
                        '''
                    }
                }

                stage('Build Frontend') {
                    steps {
                        sh '''
                            docker build \
                                -t "$FRONTEND_REPO:$IMAGE_TAG" \
                                ./frontend
                        '''
                    }
                }
            }
        }

        stage('Push Images to ECR') {
            steps {
                sh '''
                    set -e

                    docker push "$AUTH_REPO:$IMAGE_TAG"
                    docker push "$STREAMING_REPO:$IMAGE_TAG"
                    docker push "$ADMIN_REPO:$IMAGE_TAG"
                    docker push "$CHAT_REPO:$IMAGE_TAG"
                    docker push "$FRONTEND_REPO:$IMAGE_TAG"
                '''
            }
        }

        stage('Connect to EKS') {
            steps {
                sh '''
                    set -e

                    echo "Updating kubeconfig..."

                    aws eks update-kubeconfig \
                        --region "$AWS_REGION" \
                        --name "$EKS_CLUSTER_NAME"

                    echo "Testing Kubernetes connection..."

                    kubectl get nodes

                    echo "Current namespace:"
                    kubectl get namespace "$K8S_NAMESPACE" || true
                '''
            }
        }

        stage('Helm Deploy') {
            steps {
                sh '''
                    set -e

                    echo "Deploying StreamingApp using Helm..."

                    helm upgrade --install "$HELM_RELEASE" "$HELM_CHART" \
                        --namespace "$K8S_NAMESPACE" \
                        --create-namespace \
                        --set auth.image.repository="$AUTH_REPO" \
                        --set auth.image.tag="$IMAGE_TAG" \
                        --set streaming.image.repository="$STREAMING_REPO" \
                        --set streaming.image.tag="$IMAGE_TAG" \
                        --set admin.image.repository="$ADMIN_REPO" \
                        --set admin.image.tag="$IMAGE_TAG" \
                        --set chat.image.repository="$CHAT_REPO" \
                        --set chat.image.tag="$IMAGE_TAG" \
                        --set frontend.image.repository="$FRONTEND_REPO" \
                        --set frontend.image.tag="$IMAGE_TAG" \
                        --wait \
                        --timeout 10m
                '''
            }
        }

        stage('Verify Deployment') {
            steps {
                sh '''
                    set -e

                    echo "Helm release:"
                    helm list -n "$K8S_NAMESPACE"

                    echo "Deployments:"
                    kubectl get deployments -n "$K8S_NAMESPACE"

                    echo "Pods:"
                    kubectl get pods -n "$K8S_NAMESPACE"

                    echo "Services:"
                    kubectl get services -n "$K8S_NAMESPACE"

                    echo "Ingress:"
                    kubectl get ingress -n "$K8S_NAMESPACE" || true
                '''
            }
        }
    }

    post {

        success {
            echo """
            ==========================================
            StreamingApp CI/CD SUCCESS
            ==========================================
            Build: ${BUILD_NUMBER}
            Image Tag: ${IMAGE_TAG}
            EKS Cluster: ${EKS_CLUSTER_NAME}
            Namespace: ${K8S_NAMESPACE}
            ==========================================
            """
        }

        failure {
            echo """
            ==========================================
            StreamingApp CI/CD FAILED
            ==========================================
            Build: ${BUILD_NUMBER}
            ==========================================
            """
        }
    }
}
