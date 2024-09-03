
```markdown
# CoinRoutes Frontend

https://coin-routes-frontend.vercel.app/

## Overview

This project is a React application designed to display real-time cryptocurrency market data using the Coinbase WebSocket API. It features a live chart of bid and ask prices, a top-of-book display, and a ladder view of order book data with adjustable aggregation increments.

## Requirements

- Node.js (>= 14.x)
- Yarn (or npm)

## Getting Started

Follow these steps to set up and run the project locally.

### 1. Clone the Repository

```bash
git clone https://github.com/your-repo/coinroutes-frontend.git
cd coinroutes-frontend
```

### 2. Install Dependencies

Install the necessary dependencies using Yarn (or npm if preferred):

```bash
yarn install
# or
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory if needed for any environment-specific configurations. For this project, no special environment variables are required, but you can add them as needed.

### 4. Run the Development Server

Start the development server with:

```bash
yarn dev
# or
npm run dev
```

The application will be available at `http://localhost:3000` by default.

### 5. Build for Production

To create a production build of the application, run:

```bash
yarn build
# or
npm run build
```

The build artifacts will be located in the `dist` directory.

### 6. Run Tests

If you have tests set up, you can run them with:

```bash
yarn test
# or
npm test
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
