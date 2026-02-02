import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal } from "./Modal";
import { deleteCreator } from "../lib/services/supabase";

interface CreatorCardProps {
  id: string;
  name: string;
  bio: string;
  imageUrl?: string;
  linktreeLink?: string;
}

export function CreatorCard({
  id,
  name,
  bio,
  imageUrl,
  linktreeLink,
}: CreatorCardProps) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  // navigate to edit page for this creator
  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigate(`/edit/${id}`);
  };

  // delete creator with confirmation
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `are you sure you want to delete ${name}? this action cannot be undone.`
    );

    if (!confirmed) return;

    const { error } = await deleteCreator(id);

    if (error) {
      console.error("error deleting creator:", error);
      alert("failed to delete creator. please try again.");
    } else {
      console.log("creator deleted");
      setIsModalOpen(false);
      window.location.reload(); // refresh to show updated list
    }
  };

  return (
    <>
      <article
        onClick={handleCardClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          cursor: "pointer",
          position: "relative",
          minHeight: "400px",
          display: "flex",
          flexDirection: "column",
          transform: isHovered ? "translateY(-4px)" : "translateY(0)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
          boxShadow: isHovered
            ? "0 8px 16px rgba(0, 0, 0, 0.1)"
            : "0 2px 4px rgba(0, 0, 0, 0.05)",
        }}
      >
        <button
          onClick={handleEditClick}
          className="contrast"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            padding: "0.5rem",
            width: "auto",
            zIndex: 10,
          }}
          aria-label="edit creator"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
          </svg>
        </button>

        {imageUrl && (
          <div
            style={{
              width: "100%",
              height: "200px",
              overflow: "hidden",
              borderRadius: "var(--pico-border-radius)",
              marginBottom: "1rem",
            }}
          >
            <img
              src={imageUrl}
              alt={`${name}'s image`}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        )}

        <header>
          <h3 style={{ marginBottom: "0.5rem" }}>{name}</h3>
        </header>

        <p style={{ flex: 1, color: "var(--pico-muted-color)" }}>{bio}</p>

        {linktreeLink && (
          <footer style={{ marginTop: "auto", paddingTop: "1rem" }}>
            <a
              href={linktreeLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.9rem",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
              linktree
            </a>
          </footer>
        )}
      </article>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <article>
          {imageUrl && (
            <div
              style={{
                width: "100%",
                maxHeight: "300px",
                overflow: "hidden",
                borderRadius: "var(--pico-border-radius)",
                marginBottom: "1.5rem",
              }}
            >
              <img
                src={imageUrl}
                alt={`${name}'s image`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>
          )}

          <header>
            <h2>{name}</h2>
          </header>

          <p style={{ color: "var(--pico-muted-color)", lineHeight: "1.6" }}>
            {bio}
          </p>

          {linktreeLink && (
            <div style={{ marginTop: "1.5rem" }}>
              <a
                href={linktreeLink}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                  <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                </svg>
                visit linktree
              </a>
            </div>
          )}

          <footer style={{ marginTop: "2rem" }}>
            <div className="grid">
              <button
                className="secondary"
                onClick={() => setIsModalOpen(false)}
              >
                close
              </button>
              <button className="contrast" onClick={handleEditClick}>
                edit
              </button>
            </div>
            <button
              className="secondary"
              onClick={handleDelete}
              style={{
                marginTop: "1rem",
                width: "100%",
                color: "#dc2626",
                borderColor: "#dc2626",
              }}
            >
              delete
            </button>
          </footer>
        </article>
      </Modal>
    </>
  );
}

export default CreatorCard;
