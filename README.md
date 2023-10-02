# Nomad_Trakker 🌍✈️

### About the Application

Nomad Trakker is a responsive Travel Advisor web application that helps you plan your trips and explore destinations with ease. It offers a range of features to enhance your travel experience. Below is a summary of the application and the technologies used.


### Features 🏞️🏨🍽️
1. Filter for Top Places: Nomad Trakker allows users to filter top restaurants, hotels, and attractions at their chosen destination.

2. Customizable Maps: Explore your destination with customizable maps that help you navigate and discover new places.

3. Autocomplete Feature: Easily find places of interest with the autocomplete feature, making searching quick and convenient.

4. Wishlist: Plan your future trips by adding places of interest to your wishlist using Redux Toolkit for state management.

5. Secure Authentication: Nomad Trakker offers secure user authentication with features such as login, signup, forgot password, reset password, and change password. JWT tokens and cookies are used to ensure secure user sessions 🔒.

6. Avatar Upload: Users can upload and update their avatars to personalize their profiles 📷.


## 🚀 Live Deployed Link: https://parth79.web.app/


## 📽️ Demo Video: 

https://github.com/ParthRatra/nomad_trakker/assets/90822015/ea972a47-7d1b-4761-8a64-33d8f5374910



### Tools & Technologies Used 🛠️

#### Frontend:

1. **JavaScript (React.js)** : The frontend is built using React.js, providing a dynamic and responsive user interface.
2. **Material UI** : Material UI components are thoughtfully integrated into the design, delivering a clean and modern user interface that enhances the overall user experience.
3. **Tailwind CSS**: Tailwind CSS is our go-to choice for styling, enabling us to create visually appealing and responsive layouts.
4. **TravelAdvisor Rapid API**: We harness the [TravelAdvisor Rapid API](https://rapidapi.com/apidojo/api/travel-advisor) to curate a comprehensive list of attractions, restaurants, and hotels within specified boundaries. This data empowers users to make informed travel decisions.
5. **Redux Toolkit**: Redux Toolkit plays a crucial role in our application by managing state, particularly for the "Add to Wishlist" feature. It ensures a smooth and efficient data flow, enhancing user engagement and trip planning.
6. **LocalStorage**: We utilize the `localStorage` feature in the browser to save and retrieve user data, enhancing the user experience by providing personalized features and preferences.

#### Backend:

1. **Node.js**: The server-side code is written in Node.js, providing a robust backend environment.
2. **Express.js**: Express.js is used to create the RESTful API that communicates with the frontend.
3. **JWT (JSON Web Tokens)**: JWTs are used for secure user authentication.
4. **Cookies**: Cookies are employed to manage user sessions.

#### Database:

1. **User Data**: MongoDB is used to store user profiles, authentication credentials, and personal information. This ensures that user data is organized and readily accessible when needed.
2. **Wishlist Information**: Additionally, MongoDB is leveraged to store wishlist information, allowing users to save and manage their desired places of interest for future trips. This feature enhances the trip planning process and provides a personalized experience for users.

#### Cloud Services:

1. **Google Cloud Platform (GCP)**: GCP services are utilized for various aspects of our application, including deployment, storage, and real-time location tracking. GCP empowers us to provide real-time location tracking features, ensuring users can navigate their chosen destinations with confidence. Additionally, it enhances the autocomplete feature, making place discovery quick and convenient.
2. **Firebase**: Firebase is employed for the deployment of the frontend, ensuring a seamless and responsive user interface. Firebase hosting allows us to efficiently serve the application to users.
3. **Render**: Render is utilized for backend deployment, providing a reliable and scalable infrastructure to handle application requests efficiently.
4. **Cloudinary**: Cloudinary is an integral part of our application, playing a pivotal role in facilitating image upload and management. It ensures that images, including avatar photos and images associated with wishlist items, are seamlessly saved and retrieved from the database. This functionality allows users to personalize their profiles with ease and enriches their travel planning experience by providing visual context through images.


## Getting Started Locally 🚀

To run the project locally, follow these steps:

1. Clone the repository:

```bash
https://github.com/ParthRatra/nomad_trakker.git
```

2. Navigate to the project directory:

```bash
cd <projectdictonary>
```

3. Install the required dependencies for both the frontend and backend.:

```bash
npm install
```

4. Configure your environment variables, including API keys and database connections.

5. Start the project locally (Run the frontend and backend servers):

```bash
npm run dev
```


Nomad Trakker is the perfect travel companion, offering essential features for travelers to plan and enjoy their adventures. 🌟🌴
