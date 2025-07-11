export enum ProductCategory {
  FOOD = "The Food",
  FLOWER = "The Flower",
  GROW_CLUB = "The Grow Club",
  ACCESSORIES = "Accessories"
}

export enum FlowerType {
  CBD = "CBD Flower",
  THC = "THC Flower"
}

export enum FoodType {
  BREAKFAST = "Breakfast",
  BREAKFAST_ADD_ONS = "Breakfast Add-ons / Build Your Own",
  TAPAS_LUNCH = "Tapas / Lunch",
  BURGERS = "Burgers",
  CAFE_COFFEE = "Café Coffee"
}

export interface Product {
  _id: string; // Added for MongoDB or backend compatibility
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
  subCategory?: FlowerType | FoodType;
  stock: number;
  vendor: string;
  details?: string; // e.g., "Sativa - CBD 20% and THC 0-1%"
}

export interface CartItem extends Product {
  quantity: number;
}

export interface SubscriptionTier {
  id: string;
  level: string;
  pricePerMonth: number;
  benefits: string[];
  productSummary: {
    flower: string;
    treats: string;
    seeds: string;
  };
}

export interface User {
  id: string;
  email: string;
  name?: string;
  subscribedToNewsletter?: boolean; // Renamed for clarity from 'subscribed'
  subscriptionTierId?: string | null;
  subscriptionTierName?: string | null;
}

export interface Business {
  id: string;
  name: string;
  // products would be managed via a product service
}
