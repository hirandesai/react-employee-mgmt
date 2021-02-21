import { useEffect } from "react";
import {connect, useSelector} from "react-redux";
import { getAllEmployees} from '../../redux/actions/emplyeeActions';
import {Row, Col} from "react-bootstrap";
const DashboardPage= (props:any)=>{
    console.log('hiren');
    //@ts-ignore
    var response = useSelector(s=>s.employee);
    
    console.log(response);
    const getAllEmployeesData=async ()=>{
        await props.getAllEmployees({});
    }
    useEffect(()=>{             
        getAllEmployeesData();
    },[]);

    if(!response.employees)
    {
        return (
            <div>
                Loading data..
            </div>
        );
    }
    
    let graphData = {
        //@ts-ignore
        maleCount:response.employees.data.filter(s => s.gender == "Male").length,
        //@ts-ignore
        femaleCount:response.employees.data.filter(s => s.gender == "Female").length,
        //@ts-ignore
        activeCount:response.employees.data.filter(s => s.status == "Active").length,
        //@ts-ignore
        inactiveCount:response.employees.data.filter(s => s.status == "Inactive").length,
    }
    return (
        <Row className="text-center">
            <Col md={3}>
                <div className="small-box bg-info">
                    <div className="inner">
                        <h3>{graphData.maleCount}</h3>
                        <p>Males</p>
                    </div>                
                </div>
            </Col>
            <Col md={3}>
                <div className="small-box bg-info">
                    <div className="inner">
                        <h3>{graphData.femaleCount}</h3>
                        <p>Female</p>
                    </div>                
                </div>
            </Col>
            <Col md={3}>
            <div className="small-box bg-primary">
            <div className="inner">
                    <h3>{graphData.activeCount}</h3>
                    <p>Active</p>
                </div> 
                </div>                
            </Col>
            <Col md={3}>
            <div className="small-box bg-primary">
            <div className="inner">
                    <h3>{graphData.inactiveCount}</h3>
                    <p>Inactive</p>
                </div> 
                </div>
                
            </Col>
        </Row>
    );
};

export default connect(state=>state,{getAllEmployees})(DashboardPage);