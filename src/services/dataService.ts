
import { supabase } from '@/lib/supabase';

export interface LoanProduct {
  id: string;
  title: string;
  description: string;
  rate: string;
  features: string[];
  imageUrl: string;
  category: string;
}

export interface HomeContent {
  heroTitle: string;
  heroSubtitle: string;
  heroImageUrl: string;
  featuredTitle: string;
  featuredDescription: string;
  whyChooseUsTitle: string;
  whyChooseUsDescription: string;
  ctaTitle: string;
  ctaDescription: string;
}

export interface FeatureCard {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  businessHours: string[];
  mapEmbedUrl: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  missionTitle: string;
  missionDescription: string;
  visionTitle: string;
  visionDescription: string;
  teamMembers: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  bio: string;
  imageUrl: string;
}

// Fetch loan products
export const getLoanProducts = async (): Promise<LoanProduct[]> => {
  const { data, error } = await supabase
    .from('loan_products')
    .select('*');

  if (error) {
    console.error('Error fetching loan products:', error);
    return [];
  }

  return data as LoanProduct[];
};

// Fetch home page content
export const getHomeContent = async (): Promise<HomeContent | null> => {
  const { data, error } = await supabase
    .from('home_content')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching home content:', error);
    return null;
  }

  return data as HomeContent;
};

// Fetch feature cards for home page
export const getFeatureCards = async (): Promise<FeatureCard[]> => {
  const { data, error } = await supabase
    .from('feature_cards')
    .select('*');

  if (error) {
    console.error('Error fetching feature cards:', error);
    return [];
  }

  return data as FeatureCard[];
};

// Fetch contact information
export const getContactInfo = async (): Promise<ContactInfo | null> => {
  const { data, error } = await supabase
    .from('contact_info')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching contact info:', error);
    return null;
  }

  return data as ContactInfo;
};

// Fetch about page content
export const getAboutContent = async (): Promise<AboutContent | null> => {
  const { data, error } = await supabase
    .from('about_content')
    .select('*')
    .single();

  if (error) {
    console.error('Error fetching about content:', error);
    return null;
  }

  return data as AboutContent;
};

// Fetch team members for about page
export const getTeamMembers = async (): Promise<TeamMember[]> => {
  const { data, error } = await supabase
    .from('team_members')
    .select('*');

  if (error) {
    console.error('Error fetching team members:', error);
    return [];
  }

  return data as TeamMember[];
};

// Create or update loan product
export const upsertLoanProduct = async (product: LoanProduct): Promise<LoanProduct | null> => {
  const { data, error } = await supabase
    .from('loan_products')
    .upsert(product)
    .select()
    .single();

  if (error) {
    console.error('Error upserting loan product:', error);
    return null;
  }

  return data as LoanProduct;
};

// Delete loan product
export const deleteLoanProduct = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('loan_products')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting loan product:', error);
    return false;
  }

  return true;
};

// Update home content
export const updateHomeContent = async (content: HomeContent): Promise<HomeContent | null> => {
  const { data, error } = await supabase
    .from('home_content')
    .upsert(content)
    .select()
    .single();

  if (error) {
    console.error('Error updating home content:', error);
    return null;
  }

  return data as HomeContent;
};

// Create or update feature card
export const upsertFeatureCard = async (card: FeatureCard): Promise<FeatureCard | null> => {
  const { data, error } = await supabase
    .from('feature_cards')
    .upsert(card)
    .select()
    .single();

  if (error) {
    console.error('Error upserting feature card:', error);
    return null;
  }

  return data as FeatureCard;
};

// Delete feature card
export const deleteFeatureCard = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('feature_cards')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting feature card:', error);
    return false;
  }

  return true;
};

// Update contact information
export const updateContactInfo = async (info: ContactInfo): Promise<ContactInfo | null> => {
  const { data, error } = await supabase
    .from('contact_info')
    .upsert(info)
    .select()
    .single();

  if (error) {
    console.error('Error updating contact info:', error);
    return null;
  }

  return data as ContactInfo;
};

// Update about content
export const updateAboutContent = async (content: AboutContent): Promise<AboutContent | null> => {
  const { data, error } = await supabase
    .from('about_content')
    .upsert(content)
    .select()
    .single();

  if (error) {
    console.error('Error updating about content:', error);
    return null;
  }

  return data as AboutContent;
};

// Create or update team member
export const upsertTeamMember = async (member: TeamMember): Promise<TeamMember | null> => {
  const { data, error } = await supabase
    .from('team_members')
    .upsert(member)
    .select()
    .single();

  if (error) {
    console.error('Error upserting team member:', error);
    return null;
  }

  return data as TeamMember;
};

// Delete team member
export const deleteTeamMember = async (id: string): Promise<boolean> => {
  const { error } = await supabase
    .from('team_members')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting team member:', error);
    return false;
  }

  return true;
};
