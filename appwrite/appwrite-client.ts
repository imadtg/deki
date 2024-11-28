import { Client } from "react-native-appwrite";

const client = new Client()
    .setEndpoint('https://cloud.appwrite.io/v1') // Your API Endpoint
    .setProject('6718b673002ee69ce115'); // Your project ID

export default client;
