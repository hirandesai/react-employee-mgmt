import react, { useState } from "react";
import {Row, Col, Form, Button} from "react-bootstrap";
import {connect} from "react-redux";
import { Router, Redirect } from "react-router-dom";
import {addNewEmployee} from "../../redux/actions/emplyeeActions";
const AddEmployee = (props:any)=>{
    //todo: why this does not work!
    //props.onSubTitleChange("Add new employee");
    const [shouldRedirect, setRedirect] = useState(false);
    const [validated, setValidated] = useState(false);
    const [formState,setFormState]=useState({
       name:"",
       email:"",
       gender:"",
       status:"Active",
       isUpdated:false
    });

    const addEmployee = async (formData:object, callback:any)=>{
        await props.addNewEmployee(formData,callback);
    }

    const onFromChange= (e:any, formField:string)=>{
        let newForm={...formState};
        //@ts-ignore
        newForm[formField]=e.target.value;
        setFormState(newForm);
    };

    const handleSubmit=(event:any)=>{   
        const form = event.currentTarget;
        if (form.checkValidity() === false) {      
            event.stopPropagation();
            event.preventDefault();
        }
        event.preventDefault();
        setValidated(true);
        
        addEmployee(formState,()=>{
            alert("employee added successfully");
            setRedirect(true);
        });
    };
    if(shouldRedirect)
    {
        return <Redirect to='/employee'/>;
    }

    return(        
        <>        
            <Row className="align-items-center">
                <Col md={12}>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>                        
                        <Form.Group>
                            <Form.Label htmlFor="name" className="my-1 mr-2">
                                Name
                            </Form.Label>
                            <Form.Control className="my-1 mr-sm-2"                    
                                id="name"
                                placeholder="Jane Doe"
                                value={formState.name}
                                onChange={(e)=>{onFromChange(e,"name")}}
                                required/>
                            <Form.Control.Feedback type="invalid">
                                Please enter name.
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group>
                            <Form.Label htmlFor="email" className="my-1 mr-2">
                                Email
                            </Form.Label>
                            <Form.Control className="my-1 mr-sm-2"
                                type="email"                    
                                id="email"
                                placeholder="your@mail.com"
                                value={formState.email}
                                onChange={(e)=>{onFromChange(e,"email")}}
                                required/>
                            <Form.Control.Feedback type="invalid">
                                Please enter email.
                            </Form.Control.Feedback>
                        </Form.Group>
                        
                        <Form.Group>                            
                            <Form.Label  htmlFor="gender" className="my-1 mr-2">
                                Gender
                            </Form.Label>
                            <Form.Control className="my-1 mr-sm-2" as="select"                   
                                id="gender"
                                value={formState.gender}
                                onChange={(e)=>{onFromChange(e,"gender")}}
                                required>
                                    <option value="">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                            </Form.Control>
                            <Form.Control.Feedback type="invalid">
                                Please select gender.
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Button type="submit" className="my-1">
                            Submit
                        </Button>
                    </Form>
                </Col>                
            </Row>
        </>
    );
};
//@ts-ignore
export default connect(state=>state,{addNewEmployee})(AddEmployee);