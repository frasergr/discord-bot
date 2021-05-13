FROM node:15.4-alpine

ENV NPM_CONFIG_PREFIX=/home/node/.npm-global
ENV PATH=$PATH:/home/node/.npm-global/bin

RUN mkdir -p /home/node/cache/backend && mkdir -p /home/node/cache/frontend && chown -R node:node /home/node/cache
RUN mkdir -p /home/node/app && mkdir -p /home/node/app/frontend && chown -R node:node /home/node/app

USER node

WORKDIR /home/node/cache/backend
COPY --chown=node ./package*.json ./
RUN npm install concurrently nodemon
RUN npm install

WORKDIR /home/node/cache/frontend
COPY --chown=node ./frontend/package*.json ./
RUN npm install

WORKDIR /home/node/app

CMD [ "sh", "./startup.sh" ]
