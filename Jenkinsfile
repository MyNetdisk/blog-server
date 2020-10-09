//git credentials
def git_auth = "571f959b-ec48-4ec9-819c-d3a25a99fffb"
//git url
def git_url = "git@github.com:MyNetdisk/blog-server.git"
//镜像的版本号
def tag = "latest"
//阿里云镜像地址
def aliyun_url = "registry.cn-qingdao.aliyuncs.com/mynetdisk"
//阿里云登录凭证id
def aliyun_auth = "33374deb-5ae1-4278-97a5-8a8a93d5f269"

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
            sh "docker tag ${imageName} ${aliyun_url}/${imageName}"
            //把镜像推送到阿里云
            withCredentials([usernamePassword(credentialsId: "${aliyun_auth}", passwordVariable: 'password', usernameVariable: 'username')]) {
               //登录
               sh "docker login -u ${username} -p ${password} ${aliyun_url}"
               //上传
               sh "docker push ${aliyun_url}/${imageName}"
               
               sh "echo 镜像上传成功"
            }
        }
    }catch(e){
        throw e
    }finally{
        // 邮件发送功能
        // emailext( subject: '构建通知：${PROJECT_NAME} - Build # ${BUILD_NUMBER} - ${BUILD_STATUS}!', body: '${FILE,path="email.html"}', to: 'coderlife@foxmail.com' )
    }
}