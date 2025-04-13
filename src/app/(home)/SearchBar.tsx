import React from 'react';
import { IconButton, TextField, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = () => {
  const [search, setSearch] = React.useState('');

  const handleChange: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <Tooltip title="Search" enterDelay={1000}>
        <div>
          <IconButton
            type="button"
            aria-label="search"
            sx={{ display: { xs: 'inline', md: 'none' } }}
          >
            <SearchIcon />
          </IconButton>
        </div>
      </Tooltip>

      <TextField
        onChange={handleChange}
        value={search}
        label="Search"
        variant="outlined"
        size="small"
        InputProps={{
          endAdornment: (
            <IconButton type="button" aria-label="search" size="small">
              <SearchIcon />
            </IconButton>
          ),
          sx: { pr: 0.5, mr: 1 },
        }}
        sx={{ display: { xs: 'none', md: 'inline-block' }, mr: 1 }}
      />
    </>
  );
};

export default SearchBar;