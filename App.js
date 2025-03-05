import React, { useState } from "react";
import "./App.css";

const ResumeChecker = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [analysisResult, setAnalysisResult] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select your resume");
      return;
    }

    const formData = new FormData();
    formData.append("resume", selectedFile);

    try {
      const response = await fetch("/analyze-resume", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setAnalysisResult(data.message);
      } else {
        alert("File analysis failed.");
      }
    } catch (error) {
      console.error("Error analyzing file:", error);
      alert("Error analyzing file.");
    }
  };
  
      
  return (
    <div>&nbsp;<h1><br></br>&nbsp;For Qualification</h1>
    
      <center>
      <h1>Upload Your Resume for Analysis</h1></center><center>
      <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} /><br></br>
      {selectedFile && <p>choose resume {selectedFile.name}</p>}</center><br></br><br></br>
      <center><button   onClick={handleUpload}>Upload & Analyze</button></center>
      {analysisResult && (
        <div>
          <h3>Analysis Result:</h3>
          <p>{analysisResult}</p>
        </div>
      )}
    </div>
  );
};

export default ResumeChecker;

