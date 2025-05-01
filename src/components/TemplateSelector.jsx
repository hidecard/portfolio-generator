function TemplateSelector({ templates, selectedTemplate, setSelectedTemplate }) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
        <div className="flex space-x-4">
          {templates.map((template) => (
            <button
              key={template.id}
              onClick={() => setSelectedTemplate(template)}
              className={`p-4 rounded-lg ${template.bgColor} ${template.textColor} ${
                selectedTemplate.id === template.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              {template.name}
            </button>
          ))}
        </div>
      </div>
    );
  }
  
  export default TemplateSelector;