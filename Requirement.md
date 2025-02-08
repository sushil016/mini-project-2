Below is an updated, detailed requirements document that now includes the integration of the OpenAI API for an AI assistant feature. This addition will help automate and assist users during their interaction with the location pin and route tracking features. The document now covers the hardware mode, software-only mode, and the new AI assistance, along with detailed user flows.

---

# Dual-Mode Location Tracking System – Detailed Requirements Document (Updated)

**Version:** 1.1  
**Date:** February 2025  
**Prepared For:** mini project  
**Prepared By:** Team Reimagine

---

## 1. Introduction

### 1.1 Purpose
This document specifies the functional and non-functional requirements for the Dual-Mode Location Tracking System. The project demonstrates two approaches for obtaining and displaying location data:
- **Hardware Mode:** Using an externally built device (with Arduino/ESP32, GPS module, GSM/GPRS module) that sends location data to a backend.
- **Software Mode:** Using the smartphone’s built-in geolocation capabilities via a React Native mobile application.

An additional feature is the integration of the OpenAI API to offer an AI assistant that can automate tasks, answer queries, and assist users in understanding their tracking data.

### 1.2 Scope
The system consists of:
- A **mobile application** (developed in React Native) that displays routes, location pins, and supports switching between data sources.
- A **backend server** (Node.js with PostgreSQL) that collects, stores, and serves location data.
- A **custom-built hardware device** (using Arduino/ESP32 with GPS and GSM/GPRS modules) that transmits location data.
- An **AI Assistant Feature** using OpenAI’s API key to help users with queries about their location data, route insights, and suggestions.

### 1.3 Definitions and Acronyms
- **GPS:** Global Positioning System.
- **GSM/GPRS:** Global System for Mobile Communications/General Packet Radio Service.
- **API:** Application Programming Interface.
- **RESTful API:** A web service that follows REST architectural principles.
- **Node.js:** A JavaScript runtime for building server-side applications.
- **PostgreSQL:** An open-source relational database system.
- **React Native:** A framework for building native mobile applications using JavaScript and React.
- **OpenAI API:** A cloud service providing access to AI models (such as GPT) that can process natural language queries and generate responses.
- **ESP32/Arduino UNO:** Microcontrollers used for prototyping embedded systems.

---

## 2. Overall System Description

### 2.1 Product Perspective
The product is a location tracking system designed to function in dual modes with an additional AI assistant. It enables real-time route tracking, pin marking, and route history visualization by:
- Collecting data via an external hardware device.
- Using the mobile device’s internal GPS.
- Providing an AI assistant to automate responses and provide insights about tracking data.

### 2.2 Product Functions
- **Dual Data Source Selection:** A toggle in the mobile app to switch between hardware-based data (from your external device) and the phone’s native geolocation.
- **Real-Time Location Tracking:** Continuously updating the current location and displaying a route.
- **Route Visualization:** Drawing a continuous path on an interactive map using mapping APIs.
- **Location Pin Management:** Allowing users to add, view, or remove pins marking points of interest.
- **AI Assistant Feature:**  
  - Assist users by answering natural language queries related to location tracking.
  - Provide suggestions (e.g., route optimization, travel history summaries, safety alerts).
  - Automate certain tasks like summarizing travel logs or explaining map features.
- **Backend Data Storage:** Storing all location and pin data in PostgreSQL for history and further analysis.

### 2.3 User Characteristics
- **End Users:** Individuals tracking their routes (e.g., for personal travel, fleet management) who benefit from both hardware-based and built-in location tracking.
- **Developers/Administrators:** Responsible for maintaining the hardware device, backend APIs, mobile app, and AI assistant integration.
- **AI Interaction Users:** Users who require automated assistance or insights and can interact with the system using natural language.

---

## 3. Functional Requirements

### 3.1 Mobile Application (React Native)
- **Toggle for Data Source:**
  - Provide a visible switch labeled “Hardware Mode” / “Phone GPS Mode.”
  - The selection controls whether the app fetches location data from the backend (hardware mode) or uses the phone’s native geolocation.
  
