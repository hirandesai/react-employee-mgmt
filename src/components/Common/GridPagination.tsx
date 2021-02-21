import {Pagination} from "react-bootstrap";

interface GridPaginationProps
{
   ActivePageNo:number;
   TotalPages: number;
   PageSize:number;
   onPageClick:any;
}


const GridPagination = (props:GridPaginationProps) => {
    let items = [];    
    for (let number = 1; number <= props.TotalPages; number++) {
      items.push(
        <Pagination.Item key={number} active={number === props.ActivePageNo} onClick={()=>{props.onPageClick(number)}} >
          {number}
        </Pagination.Item>,
      );
    }

    return (
        <Pagination>{items}</Pagination>
    );
};

export default GridPagination;