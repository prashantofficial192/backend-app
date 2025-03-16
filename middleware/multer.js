import multer from 'multer';

// Set up multer memory storage to handle file uploads

const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({ storage }); // Set up multer with the storage engine we defined above

export default upload;
