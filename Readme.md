
# LinkedIn AI Chrome Extension

This Chrome extension enhances LinkedIn messaging by providing an AI-based suggestion interface. Users can interact with a modal to generate a predefined response and insert it into the message input field.

## Key Features:
1. **AI Icon Visibility**:
   - The AI icon appears when the LinkedIn message input field is focused.
   - The icon disappears when the input field is no longer focused.

2. **Modal Interaction**:
   - Clicking the icon triggers a modal, which appears in the center of the screen.
   - Clicking outside the modal will close it.

3. **Modal Input & Static Response**:
   - Users can input a command in the modal and click "Generate" to show a static response.
   - The response is: 
     ```
     "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask."
     ```

4. **Generate and Insert Button**:
   - Clicking the "Insert" button pastes the static response into the LinkedIn message input field.
   - Supports both the **button click** and **pressing the Enter key** to insert the text.

## Edge Cases and Enhancements:
- **Disabled Icon Selection**: The AI icon is not selectable or draggable, ensuring smooth UX without accidental interactions.
- **Dynamic Icon Positioning**: The icon always appears next to the most recently focused chat field.
- **Generate Text via `Enter` Key**: The extension allows users to generate text by pressing Enter or clicking the button.

## Demo Video:

Check out the working demo of the extension here:

![LinkedIn AI Extension Demo](https://github.com/user-attachments/assets/721a1e20-d2b8-4b5e-84fa-e570a422dfca)


## Installation and Usage:

1. **Clone the Repository**:
   ```bash
   git clone git@github.com:AKsHaT123456A/chatgpt_writer_task.git
   cd chatgpt_writer_task
   ```

2. **Install Dependencies**:
   Ensure you have Node.js and npm/yarn installed, then run:
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Build the Extension**:
   Use the WXT CLI to build the project:
   ```bash
   npm run build:wxt
   # or
   yarn build:wxt
   ```
4.**Start the Extension**:
   Use the WXT CLI to build the project:
   ```bash
   npm run dev
   # or
   npm run dev:firefox
   ```
4. **Load the Extension in Chrome**:
   - Go to `chrome://extensions` in your browser.
   - Enable **Developer Mode**.
   - Click on **Load unpacked** and select the `dist/` folder inside your project directory.

5. **Use the Extension**:
   - Open LinkedIn and go to the message input field.
   - The AI icon will appear when you click on the message field.

## Known Issues:
- The "Regenerate" button is currently non-functional as specified in the task requirements.
- If LinkedIn updates its DOM structure or class names, the extension may need to be updated accordingly.

## Future Improvements:
- Implement dynamic response generation via an API.
- Add customizable templates for common responses.
- Extend support for platforms like Gmail or Slack.

## Constraints:
- **WXT Framework**: The project uses [**WXT Framework**](https://wxt.dev/).
- **React with TypeScript**: TypeScript provides type safety and improves reliability.
- **Tailwind CSS**: For styling, Tailwind CSS is used to ensure a consistent UI.

## License:
This project is licensed under the MIT License. See the `LICENSE` file for details.
