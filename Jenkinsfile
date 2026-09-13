pipeline {
    agent any

    environment {
        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = credentials('aws-account-id')
        ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

        AUTH_REPO = "${ECR_REGISTRY}/streamingapp/auth-service"
        STREAMING_REPO = "${ECR_REGISTRY}/streamingapp/streaming-service"
        ADMIN_REPO = "${ECR_REGISTRY}/streamingapp/admin-service"
        CHAT_REPO = "${ECR_REGISTRY}/streamingapp/chat-service"
        FRONTEND_REPO = "${ECR_REGISTRY}/streamingapp/frontend"

        IMAGE_TAG = "${BUILD_NUMBER}"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Docker Login') {
            steps {
                sh '''
                    aws ecr get-login-password \
                      --region $AWS_REGION |
                    docker login \
                      --username AWS \
                      --password-stdin $ECR_REGISTRY
                '''
            }
        }

        stage('Build Auth') {
            steps {
                sh '''
                    docker build \
                      -t $AUTH_REPO:$IMAGE_TAG \
                      ./backend/authService
                '''
            }
        }

        stage('Build Streaming') {
            steps {
                sh '''
                    docker build \
                      -t $STREAMING_REPO:$IMAGE_TAG \
                      -f backend/streamingService/Dockerfile \
                      ./backend
                '''
            }
        }

        stage('Build Admin') {
            steps {
                sh '''
                    docker build \
                      -t $ADMIN_REPO:$IMAGE_TAG \
                      -f backend/adminService/Dockerfile \
                      ./backend
                '''
            }
        }

        stage('Build Chat') {
            steps {
                sh '''
                    docker build \
                      -t $CHAT_REPO:$IMAGE_TAG \
                      -f backend/chatService/Dockerfile \
                      ./backend
                '''
            }
        }

        stage('Build Frontend') {
            steps {
                sh '''
                    docker build \
                      -t $FRONTEND_REPO:$IMAGE_TAG \
                      ./frontend
                '''
            }
        }

        stage('Push Images') {
            steps {
                sh '''
                    docker push $AUTH_REPO:$IMAGE_TAG
                    docker push $STREAMING_REPO:$IMAGE_TAG
                    docker push $ADMIN_REPO:$IMAGE_TAG
                    docker push $CHAT_REPO:$IMAGE_TAG
                    docker push $FRONTEND_REPO:$IMAGE_TAG
                '''
            }
        }
    }

    post {
        success {
            echo 'StreamingApp images pushed successfully.'
        }

        failure {
            echo 'StreamingApp pipeline failed.'
        }
    }
}
