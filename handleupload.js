const handleUpload = async (selectedFile, setAnalysisResult) => {
    if (!selectedFile) {
      alert("Please select your resume");
      return;
    }
  
    const formData = new FormData();
    formData.append("resume", selectedFile);
  
    try {
      const response = await fetch("http://localhost:3000/analyze-resume", {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("File analysis failed.");
      }
  
      const data = await response.json();
      console.log("Server Response:", data);
  
      setAnalysisResult(data.message); // Update state in the parent component
    } catch (error) {
      console.error("Error analyzing file:", error);
      alert("Error analyzing file.");
    }
  };
  
  export default handleUpload;
  