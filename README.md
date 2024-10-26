# HungryHive - Food Ordering System

HungryHive is a full-stack food ordering system with separate frontend and backend layers, built using the MERN stack. It offers users the convenience of browsing nearby restaurants, placing orders, and managing their profile. MongoDB Atlas is used for data storage, and authentication options include OTP-based email verification and Google sign-in.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Getting Started](#getting-started)
- [Pages](#pages)
  - [Sign-in Page](#sign-in-page)
  - [Home Page](#home-page)
  - [Menu Page](#menu-page)
  - [Cart Page](#cart-page)
  - [Order Page](#order-page)
  - [Reorder Page](#reorder-page)
  - [Profile Page](#profile-page)
- [Setup Instructions](#setup-instructions)
- [License](#license)

---

## Features
- **Email OTP and Google authentication**
- **Nearby food recommendations based on user address**
- **Add items to cart from Home or Menu page**
- **Update cart items and address before payment**
- **Order management, cancellation, and reordering options**
- **User profile updates**

---

## Technologies Used
- **Frontend**: React.js
- **Backend**: Express.js
- **Database**: MongoDB Atlas
- **Authentication**: Google Auth and custom OTP-based email verification

---

## Getting Started
### Prerequisites
- Node.js
- MongoDB Atlas account

### Installation
1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/HungryHive.git
    ```
2. Install frontend and backend dependencies:
    ```bash
    cd HungryHive/frontend
    npm install

    cd ../backend
    npm install
    ```
3. Set up your environment variables:
   - Configure MongoDB connection in the backend
   - Add credentials for Google Auth and email OTP service in backend `.env`

4. Run the application:
    ```bash
    # Start backend
    cd backend
    npm run start

    # Start frontend
    cd ../frontend
    npm start
    ```

---

## Pages

### Sign-in Page
- **Features**: 
  - Email OTP authentication
  - Google sign-in for instant access
- **Code**: Handles OTP requests and authentication flows, using React hooks for form state.

### Home Page
- **Features**: 
  - Displays recommended food items based on user's location.
  - If no address is provided, shows popular nearby options.
- **Code**: Fetches location-based data from backend APIs and renders items using React components.

### Menu Page
- **Features**: 
  - Displays a list of available food items.
  - Clicking on any item shows stores that sell the selected food.
  - Users can add items to the cart from this page.
- **Code**: Renders item cards, fetches stores based on item ID, and includes "Add to Cart" functionality.

### Cart Page
- **Features**: 
  - Lists items in the user's cart along with store and address information.
  - Users can update address and proceed to payment.
- **Code**: Renders items in cart, allows address updates, and links to payment workflow.

### Order Page
- **Features**: 
  - Displays a list of past orders.
  - Each order includes hardcoded salesperson information, details, and a cancellation option.
- **Code**: Uses order data from MongoDB to render the list and handles cancellation requests.

### Reorder Page
- **Features**: 
  - Allows users to reorder items from their order history.
- **Code**: Fetches past orders and includes "Reorder" button functionality.

### Profile Page
- **Features**: 
  - Allows users to update their profile information, including name, address, and contact details.
- **Code**: Renders profile form, updates MongoDB user data on submission.

---

## Setup Instructions
1. **Environment Variables**:
   Create a `.env` file in the `backend` directory with the following:
    ```plaintext
    MONGO_URI=<Your MongoDB URI>
    GOOGLE_CLIENT_ID=<Google Client ID>
    GOOGLE_CLIENT_SECRET=<Google Client Secret>
    EMAIL_SERVICE_API_KEY=<Your OTP email service API key>
    ```
2. **Running the Application**:
   - Start the backend server first, followed by the frontend.
   - Access the application at `http://localhost:3000`.

---

## License
This project is licensed under the MIT License.

---

## Contributing
Feel free to submit issues or pull requests to help improve this project!
