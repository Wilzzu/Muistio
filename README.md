![Banner](https://i.imgur.com/DK8NOAX.png)

<h1 align="center">Muistio</h1>

<p align="center">A secure Markdown editor for quick notes and detailed documents.</br>Create, edit, and manage your files securely in the cloud by encrypting them locally with your own key.</p>

## Live Site

Check out the live website: [muistio.wilzzu.dev](https://muistio.wilzzu.dev/)

![Screenshots](https://i.imgur.com/eC7vL3R.png)

## Features

- Easily create and view files using a Markdown editor
- All files are encrypted locally with the user's key using **ChaCha20Poly1305** encryption before storing them in Firestore
- Files are decrypted locally using the user's key, the key is never sent or stored on the server
- Search, sort, edit, and delete files
- Google authentication using Firebase
- Landing page with changing sections and animations
- Responsive design for mobile and desktop _(WIP for other sizes)_

## Technologies Used

- **Frontend**: TypeScript, React, Vite, Tailwind CSS, Framer Motion
- **Backend**: Firebase (Firestore, Authentication)

## Setup and Installation

1. **Clone the repository:**

   ```
   git clone https://github.com/Wilzzu/Muistio.git
   cd Muistio
   ```

2. **Install dependencies:**

   ```
   npm install
   ```

3. **Set up Firebase:**
   Follow the instructions in [Firebase Setup](#firebase-setup) section to set up the Firebase project.

4. **Configure environment variables:** Rename the `.env.example` file to `.env` and fill in the values. The `VITE_FIREBASE` variables will be provided to you during the registration of your Firebase web app.

   | Variable                            | Description                                          |
   | ----------------------------------- | ---------------------------------------------------- |
   | `VITE_FIREBASE_API_KEY`             | The API key for your Firebase project.               |
   | `VITE_FIREBASE_AUTH_DOMAIN`         | The authentication domain for your Firebase project. |
   | `VITE_FIREBASE_PROJECT_ID`          | The project ID for your Firebase project.            |
   | `VITE_FIREBASE_STORAGE_BUCKET`      | The storage bucket for your Firebase project.        |
   | `VITE_FIREBASE_MESSAGING_SENDER_ID` | The messaging sender ID for your Firebase project.   |
   | `VITE_FIREBASE_APP_ID`              | The app ID for your Firebase project.                |
   | `VITE_MODE`                         | Set to `dev` to use the Firebase emulator.           |

5. **Run the application:**

   ```
   npm run dev
   ```

## Firebase Setup

To set up Firebase, follow these steps:

1. **Create a Firebase Project:**

   - Go to the [Firebase Console](https://console.firebase.google.com/) and create a new project.
   - Enable **Firestore Database** and **Authentication** (select Google as the provider).

2. **Register Your Web App:**

   - In your Firebase project settings, register a new web app and copy the configuration details to your `.env` file.

3. **Configure Firestore Security Rules:**
   - Set up Firestore security rules to restrict access, allowing only authenticated users to access their own data. You can find pre-configured rules in the [firestore.rules](firestore.rules) file.

### Using Firebase Emulator Locally

It's recommended to use the **Firebase Emulator Suite** for local development. To set up the Firebase Emulator, follow these steps:

1. **Install Firebase CLI:**

   ```
   npm install -g firebase-tools
   ```

2. **Initialize Firebase Emulator:**

   ```
   firebase init emulators
   ```

   Everything should be pre-configured, so you can just continue through the setup without changing anything. If not, follow the instructions to set up the Firestore and Authentication emulators.

3. **Start the Emulator:**

   ```
   cd functions
   npm install
   npm run firebase
   ```

4. **Update Environment Variables:** Set `VITE_MODE` to `dev` in your frontend `.env` file to use the Firebase emulator.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