- **Software Mode (Phone GPS):**
  - Use the built-in geolocation API (or a community package such as `@react-native-community/geolocation`) to obtain GPS coordinates.
  - Continuously update and display the current location on an interactive map.
  
- **Hardware Mode:**
  - Query a backend RESTful API endpoint (e.g., `/api/hardware-location`) to retrieve the latest location data sent from the external hardware device.
  - Display the hardware-sourced route and pins on the map.
  
- **Mapping & Visualization:**
  - Integrate with mapping services (e.g., Google Maps, Mapbox, or OpenStreetMap) to render the current location, a polyline route, and markers for pins.
  - Support panning, zooming, and interactive map controls.
  
- **Location Pin Management:**
  - Enable users to add location pins by tapping on the map or via a dedicated button.
  - Allow removal or modification of pins.
  - Transmit pin data to the backend for storage and future retrieval.
  
- **User Flow for Location Pin and Tracking:**
  - **Start Tracking:** User launches the app, selects the desired mode, and begins location tracking.
  - **Real-Time Updates:** The app displays the user’s current position and continuously plots the route.
  - **Pin Interaction:** At any time, the user can drop a pin (e.g., to mark a landmark or stop) which appears immediately on the map.
  - **Review & Playback:** Users can view their travel history (retrieved from the backend) and see a playback of the route.
  
- **AI Assistant Integration (OpenAI API):**
  - Provide a dedicated UI component (chatbot interface or voice assistant) that allows the user to type or speak queries.
  - Example queries might include:  
    - “What is my current speed?”  
    - “Show me my travel summary for today.”  
    - “How can I optimize my route?”  
    - “Explain the significance of this pin.”
  - The app sends the query (with the OpenAI API key securely stored) to the OpenAI API.
  - Display the generated response or suggestion on the app.
  - Optionally, provide an option to save AI-generated recommendations to the user’s travel log.

### 3.2 Hardware Device
- **GPS Data Acquisition:**
  - Utilize a GPS module (e.g., U‑blox NEO‑6M) to capture real-time location data.
- **Data Transmission:**
  - Transmit the collected location data to the Node.js backend via GSM/GPRS (using a module such as SIM800L) or WiFi.
  - Format the data as JSON containing latitude, longitude, timestamp, and device ID.
- **Power Management:**
  - Operate using a rechargeable LiPo battery and include a charging/protection circuit (e.g., TP4056-based module).
- **Optional Sensors:**
  - Include an MPU6050 sensor to capture motion data, which may further enrich the tracking information.

### 3.3 Backend Server (Node.js & PostgreSQL)
- **API Endpoints:**
  - `/api/hardware-location`: GET endpoint to serve the latest hardware-provided location data.
  - `/api/location`: POST endpoint for submitting location data (from both hardware and software modes).
  - `/api/pins`: GET and POST endpoints for managing location pin data.
  - `/api/ai-query`: POST endpoint to optionally log AI queries or assist with debugging (the actual AI processing is handled by the OpenAI API).
- **Data Storage:**
  - Use PostgreSQL to store location data and pin data with proper timestamping and indexing.
  - Maintain a clear schema that differentiates between hardware-sourced and software-sourced location data.
- **Data Consistency:**
  - Standardize the data format to ensure the mobile app can process both data sources uniformly.

### 3.4 AI Assistant Feature (OpenAI API Integration)
- **API Integration:**
  - Securely store the OpenAI API key (using environment variables or secure storage).
  - Develop a client module within the mobile app that sends user queries to the OpenAI API.
- **Functionalities:**
  - Parse natural language queries from the user.
  - Return intelligent responses, insights, or recommendations related to location tracking.
  - Examples include route summaries, suggestions for improvements, and clarifications of map features.
- **User Interaction Flow:**
  - **Initiation:** The user accesses the AI assistant via a dedicated chat icon or voice command.
  - **Query Submission:** The user inputs a question; the query is sent to the OpenAI API.
  - **Response Handling:** The AI’s response is displayed within the chat interface.
  - **Actionable Insights:** The user may choose to save suggestions or act on recommendations (e.g., adjusting the route or adding a new pin).

---

## 4. Non-Functional Requirements

