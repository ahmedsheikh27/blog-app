import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CircularProgress, CardActionArea, Typography, Avatar } from '@mui/material';
import Box from '@mui/material/Box';
import ReactPaginate from 'react-paginate';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import Postcard from './Postcard'

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(0);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLiked, setLiked] = useState(false);
  // const [likeCount, setLikeCount] = useState(0);

  const handleLikeToggle = () => {
    setLiked((prevLikes) => !prevLikes);
    // setLikeCount((prevCount) => (prevLikes ? prevCount - 1 : prevCount + 1));
  };

  const postsPerPage = 9;
  const handlePageChange = ({ selected }) => {
    setCurrentPage(selected);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const db = getFirestore();
        const usersRef = collection(db, 'posts');
        const querySnapshot = await getDocs(usersRef);
        const postsData = [];
        querySnapshot.forEach((doc) => {
          postsData.push({ id: doc.id, ...doc.data() });
        });
        setPosts(postsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false); // Set loading to false when posts are fetched
      }
    };
    fetchData();

  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const indexOfLastPost = (currentPage + 1) * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);


  return (
    <>
      {loading ? (
        // Show loader while posts are loading
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Typography variant='h3'
            sx={{
              color: 'grey',
              textAlign: 'center',
              marginTop: '10px'
            }}>
            New Posts
          </Typography>
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Grid container rowSpacing={1}
              sx={{
                m: 3,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              {currentPosts.map((post, i) => (
                <Grid
                  key={i}
                >
                  <Card
                    style={{
                      maxWidth: 380, // Set the fixed width for the card
                      boxShadow: '0 3px 5px  grey',
                      margin: '16px', // Add margin for spacing
                    }}  >
                    <CardActionArea
                    >
                      {post.user && (
                        <Box sx={{
                          display: 'flex',
                          alignItems: 'center',
                          background: '#f3f4f7',
                          padding: '5px'
                        }}>
                          <Avatar
                            src={post.user.photoURL}
                            alt={post.user.displayName}
                            sx={{
                              height: '30px',
                              width: '30px',
                              marginTop: '5px',
                              marginLeft: '5px',
                            }}
                          />
                          <Typography
                            gutterBottom
                            component="div"
                            sx={{ marginLeft: '10px' }}
                          >
                            {post.user.displayName}
                          </Typography>
                          <IconButton
                            aria-label="more"
                            aria-controls="post-menu"
                            aria-haspopup="true"
                            onClick={handleClick}
                            sx={{ position: 'absolute', right: '10px' }}
                          >
                            <MoreVertIcon />
                          </IconButton>

                          {/* Menu for delete option */}
                          <Menu
                            id="post-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                          >
                            <MenuItem>Delete</MenuItem>
                          </Menu>
                        </Box>

                      )}
                      <CardMedia component="img" height="280" image={post.imageUrl} alt=""
                        sx={{ width: '300px' }} />
                      <CardContent sx={{ background: '#f3f4f7' }}>
                        {/* Display user profile and name */}
                        <Typography gutterBottom variant="h6" component="div">
                          {post.itemName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {post.description}
                        </Typography>

                      </CardContent>
                      <IconButton onClick={handleLikeToggle}>
                        {isLiked ? <FavoriteIcon color="error" /> : <FavoriteBorderIcon />}
                      </IconButton>
                      {/* <Typography variant="body2">
                        {likeCount} {likeCount === 1 ? 'like' : 'likes'}
                      </Typography> */}
                    </CardActionArea>
                  </Card>
                </Grid>
              ))}



            </Grid>
          </Box>
          <ReactPaginate
            previousLabel={'previous'}
            nextLabel={'next'}
            breakLabel={'...'}
            pageCount={Math.ceil(posts.length / postsPerPage)}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
            onPageChange={handlePageChange}
            containerClassName={'pagination'}
            activeClassName={'active'}
          />
        </>
      )}
    </>
  )
}

export default Post
