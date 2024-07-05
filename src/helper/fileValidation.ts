function fileValidation(file, response){
    if (!file || !file.buffer || !file.originalname) {
        return response.status(400).json({ message: 'file corrupted' });
      }
      //bot.sendMessage('-1002111028526', 'Hola desde tu bot!');
      if (!['image/png', 'image/jpg', 'image/jpeg'].includes(file.mimetype)) {
        return response.status(400).json({ message: 'file type mismatch' });
      }
}
export default fileValidation;