const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");

app.use(bodyParser.json());
app.use(cors());


const upload = multer({ storage: multer.memoryStorage() });
const user_id = 'Sparsh_kumar_Singour_19072002';
const email = 'sparshsingour1234@gmail.com';
const roll_number = '0101CS211117';

// Helper Functions
const isPrime = (num) => {
  if (num <= 1) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};
const extractAlphabets = (array) =>
  array.filter((item) => /^[a-zA-Z]$/.test(item));
const extractNumbers = (array) =>
  array.map(Number).filter((item) => !isNaN(item) && Number.isInteger(item));
const findHighestLowercase = (array) => {
  const lowercaseAlphabets = array.filter((char) => /^[a-z]$/.test(char));
  return lowercaseAlphabets.length > 0 ? lowercaseAlphabets.sort().pop() : [];
};

const decodeBase64File = (base64String) => {
  try {
    const buffer = Buffer.from(base64String, "base64");
    return {
      valid: true,
      sizeKB: (buffer.length / 1024).toFixed(2), 
      mimeType: "unknown" 
    };
  } catch {
    return { valid: false, sizeKB: null, mimeType: null };
  }
};

// POST 
app.post("/bfhl", upload.single("file"), (req, res) => {
  try {
    const { data, file_b64 } = req.body;

  
    const alphabets = extractAlphabets(data);
    const numbers = extractNumbers(data);
    const highest_lowercase_alphabet = findHighestLowercase(alphabets);
    const is_prime_found = numbers.some(isPrime);

   
    const fileDetails = file_b64
      ? decodeBase64File(file_b64)
      : { valid: false };

    // Response
    res.status(200).json({
        status: 'success',
        user_id,
        email,
        roll_number,
        numbers,
        alphabets,
        highest_lowercase_alphabet,
        is_prime_found,
        file_valid: fileDetails.valid,
        file_mimetype: fileDetails.mimeType,
        file_size_kb: fileDetails.sizeKB,      
      });
  } catch (error) {
    res.status(400).json({ is_success: false, message: error.message });
  }
});

app.get("/bfhl", (req, res) => {
  res.status(200).json({ operation_code: 1 });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

});