export interface NavItem {
  label: string;
  href: string;
}

export interface PortfolioItem {
  id: number;
  title: string;
  category: string;
  image: string;
  githubUrl: string;
}

export interface ServiceItem {
  id: number;
  icon: string;
  title: string;
  description: string;
}

export interface SkillItem {
  label: string;
  percentage: number;
}

export interface ExperienceItem {
  id: number;
  company: string;
  logo: string;
  location: string;
  period: string;
  description: string;
}

export interface CommunityItem {
  id: number;
  name: string;
  logo: string;
}

export interface ContactFormData {
  name: string;
  phone: string;
  email: string;
  message: string;
}
