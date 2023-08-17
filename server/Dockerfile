FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./

RUN \
    if [-f package-lock.json]; then npm ci; \
        else echo "Warning: Lockfile not found." && npm install; \
    fi

COPY src ./src

CMD ["npm", "run", "start"]