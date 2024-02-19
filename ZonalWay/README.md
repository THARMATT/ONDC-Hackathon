
# ONDC Grocery Delivery Platform

> A grocery delivery platform built with the ONDC stack & Redux.

## Introduction

This project aims to provide a seamless online platform for purchasing groceries. Customers can browse through a wide range of grocery items, place orders, and have them delivered to their doorstep. The platform offers features such as product search, user profile management, order tracking, and payment integration.

![screenshot](https://via.placeholder.com/500x300)

## Features

- Comprehensive grocery catalog
- User-friendly shopping cart
- Product reviews and ratings
- Featured products carousel
- Product pagination for easy browsing
- Advanced product search functionality
- User profile management with order history
- Admin dashboard for product and user management
- Order management with delivery status tracking
- Secure checkout process with payment integration
- Support for multiple payment methods
- Database seeder for initial data setup

## Getting Started

### Prerequisites

- Node.js (v14.6+ recommended)
- MongoDB database
- PayPal account for payment integration

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/ondc-grocery-platform.git
```

2. Navigate to the project directory:

```bash
cd ondc-grocery-platform
```

3. Install dependencies:

```bash
npm install
cd frontend
npm install
```

### Environment Variables

Create a `.env` file in the root directory and add the following variables:

```dotenv
NODE_ENV=development
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=abc123
PAYPAL_CLIENT_ID=your_paypal_client_id
```

### Running the Application

```bash
# Run both frontend and backend
npm run dev

# Run backend only
npm run server
```

### Database Setup

To seed the database with sample data, use the following commands:

```bash
# Import sample data
npm run data:import

# Remove all data from the database
npm run data:destroy
```

### Default User Logins

Use the following credentials to log in:

- Admin: admin@example.com (Password: 123456)
- Customer: john@example.com (Password: 123456)
- Customer: jane@example.com (Password: 123456)

## Deployment

To deploy the application, follow these steps:

1. Create a production build for the frontend:

```bash
cd frontend
npm run build
```

