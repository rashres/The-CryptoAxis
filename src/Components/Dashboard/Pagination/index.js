import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "./styles.css"

export default function PaginationComponent({page, handlePageChange}) {
  return (
    <div className="pagination-components">
      <Pagination 
      count={10} 
      age={page} 
      onChange={(event, value) => handlePageChange(event, value)}
      sx={{
        color: "var-white",
        "& .Mui-selected ": {
            backgroundColor: "var(--blue) !important",
            color: "#fff !important",
            borderColor: "var(--blue) !important",   
        },
        "& .MuiPaginationItem-ellipsis":{
            border: "0px solid var(--grey) !important",
        },
        "& .MuiPaginationItem-text":{
            color: "var(--white)",
            border: "1px solid var(--grey)",
        }
      }}
      />
    </div>
  );
}

// [0,99]
// page 1 -> [0,9]
// page 2 -> [10,19]
// page 3 -> [20,29]
// last page -> [90,99]

// page 1 -> coins.slice(0,9)
// develop a custom algorithm , wanted to use switch case but complicated
