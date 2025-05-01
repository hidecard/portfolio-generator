import jsPDF from 'jspdf';

function PortfolioPreview({ formData, selectedTemplate, portfolioUrl }) {
  const handleShare = () => {
    const shareableLink = `${window.location.href}#${btoa(JSON.stringify(formData))}`;
    navigator.clipboard.writeText(shareableLink);
    alert('Shareable link copied to clipboard!');
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Name: ${formData.name}`, 10, 10);
    doc.setFontSize(12);
    doc.text(`Job Title: ${formData.jobTitle}`, 10, 20);
    doc.text(`Bio: ${formData.bio}`, 10, 30, { maxWidth: 180 });
    doc.text(`Skills: ${formData.skills}`, 10, 50);
    doc.text(`Experience: ${formData.experience}`, 10, 60);
    doc.text(`Contact: ${formData.contact}`, 10, 70);
    doc.save('portfolio.pdf');
  };

  return (
    <div className={`mt-6 p-6 rounded-lg shadow-md ${selectedTemplate.bgColor}`}>
      <h2 className={`text-2xl font-bold ${selectedTemplate.textColor}`}>
        {formData.name || 'Your Name'}
      </h2>
      <p className={`text-lg ${selectedTemplate.textColor}`}>
        {formData.jobTitle || 'Job Title'}
      </p>
      <p className={`mt-2 ${selectedTemplate.textColor}`}>
        {formData.bio || 'Your bio goes here...'}
      </p>
      <p className={`mt-2 ${selectedTemplate.textColor}`}>
        <strong>Skills:</strong> {formData.skills || 'Your skills'}
      </p>
      <p className={`mt-2 ${selectedTemplate.textColor}`}>
        <strong>Experience:</strong> {formData.experience || 'Your experience'}
      </p>
      <p className={`mt-2 ${selectedTemplate.textColor}`}>
        <strong>Contact:</strong> {formData.contact || 'Your contact info'}
      </p>
      <div className="mt-4 flex flex-wrap gap-4">
        <a
          href={portfolioUrl}
          download="portfolio.json"
          className={`inline-block p-2 ${selectedTemplate.accentColor} text-white rounded hover:opacity-90`}
        >
          Download as JSON
        </a>
        <button
          onClick={handleShare}
          className={`p-2 ${selectedTemplate.accentColor} text-white rounded hover:opacity-90`}
        >
          Copy Shareable Link
        </button>
        <button
          onClick={handleDownloadPDF}
          className={`p-2 ${selectedTemplate.accentColor} text-white rounded hover:opacity-90`}
        >
          Download as PDF
        </button>
      </div>
    </div>
  );
}

export default PortfolioPreview;