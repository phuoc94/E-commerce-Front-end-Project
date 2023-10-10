import { useEffect, useState } from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TablePagination,
  TextField,
  Typography,
} from '@mui/material';

import ProductCard from '../../components/products/ProductCard';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import useDebounce from '../../hooks/useDebounce';
import { fetchCategories } from '../../store/actions/category.actions';
import { fetchProducts } from '../../store/actions/product.actions';
import {
  setSortBy,
  sortByNameAZ,
  sortByNameZA,
  sortByNewest,
  sortByPriceHighToLow,
  sortByPriceLowToHigh,
} from '../../store/reducers/product.slice';

const ProductsPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(12);
  const [filters, setFilters] = useState({});
  const debouncedFilter = useDebounce(filters, 500);

  const { products, isLoading, sortBy } = useAppSelector(
    (state) => state.products,
  );
  const { categories } = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProducts(debouncedFilter));
  }, [dispatch, debouncedFilter]);

  useEffect(() => {
    if (categories.length < 1) {
      dispatch(fetchCategories());
    }
  }, [dispatch, categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value,
    });
  };

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeCategory = (event: SelectChangeEvent) => {
    if (event.target.value !== 'all') {
      setFilters({
        ...filters,
        categoryId: event.target.value,
      });
    } else {
      setFilters({
        ...filters,
        categoryId: null,
      });
    }
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeSort = (event: SelectChangeEvent) => {
    dispatch(setSortBy(event.target.value));

    switch (event.target.value) {
      case 'newest':
        dispatch(sortByNewest());
        break;
      case 'priceLow':
        dispatch(sortByPriceLowToHigh());
        break;
      case 'priceHigh':
        dispatch(sortByPriceHighToLow());
        break;
      case 'nameAZ':
        dispatch(sortByNameZA());
        break;
      case 'nameZA':
        dispatch(sortByNameAZ());
        break;
      default:
        break;
    }
  };

  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  return (
    <Container>
      <Typography
        variant="h2"
        sx={{ paddingTop: '2rem', paddingBottom: '1rem' }}
        align="center"
      >
        Products
      </Typography>
      <Grid container spacing={2}>
        <Grid item md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Typography variant="h5" sx={{ paddingX: 2 }}>
            Filters
          </Typography>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="category-filter"
              id="category-filter"
            >
              <Typography>Category</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <FormControl fullWidth margin="normal">
                <InputLabel id="category">Category</InputLabel>
                <Select
                  labelId="category"
                  id="category"
                  label="Category"
                  name="categoryId"
                  onChange={handleChangeCategory}
                >
                  <MenuItem value="all" key="all">
                    All
                  </MenuItem>
                  {categories.length > 0 &&
                    categories.map((category) => (
                      <MenuItem value={category.id} key={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </AccordionDetails>
          </Accordion>
          <Accordion defaultExpanded>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="price-filter"
              id="price-filter"
            >
              <Typography>Price</Typography>
            </AccordionSummary>
            <AccordionDetails
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <TextField
                id="price_min"
                label="Min Price"
                variant="standard"
                sx={{ maxWidth: '80px' }}
                name="price_min"
                onChange={handleChange}
              />
              <Typography variant="h3">-</Typography>
              <TextField
                id="price_max"
                label="Max Price"
                variant="standard"
                name="price_max"
                sx={{ maxWidth: '80px' }}
                onChange={handleChange}
              />
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item md={9}>
          <Grid container sx={{ marginBottom: 2 }}>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel id="sort">Sort by:</InputLabel>
                <Select
                  labelId="sort"
                  id="sort-select"
                  label="Sort by:"
                  value={sortBy}
                  onChange={handleChangeSort}
                >
                  <MenuItem value="newest">Newest Arrivals</MenuItem>
                  <MenuItem value="priceLow">Price: Low to High</MenuItem>
                  <MenuItem value="priceHigh">Price: High to Low</MenuItem>
                  <MenuItem value="nameAZ">Name: A to Z</MenuItem>
                  <MenuItem value="nameZA">Name: Z to A</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TablePagination
                component="div"
                count={products.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[12, 24, 36, 48]}
              />
            </Grid>
          </Grid>
          <Grid container spacing={2}>
            {isLoading ? (
              <CircularProgress />
            ) : displayedProducts && displayedProducts.length > 0 ? (
              displayedProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                No products
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProductsPage;
