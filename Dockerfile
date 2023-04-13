FROM --platform=linux/amd64 node:14

WORKDIR /app

COPY . /app

ENV REACT_APP_API_BASE=https://api-manager-o3iu9.ondigitalocean.app

RUN npm install

RUN npm i -g serve

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build"]