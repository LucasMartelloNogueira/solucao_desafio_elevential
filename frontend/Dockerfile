# Step 1: Build the React app with Vite
FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Step 2: Serve with Nginx
FROM nginx:stable-alpine

# Remove default Nginx static content
RUN rm -rf /usr/share/nginx/html/*

# Copy built files from the builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Optional: custom Nginx config (for React Router)
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5173

CMD ["nginx", "-g", "daemon off;"]
