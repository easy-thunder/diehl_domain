import { supabase } from './supabaseClient';

export async function getUserProfile(userId: string) {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }
  if (!data) {
    console.warn(`No user found in 'users' table for ID: ${userId}`);
  }

  return data;
}