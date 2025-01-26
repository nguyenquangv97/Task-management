# Task Management Application

## Overview

This project is a task management application that allows users to create, update, delete, and manage tasks. The application is built using a combination of React, Redux, and Socket.IO to provide real-time updates across multiple clients.

## Libraries Used

### Client-Side

- **React**: A JavaScript library for building user interfaces.
- **Redux**: A predictable state container for JavaScript apps.
- **Redux Persist**: A library to persist and rehydrate a Redux store.
- **Socket.IO Client**: A library for real-time bidirectional event-based communication.
- **UUID**: A library to generate unique identifiers.
- **React-Redux**: Official React bindings for Redux.
- **Lucide-React**: A library for icons.

### Server-Side

- **Express**: A minimal and flexible Node.js web application framework.
- **Socket.IO**: A library for real-time bidirectional event-based communication.
- **Cors**: A package for providing a Connect/Express middleware that can be used to enable CORS.
- **Nodemon**: A tool that helps develop Node.js based applications by automatically restarting the node application when file changes in the directory are detected.

## Project Structure

### Client

- **src/components**: Contains React components such as `Dashboard`, `TaskCard`, `TaskAction`, and `NewTask`.
- **src/store**: Contains Redux store configuration, actions, and reducers.
- **src/data**: Contains initial data and type definitions.

### Server

- **index.js**: The main server file that sets up the Express server and Socket.IO.

## Approach to Design and Implementation

### Real-Time Updates

The application uses Socket.IO to provide real-time updates across multiple clients. When a task is created, updated, or deleted, the server emits an event to all connected clients to update their task lists.

### State Management

Redux is used to manage the application state. The state is persisted using Redux Persist to ensure that the task list is saved across page reloads.

### Component Structure

The application is divided into reusable components:

- **Dashboard**: The main component that displays the task lists.
- **TaskCard**: A component that displays individual tasks.
- **TaskAction**: A component that provides actions for each task, such as updating the stage or deleting the task.
- **NewTask**: A component that allows users to create new tasks.

### Task Management

Tasks are categorized into three stages: `new`, `inProgress`, and `done`. Users can move tasks between these stages, mark tasks as important, and delete tasks. The task list is updated in real-time across all connected clients.

### Socket.IO Integration

The server listens for events such as `createTask` and `updateTasks` and emits the updated task list to all connected clients. The client listens for these events and updates the Redux store accordingly.

## Getting Started

### Prerequisites

- Node.js
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nguyenquangv97/Task-management.git
   ```

2. Install dependencies for the client:
   ```bash
   cd client
   yarn install
   ```

3. Install dependencies for the server:
   ```bash
   cd ../server
   yarn install
   ```

### Running the Application

1. Start the server:
   ```bash
   cd server
   yarn start
   ```

2. Start the client:
   ```bash
   cd ../client
   yarn run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`.

## Conclusion

This task management application demonstrates the use of React, Redux, and Socket.IO to build a real-time, collaborative task management tool. The application is designed to be modular and scalable, with a focus on real-time updates and state management.