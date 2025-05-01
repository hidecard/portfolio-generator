function FormSection({ formData, setFormData }) {
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
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
          <input
            type="text"
            name="skills"
            placeholder="Skills (comma-separated)"
            value={formData.skills}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
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
            className="p-2 border rounded w-full col-span-2"
          />
        </div>
      </div>
    );
  }
  
  export default FormSection;