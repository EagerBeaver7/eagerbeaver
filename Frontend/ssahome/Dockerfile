# 베이스 이미지는 Node
FROM node:alpine
# 포트는 3126번
ENV PORT 3126

# 워킹 디렉토리 설정(이 경로에서 다음 명령어를 진행)
WORKDIR /usr/src/app
# 워킹 디렉토리에 패키지제이선 카피
COPY package*.json ./
# 인스톨 진행
RUN npm install
# 루트 디렉토리를 컨테이너로 카피
COPY ./ ./
# ENV환경을 프로덕션을 설정
ENV NODE_ENV production
# 빌드
RUN npm run build
# 스타트
CMD ["npm", "run", "start"]