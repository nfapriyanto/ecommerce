import React, { useState } from 'react';
import { IconButton, InputBase, Box } from "@mui/material";
import { SearchOutlined } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <Box display="flex">
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            handleSearch();
          }
        }}
      />
      <IconButton
        id="search-icon"
        sx={{ color: "black" }}
        onClick={handleSearch}
      >
        <SearchOutlined />
      </IconButton>
    </Box>
  );
};

export default Search;