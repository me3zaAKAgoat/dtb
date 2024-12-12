# Use Node.js base image
FROM node:18-alpine

# Set working directory for backend
WORKDIR /app

# Copy backend package files and install dependencies
COPY backend/package.json backend/package-lock.json /app/backend/
RUN cd backend && npm install

# Copy frontend package files and install dependencies
COPY frontend/package.json frontend/package-lock.json /app/frontend/
RUN cd frontend && npm install

# Copy the rest of the code to the container
COPY . /app

RUN cd backend && npm run build

# Build frontend (SPA)
RUN cd frontend && npm run build

# Copy the built frontend into the backend's build directory (Express will serve it)
RUN cp -r frontend/dist /app/backend/build

# Expose the port that Express will listen on
EXPOSE 3000

# Set the working directory to the backend
WORKDIR /app/backend

# Command to run Express server
CMD ["npm", "run", "start"]
