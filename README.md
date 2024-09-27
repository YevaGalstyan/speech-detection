# Azure Speech Service Integration in Angular - Testing App

This repository contains a small Angular application that demonstrates the integration of Azure Cognitive Services for speech recognition and speech synthesis. The application uses Azure's voice detection AI to interact with users via text-to-speech and speech-to-text functionalities. This project is intended for testing and demonstration purposes.

See post in [Porfolio](https://yeva-galstyan.vercel.app/work/1)

## Features

- **Text-to-Speech**: Converts text prompts to speech using Azure's Speech Service and plays the audio output.
- **Speech-to-Text**: Listens to the user's speech through the microphone and converts it to text, filling in the specified form fields.
- **Form Autofill**: Automatically fills in form fields such as first name, last name, and age based on user speech input.

## Getting Started

### Prerequisites

- Node.js (version 12 or higher)
- Angular CLI (version 12 or higher)
- An Azure account with a Speech Service resource

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/YevaGalstyan/speech-detection.git
    cd speech-detection
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Set up Azure Speech Service**:
    - Sign in to the [Azure Portal](https://portal.azure.com/).
    - Create a new Speech Service resource.
    - Note down the subscription key and service region.

4. **Configure the application**:
    - Open `src/app/speech.service.ts`.
    - Replace `"6d345534e918442f8dc7a8e1c0df8b53"` with your Azure Speech Service subscription key.
    - Replace `"westeurope"` with your Azure service region.

    ```typescript
    const speechConfig = SpeechConfig.fromSubscription("your_subscription_key", "your_service_region");
    ```

5. **Run the application**:
    ```bash
    ng serve
    ```
    - Navigate to `http://localhost:4200/` in your web browser.

### Usage

1. Enter the form control names for first name, last name, and age.
2. The application will use text-to-speech to prompt you to say the values for these fields.
3. Speak the required information when prompted.
4. The application will use speech-to-text to recognize your speech and fill in the form fields automatically.

### License

This project is licensed under the Apache License, Version 2.0. See the [LICENSE](LICENSE) file for more details.
