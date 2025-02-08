# mini-project-2

A dual-mode location tracking system that supports both hardware-based and software-only approaches, with an integrated AI assistant feature using the OpenAI API. In hardware mode, an external device (built using an ESP32/Arduino, a GPS module, and a GSM/GPRS module) collects and transmits location data to the backend. In software mode, the mobile application directly uses the smartphone’s built-in GPS. Users can switch between these modes and interact with an AI assistant for insights and recommendations.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Hardware Module Explanation](#hardware-module-explanation)
- [Software Architecture](#software-architecture)
- [AI Assistant Integration](#ai-assistant-integration)
- [User Flow](#user-flow)
- [Directory Structure](#directory-structure)
- [Getting Started](#getting-started)
- [License](#license)

---

## Overview

This project demonstrates a comprehensive location tracking solution by combining:
- **Hardware Mode:** An external module gathers GPS data and sends it via a GSM/GPRS network.
- **Software Mode:** The mobile app uses the smartphone’s native geolocation API.
- **AI Assistant:** Integration with the OpenAI API assists users with natural language queries about their tracking data.

The backend (located in `mini-project-2/server`) is built with Node.js and PostgreSQL, and the mobile application is built with React Native.

---

## Features

- **Dual Mode Tracking:**
  - **Hardware Mode:** Receives location data from an external device built with a GPS module and a GSM/GPRS module.
  - **Software Mode:** Uses the smartphone’s built-in GPS to obtain real-time location data.
- **Route Visualization:** Displays the current route on an interactive map with support for adding and managing location pins.
- **Pin Management:** Users can drop, modify, or remove pins to mark points of interest.
- **AI Assistant:** Users can interact with an AI assistant (via the OpenAI API) to ask questions, get route summaries, or receive travel suggestions.
- **Backend Data Storage:** All location and pin data is stored in a PostgreSQL database for historical tracking and analysis.

---

## Hardware Module Explanation

The hardware module is designed to work as an external location tracker. It consists of:

- **Microcontroller (Arduino UNO/ESP32):**  
  The central unit that reads data from sensors, processes the data, and manages communication.
  
- **GPS Module (e.g., U‑blox NEO‑6M):**  
  Receives satellite signals and computes geographical coordinates (latitude, longitude, etc.).  
  *Connection:* Communicates with the microcontroller via UART (TX/RX).

- **GSM/GPRS Module (e.g., SIM800L):**  
  Provides cellular connectivity to transmit location data to the backend server.  
  *Connection:* Uses UART for serial communication with the microcontroller (sending AT commands and receiving responses).

- **Power Supply/Battery:**  
  A rechargeable LiPo battery with a charging/protection circuit (such as a TP4056 module) ensures stable power to all components.

- **Optional Sensor (MPU6050 Accelerometer/Gyroscope):**  
  Provides additional data about motion and orientation, enhancing the tracking information.
  *Connection:* Communicates via I2C (SDA/SCL) with the microcontroller.

**Data Flow in Hardware Module:**

1. **Data Collection:**  
   The GPS module gathers location data and (optionally) the MPU6050 provides motion data.
2. **Data Processing:**  
   The microcontroller parses the GPS data and packages it (e.g., in JSON format).
3. **Data Transmission:**  
   Using AT commands, the microcontroller instructs the GSM module to send the data over the cellular network to the backend.

---

## Software Architecture

### Mobile Application (React Native)

- **Dual Mode Toggle:**  
  A switch in the app allows the user to select between hardware mode (fetching data from the backend) and software mode (using the phone’s GPS).
  
- **Mapping & Visualization:**  
  The app integrates with mapping services (Google Maps, Mapbox, or OpenStreetMap) to display real-time location updates, routes, and pins.
  
- **Pin Management:**  
  Users can interact with the map to add or remove pins, with changes sent to the backend for storage.

### Backend Server (Node.js & PostgreSQL)

- **API Endpoints:**
  - `/api/hardware-location`: GET endpoint to fetch the latest location data from the hardware device.
  - `/api/location`: POST endpoint for submitting location data (from both hardware and software sources).
  - `/api/pins`: GET and POST endpoints for managing location pins.
  - (Optional) `/api/ai-query`: Endpoint for logging or processing AI queries.
  
- **Data Storage:**  
  All location data, along with pin information, is stored in PostgreSQL with proper timestamping and indexing.

---

## AI Assistant Integration

The AI assistant feature leverages the OpenAI API to provide users with natural language assistance. Users can ask questions such as:
- “What is my travel summary for today?”
- “How can I optimize my route?”
- “Explain the significance of this pin.”

**Flow:**
1. **User Interaction:**  
   The user accesses the AI chat interface (via a chat icon or voice command).
2. **Query Submission:**  
   The query is sent (along with necessary context) to the OpenAI API.
3. **Response Handling:**  
   The AI’s response is displayed in the app, providing insights or recommendations.
4. **Action:**  
   Users may choose to save or act on the suggestions provided by the AI.

---

## User Flow

### Location Tracking and Pin Management

1. **Launch the App:**  
   The user opens the mobile app.
2. **Select Data Source:**  
   Use the toggle to choose between “Hardware Mode” (data fetched from the backend) and “Phone GPS Mode” (using the device’s built-in GPS).
3. **Real-Time Tracking:**  
   The app displays the current location on an interactive map. In hardware mode, it periodically queries the backend for updated data.
4. **Drop Pins:**  
   The user can tap on the map or press a dedicated button to add a location pin. These pins are immediately visible and stored on the backend.
5. **Review & Playback:**  
   The user can view a history of their route and review saved pins.

### AI Assistant Interaction

1. **Initiate Chat:**  
   The user taps the AI assistant icon.
2. **Submit Query:**  
   A natural language query is entered (or spoken) by the user.
3. **Receive Response:**  
   The OpenAI API processes the query, and the response is shown in the chat interface.
4. **Act on Recommendations:**  
   The user may use the AI’s suggestions to adjust their route or manage pins.

---

## Directory Structure

```
mini-project-2/
├── README.md
├── mobile-app/                # React Native mobile application code
│   ├── src/
│   ├── package.json
│   └── ... 
└── server/                    # Node.js backend server code
    ├── app.js
    ├── package.json
    ├── config/
    ├── routes/
    ├── models/
    └── ...
```

---

## Getting Started

### Prerequisites

- **Mobile App:**
  - Node.js and npm/yarn
  - React Native CLI or Expo CLI (depending on your setup)
- **Backend:**
  - Node.js and npm
  - PostgreSQL database
- **OpenAI API Key:**
  - Obtain from [OpenAI](https://openai.com) and configure securely in your environment.

### Installation

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/your-username/mini-project-2.git
   cd mini-project-2
   ```

2. **Setup the Backend:**
   ```bash
   cd server
   npm install
   # Configure your PostgreSQL connection and OpenAI API key in environment variables
   npm start
   ```

3. **Setup the Mobile App:**
   ```bash
   cd ../mobile-app
   npm install
   # Configure any required API endpoints in your app configuration
   npm start
   ```

4. **Run the Mobile App:**
   - For iOS:
     ```bash
     npx react-native run-ios
     ```
   - For Android:
     ```bash
     npx react-native run-android
     ```

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Acknowledgments

- Thanks to the OpenAI team for providing access to their API.
- Mapping services provided by [Google Maps](https://developers.google.com/maps) / [Mapbox](https://www.mapbox.com/) / [OpenStreetMap](https://www.openstreetmap.org/).
- Inspiration and guidance from project supervisors and mentors.