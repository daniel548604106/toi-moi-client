const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    // reader.readAsBinaryString(file); // binaryString not working
    reader.onload = () => resolve(reader?.result.toString() || '');
    reader.readAsDataURL(file); // base64 readAsDataURL()回傳Base64編碼字串
    reader.onerror = (error) => reject(error);
  });
};

export default convertFileToBase64;
