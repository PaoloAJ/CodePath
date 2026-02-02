import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  getCreator,
  updateCreator,
  deleteCreator,
} from "../lib/services/supabase";

export default function EditCreators() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image_url: "",
    linktree_link: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // fetch creator data when component loads
  useEffect(() => {
    const fetchCreator = async () => {
      if (!id) return;

      const { data, error } = await getCreator(id);

      if (error) {
        console.error("error fetching creator:", error);
        alert("failed to load creator");
        navigate("/");
      } else if (data) {
        setFormData({
          name: data.name || "",
          description: data.description || "",
          image_url: data.image_url || "",
          linktree_link: data.linktree_link || "",
        });
      }

      setIsLoading(false);
    };

    fetchCreator();
  }, [id, navigate]);

  // update form fields as user types
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // submit form to update creator
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    setIsSubmitting(true);

    const { data, error } = await updateCreator(id, formData);

    if (error) {
      console.error("error updating creator:", error);
      alert("failed to update creator. please try again.");
    } else {
      console.log("creator updated:", data);
      navigate("/");
    }

    setIsSubmitting(false);
  };

  // delete creator with confirmation
  const handleDelete = async () => {
    if (!id) return;

    const confirmed = window.confirm(
      "are you sure you want to delete this creator? this action cannot be undone."
    );

    if (!confirmed) return;

    const { error } = await deleteCreator(id);

    if (error) {
      console.error("error deleting creator:", error);
      alert("failed to delete creator. please try again.");
    } else {
      console.log("creator deleted");
      navigate("/");
    }
  };

  if (isLoading) {
    return (
      <main className="container">
        <p aria-busy="true">loading...</p>
      </main>
    );
  }

  return (
    <main className="container">
      <article>
        <header>
          <h1>edit creator</h1>
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
              {isSubmitting ? "updating..." : "update creator"}
            </button>
            <button
              type="button"
              onClick={() => navigate("/")}
              className="secondary"
            >
              cancel
            </button>
          </div>

          <button
            type="button"
            onClick={handleDelete}
            className="secondary"
            style={{
              marginTop: "2rem",
              width: "100%",
              color: "#dc2626",
              borderColor: "#dc2626",
            }}
          >
            delete creator
          </button>
        </form>
      </article>
    </main>
  );
}
