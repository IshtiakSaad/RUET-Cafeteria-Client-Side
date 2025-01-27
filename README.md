# Client-Side Application: Hostel Management System

This repository contains the client-side code for the **Hostel Management System**, developed using React.js and Vite. The client application enables students to log in, view meals, post reviews, and manage their profiles. It also allows administrators to manage meals and user reviews efficiently.

## Features

1. **Student and Admin Login**:
   - Students can log in to view and review meals.
   - Admins can log in to manage meals and reviews.
2. **Responsive Design**:
   - Fully responsive UI for mobile, tablet, and desktop views.
3. **Persistent Login**:
   - Users stay logged in even after page reloads.
4. **Dynamic Meal Categories**:
   - View meals by categories (Breakfast, Lunch, Dinner, All Meals).
5. **Infinite Scrolling**:
   - Implemented for loading meals dynamically.
6. **Payment Integration**:
   - Integrated Stripe for purchasing premium packages.
7. **Review System**:
   - Users can post, edit, and delete meal reviews.
8. **Real-Time Notifications**:
   - Sweet alerts and toasts for CRUD operations and authentication feedback.
9. **Search and Filter**:
   - Server-side search and filters for meal categories and price ranges.
10. **Modern UI Framework**:
    - Tailwind CSS and DaisyUI for a clean, responsive design.

## Installation

1. Clone the repository:
   ```bash
   git clone <client-repository-url>
   ```

2. Navigate to the project directory:
   ```bash
   cd client-side
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory and add the following environment variables:
   ```env
   VITE_FIREBASE_API_KEY=<your-firebase-api-key>
   VITE_FIREBASE_AUTH_DOMAIN=<your-firebase-auth-domain>
   VITE_FIREBASE_PROJECT_ID=<your-firebase-project-id>
   VITE_FIREBASE_STORAGE_BUCKET=<your-firebase-storage-bucket>
   VITE_FIREBASE_MESSAGING_SENDER_ID=<your-firebase-sender-id>
   VITE_FIREBASE_APP_ID=<your-firebase-app-id>
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

## Packages Used

### Core Dependencies
- **React**: Frontend library for building user interfaces.
- **React Router DOM**: Routing library for navigation.
- **@tanstack/react-query**: For data fetching and caching.
- **Firebase**: Authentication and database services.

### UI/Styling
- **Tailwind CSS**: Utility-first CSS framework.
- **DaisyUI**: Tailwind CSS components for consistent UI.
- **React Icons**: Icon library for React.
- **React Responsive Carousel**: Carousel for meal banners.

### Utilities
- **React Hook Form**: Form management library.
- **SweetAlert2**: For customizable alerts and notifications.
- **React Hot Toast**: Toast notifications for user feedback.
- **LocalForage**: Client-side storage for caching.
- **Match Sorter**: Sorting utility for search results.
- **Sort By**: Simplifies sorting operations.

### Payment Integration
- **@stripe/react-stripe-js** and **@stripe/stripe-js**: Stripe integration for secure payments.
- **React Stripe Checkout**: Simple integration for Stripe checkout.

### Additional Libraries
- **React Infinite Scroll Component**: For infinite scrolling functionality.
- **Dotenv**: To manage environment variables.

### Development Tools
- **Vite**: Fast build tool for development.
- **ESLint**: For linting JavaScript and React code.
- **PostCSS**: For CSS processing.

## Scripts

- **`npm run dev`**: Start the development server.
- **`npm run build`**: Build the application for production.
- **`npm run preview`**: Preview the production build.
- **`npm run lint`**: Run ESLint to check for code quality.

## Live Site

[Live Site URL](#)  
(Admin credentials will be provided upon request.)

## GitHub Repository

[Client-Side Repository Link](#)

## Contribution

Feel free to fork this repository and create pull requests. For major changes, please open an issue first to discuss what you would like to change.