### 4.1 Performance
- **Latency:**  
  - The system shall support near real-time updates (target update interval: 1–5 seconds) for both hardware and software modes.
  - The AI assistant response time should ideally be under a few seconds, acknowledging possible network delays.
  
- **Scalability:**  
  - The backend must handle concurrent requests from multiple devices efficiently.

### 4.2 Usability
- **Intuitive UI:**  
  - The mobile app shall feature a clear toggle for data source selection and an easy-to-use map interface.
  - The AI assistant interface shall be conversational, with clear prompts and responses.
  
- **Error Handling:**  
  - The app shall display user-friendly error messages for issues such as lack of permissions, network failures, or AI query errors.

### 4.3 Security
- **Data Transmission:**  
  - All communications (between hardware, mobile app, backend, and OpenAI API) shall use HTTPS.
  
- **API Key Management:**  
  - OpenAI API key and other sensitive credentials shall be stored securely and not hardcoded into the application.
  
- **Access Control:**  
  - The backend API endpoints shall implement authentication (e.g., token-based access) to prevent unauthorized use.

### 4.4 Reliability & Availability
- **Robustness:**  
  - The system should gracefully handle intermittent network issues by caching data locally until connectivity is restored.
  
- **High Availability:**  
  - Critical components (backend server and mapping API integrations) should be designed to minimize downtime.

---

## 5. Hardware Requirements

### 5.1 Core Components (Excluding Provided ESP32 and Arduino UNO)
- **GPS Module:**  
  - Example: U‑blox NEO‑6M (Estimated Cost: Rs. 520)
- **GSM/GPRS Module:**  
  - Example: SIM800L (Estimated Cost: Rs. 450)
- **Power Supply/Battery:**  
  - LiPo Battery (Estimated Cost: Rs. 500)
  - Battery Charging & Protection Module (TP4056) (Estimated Cost: Rs. 30)
- **Optional Sensor:**  
  - MPU6050 Accelerometer/Gyroscope (Estimated Cost: Rs. 100)
- **Prototyping Accessories:**  
  - Breadboard, Jumper Wires, Connectors (Estimated Cost: Rs. 200)
  - Enclosure (Estimated Cost: Rs. 100)
  - Voltage Regulators/Small Components (Estimated Cost: Rs. 50)

---

## 6. Software Requirements

### 6.1 Mobile Application
- **Platform:**  
  - React Native (JavaScript/TypeScript)
- **Key Libraries/Components:**  
  - Geolocation API (or `@react-native-community/geolocation`)
  - Mapping Library (e.g., React Native Maps integrated with Google Maps, Mapbox, or OpenStreetMap)
  - UI components for toggle/switch, buttons, error messages, and AI chat interface
- **AI Assistant Module:**  
  - Integration module for the OpenAI API to process natural language queries and return responses

### 6.2 Backend Server
- **Environment:**  
  - Node.js (with Express.js for RESTful API development)
- **Database:**  
  - PostgreSQL
- **Key Features:**  
  - API endpoints for receiving location data, serving stored data, handling pin management, and logging AI queries (if required)
  - JSON data formatting for interoperability between hardware and mobile sources

### 6.3 Communication & Integration
- **API Protocols:**  
  - RESTful APIs using HTTP/HTTPS
- **Data Format:**  
  - JSON structure for all location and pin data (including fields such as latitude, longitude, timestamp, mode, and device ID)
- **OpenAI Integration:**  
  - Secure connection to the OpenAI API for processing natural language queries

---

## 7. Interface Requirements

### 7.1 Mobile App to Backend
- **Endpoints:**  
  - `/api/hardware-location`: GET endpoint for fetching hardware device data.
  - `/api/location`: POST endpoint for submitting location data (from hardware or software modes).
  - `/api/pins`: GET and POST endpoints for managing user pins.
  - `/api/ai-query`: (Optional) POST endpoint for logging AI queries or responses for analytics.

### 7.2 Hardware Device to Backend
- **Communication Method:**  
  - GSM/GPRS (or WiFi) using AT command-driven communication
- **Data Payload Example:**
  ```json
  {
    "deviceId": "HW001",
    "latitude": 19.0760,
    "longitude": 72.8777,
    "timestamp": "2025-02-08T10:45:00Z",
    "mode": "hardware"
  }
  ```

