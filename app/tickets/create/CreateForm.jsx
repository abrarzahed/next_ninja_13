"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const CreateForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    priority: "low",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // reset form data
  const resetForm = () => {
    setFormData({
      title: "",
      body: "",
      priority: "low",
    });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // setError(false);
    setIsLoading(true);
    const ticket = {
      title: formData.title,
      body: formData.body,
      priority: formData.priority,
      user_email: "abc@user.com",
    };

    const res = await fetch(" http://localhost:4000/tickets", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(ticket),
    });
    if (res.status === 201) {
      resetForm();
      router.refresh();
      router.push("/tickets");
    } else {
      setError(true);
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="w-1/2">
      <label>
        <span>Title:</span>
        <input
          required
          type="text"
          name="title"
          onChange={handleInputChange}
          value={formData.title}
        />
      </label>
      <label>
        <span>Body:</span>
        <textarea
          required
          name="body"
          onChange={handleInputChange}
          value={formData.body}
        />
      </label>
      <label>
        <span>Priority:</span>
        <select
          name="priority"
          onChange={handleInputChange}
          value={formData.priority}
        >
          <option value="low">Low Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="high">High Priority</option>
        </select>
      </label>
      <button className="btn-primary" disabled={isLoading}>
        {isLoading && <span>Adding...</span>}
        {!isLoading && <span>Add Ticket</span>}
      </button>
      {error && (
        <small className="text-red-500 text-center block mt-3">
          There was an error adding ticket
        </small>
      )}
    </form>
  );
};

export default CreateForm;
