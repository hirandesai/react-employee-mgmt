import { useEffect } from "react";
import {connect, useSelector} from "react-redux";
import { getAllEmployees} from '../../redux/actions/emplyeeActions';
import {Row, Col} from "react-bootstrap";
import { ResponsiveBar } from '@nivo/bar'
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

    return (
        <Row>
            <Col md={6}>
                <ResponsiveBar
                    data={response.employees.data}
                    keys={[ 'hot dog', 'burger', 'sandwich', 'kebab', 'fries', 'donut' ]}
                    indexBy="country"
                    margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
                    padding={0.3}
                    valueScale={{ type: 'linear' }}
                    indexScale={{ type: 'band', round: true }}
                    colors={{ scheme: 'nivo' }}
                    defs={[
                        {
                            id: 'dots',
                            type: 'patternDots',
                            background: 'inherit',
                            color: '#38bcb2',
                            size: 4,
                            padding: 1,
                            stagger: true
                        },
                        {
                            id: 'lines',
                            type: 'patternLines',
                            background: 'inherit',
                            color: '#eed312',
                            rotation: -45,
                            lineWidth: 6,
                            spacing: 10
                        }
                    ]}
                    fill={[
                        {
                            match: {
                                id: 'fries'
                            },
                            id: 'dots'
                        },
                        {
                            match: {
                                id: 'sandwich'
                            },
                            id: 'lines'
                        }
                    ]}
                    borderColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'country',
                        legendPosition: 'middle',
                        legendOffset: 32
                    }}
                    axisLeft={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'food',
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    labelSkipWidth={12}
                    labelSkipHeight={12}
                    labelTextColor={{ from: 'color', modifiers: [ [ 'darker', 1.6 ] ] }}
                    legends={[
                        {
                            dataFrom: 'keys',
                            anchor: 'bottom-right',
                            direction: 'column',
                            justify: false,
                            translateX: 120,
                            translateY: 0,
                            itemsSpacing: 2,
                            itemWidth: 100,
                            itemHeight: 20,
                            itemDirection: 'left-to-right',
                            itemOpacity: 0.85,
                            symbolSize: 20,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                    animate={true}
                    motionStiffness={90}
                    motionDamping={15}
                />
            </Col>
        </Row>
    );
};

export default connect(state=>state,{getAllEmployees})(DashboardPage);