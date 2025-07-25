export interface Rating {
  id: string;
  foodId: string;
  userId?: string;
  rating: number; // 1-5 stars
  comment?: string;
  tags: string[]; // e.g., ['fresh', 'tasty', 'expired', 'waste']
  createdAt: Date;
  updatedAt: Date;
}

export interface RatingStats {
  averageRating: number;
  totalRatings: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
  commonTags: Array<{
    tag: string;
    count: number;
  }>;
}

export interface FeedbackItem {
  id: string;
  type: 'bug' | 'feature' | 'improvement' | 'general';
  title: string;
  description: string;
  rating: number;
  email?: string;
  deviceInfo?: string;
  appVersion: string;
  createdAt: Date;
  status: 'pending' | 'reviewed' | 'resolved';
}