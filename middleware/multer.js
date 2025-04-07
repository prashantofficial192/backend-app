import multer from 'multer';

const storage = multer.memoryStorage(); // Store files in memory

const upload = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // Max 10 MB per file (optional)
    },
    fileFilter: (req, file, cb) => {
        // Optional: accept only certain file types
        if (file.mimetype.startsWith('image/')) {
            cb(null, true);
        } else {
            cb(new Error('Only image files are allowed!'), false);
        }
    }
});

// Export pre-configured functions for flexible usage
export default {
    single: fieldName => upload.single(fieldName),
    array: (fieldName, maxCount = 5) => upload.array(fieldName, maxCount),
    fields: fieldsConfig => upload.fields(fieldsConfig),
    any: () => upload.any(),
};
