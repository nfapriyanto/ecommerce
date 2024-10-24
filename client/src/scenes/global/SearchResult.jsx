// ./src/scenes/global/SearchResult.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";
import Item from '../../components/Item';
import { setItems } from "../../state";

const SearchResult = () => {
  const dispatch = useDispatch();
  const { query } = useParams();
  const items = useSelector((state) => state.cart.items);
  const [filteredItems, setFilteredItems] = useState([]);

  async function getItems() {
    const response = await fetch(
      "http://localhost:1337/api/items?populate=image",
      { method: "GET" }
    );
    const itemsJson = await response.json();
    dispatch(setItems(itemsJson.data));
  }

  useEffect(() => {
    getItems();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const results = items.filter(item =>
      item.attributes.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredItems(results);
  }, [query, items]);

  return (
    <Box width="80%" margin="80px auto">
      <Typography variant="h3" textAlign="center" mb="20px">
        Search Results for "<b>{query}</b>"
      </Typography>
      {filteredItems.length > 0 ? (
        <Box
          margin="0 auto"
          display="grid"
          gridTemplateColumns="repeat(auto-fill, 300px)"
          justifyContent="space-around"
          rowGap="20px"
          columnGap="1.33%"
        >
          {filteredItems.map((item) => (
            <Item item={item} key={`${item.attributes.name}-${item.id}`} />
          ))}
        </Box>
      ) : (
        <Typography variant="h6" textAlign="center">
          No items found.
        </Typography>
      )}
    </Box>
  );
};

export default SearchResult;