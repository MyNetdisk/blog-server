//git credentials
def git_auth = "571f959b-ec48-4ec9-819c-d3a25a99fffb"
//git url
def git_url = "git@github.com:MyNetdisk/blog-server.git"
//镜像的版本号
def tag = "latest"
//阿里云镜像地址
def aliyun_url = "registry.cn-qingdao.aliyuncs.com/mynetdisk"
//镜像库项目名称
def aliyun_project = "blogs"

node {
    try{
        stage('pull the code') {
            checkout([$class: 'GitSCM', branches: [[name: "*/${branch}"]], doGenerateSubmoduleConfigurations: false, extensions: [], submoduleCfg: [], userRemoteConfigs: [[credentialsId: "${git_auth}", url: "${git_url}"]]])
        }
        stage('构建dockerfile镜像, 上传镜像'){
            sh "mvn dockerfile:build"
            //定义镜像名称
            def imageName = "${project_name}:${tag}"
            //对镜像打上标签
            sh "docker tag ${imageName} ${aliyun_url}/${aliyun_project}/${imageName}"
        }
    }catch(e){
        throw e
    }finally{
        // 邮件发送功能
        // emailext( subject: '构建通知：${PROJECT_NAME} - Build # ${BUILD_NUMBER} - ${BUILD_STATUS}!', body: '${FILE,path="email.html"}', to: 'coderlife@foxmail.com' )
    }
}