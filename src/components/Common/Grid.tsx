import {Table, Button} from "react-bootstrap";

export interface GridProps
{
    KeyColumnName:string
    Columns:Array<Column>
    Rows:Array<any>    
    onSortChange:any,
    RowButtons?: Array<RowButton>
}
export class Column
{
    constructor(displayName:string, rowFieldName:string, columnOrder:number,displayFunction?:any)
    {
        this.DisplayName=displayName;
        this.RowFieldName=rowFieldName;
        this.ColumnOrder=columnOrder;
        this.DisplayFunction=displayFunction;
    }
    DisplayName:string;
    RowFieldName:string;
    ColumnOrder:number;  
    DisplayFunction?:any;      
}

export class RowButton
{
    constructor(name:string, onClick:any) {
        this.Name=name;
        this.OnClick=onClick;
        
    }
    Name:string;
    OnClick:any;
}

const Grid = (props:GridProps)=>{

const sortedColumns = props.Columns.sort(s=>s.ColumnOrder);
const renderRowButtons =(row:any)=>{
    //@ts-ignore
    if(!props?.RowButtons?.length >0)
    {
        return;
    }
    return (
        <td>
            {
                //@ts-ignore
                props.RowButtons.map((button,i)=>
                (
                    <>
                       <Button key={i} onClick={()=>{
                           button.OnClick(row[props.KeyColumnName]);
                           }}>
                        { button.Name }
                       </Button>
                        &nbsp;
                    </>
                ))
            }
        </td>
    );
};

//@ts-ignore
const renderRecords = (rows)=>{
    if(rows && rows.length > 0)
    {        
        //@ts-ignore
        return rows.map((row)=>(<tr key={row[props.KeyColumnName]}>
            {
                sortedColumns.map((cell,i)=><td key={i}>
                    {
                        cell.DisplayFunction? cell.DisplayFunction(row):row[cell.RowFieldName]
                    }
                </td>)                
            }
            {
                 renderRowButtons(row)                
            }
        </tr>));
    }
}

const noRecords = ()=>{
    return <tr>
        <td colSpan={sortedColumns.length}>No records or loading records</td>                    
    </tr>;
}
return (
    <Table striped bordered hover size="sm">
        <thead>            
            <tr>                
                {
                    sortedColumns.map((e,i) => (<th key={i} onClick={()=>{props.onSortChange(e.RowFieldName);}}>{e.DisplayName}</th>))                     
                }
                {
                    //@ts-ignore
                    props?.RowButtons?.length>0 && (<th>Action</th>)
                }
            </tr>
        </thead>
        <tbody>
            {                    
                //@ts-ignore
                props.Rows?.length > 0? renderRecords(props.Rows): noRecords()
            }
        </tbody>
      </Table>
    )
}

export default Grid;