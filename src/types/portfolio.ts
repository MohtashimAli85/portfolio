export interface PortfolioItem {
  id: string;
  slug: string;
  title: string;
  content: string;
  order?: number;
}

export interface PortfolioCategoryFolder {
  name: string;
  items: PortfolioItem[];
  color: string;
}

export interface PortfolioFolder extends PortfolioCategoryFolder {
  folderName: string;
}

export interface PortfolioData {
  professional: {
    experience: PortfolioCategoryFolder;
    skills: PortfolioCategoryFolder;
  };
  personal: {
    bio: PortfolioCategoryFolder;
    interests: PortfolioCategoryFolder;
    education: PortfolioCategoryFolder;
  };
  hobbies: {
    overview: PortfolioCategoryFolder;
    activities: PortfolioCategoryFolder;
  };
}

export type CategoryType = keyof PortfolioData;
