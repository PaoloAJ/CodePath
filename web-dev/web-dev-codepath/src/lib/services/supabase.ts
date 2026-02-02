import { getClient } from "../supabase/client";

// get all creators from database
export async function getAllCreators() {
  const supabase = getClient();
  return supabase.from("creators").select("*");
}

// get a single creator by id
export async function getCreator(id: string) {
  const supabase = getClient();
  return supabase.from("creators").select("*").eq("id", id).single();
}

// create a new creator
export async function createCreator(creator: {
  name: string;
  description: string;
  image_url?: string;
  linktree_link?: string;
}) {
  const supabase = getClient();
  return supabase.from("creators").insert([creator]).select();
}

// update an existing creator
export async function updateCreator(
  id: string,
  updates: {
    name?: string;
    description?: string;
    image_url?: string;
    linktree_link?: string;
  }
) {
  const supabase = getClient();
  return supabase.from("creators").update(updates).eq("id", id).select();
}

// delete a creator
export async function deleteCreator(id: string) {
  const supabase = getClient();
  return supabase.from("creators").delete().eq("id", id);
}
