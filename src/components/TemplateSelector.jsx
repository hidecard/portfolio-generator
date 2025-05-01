function TemplateSelector({ templates, selectedTemplate, setSelectedTemplate, customTheme, setCustomTheme }) {
  const handleCustomColorChange = (e) => {
    const { name, value } = e.target;
    setCustomTheme({ ...customTheme, [name]: value });
    if (selectedTemplate.id === 'custom') {
      setSelectedTemplate({
        id: 'custom',
        name: 'Custom',
        bgColor: customTheme.bgColor,
        textColor: customTheme.textColor,
        accentColor: customTheme.accentColor,
      });
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Choose a Template</h2>
      <div className="flex flex-wrap gap-4 mb-4">
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
        <button
          onClick={() =>
            setSelectedTemplate({
              id: 'custom',
              name: 'Custom',
              bgColor: customTheme.bgColor,
              textColor: customTheme.textColor,
              accentColor: customTheme.accentColor,
            })
          }
          className={`p-4 rounded-lg ${customTheme.bgColor} ${customTheme.textColor} ${
            selectedTemplate.id === 'custom' ? 'ring-2 ring-blue-500' : ''
          }`}
        >
          Custom
        </button>
      </div>
      {/* Color Pickers for Custom Theme */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Background Color</label>
          <input
            type="color"
            name="bgColor"
            value={customTheme.bgColor}
            onChange={handleCustomColorChange}
            className="w-full h-10 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Text Color</label>
          <input
            type="color"
            name="textColor"
            value={customTheme.textColor}
            onChange={handleCustomColorChange}
            className="w-full h-10 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Accent Color</label>
          <input
            type="color"
            name="accentColor"
            value={customTheme.accentColor}
            onChange={handleCustomColorChange}
            className="w-full h-10 rounded"
          />
        </div>
      </div>
    </div>
  );
}

export default TemplateSelector;