### 7.3 Mapping Integration
- **Mapping API:**  
  - Integration with Google Maps, Mapbox, or OpenStreetMap to render routes and pins
- **Location Pin & Route Visualization:**  
  - The mobile app should render a polyline that connects successive location points and display pins as markers on the map.

### 7.4 AI Assistant Integration
- **Chat Interface:**  
  - A conversational interface within the mobile app for user queries.
- **OpenAI API Communication:**  
  - The mobile app sends user queries to the OpenAI API and displays the returned answer in the chat interface.

---

## 8. Assumptions and Dependencies

- **Internet Connectivity:**  
  - Required for data transmission between hardware, backend, mobile app, and OpenAI API.
- **Mobile Device Capabilities:**  
  - Modern smartphones with built-in GPS.
- **Hardware Availability:**  
  - The ESP32 and Arduino UNO are provided; additional hardware components will be procured based on cost estimates.
- **Third-Party API Usage:**  
  - Mapping APIs and the OpenAI API have usage limits or associated costs that must be managed.
- **Security & API Key Storage:**  
  - Sensitive keys (e.g., OpenAI API key) will be managed securely (via environment variables or secure storage solutions).

---

## 9. Constraints

- **Battery Life (Hardware Mode):**  
  - The custom hardware device is subject to battery limitations.
- **Network Latency:**  
  - GSM/GPRS transmission might introduce latency compared to direct mobile GPS access.
- **API Limits:**  
  - Third-party services (mapping and OpenAI) may impose limits on free usage tiers.
- **User Privacy:**  
  - Location and query data must be handled with appropriate privacy safeguards.

---

## 10. Future Enhancements

- **Offline Functionality:**  
  - Caching and offline map capabilities for low connectivity areas.
- **Enhanced AI Features:**  
  - Voice-based queries or additional AI-driven insights (e.g., predictive route analytics).
- **Additional Sensor Integration:**  
  - Extend hardware capabilities to include environmental sensors (e.g., temperature, humidity) for context-aware tracking.

---

## 11. User Flow Diagrams (Summary)

### A. Location Pin & Tracking (Common to Both Modes)
1. **User Launches App:**  
   - User opens the mobile application.
2. **Mode Selection:**  
   - User toggles between “Hardware Mode” and “Phone GPS Mode.”
3. **Start Tracking:**  
   - In Hardware Mode: App queries backend API for location data from the external device.  
   - In Software Mode: App starts native geolocation tracking.
4. **Real-Time Update:**  
   - The current location is continuously updated on an interactive map.
5. **Pin Management:**  
   - User taps on the map or uses a dedicated button to drop a pin.  
   - Pin data is immediately displayed and sent to the backend.
6. **Review/Playback:**  
   - User can access travel history and replay the route.

### B. AI Assistant Interaction
1. **Initiate AI Chat:**  
   - User taps an AI assistant icon (chat bubble or microphone).
2. **Submit Query:**  
   - User inputs (or speaks) a natural language query related to tracking (e.g., “What is my travel summary today?”).
3. **Process Query:**  
   - The app sends the query (with the stored OpenAI API key) to the OpenAI API.
4. **Receive and Display Response:**  
   - The response is displayed in a chat interface, offering insights or suggestions.
5. **Action:**  
   - User may act on the recommendation (e.g., adjusting their route or saving the suggestion).

---

## 12. Summary

This updated requirements document provides a comprehensive overview of a dual-mode location tracking system with an integrated AI assistant feature. The system supports:
- **Hardware Mode:** Using an externally built device to send location data.
- **Software Mode:** Leveraging the smartphone’s built-in GPS.
- **AI Assistant:** Integration of the OpenAI API to assist users with natural language queries and provide intelligent insights.

Both the location pin/tracking functionality and AI assistance are designed to offer a seamless and interactive experience, meeting the project requirements while showcasing versatility in combining hardware, mobile software, and AI capabilities.

---

This file serves as the baseline for further design, development, and testing. Feel free to modify or expand any section to match additional project specifics or professor requirements.