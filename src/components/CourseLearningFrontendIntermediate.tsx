import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';
import Header from './Header';
import { ArrowLeft, Play, Book, Code, CheckCircle, XCircle, Lightbulb, Clock, Award, Users, Star, Monitor, Send, Sun, Moon, RotateCcw, Smartphone, Download, Upload, Shield, Activity, Cloud, FolderOpen, File, Cpu, Database, Zap } from 'lucide-react';

interface Lesson {
  id: string;
  title: string;
  content: string;
  codeExample: string;
  exercises: Exercise[];
}

interface Exercise {
  id: string;
  question: string;
  initialCode: string;
  solution: string;
  hint: string;
}

interface CourseModule {
  id: string;
  title: string;
  lessons: Lesson[];
}

const CourseLearningFrontendIntermediate: React.FC = () => {
  const { courseId, moduleId, lessonId } = useParams();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [currentModule, setCurrentModule] = useState<CourseModule | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState<'theory' | 'exercise'>('theory');
  const [currentExerciseId, setCurrentExerciseId] = useState<string | null>(null);
  const [submittedExercises, setSubmittedExercises] = useState<Set<string>>(new Set());
  const [exerciseProgress, setExerciseProgress] = useState<{[key: string]: number}>({});
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [submissionMessage, setSubmissionMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isFlipping, setIsFlipping] = useState(false);
  const [showFileExplorer, setShowFileExplorer] = useState(false);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);

  // Intermediate frontend files
  const fileContents: {[key: string]: string} = {
    'App.tsx': `import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
          <Router>
            <div className="App">
              <Header />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/profile" element={<Profile />} />
                </Routes>
              </main>
            </div>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
}

export default App;`,
    'store.ts': `import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './slices/authSlice';
import userSlice from './slices/userSlice';
import postsSlice from './slices/postsSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'user'],
};

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  posts: postsSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`,
    'Dashboard.tsx': `import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store/store';
import { fetchPosts } from '../store/slices/postsSlice';
import { motion } from 'framer-motion';
import Chart from 'react-chartjs-2';
import './Dashboard.css';

interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { posts, loading } = useSelector((state: RootState) => state.posts);
  const [selectedMetric, setSelectedMetric] = useState('views');

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const chartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Views',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}!</h1>
        <p>Here's what's happening with your account today.</p>
      </div>

      <div className="dashboard-grid">
        <motion.div 
          className="metric-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>Total Posts</h3>
          <p className="metric-value">{posts.length}</p>
        </motion.div>

        <motion.div 
          className="metric-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>Total Views</h3>
          <p className="metric-value">1,234</p>
        </motion.div>

        <motion.div 
          className="metric-card"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <h3>Engagement Rate</h3>
          <p className="metric-value">4.2%</p>
        </motion.div>

        <div className="chart-container">
          <h3>Analytics Overview</h3>
          <Chart type="line" data={chartData} />
        </div>
      </div>

      <div className="recent-activity">
        <h3>Recent Activity</h3>
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <div className="activity-list">
            {posts.slice(0, 5).map((post) => (
              <motion.div 
                key={post.id} 
                className="activity-item"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h4>{post.title}</h4>
                <p>{post.excerpt}</p>
                <span className="activity-date">{post.createdAt}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Dashboard;`,
    'ThemeContext.tsx': `import React, { createContext, useContext, useState, useEffect } from 'react';

interface ThemeContextType {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};`,
    'package.json': `{
  "name": "frontend-intermediate",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@reduxjs/toolkit": "^1.9.5",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-redux": "^8.1.1",
    "react-router-dom": "^6.14.1",
    "redux-persist": "^6.0.0",
    "framer-motion": "^10.12.16",
    "chart.js": "^4.3.0",
    "react-chartjs-2": "^5.2.0",
    "axios": "^1.4.0",
    "styled-components": "^6.0.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}`
  };

  const handleFileClick = (fileName: string) => {
    setSelectedFile(fileName);
    if (fileContents[fileName]) {
      setCode(fileContents[fileName]);
    }
  };

  // Frontend Development - Intermediate Course
  const courseModules: CourseModule[] = [
    {
      id: 'state-management',
      title: 'Advanced State Management',
      lessons: [
        {
          id: 'redux-toolkit',
          title: 'Redux Toolkit & RTK Query',
          content: `
            <div style="margin-bottom: 20px; text-align: center;">
              <h3>📹 Video Explanation</h3>
              <div style="width: 100%; max-width: 800px; height: 400px; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: bold;">
                📹 Video Explanation Coming Soon
              </div>
              <p style="margin-top: 10px; color: #666; font-size: 14px;">Video explanation coming soon - stay tuned!</p>
            </div>
            
            <h2>🔄 Advanced State Management with Redux Toolkit</h2>
            <p>Master modern Redux patterns with Redux Toolkit and RTK Query for efficient state management in React applications.</p>
            
            <h3>🛠️ Redux Toolkit Features</h3>
            <ul>
              <li><strong>createSlice:</strong> Simplified reducer and action creation</li>
              <li><strong>configureStore:</strong> Enhanced store setup with good defaults</li>
              <li><strong>createAsyncThunk:</strong> Handle async operations with ease</li>
              <li><strong>Immer Integration:</strong> Write "mutative" logic that's actually immutable</li>
            </ul>
            
            <h3>🌐 RTK Query</h3>
            <ul>
              <li><strong>Data Fetching:</strong> Powerful data fetching and caching solution</li>
              <li><strong>Cache Management:</strong> Automatic cache invalidation and updates</li>
              <li><strong>Optimistic Updates:</strong> Improve user experience with optimistic UI</li>
              <li><strong>Code Generation:</strong> Generate hooks from API definitions</li>
            </ul>
            
            <h3>🔧 Best Practices</h3>
            <ul>
              <li><strong>Normalized State:</strong> Structure state for optimal performance</li>
              <li><strong>Selector Patterns:</strong> Use reselect for memoized selectors</li>
              <li><strong>Middleware:</strong> Custom middleware for logging and analytics</li>
              <li><strong>DevTools:</strong> Leverage Redux DevTools for debugging</li>
            </ul>
          `,
          codeExample: `import { createSlice, createAsyncThunk, configureStore } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Async thunk for fetching user data
export const fetchUserById = createAsyncThunk(
  'users/fetchById',
  async (userId: string, { rejectWithValue }) => {
    try {
      const response = await fetch(\`/api/users/\${userId}\`);
      if (!response.ok) {
        throw new Error('Failed to fetch user');
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// User slice with Redux Toolkit
const userSlice = createSlice({
  name: 'user',
  initialState: {
    entities: {},
    loading: false,
    error: null,
  },
  reducers: {
    userUpdated: (state, action) => {
      const { id, changes } = action.payload;
      if (state.entities[id]) {
        Object.assign(state.entities[id], changes);
      }
    },
    userRemoved: (state, action) => {
      delete state.entities[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.entities[action.payload.id] = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// RTK Query API slice
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', \`Bearer \${token}\`);
      }
      return headers;
    },
  }),
  tagTypes: ['Post', 'User'],
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => '/posts',
      providesTags: ['Post'],
    }),
    getPost: builder.query({
      query: (id) => \`/posts/\${id}\`,
      providesTags: (result, error, id) => [{ type: 'Post', id }],
    }),
    addPost: builder.mutation({
      query: (newPost) => ({
        url: '/posts',
        method: 'POST',
        body: newPost,
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: \`/posts/\${id}\`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Post', id }],
    }),
    deletePost: builder.mutation({
      query: (id) => ({
        url: \`/posts/\${id}\`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetPostsQuery,
  useGetPostQuery,
  useAddPostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = apiSlice;

// Configure store
export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    api: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

// Component using RTK Query
import React from 'react';
import { useGetPostsQuery, useAddPostMutation } from './store/apiSlice';

const PostsList: React.FC = () => {
  const {
    data: posts,
    error,
    isLoading,
    isFetching,
    refetch,
  } = useGetPostsQuery();

  const [addPost, { isLoading: isAdding }] = useAddPostMutation();

  const handleAddPost = async () => {
    try {
      const newPost = {
        title: 'New Post',
        content: 'This is a new post created with RTK Query',
        authorId: 1,
      };
      
      await addPost(newPost).unwrap();
      console.log('Post added successfully!');
    } catch (error) {
      console.error('Failed to add post:', error);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <div className="posts-header">
        <h2>Posts</h2>
        <button 
          onClick={handleAddPost} 
          disabled={isAdding}
          className="add-post-btn"
        >
          {isAdding ? 'Adding...' : 'Add Post'}
        </button>
        <button onClick={refetch} disabled={isFetching}>
          {isFetching ? 'Refreshing...' : 'Refresh'}
        </button>
      </div>
      
      <div className="posts-list">
        {posts?.map((post) => (
          <div key={post.id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <small>By: {post.author.name}</small>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostsList;`,
          exercises: [
            {
              id: 'ex1',
              question: 'Create a Redux Toolkit slice for managing a shopping cart with add, remove, and update quantity actions.',
              initialCode: `import { createSlice } from '@reduxjs/toolkit';\n\ninterface CartItem {\n  id: string;\n  name: string;\n  price: number;\n  quantity: number;\n}\n\ninterface CartState {\n  items: CartItem[];\n  total: number;\n}\n\nconst initialState: CartState = {\n  items: [],\n  total: 0,\n};\n\nconst cartSlice = createSlice({\n  name: 'cart',\n  initialState,\n  reducers: {\n    // Add your reducers here\n  },\n});\n\nexport default cartSlice.reducer;`,
              solution: `import { createSlice, PayloadAction } from '@reduxjs/toolkit';\n\ninterface CartItem {\n  id: string;\n  name: string;\n  price: number;\n  quantity: number;\n}\n\ninterface CartState {\n  items: CartItem[];\n  total: number;\n}\n\nconst initialState: CartState = {\n  items: [],\n  total: 0,\n};\n\nconst cartSlice = createSlice({\n  name: 'cart',\n  initialState,\n  reducers: {\n    addItem: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {\n      const existingItem = state.items.find(item => item.id === action.payload.id);\n      if (existingItem) {\n        existingItem.quantity += 1;\n      } else {\n        state.items.push({ ...action.payload, quantity: 1 });\n      }\n      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);\n    },\n    removeItem: (state, action: PayloadAction<string>) => {\n      state.items = state.items.filter(item => item.id !== action.payload);\n      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);\n    },\n    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {\n      const item = state.items.find(item => item.id === action.payload.id);\n      if (item) {\n        item.quantity = action.payload.quantity;\n        if (item.quantity <= 0) {\n          state.items = state.items.filter(i => i.id !== action.payload.id);\n        }\n      }\n      state.total = state.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);\n    },\n    clearCart: (state) => {\n      state.items = [];\n      state.total = 0;\n    },\n  },\n});\n\nexport const { addItem, removeItem, updateQuantity, clearCart } = cartSlice.actions;\nexport default cartSlice.reducer;`,
              hint: 'Use createSlice with reducers for addItem, removeItem, updateQuantity, and clearCart. Remember to update the total when items change.'
            }
          ]
        },
        {
          id: 'context-patterns',
          title: 'Context API Patterns',
          content: `
            <div style="margin-bottom: 20px; text-align: center;">
              <h3>📹 Video Explanation</h3>
              <div style="width: 100%; max-width: 800px; height: 400px; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: bold;">
                📹 Video Explanation Coming Soon
              </div>
              <p style="margin-top: 10px; color: #666; font-size: 14px;">Video explanation coming soon - stay tuned!</p>
            </div>
            
            <h2>🎯 Advanced Context API Patterns</h2>
            <p>Learn advanced patterns for using React Context API effectively in complex applications.</p>
            
            <h3>🏗️ Context Patterns</h3>
            <ul>
              <li><strong>Provider Pattern:</strong> Centralized state management with context</li>
              <li><strong>Compound Components:</strong> Building flexible component APIs</li>
              <li><strong>Custom Hooks:</strong> Encapsulating context logic in reusable hooks</li>
              <li><strong>Context Splitting:</strong> Optimizing performance with multiple contexts</li>
            </ul>
            
            <h3>⚡ Performance Optimization</h3>
            <ul>
              <li><strong>Memoization:</strong> Preventing unnecessary re-renders</li>
              <li><strong>Context Splitting:</strong> Separating frequently changing data</li>
              <li><strong>Lazy Initialization:</strong> Optimizing initial context values</li>
              <li><strong>Selector Pattern:</strong> Fine-grained subscriptions</li>
            </ul>
            
            <h3>🔧 Best Practices</h3>
            <ul>
              <li><strong>Type Safety:</strong> TypeScript patterns for context</li>
              <li><strong>Error Boundaries:</strong> Handling context errors gracefully</li>
              <li><strong>Testing:</strong> Testing components that use context</li>
              <li><strong>DevTools:</strong> Debugging context with React DevTools</li>
            </ul>
          `,
          codeExample: `import React, { createContext, useContext, useReducer, useMemo, useCallback } from 'react';

// Theme Context with advanced patterns
interface ThemeState {
  theme: 'light' | 'dark';
  primaryColor: string;
  fontSize: 'small' | 'medium' | 'large';
}

type ThemeAction =
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_PRIMARY_COLOR'; payload: string }
  | { type: 'SET_FONT_SIZE'; payload: 'small' | 'medium' | 'large' };

const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { ...state, theme: state.theme === 'light' ? 'dark' : 'light' };
    case 'SET_PRIMARY_COLOR':
      return { ...state, primaryColor: action.payload };
    case 'SET_FONT_SIZE':
      return { ...state, fontSize: action.payload };
    default:
      return state;
  }
};

interface ThemeContextType {
  state: ThemeState;
  toggleTheme: () => void;
  setPrimaryColor: (color: string) => void;
  setFontSize: (size: 'small' | 'medium' | 'large') => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom hook with error handling
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Provider component with memoization
interface ThemeProviderProps {
  children: React.ReactNode;
  initialTheme?: Partial<ThemeState>;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ 
  children, 
  initialTheme = {} 
}) => {
  const [state, dispatch] = useReducer(themeReducer, {
    theme: 'light',
    primaryColor: '#007bff',
    fontSize: 'medium',
    ...initialTheme,
  });

  // Memoize action creators to prevent unnecessary re-renders
  const toggleTheme = useCallback(() => {
    dispatch({ type: 'TOGGLE_THEME' });
  }, []);

  const setPrimaryColor = useCallback((color: string) => {
    dispatch({ type: 'SET_PRIMARY_COLOR', payload: color });
  }, []);

  const setFontSize = useCallback((size: 'small' | 'medium' | 'large') => {
    dispatch({ type: 'SET_FONT_SIZE', payload: size });
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo(() => ({
    state,
    toggleTheme,
    setPrimaryColor,
    setFontSize,
  }), [state, toggleTheme, setPrimaryColor, setFontSize]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

// Compound Components Pattern
interface ModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const ModalContext = createContext<ModalContextType | undefined>(undefined);

const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error('Modal components must be used within Modal');
  }
  return context;
};

// Main Modal component
interface ModalProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const Modal: React.FC<ModalProps> & {
  Trigger: React.FC<{ children: React.ReactNode }>;
  Content: React.FC<{ children: React.ReactNode }>;
  Header: React.FC<{ children: React.ReactNode }>;
  Body: React.FC<{ children: React.ReactNode }>;
  Footer: React.FC<{ children: React.ReactNode }>;
} = ({ children, defaultOpen = false }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const openModal = useCallback(() => setIsOpen(true), []);
  const closeModal = useCallback(() => setIsOpen(false), []);

  const contextValue = useMemo(() => ({
    isOpen,
    openModal,
    closeModal,
  }), [isOpen, openModal, closeModal]);

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
    </ModalContext.Provider>
  );
};

// Modal sub-components
Modal.Trigger = ({ children }) => {
  const { openModal } = useModal();
  return (
    <div onClick={openModal} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );
};

Modal.Content = ({ children }) => {
  const { isOpen, closeModal } = useModal();
  
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

Modal.Header = ({ children }) => (
  <div className="modal-header">{children}</div>
);

Modal.Body = ({ children }) => (
  <div className="modal-body">{children}</div>
);

Modal.Footer = ({ children }) => (
  <div className="modal-footer">{children}</div>
);

// Usage example
const App: React.FC = () => {
  return (
    <ThemeProvider>
      <div className="app">
        <Modal>
          <Modal.Trigger>
            <button>Open Modal</button>
          </Modal.Trigger>
          
          <Modal.Content>
            <Modal.Header>
              <h2>Modal Title</h2>
            </Modal.Header>
            
            <Modal.Body>
              <p>This is the modal content.</p>
            </Modal.Body>
            
            <Modal.Footer>
              <button>Cancel</button>
              <button>Confirm</button>
            </Modal.Footer>
          </Modal.Content>
        </Modal>
      </div>
    </ThemeProvider>
  );
};

// Performance optimized context with selectors
interface AppState {
  user: { id: string; name: string; email: string };
  posts: Array<{ id: string; title: string; content: string }>;
  ui: { loading: boolean; error: string | null };
}

const AppStateContext = createContext<AppState | undefined>(undefined);

// Selector hook for fine-grained subscriptions
export const useAppSelector = <T>(selector: (state: AppState) => T): T => {
  const state = useContext(AppStateContext);
  if (!state) {
    throw new Error('useAppSelector must be used within AppStateProvider');
  }
  return useMemo(() => selector(state), [state, selector]);
};

// Specific hooks for different parts of state
export const useUser = () => useAppSelector(state => state.user);
export const usePosts = () => useAppSelector(state => state.posts);
export const useUI = () => useAppSelector(state => state.ui);

export default Modal;`,
          exercises: [
            {
              id: 'ex2',
              question: 'Create a Context API setup for managing user authentication with login, logout, and user data.',
              initialCode: `import React, { createContext, useContext, useState } from 'react';\n\ninterface User {\n  id: string;\n  name: string;\n  email: string;\n}\n\ninterface AuthContextType {\n  user: User | null;\n  login: (email: string, password: string) => Promise<void>;\n  logout: () => void;\n  isLoading: boolean;\n}\n\nconst AuthContext = createContext<AuthContextType | undefined>(undefined);\n\nexport const useAuth = () => {\n  // Add implementation\n};\n\nexport const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {\n  // Add implementation\n};`,
              solution: `import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';\n\ninterface User {\n  id: string;\n  name: string;\n  email: string;\n}\n\ninterface AuthContextType {\n  user: User | null;\n  login: (email: string, password: string) => Promise<void>;\n  logout: () => void;\n  isLoading: boolean;\n  error: string | null;\n}\n\nconst AuthContext = createContext<AuthContextType | undefined>(undefined);\n\nexport const useAuth = () => {\n  const context = useContext(AuthContext);\n  if (context === undefined) {\n    throw new Error('useAuth must be used within an AuthProvider');\n  }\n  return context;\n};\n\nexport const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {\n  const [user, setUser] = useState<User | null>(null);\n  const [isLoading, setIsLoading] = useState(false);\n  const [error, setError] = useState<string | null>(null);\n\n  const login = useCallback(async (email: string, password: string) => {\n    setIsLoading(true);\n    setError(null);\n    \n    try {\n      const response = await fetch('/api/auth/login', {\n        method: 'POST',\n        headers: { 'Content-Type': 'application/json' },\n        body: JSON.stringify({ email, password }),\n      });\n      \n      if (!response.ok) {\n        throw new Error('Login failed');\n      }\n      \n      const userData = await response.json();\n      setUser(userData.user);\n      localStorage.setItem('token', userData.token);\n    } catch (err) {\n      setError(err instanceof Error ? err.message : 'Login failed');\n    } finally {\n      setIsLoading(false);\n    }\n  }, []);\n\n  const logout = useCallback(() => {\n    setUser(null);\n    localStorage.removeItem('token');\n    setError(null);\n  }, []);\n\n  const contextValue = useMemo(() => ({\n    user,\n    login,\n    logout,\n    isLoading,\n    error,\n  }), [user, login, logout, isLoading, error]);\n\n  return (\n    <AuthContext.Provider value={contextValue}>\n      {children}\n    </AuthContext.Provider>\n  );\n};`,
              hint: 'Use useState for user state, useCallback for memoized functions, and useMemo for the context value to prevent unnecessary re-renders.'
            }
          ]
        }
      ]
    },
    {
      id: 'performance-patterns',
      title: 'Performance Optimization',
      lessons: [
        {
          id: 'react-optimization',
          title: 'React Performance Patterns',
          content: `
            <div style="margin-bottom: 20px; text-align: center;">
              <h3>📹 Video Explanation</h3>
              <div style="width: 100%; max-width: 800px; height: 400px; margin: 0 auto; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; font-weight: bold;">
                📹 Video Explanation Coming Soon
              </div>
              <p style="margin-top: 10px; color: #666; font-size: 14px;">Video explanation coming soon - stay tuned!</p>
            </div>
            
            <h2>⚡ React Performance Optimization</h2>
            <p>Master advanced techniques for optimizing React application performance and user experience.</p>
            
            <h3>🧠 Memoization Techniques</h3>
            <ul>
              <li><strong>React.memo:</strong> Prevent unnecessary component re-renders</li>
              <li><strong>useMemo:</strong> Memoize expensive calculations</li>
              <li><strong>useCallback:</strong> Memoize function references</li>
              <li><strong>Custom Hooks:</strong> Encapsulate memoization logic</li>
            </ul>
            
            <h3>🔄 Rendering Optimization</h3>
            <ul>
              <li><strong>Virtual Scrolling:</strong> Handle large lists efficiently</li>
              <li><strong>Code Splitting:</strong> Lazy load components and routes</li>
              <li><strong>Bundle Optimization:</strong> Reduce bundle size and load times</li>
              <li><strong>Image Optimization:</strong> Lazy loading and responsive images</li>
            </ul>
            
            <h3>📊 Performance Monitoring</h3>
            <ul>
              <li><strong>React DevTools:</strong> Profile component performance</li>
              <li><strong>Web Vitals:</strong> Monitor Core Web Vitals metrics</li>
              <li><strong>Performance API:</strong> Measure custom performance metrics</li>
              <li><strong>Error Boundaries:</strong> Handle errors gracefully</li>
            </ul>
          `,
          codeExample: `import React, { memo, useMemo, useCallback, useState, useEffect } from 'react';
import { FixedSizeList as List } from 'react-window';

// Memoized component to prevent unnecessary re-renders
const ExpensiveComponent = memo<{ data: any[]; onItemClick: (id: string) => void }>(
  ({ data, onItemClick }) => {
    // Expensive calculation that should be memoized
    const processedData = useMemo(() => {
      console.log('Processing data...');
      return data.map(item => ({
        ...item,
        processed: true,
        computedValue: item.value * 2 + Math.random(),
      }));
    }, [data]);

    return (
      <div className="expensive-component">
        {processedData.map(item => (
          <div key={item.id} onClick={() => onItemClick(item.id)}>
            {item.name}: {item.computedValue}
          </div>
        ))}
      </div>
    );
  }
);

// Virtual scrolling for large lists
interface VirtualListProps {
  items: Array<{ id: string; name: string; value: number }>;
  onItemSelect: (item: any) => void;
}

const VirtualList: React.FC<VirtualListProps> = ({ items, onItemSelect }) => {
  const Row = useCallback(({ index, style }) => {
    const item = items[index];
    return (
      <div
        style={style}
        className="list-item"
        onClick={() => onItemSelect(item)}
      >
        <div className="item-content">
          <h4>{item.name}</h4>
          <p>Value: {item.value}</p>
        </div>
      </div>
    );
  }, [items, onItemSelect]);

  return (
    <List
      height={400}
      itemCount={items.length}
      itemSize={80}
      width="100%"
    >
      {Row}
    </List>
  );
};

// Performance monitoring hook
const usePerformanceMonitor = (componentName: string) => {
  useEffect(() => {
    const startTime = performance.now();
    
    return () => {
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      if (renderTime > 16) { // 60fps threshold
        console.warn(\`\${componentName} render time: \${renderTime}ms\`);
      }
    };
  });
};

// Optimized search component with debouncing
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

interface SearchableListProps {
  items: Array<{ id: string; name: string; description: string }>;
}

const SearchableList: React.FC<SearchableListProps> = ({ items }) => {
  usePerformanceMonitor('SearchableList');
  
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Memoize filtered results
  const filteredItems = useMemo(() => {
    if (!debouncedSearchTerm) return items;
    
    return items.filter(item =>
      item.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );
  }, [items, debouncedSearchTerm]);

  // Memoize event handlers
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleItemClick = useCallback((id: string) => {
    console.log('Item clicked:', id);
  }, []);

  return (
    <div className="searchable-list">
      <input
        type="text"
        placeholder="Search items..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      
      <div className="results-count">
        Found {filteredItems.length} items
      </div>
      
      <VirtualList 
        items={filteredItems} 
        onItemSelect={handleItemClick}
      />
    </div>
  );
};

// Lazy loading with Suspense
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

const LazyLoadedSection: React.FC = () => {
  const [showComponent, setShowComponent] = useState(false);

  return (
    <div>
      <button onClick={() => setShowComponent(true)}>
        Load Heavy Component
      </button>
      
      {showComponent && (
        <React.Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </React.Suspense>
      )}
    </div>
  );
};

// Image lazy loading component
interface LazyImageProps {
  src: string;
  alt: string;
  placeholder?: string;
  className?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({ 
  src, 
  alt, 
  placeholder = '/placeholder.jpg',
  className 
}) => {
  const [imageSrc, setImageSrc] = useState(placeholder);
  const [imageRef, setImageRef] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    let observer: IntersectionObserver;
    
    if (imageRef && imageSrc === placeholder) {
      observer = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              setImageSrc(src);
              observer.unobserve(imageRef);
            }
          });
        },
        { threshold: 0.1 }
      );
      
      observer.observe(imageRef);
    }
    
    return () => {
      if (observer && imageRef) {
        observer.unobserve(imageRef);
      }
    };
  }, [imageRef, imageSrc, placeholder, src]);

  return (
    <img
      ref={setImageRef}
      src={imageSrc}
      alt={alt}
      className={className}
      loading="lazy"
    />
  );
};

// Error boundary for performance monitoring
class PerformanceErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Performance Error:', error, errorInfo);
    
    // Report to performance monitoring service
    if (window.gtag) {
      window.gtag('event', 'exception', {
        description: error.toString(),
        fatal: false,
      });
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

// Main optimized app component
const OptimizedApp: React.FC = () => {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemSelect = useCallback((item: any) => {
    setSelectedItem(item);
  }, []);

  return (
    <PerformanceErrorBoundary>
      <div className="optimized-app">
        <SearchableList items={data} />
        <LazyLoadedSection />
        
        {selectedItem && (
          <div className="selected-item">
            <h3>Selected: {selectedItem.name}</h3>
            <LazyImage 
              src={selectedItem.imageUrl} 
              alt={selectedItem.name}
              className="item-image"
            />
          </div>
        )}
      </div>
    </PerformanceErrorBoundary>
  );
};

export default OptimizedApp;`,
          exercises: [
            {
              id: 'ex3',
              question: 'Create a memoized component that renders a list of items with search functionality and optimized re-rendering.',
              initialCode: `import React, { useState, useMemo } from 'react';\n\ninterface Item {\n  id: string;\n  name: string;\n  category: string;\n  price: number;\n}\n\ninterface ItemListProps {\n  items: Item[];\n  onItemClick: (item: Item) => void;\n}\n\nconst ItemList: React.FC<ItemListProps> = ({ items, onItemClick }) => {\n  const [searchTerm, setSearchTerm] = useState('');\n\n  // Add memoization and optimization here\n\n  return (\n    <div>\n      <input \n        type=\"text\" \n        placeholder=\"Search items...\"\n        value={searchTerm}\n        onChange={(e) => setSearchTerm(e.target.value)}\n      />\n      \n      <div>\n        {/* Render filtered items */}\n      </div>\n    </div>\n  );\n};\n\nexport default ItemList;`,
              solution: `import React, { useState, useMemo, useCallback, memo } from 'react';\n\ninterface Item {\n  id: string;\n  name: string;\n  category: string;\n  price: number;\n}\n\ninterface ItemListProps {\n  items: Item[];\n  onItemClick: (item: Item) => void;\n}\n\n// Memoized item component\nconst ListItem = memo<{ item: Item; onClick: (item: Item) => void }>(({ item, onClick }) => {\n  const handleClick = useCallback(() => {\n    onClick(item);\n  }, [item, onClick]);\n\n  return (\n    <div className=\"list-item\" onClick={handleClick}>\n      <h3>{item.name}</h3>\n      <p>Category: {item.category}</p>\n      <p>Price: ${item.price}</p>\n    </div>\n  );\n});\n\nconst ItemList: React.FC<ItemListProps> = ({ items, onItemClick }) => {\n  const [searchTerm, setSearchTerm] = useState('');\n\n  // Memoize filtered items to prevent unnecessary recalculations\n  const filteredItems = useMemo(() => {\n    if (!searchTerm) return items;\n    \n    return items.filter(item =>\n      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||\n      item.category.toLowerCase().includes(searchTerm.toLowerCase())\n    );\n  }, [items, searchTerm]);\n\n  // Memoize search handler\n  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {\n    setSearchTerm(e.target.value);\n  }, []);\n\n  // Memoize item click handler\n  const handleItemClick = useCallback((item: Item) => {\n    onItemClick(item);\n  }, [onItemClick]);\n\n  return (\n    <div className=\"item-list\">\n      <input \n        type=\"text\" \n        placeholder=\"Search items...\"\n        value={searchTerm}\n        onChange={handleSearchChange}\n        className=\"search-input\"\n      />\n      \n      <div className=\"items-container\">\n        {filteredItems.map(item => (\n          <ListItem \n            key={item.id} \n            item={item} \n            onClick={handleItemClick}\n          />\n        ))}\n      </div>\n      \n      <div className=\"results-count\">\n        Showing {filteredItems.length} of {items.length} items\n      </div>\n    </div>\n  );\n};\n\nexport default memo(ItemList);`,
              hint: 'Use React.memo for components, useMemo for expensive calculations, useCallback for event handlers, and create a separate memoized component for list items.'
            }
          ]
        }
      ]
    }
  ];

  // Initialize with first module and lesson
  useEffect(() => {
    if (courseModules.length > 0) {
      const firstModule = courseModules[0];
      const firstLesson = firstModule.lessons[0];
      setCurrentModule(firstModule);
      setCurrentLesson(firstLesson);
      setCode(firstLesson.codeExample);
    }
  }, []);

  const handleRunCode = () => {
    try {
      // Simulate code execution
      setOutput('Code executed successfully!\n\nOutput:\nComponent rendered with advanced state management and performance optimizations.');
    } catch (error) {
      setOutput(`Error: ${error.message}`);
    }
  };

  const handleSubmitExercise = async () => {
    if (!currentExerciseId) return;
    
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      setSubmittedExercises(prev => new Set([...prev, currentExerciseId]));
      setSubmissionMessage('Exercise submitted successfully! Great work on the intermediate frontend concepts.');
      setShowSubmissionModal(true);
      setIsSubmitting(false);
    }, 1000);
  };

  const handleNextLesson = () => {
    // Navigate to next lesson logic
    console.log('Navigate to next lesson');
  };

  if (!currentModule || !currentLesson) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <div className="flex h-screen pt-16">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-hidden`}>
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Frontend Development - Intermediate
            </h2>
          </div>
          
          <div className="overflow-y-auto h-full pb-20">
            {courseModules.map((module) => (
              <div key={module.id} className="border-b border-gray-200 dark:border-gray-700">
                <div className="p-4 bg-gray-50 dark:bg-gray-700">
                  <h3 className="font-medium text-gray-900 dark:text-white text-sm">
                    {module.title}
                  </h3>
                </div>
                
                {module.lessons.map((lesson) => (
                  <button
                    key={lesson.id}
                    onClick={() => navigate(`/course/${courseId}/module/${module.id}/lesson/${lesson.id}`)}
                    className={`w-full text-left p-3 pl-6 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 ${
                      currentLesson.id === lesson.id 
                        ? 'bg-blue-50 dark:bg-blue-900 border-l-4 border-l-blue-500' 
                        : ''
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-700 dark:text-gray-300">
                        {lesson.title}
                      </span>
                      {lesson.exercises.every(ex => ex.id && submittedExercises.has(ex.id)) && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          {/* Top Bar */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
              </button>
              
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  {currentLesson.title}
                </h1>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {currentModule.title}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowFileExplorer(!showFileExplorer)}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
              >
                <Monitor className="h-4 w-4" />
                <span className="text-sm">Files</span>
              </button>
              
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                )}
              </button>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 flex">
            {/* Theory/Exercise Content */}
            <div className="flex-1 flex flex-col">
              {/* Tab Navigation */}
              <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                <div className="flex">
                  <button
                    onClick={() => setActiveTab('theory')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 ${
                      activeTab === 'theory'
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <Book className="h-4 w-4 inline mr-2" />
                    Theory
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('exercise')}
                    className={`px-6 py-3 text-sm font-medium border-b-2 ${
                      activeTab === 'exercise'
                        ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                        : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                    }`}
                  >
                    <Code className="h-4 w-4 inline mr-2" />
                    Exercise
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 overflow-y-auto">
                {activeTab === 'theory' ? (
                  <div className="p-6">
                    <div 
                      className="prose prose-lg max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: currentLesson.content }}
                    />
                    
                    <div className="mt-8 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg">
                      <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">
                        💻 Code Example
                      </h3>
                      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
                        <code>{currentLesson.codeExample}</code>
                      </pre>
                    </div>
                  </div>
                ) : (
                  <div className="p-6">
                    {currentLesson.exercises.map((exercise) => (
                      <div key={exercise.id} className="mb-8 p-6 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            📝 Exercise: {exercise.question}
                          </h3>
                          {submittedExercises.has(exercise.id) && (
                            <CheckCircle className="h-6 w-6 text-green-500" />
                          )}
                        </div>
                        
                        <div className="mb-4">
                          <textarea
                            value={currentExerciseId === exercise.id ? code : exercise.initialCode}
                            onChange={(e) => {
                              setCode(e.target.value);
                              setCurrentExerciseId(exercise.id);
                            }}
                            className="w-full h-64 p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            placeholder="Write your code here..."
                          />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => setCode(exercise.solution)}
                            className="px-4 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            <Lightbulb className="h-4 w-4 inline mr-2" />
                            Show Solution
                          </button>
                          
                          <button
                            onClick={handleSubmitExercise}
                            disabled={isSubmitting || currentExerciseId !== exercise.id}
                            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {isSubmitting ? 'Submitting...' : 'Submit Exercise'}
                          </button>
                        </div>
                        
                        {exercise.hint && (
                          <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                            <p className="text-sm text-yellow-800 dark:text-yellow-200">
                              💡 <strong>Hint:</strong> {exercise.hint}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* File Explorer */}
            {showFileExplorer && (
              <div className="w-80 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                    <FolderOpen className="h-5 w-5 mr-2" />
                    Project Files
                  </h3>
                </div>
                
                <div className="overflow-y-auto h-full pb-20">
                  {Object.keys(fileContents).map((fileName) => (
                    <button
                      key={fileName}
                      onClick={() => handleFileClick(fileName)}
                      className={`w-full text-left p-3 hover:bg-gray-50 dark:hover:bg-gray-700 border-b border-gray-100 dark:border-gray-600 ${
                        selectedFile === fileName ? 'bg-blue-50 dark:bg-blue-900' : ''
                      }`}
                    >
                      <div className="flex items-center">
                        <File className="h-4 w-4 mr-2 text-gray-500" />
                        <span className="text-sm text-gray-700 dark:text-gray-300">
                          {fileName}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Toolbar */}
          <div className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleRunCode}
                  className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  <Play className="h-4 w-4" />
                  <span>Run Code</span>
                </button>
                
                <button
                  onClick={() => setCode('')}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
                >
                  <RotateCcw className="h-4 w-4" />
                  <span>Reset</span>
                </button>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="h-4 w-4" />
                  <span>45 min remaining</span>
                </div>
                
                <button
                  onClick={handleNextLesson}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  <span>Next Lesson</span>
                  <ArrowLeft className="h-4 w-4 rotate-180" />
                </button>
              </div>
            </div>

            {/* Output Panel */}
            {output && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-2">Output:</h4>
                <pre className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                  {output}
                </pre>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Submission Modal */}
      {showSubmissionModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full mx-4">
            <div className="text-center">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                Exercise Submitted!
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {submissionMessage}
              </p>
              <button
                onClick={() => setShowSubmissionModal(false)}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Continue Learning
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CourseLearningFrontendIntermediate;