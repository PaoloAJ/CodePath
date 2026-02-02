import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createCreator } from "../lib/services/supabase";

export default function AddCreators() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    linktree_link: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // update form fields as user types
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit form to create new creator
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const { data, error } = await createCreator(formData);

    if (error) {
      console.error("error creating creator:", error);
      alert("failed to create creator. please try again.");
    } else {
      console.log("creator created:", data);
      navigate("/");
    }

    setIsSubmitting(false);
  };

  return (
    <main className="container">
      <article>
        <header>
          <h1>add new creator</h1>
        </header>

        <form onSubmit={handleSubmit}>
          <label htmlFor="name">
            name
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="enter creator name"
            />
          </label>

          <label htmlFor="description">
            description
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="enter creator description"
            />
          </label>

          <label htmlFor="image_url">
            image url (optional)
            <input
              type="url"
              id="image_url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </label>

          <label htmlFor="linktree_link">
            linktree link (optional)
            <input
              type="url"
              id="linktree_link"
              name="linktree_link"
              value={formData.linktree_link}
              onChange={handleChange}
              placeholder="https://linktr.ee/username"
            />
          </label>

          <div className="grid">
            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "creating..." : "create creator"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="secondary"
            >
              cancel
            </button>
          </div>
        </form>
      </article>
    </main>
  );
}
