function FormSection({ formData, setFormData }) {
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSkillChange = (e) => {
    setFormData({ ...formData, newSkill: e.target.value });
  };

  const handleAddSkill = () => {
    if (formData.newSkill && !formData.skills.includes(formData.newSkill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, formData.newSkill],
        newSkill: '',
      });
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-4">Enter Your Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          name="jobTitle"
          placeholder="Job Title"
          value={formData.jobTitle}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
        <textarea
          name="bio"
          placeholder="Bio"
          value={formData.bio}
          onChange={handleInputChange}
          className="p-2 border rounded w-full col-span-2"
          rows="4"
        />
        <div className="col-span-2">
          <div className="flex gap-2">
            <input
              type="text"
              name="newSkill"
              placeholder="Add a skill"
              value={formData.newSkill || ''}
              onChange={handleSkillChange}
              className="p-2 border rounded w-full"
            />
            <button
              onClick={handleAddSkill}
              className="p-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add
            </button>
          </div>
          {formData.skills.length > 0 && (
            <ul className="mt-2">
              {formData.skills.map((skill, index) => (
                <li key={index} className="flex items-center justify-between p-1">
                  <span>{skill}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <input
          type="text"
          name="experience"
          placeholder="Experience (e.g., 5 years)"
          value={formData.experience}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
        <input
          type="text"
          name="contact"
          placeholder="Contact (e.g., email)"
          value={formData.contact}
          onChange={handleInputChange}
          className="p-2 border rounded w-full"
        />
      </div>
    </div>
  );
}

export default FormSection;