import { useState, useEffect } from "react";
import { getAllCreators } from "../lib/services/supabase";
import { CreatorCard } from "../components/CreatorCard";
import { SupabaseClient } from "@supabase/supabase-js";

function ShowCreators() {
  const [creators, setCreators] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getAllCreators();

      if (error) {
        console.error("Error fetching creators:", error);
      } else {
        console.log("Fetched creators");
        setCreators(data);
      }
    };

    fetchData();
  }, []); // run on mount (Later change: update everytime new user added)

  return (
    <div>
      <h2>all creators</h2>
      {creators.length === 0 ? (
        <p style={{ textAlign: "center", color: "var(--pico-muted-color)" }}>
          no creators yet. add your first one!
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "1.5rem",
          }}
        >
          {creators.map((creator) => (
            <CreatorCard
              key={creator.id}
              id={creator.id}
              name={creator.name}
              bio={creator.description}
              imageUrl={creator.image_url}
              linktreeLink={creator.linktree_link}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default ShowCreators;
