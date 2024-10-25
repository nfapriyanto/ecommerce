// ReviewSection.jsx
import { useState, useEffect } from 'react';
import { Box, Typography, Rating, Button, TextField, Modal, IconButton, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { PhotoCamera, Close, Delete } from '@mui/icons-material';
import { shades } from '../../theme';

const ReviewSection = ({ itemId }) => {
  const [reviews, setReviews] = useState([]);
  const [filterRating, setFilterRating] = useState('all');
  const [modalOpen, setModalOpen] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [newReview, setNewReview] = useState({
    userName: '',
    review: '',
    rating: 5,
    photos: []
  });

  // Fetch reviews for the current item
  const fetchReviews = async () => {
    try {
      const response = await fetch(
        `http://localhost:1337/api/reviews?filters[itemId][$eq]=${itemId}&populate=*`,
        {
          method: 'GET',
        }
      );
      const data = await response.json();
      setReviews(data.data);
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [itemId]);

  // Handle photo preview
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    setNewReview(prev => ({
      ...prev,
      photos: [...prev.photos, ...newPhotos]
    }));
  };

  // Handle photo removal
  const handleRemovePhoto = (indexToRemove) => {
    setNewReview(prev => ({
      ...prev,
      photos: prev.photos.filter((_, index) => index !== indexToRemove)
    }));
  };

  // Handle new review submission
  const handleSubmitReview = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('data', JSON.stringify({
      itemId: itemId,
      userName: newReview.userName,
      review: newReview.review,
      rating: newReview.rating,
    }));
    
    // Append multiple photos
    newReview.photos.forEach((photo, index) => {
      formData.append('files.photos', photo.file);
    });

    try {
      await fetch('http://localhost:1337/api/reviews', {
        method: 'POST',
        body: formData,
      });
      
      setModalOpen(false);
      setNewReview({
        userName: '',
        review: '',
        rating: 5,
        photos: []
      });
      fetchReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  // Filter reviews based on rating
  const filteredReviews = filterRating === 'all'
    ? reviews
    : reviews.filter(review => review.attributes.rating === parseInt(filterRating));

  // Get reviews to display based on showAllReviews state
  const displayedReviews = showAllReviews 
    ? filteredReviews 
    : filteredReviews.slice(0, 3);

  return (
    <Box sx={{ width: '100%', maxWidth: '1400px', margin: '0 auto' }}>
      {/* Filter and Add Review Section */}
      <Box 
        display="flex" 
        justifyContent="space-between" 
        alignItems="center" 
        mb={3}
        width="100%"
        px={2}
      >
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Filter Rating</InputLabel>
          <Select
            value={filterRating}
            label="Filter Rating"
            onChange={(e) => setFilterRating(e.target.value)}
          >
            <MenuItem value="all">All Ratings</MenuItem>
            {[5, 4, 3, 2, 1].map((rating) => (
              <MenuItem key={rating} value={rating}>
                {rating} Star{rating !== 1 ? 's' : ''}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          onClick={() => setModalOpen(true)}
          sx={{
            backgroundColor: shades.primary[300],
            color: 'white',
            '&:hover': { backgroundColor: shades.primary[400] }
          }}
        >
          Write a Review
        </Button>
      </Box>

      {/* Reviews List */}
      <Box sx={{ width: '100%' }}>
        {filteredReviews.length === 0 ? (
          <Typography variant="body1" textAlign="center">
            No reviews found
          </Typography>
        ) : (
          <>
            {displayedReviews.map((review) => (
              <Box
                key={review.id}
                sx={{
                  border: `1px solid ${shades.neutral[300]}`,
                  borderRadius: '4px',
                  p: 3,
                  mb: 3,
                  width: '100%',
                  backgroundColor: 'white'
                }}
              >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">{review.attributes.userName}</Typography>
                  <Rating value={review.attributes.rating} readOnly />
                </Box>
                <Typography 
                  variant="body1" 
                  mt={2}
                  sx={{ 
                    wordBreak: 'break-word',
                    whiteSpace: 'pre-wrap',
                    maxWidth: '100%'
                  }}
                >
                  {review.attributes.review}
                </Typography>
                {review.attributes.photos?.data && (
                  <Box 
                    mt={2} 
                    display="flex" 
                    gap={2} 
                    flexWrap="wrap"
                  >
                    {review.attributes.photos.data.map((photo, index) => (
                      <img
                        key={index}
                        src={`http://localhost:1337${photo.attributes.url}`}
                        alt={`Review ${index + 1}`}
                        style={{ 
                          width: '200px',
                          height: '200px',
                          objectFit: 'cover',
                          borderRadius: '4px',
                          cursor: 'pointer'
                        }}
                        onClick={() => window.open(`http://localhost:1337${photo.attributes.url}`, '_blank')}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            ))}
            
            {filteredReviews.length > 3 && (
              <Box display="flex" justifyContent="center" mt={2}>
                <Button
                  onClick={() => setShowAllReviews(!showAllReviews)}
                  sx={{
                    color: shades.primary[300],
                    '&:hover': { backgroundColor: 'transparent', textDecoration: 'underline' }
                  }}
                >
                  {showAllReviews ? 'Show Less' : `See All Reviews (${filteredReviews.length})`}
                </Button>
              </Box>
            )}
          </>
        )}
      </Box>

      {/* Add Review Modal */}
      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          sx={{
            backgroundColor: 'white',
            p: 4,
            borderRadius: '4px',
            maxWidth: '600px',
            width: '90%',
            maxHeight: '90vh',
            overflow: 'auto'
          }}
        >
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5">Write a Review</Typography>
            <IconButton onClick={() => setModalOpen(false)}>
              <Close />
            </IconButton>
          </Box>

          <form onSubmit={handleSubmitReview}>
            <TextField
              fullWidth
              label="Your Name"
              value={newReview.userName}
              onChange={(e) => setNewReview({ ...newReview, userName: e.target.value })}
              margin="normal"
              required
            />
            
            <Box my={2}>
              <Typography component="legend">Rating</Typography>
              <Rating
                value={newReview.rating}
                onChange={(e, newValue) => setNewReview({ ...newReview, rating: newValue })}
              />
            </Box>

            <TextField
              fullWidth
              label="Your Review"
              multiline
              rows={4}
              value={newReview.review}
              onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
              margin="normal"
              required
            />

            <Box my={2}>
              <input
                accept="image/*"
                style={{ display: 'none' }}
                id="photo-upload"
                type="file"
                multiple
                onChange={handlePhotoUpload}
              />
              <label htmlFor="photo-upload">
                <Button
                  variant="outlined"
                  component="span"
                  startIcon={<PhotoCamera />}
                >
                  Upload Photos (Multiple)
                </Button>
              </label>

              {/* Photo Previews */}
              <Box 
                display="flex" 
                gap={1} 
                flexWrap="wrap" 
                mt={2}
              >
                {newReview.photos.map((photo, index) => (
                  <Box 
                    key={index} 
                    position="relative"
                    sx={{ width: 100, height: 100 }}
                  >
                    <img
                      src={photo.preview}
                      alt={`Preview ${index + 1}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: '4px'
                      }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        backgroundColor: 'white',
                        '&:hover': { backgroundColor: '#f5f5f5' }
                      }}
                      onClick={() => handleRemovePhoto(index)}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Box>
            </Box>

            <Button
              type="submit"
              fullWidth
              sx={{
                backgroundColor: shades.primary[300],
                color: 'white',
                '&:hover': { backgroundColor: shades.primary[400] }
              }}
            >
              Submit Review
            </Button>
          </form>
        </Box>
      </Modal>
    </Box>
  );
};

export default ReviewSection;