# NoteWave

NoteWave is a music playing app built with React Native. It allows users to securely login and register, search for songs using the Deezer API, stream songs, change the app's language, and switch to dark mode.

## Features

- **Secure Login and Register**: Users can create an account and log in securely.
- **Song Search**: Search for songs using the Deezer API.
- **Song Streaming**: Stream songs directly from the Deezer API.
- **Language Change**: Switch between multiple languages.
- **Dark Mode**: Toggle dark mode for a better viewing experience in low-light conditions.

## Installation

1. Clone the repository:

    ```sh
    git clone https://github.com/your-username/notewave.git
    cd notewave
    ```

2. Install the dependencies:

    ```sh
    npm install
    ```

3. Link native dependencies:

    ```sh
    npx react-native link
    ```

4. Set up the Deezer API:

    - Obtain an API key from [Deezer Developer](https://developers.deezer.com/).
    - Create a `.env` file in the root of your project and add your Deezer API key:

    ```env
    DEEZER_API_KEY=your_deezer_api_key
    ```

## Running the App

### iOS

1. Install CocoaPods dependencies:

    ```sh
    cd ios
    pod install
    cd ..
    ```

2. Run the app:

    ```sh
    npx react-native run-ios
    ```

### Android

1. Run the app:

    ```sh
    npx react-native run-android
    ```

## Usage

1. **Login/Register**: Start the app and either log in or register for a new account.
2. **Search for Songs**: Use the search bar to find your favorite songs.
3. **Stream Songs**: Click on a song from the search results to start streaming.
4. **Change Language**: Go to settings and select your preferred language.
5. **Toggle Dark Mode**: Go to settings and switch on dark mode.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any features, bug fixes, or improvements.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Acknowledgements

- [React Native](https://reactnative.dev/)
- [Deezer API](https://developers.deezer.com/)
- [React Navigation](https://reactnavigation.org/)
- [Redux](https://redux.js.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)

## Contact

For any questions or feedback, please contact Github: AVucelic

