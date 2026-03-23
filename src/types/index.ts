export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
  phone: string;
  profileImage: string;
  wishlist: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Property {
  _id: string;
  title: string;
  description: string;
  type: "buy" | "sell" | "rent" | "commercial" | "plot";
  price: number;
  location: {
    address: string;
    city: string;
    province: string;
  };
  area: {
    size: number;
    unit: "marla" | "kanal" | "sqft" | "sqm";
  };
  features: {
    bedrooms: number;
    bathrooms: boolean;
    parking: boolean;
    furnished: boolean;
  };
  images: {
    url: string;
    public_id: string;
  }[];
  status: "active" | "sold" | "rented";
  postedBy: User;
  views: number;
  isFeatured: boolean;
  createdAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
    token: string;
  };
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
  total?: number;
  page?: number;
  pages?: number;
}