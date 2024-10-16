FROM node:18

WORKDIR /app/backend

COPY backend/package.json backend/pnpm-lock.yaml ./

RUN npm install

COPY backend/ .

EXPOSE 3000

CMD ["npm", "start"]