# Where is Waldo? - Game Application

This interactive game challenges players to find Waldo in a given image, with functionality for character selection, high score tracking, and user authentication.

## Features

- **User Authentication**: Sign in to save and view your high scores.
- **Timer**: Track how quickly you can find Waldo.
- **Error Handling**: Inform users of any issues during gameplay or data fetching.
- **High Score Tracking**: View high scores of all users in the application.
- **Responsive UI**: Designed for an enjoyable user experience.

## Technologies Used

- **React**: For building the user interface.
- **React Router**: For routing and navigation.
- **CSS**: For styling components.
- **Fetch API**: For backend API interactions.

## Components

### AuthContext

- **Functionality**: Provides authentication state and functions for user login and logout.
- **State Management**: Manages the current user state using React's context API.
- **Local Storage**: Stores user tokens in local storage to persist authentication across sessions.

### Game

- **Functionality**: Manages game logic, including fetching characters, tracking time, and handling game-over conditions.
- **Timer**: Counts time taken to find Waldo.
- **Character Fetching**: Retrieves available characters from the backend.

### Home

- **Functionality**: Serves as the landing page for the application.
- **User Information**: Displays user high scores and provides login/logout options.
- **High Score List**: Fetches and displays high scores for all users, formatted for easy readability.
- **Links**: Provides navigation to the game, signup, and login pages.

### Login

- **Functionality**: Allows users to log in using their credentials.
- **Error Handling**: Displays error messages if login fails.
- **Form Handling**: Manages input states for username and password.
- **Navigation**: Redirects users to the home page upon successful login.

### Signup

- **Functionality**: Enables users to create a new account by entering a username and password.
- **Error Handling**: Displays error messages if account creation fails.
- **Form Handling**: Manages input states for username and password.
- **Navigation**: Redirects users to the login page after successful signup.

### ImageSelector

- **Functionality**: Displays the game image and allows character selection based on user clicks.

### SelectChar

- **Functionality**: Popup component for selecting characters, which closes upon selection or outside click.

## Error Handling

- Displays error messages for failed data fetching and provides loading indicators for improved user experience.
