import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define types for our context
interface Comment {
  id: string;
  username: string;
  text: string;
  timestamp: string;
}

interface Post {
  id: string;
  username: string;
  comment: string;
  time: string;
  image?: string;
  isAlert?: boolean;
  likes?: number;
  comments?: Comment[];
}

interface AppContextType {
  posts: Post[];
  addPost: (post: Omit<Post, 'id'>) => void;
  likePost: (postId: string, value: boolean) => void;
  addComment: (postId: string, comment: Omit<Comment, 'id'>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppContextProvider({ children }: { children: ReactNode }) {
  const [posts, setPosts] = useState<Post[]>([]);

  const addPost = (post: Omit<Post, 'id'>) => {
    const newPost = {
      ...post,
      id: Date.now().toString(),
      likes: 0,
      comments: [],
    };
    setPosts([newPost, ...posts]);
  };

  const likePost = (postId: string, value: boolean) => {
    setPosts(
      posts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: value ? (post.likes || 0) + 1 : (post.likes || 0) - 1
          };
        }
        return post;
      })
    );
  };

  const addComment = (postId: string, commentData: Omit<Comment, 'id'>) => {
    setPosts(
      posts.map(post => {
        if (post.id === postId) {
          const comment = {
            ...commentData,
            id: Date.now().toString()
          };
          return {
            ...post,
            comments: [...(post.comments || []), comment]
          };
        }
        return post;
      })
    );
  };

  return (
    <AppContext.Provider value={{ posts, addPost, likePost, addComment }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppContextProvider');
  }
  return context;
}