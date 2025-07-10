# Watch Your Health - Assessment Frontend

This is the frontend application for the Watch Your Health assessment tool. It allows users to generate and view health assessment reports based on session data.

## Features

- User authentication (login/signup)
- Dashboard to view generated reports
- Report generation with configurable assessment types
- PDF report viewing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Backend API running (see assessment-backend directory)

### Installation

1. Clone the repository (if not already done)
2. Navigate to the frontend directory:

```bash
cd assessment-frontend
```

3. Install dependencies:

```bash
npm install
# or
yarn install
```

4. Create a `.env` file in the root directory with the following content:

```
REACT_APP_API_URL=http://localhost:5000/api
```

### Running the Application

```bash
npm start
# or
yarn start
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Project Structure

```
src/
├── components/       # Reusable UI components
├── context/          # React context for state management
├── hooks/            # Custom React hooks
├── pages/            # Application pages/routes
├── services/         # API service functions
├── utils/            # Utility functions
├── App.js            # Main application component
├── index.js          # Application entry point
```

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Runs the test suite
- `npm eject` - Ejects from Create React App

## Authentication

The application uses JWT (JSON Web Tokens) for authentication. Tokens are stored in localStorage and automatically included in API requests.

## Report Generation

To generate a report, you need to provide:

1. A valid session ID
2. An assessment type

For demonstration purposes, you can use the following session IDs:
- `session123` - Complete health assessment data
- `session456` - Partial health assessment data
- `session789` - Minimal health assessment data

## License

This project is licensed under the MIT License.