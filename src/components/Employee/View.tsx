import {useEffect} from "react";
import {useParams} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import {Card,Row,Col,Form,FormControl} from "react-bootstrap";
import {getEmployeeDetails} from "../../redux/actions/emplyeeActions";

const ViewEmployee = (props:any)=>{
    //@ts-ignore
    let { id } = useParams();
    //@ts-ignore
    const employeeDetails = useSelector(s => s.employee);
    console.log(employeeDetails);
    const onEmployeeView =async (id:string)=>{
        await props.getEmployeeDetails(id);
    };
    useEffect(()=>{
        onEmployeeView(id);
    },[]);

    if(!employeeDetails?.employee)
    {
        return (
            <Card>
                <Card.Header as="h5">No Details</Card.Header>
                <Card.Body>
                    <Card.Title>No details or fetching the details</Card.Title>
                    <Card.Text>
                        No details for this employee or details are yet to be fetched..
                    </Card.Text>
                    <a href="/employee" className="btn btn-primary">Go back</a>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Card>
            <Card.Header as="h5">{employeeDetails.employee.name} Details</Card.Header>
            <Card.Body>     
            <Form>
                <Form.Group>
                    <Form.Label htmlFor="name" className="my-1 mr-2 text-bold">
                        Name
                    </Form.Label>
                    <div className="form-control">{employeeDetails.employee.name}</div>                
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="email" className="my-1 mr-2 text-bold">
                        Email
                    </Form.Label>
                    <div className="form-control">{employeeDetails.employee.email}</div>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="gender" className="my-1 mr-2 text-bold">
                        Gender
                    </Form.Label>
                    <div className="form-control">{employeeDetails.employee.gender}</div>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor="status" className="my-1 mr-2 text-bold">
                        Status
                    </Form.Label>
                    <div className="form-control">{employeeDetails.employee.status}</div>
                </Form.Group>                
            </Form>                
                <a href="/employee" className="btn btn-primary">Go back</a>
            </Card.Body>
        </Card>
    );
};

//@ts-ignore
export default connect(state=>state,{getEmployeeDetails})(ViewEmployee);