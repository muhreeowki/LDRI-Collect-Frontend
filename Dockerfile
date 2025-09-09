FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
COPY next.config.js ./
COPY tsconfig*.json ./
COPY eslint.config.mjs ./
COPY tailwind.config.js ./
COPY postcss.config.js ./
COPY public ./public
COPY src ./src

RUN npm ci
RUN npm run build

ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0
EXPOSE 3000

CMD ["npm", "run", "start"]


