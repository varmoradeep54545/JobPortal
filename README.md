# JobPortal

JobPortal is a Node.js-based application that allows users to submit job applications with their CVs and retrieve submitted applications. The project uses **Express.js**, **MongoDB**, and **Multer** for file uploads.

## Features
- Submit job application forms with CV uploads.
- Store application data in MongoDB.
- Download uploaded CVs.
- Fetch all job applications.

## Technologies Used
- Node.js
- Express.js
- MongoDB (Mongoose)
- Multer (for file uploads)
- dotenv
- Cors
- Body-parser

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/your-username/JobPortal.git
   ```
2. Navigate to the project directory:
   ```sh
   cd JobPortal
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Set up environment variables:
   Create a `.env` file in the root directory and add the following:
   ```env
   PORT=4000
   MONGO_URI=your-mongodb-connection-string
   ```
5. Start the server:
   ```sh
   npm start
   ```
   The server will run on `http://localhost:4000`

## API Endpoints

### Submit Application Form (with CV upload)
- **Endpoint:** `POST /api/form`
- **Description:** Submits a job application with a CV.
- **Headers:** `Content-Type: multipart/form-data`
- **Body Parameters:**
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "contactnumber": "1234567890",
    "noticeperiod": "2 months",
    "joblocation": "New York",
    "currentorganization": "ABC Corp",
    "currentCTC": "50000",
    "expectedCTC": "60000",
    "experienceYearsandMonths": "5 years"
  }
  ```
- **File:** `uploadCV` (CV in PDF/DOC format)
- **Response:**
  ```json
  {
    "response": { "_id": "<application_id>" },
    "message": "Form Submitted successfully"
  }
  ```

### Download Uploaded CV
- **Endpoint:** `GET /api/form/:id/download`
- **Description:** Downloads the CV of a submitted application.
- **Example:**
  ```sh
  curl -O http://localhost:4000/api/form/65a4bc123f1b6a7891/download
  ```

### Get All Applications
- **Endpoint:** `GET /api/form`
- **Description:** Fetches all job applications.
- **Response:**
  ```json
  [
    {
      "_id": "65a4bc123f1b6a7891",
      "name": "John Doe",
      "email": "johndoe@example.com",
      "contactnumber": "1234567890",
      "noticeperiod": "2 months",
      "joblocation": "New York",
      "currentorganization": "ABC Corp",
      "currentCTC": "50000",
      "expectedCTC": "60000",
      "experienceYearsandMonths": "5 years"
    }
  ]
  ```

## License
This project is licensed under the MIT License.

## Contact
For any inquiries, reach out to pateldeep545454@gmail.com.

