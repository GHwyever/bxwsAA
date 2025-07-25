import AsyncStorage from '@react-native-async-storage/async-storage';
import { Rating, RatingStats, FeedbackItem } from '@/types/rating';

const STORAGE_KEYS = {
  RATINGS: 'ratings',
  FEEDBACK: 'feedback',
};

class RatingStorage {
  // Rating methods
  async getAllRatings(): Promise<Rating[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.RATINGS);
      if (data) {
        const ratings = JSON.parse(data);
        return ratings.map((rating: any) => ({
          ...rating,
          createdAt: new Date(rating.createdAt),
          updatedAt: new Date(rating.updatedAt),
        }));
      }
      return [];
    } catch (error) {
      console.error('Failed to load ratings:', error);
      return [];
    }
  }

  async getRatingsByFoodId(foodId: string): Promise<Rating[]> {
    try {
      const ratings = await this.getAllRatings();
      return ratings.filter(rating => rating.foodId === foodId);
    } catch (error) {
      console.error('Failed to get ratings by food ID:', error);
      return [];
    }
  }

  async addRating(rating: Rating): Promise<void> {
    try {
      const ratings = await this.getAllRatings();
      ratings.push(rating);
      await AsyncStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings));
    } catch (error) {
      console.error('Failed to add rating:', error);
      throw error;
    }
  }

  async updateRating(updatedRating: Rating): Promise<void> {
    try {
      const ratings = await this.getAllRatings();
      const index = ratings.findIndex(rating => rating.id === updatedRating.id);
      if (index !== -1) {
        ratings[index] = { ...updatedRating, updatedAt: new Date() };
        await AsyncStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(ratings));
      }
    } catch (error) {
      console.error('Failed to update rating:', error);
      throw error;
    }
  }

  async deleteRating(id: string): Promise<void> {
    try {
      const ratings = await this.getAllRatings();
      const filteredRatings = ratings.filter(rating => rating.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.RATINGS, JSON.stringify(filteredRatings));
    } catch (error) {
      console.error('Failed to delete rating:', error);
      throw error;
    }
  }

  async getRatingStats(foodId?: string): Promise<RatingStats> {
    try {
      let ratings = await this.getAllRatings();
      
      if (foodId) {
        ratings = ratings.filter(rating => rating.foodId === foodId);
      }

      if (ratings.length === 0) {
        return {
          averageRating: 0,
          totalRatings: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
          commonTags: [],
        };
      }

      const totalRatings = ratings.length;
      const averageRating = ratings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings;

      const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
      ratings.forEach(rating => {
        ratingDistribution[rating.rating as keyof typeof ratingDistribution]++;
      });

      // Calculate common tags
      const tagCounts: { [key: string]: number } = {};
      ratings.forEach(rating => {
        rating.tags.forEach(tag => {
          tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
      });

      const commonTags = Object.entries(tagCounts)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      return {
        averageRating,
        totalRatings,
        ratingDistribution,
        commonTags,
      };
    } catch (error) {
      console.error('Failed to get rating stats:', error);
      return {
        averageRating: 0,
        totalRatings: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
        commonTags: [],
      };
    }
  }

  // Feedback methods
  async getAllFeedback(): Promise<FeedbackItem[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.FEEDBACK);
      if (data) {
        const feedback = JSON.parse(data);
        return feedback.map((item: any) => ({
          ...item,
          createdAt: new Date(item.createdAt),
        }));
      }
      return [];
    } catch (error) {
      console.error('Failed to load feedback:', error);
      return [];
    }
  }

  async addFeedback(feedback: FeedbackItem): Promise<void> {
    try {
      const feedbackList = await this.getAllFeedback();
      feedbackList.push(feedback);
      await AsyncStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(feedbackList));
    } catch (error) {
      console.error('Failed to add feedback:', error);
      throw error;
    }
  }

  async deleteFeedback(id: string): Promise<void> {
    try {
      const feedbackList = await this.getAllFeedback();
      const filteredFeedback = feedbackList.filter(item => item.id !== id);
      await AsyncStorage.setItem(STORAGE_KEYS.FEEDBACK, JSON.stringify(filteredFeedback));
    } catch (error) {
      console.error('Failed to delete feedback:', error);
      throw error;
    }
  }

  async clearAllRatings(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.RATINGS);
      await AsyncStorage.removeItem(STORAGE_KEYS.FEEDBACK);
    } catch (error) {
      console.error('Failed to clear ratings:', error);
      throw error;
    }
  }
}

export const ratingStorage = new RatingStorage();