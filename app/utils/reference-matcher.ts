import { bookReferences, articleReferences, podcastReferences, videoReferences } from '../data/references-data';

interface Area {
  score: number;
  feedback: string;
}

interface Areas {
  clarity: Area;
  technical_skills: Area;
  innovation: Area;
  user_focus: Area;
  storytelling: Area;
}

export interface BookReference {
  title: string;
  author: string;
  summary: string;
  image: string;
  link: string;
  tags: string[];
  relevance_categories: string[];
}

interface ScoredBookReference extends BookReference {
  relevanceScore: number;
}

// Function to calculate relevance score for a book based on feedback areas
function calculateBookRelevance(book: BookReference, areas: Areas): number {
  let score = 0;
  
  // Score based on matching categories with low-scoring areas
  for (const [areaName, areaData] of Object.entries(areas)) {
    // Lower scores in feedback areas mean we need more help in those areas
    // So we give higher relevance to books that match those areas
    if (areaData.score < 7 && book.relevance_categories.includes(areaName)) {
      // The lower the score, the more relevant the book
      score += (7 - areaData.score) * 2;
    }
  }

  // Additional points for books that match multiple relevant categories
  const matchingCategories = book.relevance_categories.filter(category => 
    areas[category as keyof Areas]?.score < 7
  );
  score += matchingCategories.length * 2;

  return score;
}

// Function to extract keywords from feedback
function extractKeywords(feedback: string): string[] {
  const keywords = feedback.toLowerCase()
    .replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '')
    .split(' ')
    .filter(word => word.length > 3);
  return [...new Set(keywords)]; // Remove duplicates
}

// Function to calculate keyword relevance
function calculateKeywordRelevance(book: BookReference, keywords: string[]): number {
  let score = 0;
  
  // Check tags
  for (const tag of book.tags) {
    if (keywords.some(keyword => tag.toLowerCase().includes(keyword))) {
      score += 2;
    }
  }
  
  // Check title and summary
  for (const keyword of keywords) {
    if (book.title.toLowerCase().includes(keyword)) score += 3;
    if (book.summary.toLowerCase().includes(keyword)) score += 1;
  }
  
  return score;
}

export interface RecommendedReferences {
  books: BookReference[];
  articles: BookReference[];
  podcasts: BookReference[];
  videos: BookReference[];
}

export function findRelevantReferences(
  areas: Areas, 
  feedbackText: string, 
  maxBooks: number = 3,
  maxArticles: number = 3,
  maxPodcasts: number = 3,
  maxVideos: number = 3
): RecommendedReferences {
  const scoredBooks = bookReferences.map(book => ({
    ...book,
    relevanceScore: calculateBookRelevance(book, areas) + 
                    calculateKeywordRelevance(book, extractKeywords(feedbackText))
  }));

  const scoredArticles = articleReferences.map(article => ({
    ...article,
    relevanceScore: calculateBookRelevance(article, areas) + 
                    calculateKeywordRelevance(article, extractKeywords(feedbackText))
  }));

  const scoredPodcasts = podcastReferences.map(podcast => ({
    ...podcast,
    relevanceScore: calculateBookRelevance(podcast, areas) + 
                    calculateKeywordRelevance(podcast, extractKeywords(feedbackText))
  }));

  const scoredVideos = videoReferences.map(video => ({
    ...video,
    relevanceScore: calculateBookRelevance(video, areas) + 
                    calculateKeywordRelevance(video, extractKeywords(feedbackText))
  }));

  const sortAndSlice = (items: ScoredBookReference[], max: number): BookReference[] =>
    items
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, max)
      .map(({ relevanceScore, ...item }) => item);

  return {
    books: sortAndSlice(scoredBooks, maxBooks),
    articles: sortAndSlice(scoredArticles, maxArticles),
    podcasts: sortAndSlice(scoredPodcasts, maxPodcasts),
    videos: sortAndSlice(scoredVideos, maxVideos)
  };
} 