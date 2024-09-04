# Build Stage
FROM node:latest AS build

ENV NPM_CONFIG_UPDATE_NOTIFIER=false
ENV NPM_CONFIG_FUND=false

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . ./

# Define ARGs for each of your Firebase environment variables
ARG VITE_FIREBASE_API_KEY
ARG VITE_FIREBASE_AUTHDOMAIN
ARG VITE_FIREBASE_PROJECT_ID
ARG VITE_FIREBASE_STORAGE_BUCKET
ARG VITE_FIREBASE_MESSAGING_SENDER_ID
ARG VITE_FIREBASE_APP_ID

# Pass ARG values to the build process
ENV VITE_FIREBASE_API_KEY=${VITE_FIREBASE_API_KEY}
ENV VITE_FIREBASE_AUTHDOMAIN=${VITE_FIREBASE_AUTHDOMAIN}
ENV VITE_FIREBASE_PROJECT_ID=${VITE_FIREBASE_PROJECT_ID}
ENV VITE_FIREBASE_STORAGE_BUCKET=${VITE_FIREBASE_STORAGE_BUCKET}
ENV VITE_FIREBASE_MESSAGING_SENDER_ID=${VITE_FIREBASE_MESSAGING_SENDER_ID}
ENV VITE_FIREBASE_APP_ID=${VITE_FIREBASE_APP_ID}

RUN npm run build

# Serve Stage
FROM caddy:latest

WORKDIR /app

COPY Caddyfile /etc/caddy/Caddyfile

# Copy the build output from the build stage to the serve stage
COPY --from=build /app/dist /app/dist

EXPOSE 3000

CMD ["caddy", "run", "--config", "/etc/caddy/Caddyfile", "--adapter", "caddyfile"]
