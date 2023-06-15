## Search_API

An API that performs search queries.
The results can be sorted and filtered

- To filter by either name company, use the "search" key. For example
  localhost:5000/api/v1/products?search=...

- To filter by price equal to specified value, use the
  localhost:5000/api/v1/products?price=...

- To filter by price less than specified value, use the
  localhost:5000/api/v1/products?price=...&operator=<

- To filter by price greater than specified value, use the
  localhost:5000/api/v1/products?price=...&operator=>

- To filter by price between range of specified values, use the
  localhost:5000/api/v1/products?price=baseValue.&operator=range&minValue=...&maxValue=...
  Note that baseValue should be same as minValue
