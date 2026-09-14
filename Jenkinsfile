pipeline {

    agent any

    environment {

        // ---------------------------------------------------------
        // AWS
        // ---------------------------------------------------------
        AWS_REGION = 'ap-south-1'
        AWS_ACCOUNT_ID = '508564775932'

        ECR_REGISTRY = "${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"

        // ECR repositories
        AUTH_SERVICE     = "streamingapp/auth-service"
        STREAMING_SERVICE = "streamingapp/streaming-service"
        ADMIN_SERVICE    = "streamingapp/admin-service"
        CHAT_SERVICE    = "streamingapp/chat-service"
        FRONTEND_SERVICE = "streamingapp/frontend"

        AUTH_REPO     = "${ECR_REGISTRY}/${AUTH_SERVICE}"
        STREAMING_REPO = "${ECR_REGISTRY}/${STREAMING_SERVICE}"
        ADMIN_REPO    = "${ECR_REGISTRY}/${ADMIN_SERVICE}"
        CHAT_REPO     = "${ECR_REGISTRY}/${CHAT_SERVICE}"
        FRONTEND_REPO = "${ECR_REGISTRY}/${FRONTEND_SERVICE}"

        // ---------------------------------------------------------
        // Build
        // ---------------------------------------------------------
        IMAGE_TAG = "${BUILD_NUMBER}"

        // ---------------------------------------------------------
        // EKS
        // ---------------------------------------------------------
        EKS_CLUSTER_NAME = 'streamingapp-eks'
        K8S_NAMESPACE = 'streamingapp'

        // ---------------------------------------------------------
        // Helm
        // ---------------------------------------------------------
        HELM_RELEASE = 'streamingapp'
        HELM_CHART = './helm/streamingapp'
    }

    stages {

        // =========================================================
        // 1. CHECKOUT
        // =========================================================
        stage('Checkout') {

            steps {

                echo 'Checking out source code...'

                checkout scm

                sh '''
                    echo "Current directory:"
                    pwd

                    echo "Repository contents:"
                    ls -la
                '''
            }
        }


        // =========================================================
        // 2. VERIFY TOOLS
        // =========================================================
        stage('Verify Tools') {

            steps {

                sh '''
                    set -e

                    echo "=========================================="
                    echo "VERIFYING JENKINS BUILD AGENT TOOLS"
                    echo "=========================================="

                    echo ""
                    echo "AWS CLI:"
                    aws --version

                    echo ""
                    echo "Docker:"
                    docker --version

                    echo ""
                    echo "Kubectl:"
                    kubectl version --client

                    echo ""
                    echo "Helm:"
                    helm version

                    echo ""
                    echo "Git:"
                    git --version

                    echo ""
                    echo "=========================================="
                    echo "TOOL VERIFICATION COMPLETE"
                    echo "=========================================="
                '''
            }
        }


        // =========================================================
        // 3. AWS AUTHENTICATION
        // =========================================================
        stage('AWS Authentication') {

            steps {

                /*
                 * Jenkins credential:
                 *
                 * ID:
                 * aws-streamingapp
                 *
                 * Kind:
                 * AWS Credentials
                 *
                 * This credential must contain the AWS Access Key
                 * and Secret Access Key for your AWS account.
                 */

                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding',
                     credentialsId: 'aws-streamingapp']
                ]) {

                    sh '''
                        set -e

                        echo "=========================================="
                        echo "AWS AUTHENTICATION"
                        echo "=========================================="

                        echo ""
                        echo "AWS Region:"
                        echo "$AWS_REGION"

                        echo ""
                        echo "AWS Account:"
                        echo "$AWS_ACCOUNT_ID"

                        echo ""
                        echo "Checking AWS identity..."

                        aws sts get-caller-identity

                        echo ""
                        echo "=========================================="
                        echo "AWS AUTHENTICATION SUCCESS"
                        echo "=========================================="
                    '''
                }
            }
        }


        // =========================================================
        // 4. AWS / ECR TEST
        // =========================================================
        stage('Test AWS and ECR Access') {

            steps {

                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding',
                     credentialsId: 'aws-streamingapp']
                ]) {

                    sh '''
                        set -e

                        echo "=========================================="
                        echo "TESTING AWS AND ECR ACCESS"
                        echo "=========================================="

                        echo ""
                        echo "1. AWS Identity"
                        aws sts get-caller-identity

                        echo ""
                        echo "2. ECR Registry"
                        echo "$ECR_REGISTRY"

                        echo ""
                        echo "3. Checking ECR repositories..."

                        aws ecr describe-repositories \
                            --region "$AWS_REGION" \
                            --query 'repositories[].repositoryName' \
                            --output table

                        echo ""
                        echo "4. Testing ECR login..."

                        aws ecr get-login-password \
                            --region "$AWS_REGION" |
                        docker login \
                            --username AWS \
                            --password-stdin "$ECR_REGISTRY"

                        echo ""
                        echo "=========================================="
                        echo "AWS + ECR TEST SUCCESS"
                        echo "=========================================="
                    '''
                }
            }
        }


        // =========================================================
        // 5. BUILD DOCKER IMAGES
        // =========================================================
        stage('Build Docker Images') {

            parallel {

                stage('Build Auth') {

                    steps {

                        sh '''
                            set -e

                            echo "Building Auth Service..."

                            docker build \
                                -t "$AUTH_REPO:$IMAGE_TAG" \
                                ./backend/authService
                        '''
                    }
                }


                stage('Build Streaming') {

                    steps {

                        sh '''
                            set -e

                            echo "Building Streaming Service..."

                            docker build \
                                -t "$STREAMING_REPO:$IMAGE_TAG" \
                                -f backend/streamingService/Dockerfile \
                                ./backend/streamingService
                        '''
                    }
                }


                stage('Build Admin') {

                    steps {

                        sh '''
                            set -e

                            echo "Building Admin Service..."

                            docker build \
                                -t "$ADMIN_REPO:$IMAGE_TAG" \
                                -f backend/adminService/Dockerfile \
                                ./backend/adminService
                        '''
                    }
                }


                stage('Build Chat') {

                    steps {

                        sh '''
                            set -e

                            echo "Building Chat Service..."

                            docker build \
                                -t "$CHAT_REPO:$IMAGE_TAG" \
                                -f backend/chatService/Dockerfile \
                                ./backend/chatService
                        '''
                    }
                }


                stage('Build Frontend') {

                    steps {

                        sh '''
                            set -e

                            echo "Building Frontend..."

                            docker build \
                                -t "$FRONTEND_REPO:$IMAGE_TAG" \
                                ./frontend
                        '''
                    }
                }
            }
        }


        // =========================================================
        // 6. PUSH IMAGES TO ECR
        // =========================================================
        stage('Push Images to ECR') {

            steps {

                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding',
                     credentialsId: 'aws-streamingapp']
                ]) {

                    sh '''
                        set -e

                        echo "=========================================="
                        echo "LOGIN TO ECR"
                        echo "=========================================="

                        aws ecr get-login-password \
                            --region "$AWS_REGION" |
                        docker login \
                            --username AWS \
                            --password-stdin "$ECR_REGISTRY"


                        echo ""
                        echo "Pushing Auth Service..."
                        docker push "$AUTH_REPO:$IMAGE_TAG"


                        echo ""
                        echo "Pushing Streaming Service..."
                        docker push "$STREAMING_REPO:$IMAGE_TAG"


                        echo ""
                        echo "Pushing Admin Service..."
                        docker push "$ADMIN_REPO:$IMAGE_TAG"


                        echo ""
                        echo "Pushing Chat Service..."
                        docker push "$CHAT_REPO:$IMAGE_TAG"


                        echo ""
                        echo "Pushing Frontend..."
                        docker push "$FRONTEND_REPO:$IMAGE_TAG"


                        echo ""
                        echo "=========================================="
                        echo "ALL IMAGES PUSHED SUCCESSFULLY"
                        echo "=========================================="
                    '''
                }
            }
        }


        // =========================================================
        // 7. CONNECT TO EKS
        // =========================================================
        stage('Connect to EKS') {

            steps {

                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding',
                     credentialsId: 'aws-streamingapp']
                ]) {

                    sh '''
                        set -e

                        echo "=========================================="
                        echo "CONNECTING TO EKS"
                        echo "=========================================="

                        echo ""
                        echo "Updating kubeconfig..."

                        aws eks update-kubeconfig \
                            --region "$AWS_REGION" \
                            --name "$EKS_CLUSTER_NAME"


                        echo ""
                        echo "Testing Kubernetes connection..."

                        kubectl get nodes


                        echo ""
                        echo "Checking namespace..."

                        kubectl get namespace "$K8S_NAMESPACE" || true


                        echo ""
                        echo "=========================================="
                        echo "EKS CONNECTION SUCCESS"
                        echo "=========================================="
                    '''
                }
            }
        }


        // =========================================================
        // 8. TEST KUBERNETES ACCESS
        // =========================================================
        stage('Test Kubernetes Access') {

            steps {

                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding',
                     credentialsId: 'aws-streamingapp']
                ]) {

                    sh '''
                        set -e

                        echo "=========================================="
                        echo "TESTING KUBERNETES ACCESS"
                        echo "=========================================="

                        echo ""
                        echo "Cluster:"
                        kubectl cluster-info


                        echo ""
                        echo "Nodes:"
                        kubectl get nodes -o wide


                        echo ""
                        echo "Namespaces:"
                        kubectl get namespaces


                        echo ""
                        echo "StreamingApp namespace:"
                        kubectl get namespace "$K8S_NAMESPACE"


                        echo ""
                        echo "=========================================="
                        echo "KUBERNETES ACCESS TEST SUCCESS"
                        echo "=========================================="
                    '''
                }
            }
        }


        // =========================================================
        // 9. HELM DEPLOYMENT
        // =========================================================
        stage('Helm Deploy') {

            steps {

                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding',
                     credentialsId: 'aws-streamingapp']
                ]) {

                    sh '''
                        set -e

                        echo "=========================================="
                        echo "HELM DEPLOYMENT"
                        echo "=========================================="

                        echo ""
                        echo "Helm version:"
                        helm version


                        echo ""
                        echo "Helm chart:"
                        helm lint "$HELM_CHART"


                        echo ""
                        echo "Deploying StreamingApp..."

                        helm upgrade --install "$HELM_RELEASE" "$HELM_CHART" \
                            --namespace "$K8S_NAMESPACE" \
                            --create-namespace \
                            --set auth.image.repository="$AUTH_SERVICE" \
                            --set auth.image.tag="$IMAGE_TAG" \
                            --set streaming.image.repository="$STREAMING_SERVICE" \
                            --set streaming.image.tag="$IMAGE_TAG" \
                            --set admin.image.repository="$ADMIN_SERVICE" \
                            --set admin.image.tag="$IMAGE_TAG" \
                            --set chat.image.repository="$CHAT_SERVICE" \
                            --set chat.image.tag="$IMAGE_TAG" \
                            --set frontend.image.repository="$FRONTEND_SERVICE" \
                            --set frontend.image.tag="$IMAGE_TAG" \
                            --wait \
                            --timeout 10m

                        echo ""
                        echo "=========================================="
                        echo "HELM DEPLOYMENT SUCCESS"
                        echo "=========================================="
                    '''
                }
            }
        }


        // =========================================================
        // 10. VERIFY DEPLOYMENT
        // =========================================================
        stage('Verify Deployment') {

            steps {

                withCredentials([
                    [$class: 'AmazonWebServicesCredentialsBinding',
                     credentialsId: 'aws-streamingapp']
                ]) {

                    sh '''
                        set -e

                        echo "=========================================="
                        echo "VERIFYING DEPLOYMENT"
                        echo "=========================================="


                        echo ""
                        echo "Helm Release:"
                        helm list -n "$K8S_NAMESPACE"


                        echo ""
                        echo "Deployments:"
                        kubectl get deployments \
                            -n "$K8S_NAMESPACE"


                        echo ""
                        echo "Pods:"
                        kubectl get pods \
                            -n "$K8S_NAMESPACE" \
                            -o wide


                        echo ""
                        echo "Services:"
                        kubectl get services \
                            -n "$K8S_NAMESPACE"


                        echo ""
                        echo "Ingress:"
                        kubectl get ingress \
                            -n "$K8S_NAMESPACE" || true


                        echo ""
                        echo "=========================================="
                        echo "DEPLOYMENT VERIFICATION COMPLETE"
                        echo "=========================================="
                    '''
                }
            }
        }
    }


    // =============================================================
    // POST BUILD
    // =============================================================
    post {

        success {

            echo """
            ==========================================
            STREAMINGAPP CI/CD SUCCESS
            ==========================================

            Build Number : ${BUILD_NUMBER}
            Image Tag    : ${IMAGE_TAG}

            AWS Account  : ${AWS_ACCOUNT_ID}
            AWS Region   : ${AWS_REGION}

            EKS Cluster   : ${EKS_CLUSTER_NAME}
            Namespace     : ${K8S_NAMESPACE}

            Helm Release  : ${HELM_RELEASE}

            ==========================================
            APPLICATION DEPLOYED SUCCESSFULLY
            ==========================================
            """
        }


        failure {

            echo """
            ==========================================
            STREAMINGAPP CI/CD FAILED
            ==========================================

            Build Number : ${BUILD_NUMBER}

            AWS Account  : ${AWS_ACCOUNT_ID}
            AWS Region   : ${AWS_REGION}

            ==========================================
            CHECK THE FAILED STAGE ABOVE
            ==========================================
            """
        }
    }
}
