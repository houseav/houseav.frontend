# Default production environment Dockerfile
FROM node:18-alpine


WORKDIR /app

COPY package.json ./

RUN npm install

# Copy the rest of the application code
COPY . .

RUN npm run build

EXPOSE 5173

# Use Vite's preview server to serve the built files
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]