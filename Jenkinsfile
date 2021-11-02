GITHUB_REPO_URL = "https://github.com/NovahubTechnology/habit-frontend"
BUILD_BRANCH = "master"

START_MSG = "Deployment started"
SUCCESS_MSG = "Deployment succeeded"
FAILED_MSG = "Deployment failed"

def remote = [:]
remote.name = "habitdev"
remote.host = "192.168.1.2"
remote.allowAnyHosts = true

node {
    checkout scm

    withCredentials([usernamePassword(credentialsId: 'habit-dev-novahub-server', passwordVariable: 'password', usernameVariable: 'username')]) {
        remote.user = username
        remote.password = password


        stage("Deploy") {
            setBuildStatus("PENDING", START_MSG);
            slackSend color: "good", message: "*habit-frontend*: ${START_MSG}"

            try {
                sshCommand remote: remote, command: """
                    cd /home/habitdev/apps/habit-frontend
                    eval "\$(ssh-agent -s)"
                    ssh-add /home/habitdev/.ssh/habit-reactjs/github-repo/id_rsa
                    git checkout .
                    git checkout ${BUILD_BRANCH}
                    git pull origin ${BUILD_BRANCH}
                    sh scripts/run.dev.sh
                """
                 
                setBuildStatus("SUCCESS", SUCCESS_MSG);
                slackSend color: "good", message: "*habit-frontend*: ${SUCCESS_MSG}"
            }
            catch (exc) {
                setBuildStatus("FAILURE", FAILED_MSG);
                slackSend color: "danger", message: "*habit-frontend*: ${FAILED_MSG}"
                error exc.toString()
            }
        }
    }
}

void setBuildStatus(String state, String message) {
  step([
      $class: "GitHubCommitStatusSetter",
      reposSource: [$class: "ManuallyEnteredRepositorySource", url: GITHUB_REPO_URL],
      contextSource: [$class: "ManuallyEnteredCommitContextSource", context: "ci/jenkins/build-status"],
      errorHandlers: [[$class: "ChangingBuildStatusErrorHandler", result: "UNSTABLE"]],
      statusResultSource: [ $class: "ConditionalStatusResultSource", results: [[$class: "AnyBuildResult", message: message, state: state]] ]
  ]);
}

