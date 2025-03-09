#!/bin/zsh
set -e  # 오류 발생 시 즉시 종료

echo "🚀 Vue 이미지 빌드를 시작합니다..."
docker build --platform=linux/amd64 -t shopping-vue:x86_64 . && echo "✅ Vue 이미지가 성공적으로 빌드되었습니다!"

echo "🚀 Vue 이미지 태깅을 진행합니다..."
docker tag shopping-vue:x86_64 epfzja/shopping-vue:x86_64 && echo "✅ Vue 이미지가 성공적으로 태깅되었습니다!"

echo "🚀 Vue 이미지를 Docker Hub로 푸시 중..."
docker push epfzja/shopping-vue:x86_64 && echo "✅ Vue 이미지가 성공적으로 푸시되었습니다!"

#echo "🚀 EC2 서버에서 애플리케이션 재시작..."
#ssh -i ~/shopping.pem ec2-user@3.34.140.180 << EOF
#cd /app
#docker-compose down
#docker-compose pull
#docker-compose up -d
#docker image prune -f
#EOF
echo "🎉 모든 작업이 완료되었습니다!"
