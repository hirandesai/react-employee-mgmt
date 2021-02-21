import react, {useEffect, useState} from "react";
import {connect} from "react-redux";
import { debug } from "webpack";
import { useSelector } from 'react-redux'
import {Row, Col, Form, Button} from "react-bootstrap";
import Grid,{Column, RowButton} from "../Common/Grid";
import GridPagination from "../Common/GridPagination";
import { getAllEmployees, getDeleteEmployee} from '../../redux/actions/emplyeeActions';
const EmployeeList= (props:any) => {
    props.onSubTitleChange("View all employees");
    
    //todo: why this is coming in .employee instead of .employees?
    //@ts-ignore
    const response = useSelector(s => s.employee);        
    const employees = response.employees? response.employees.data:[];
    const activePage = response.employees? response.employees.meta.pagination.page:1;
    const totalPages = response.employees? response.employees.meta.pagination.pages:0;
    const pageSize = response.employees? response.employees.meta.pagination.limit:10;
    const getEmployeeData = async (param={})=>{
        await props.getAllEmployees(param);
    };
    
    const [filterModel, setFilterModel]=useState({
        search:"",
        gender:"",
        page:1
    });
    let interval:any=null;
    //@ts-ignore
    const onFormChange=(e,stateName)=>{
        let newfilterModel = {...filterModel};
        //@ts-ignore
        newfilterModel[stateName] = e.target.value; 
        setFilterModel(newfilterModel);
    };

    useEffect(()=>{
        getEmployeeData(filterModel);
    },[]);   

    const deleteEmployee = async(id:string)=>{
        await props.getDeleteEmployee(id,()=> {
            alert("Deleted successfully");
            getEmployeeData(filterModel);
        });        
    };

    
    const columns:Array<Column> =[
        new Column("#","id",0,(row:any) => {
            let link="/employee/"+row["id"]
            return <a href={link}>{row["id"]}</a>
        }),
        new Column("Name","name",1),
        new Column("Email","email",2),
        new Column("Gender","gender",3),
        new Column("Status","status",4),
    ];
    const onEditClick=(id:string)=> {
        alert(`${id} edit`);
    };
    const onDeleteClick=(id:string)=>{        
        if(confirm(`Sure you want to delete ${id}?`))
        {
            deleteEmployee(id);            
        }
    };
    const buttons:Array<RowButton>=[
        new RowButton("Edit",onEditClick),
        new RowButton("Delete",onDeleteClick)
    ];    

    const onPageChange=(pageNumber:number)=>{
        let newFilters={...filterModel, page:pageNumber};
        setFilterModel(newFilters);
        getEmployeeData(newFilters);
    }
    const onSortChange=(columnName:string)=>{
        alert(columnName);
    }

    const onSearchClick=(e:any)=>{
        e.preventDefault();
        let newFilters={...filterModel, search:filterModel.search, gender:filterModel.gender};
        setFilterModel(newFilters);
        getEmployeeData(newFilters);
    };

    return (
        <>
            <Row className="align-items-center">
                <Col md={8}>
                    <Form inline>
                        <Form.Label htmlFor="searchText" className="my-1 mr-2">
                            Search
                        </Form.Label>
                        <Form.Control className="my-1 mr-sm-2"                    
                            id="searchText"
                            placeholder="Jane Doe"
                            value={filterModel.search}
                            onChange={(e:any)=>{onFormChange(e,"search")}}/>
                        
                        <Form.Label  htmlFor="genderselect" className="my-1 mr-2">
                            Search
                        </Form.Label>
                        <Form.Control className="my-1 mr-sm-2" as="select"                   
                            id="genderselect"
                            onChange={(e:any)=>{onFormChange(e,"gender")}}>
                                <option value="">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                        </Form.Control>
                        <Button type="submit" className="my-1" onClick={(e:any)=>{onSearchClick(e);}} >
                            Search
                        </Button>
                    </Form>
                </Col>
                <Col md={4} className="text-right">
                    <Button onClick={()=>{ window.location.href="/employee/add"}}>
                        +&nbsp;Add new employee
                    </Button>
                </Col>
            </Row>
            <Grid Columns={columns} KeyColumnName="id" Rows={employees} RowButtons={buttons} onSortChange={onSortChange} />
            <GridPagination ActivePageNo={activePage} TotalPages={totalPages} PageSize={pageSize} onPageClick = {onPageChange} />
        </>
    );
   
};
//@ts-ignore
export default connect(state => state, { getAllEmployees, getDeleteEmployee })(EmployeeList);