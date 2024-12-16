import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Material-UI Components
import { 
  Typography,
  Button,
  CircularProgress,
  Container,
  Box,
  Card,
  CardContent,
  CardActions
} from "@mui/material";
import { purple } from "@mui/material/colors";

// Context
import { AuthContext } from "../../context/AuthContext";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // State for storing API data
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch data from JSONPlaceholder API
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts', {
          params: {
            _limit: 5
          }
        });
        
        setPosts(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch posts');
        console.error('API Error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Container maxWidth="lg" className="py-8">
      <Box className="flex justify-end mb-6">
        <Button 
          variant="contained" 
          color="secondary"
          onClick={handleLogout}
          sx={{
            background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
            '&:hover': {
              background: 'linear-gradient(45deg, #7b1fa2 30%, #9c27b0 90%)',
            }
          }}
        >
          Logout
        </Button>
      </Box>

      <Typography 
        variant="h3" 
        className="text-center mb-8"
        sx={{ 
          color: purple[300],
          fontWeight: 'bold',
          background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}
      >
        Dashboard
      </Typography>

      {isLoading ? (
        <Box className="flex justify-center items-center py-8">
          <CircularProgress color="secondary" />
        </Box>
      ) : error ? (
        <Typography color="error" className="text-center py-4">
          {error}
        </Typography>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card 
              key={post.id}
              className="bg-gray-800 text-gray-200 rounded-lg"
            >
              <CardContent>
                <Typography 
                  variant="h5" 
                  className="mb-2"
                  sx={{ 
                    color: purple[100],
                    fontWeight: 'bold'
                  }}
                >
                  {post.title}
                </Typography>
                <Typography 
                  variant="body2"
                  sx={{ 
                    color: 'text.secondary'
                  }}
                >
                  {post.body}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  variant="contained" 
                  color="secondary"
                  sx={{
                    background: 'linear-gradient(45deg, #9c27b0 30%, #ba68c8 90%)',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #7b1fa2 30%, #9c27b0 90%)',
                    }
                  }}
                >
                  View Post
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
};

export default Dashboard;