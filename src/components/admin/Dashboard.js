import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, CardText, CardBody, CardGroup, CardTitle } from 'reactstrap';

import ManageOrder from './manage/ManageOrder'
import HeaderAdmin from './HeaderAdmin'

class Dashboard extends Component {

    state = {
        checkout: [],
    };

    componentDidMount() {
        axios.get('http://localhost:2019/checkoutpaid')
            .then(res => {
                this.setState({ checkout: res.data })
                console.log(res.data)
            })
    }

    renderlistInput = () => {
        return (
            <div>
                <CardGroup className='my-5'>
                    <Card>
                        <CardBody>
                            <CardTitle className='bg-warning text-center h3'>Transaction Pending</CardTitle>
                            <ManageOrder status={'Transaction Pending'} />
                        </CardBody>
                    </Card>
                </CardGroup>
                <CardGroup className='my-5'>
                    <Card>
                        <CardBody>
                            <CardTitle className='bg-primary text-center h3'>Transaction Paid</CardTitle>
                            <ManageOrder status={'Transaction Paid'} />
                        </CardBody>
                    </Card>
                </CardGroup>
                <CardGroup className='my-5'>
                    <Card>
                        <CardBody>
                            <CardTitle className='bg-success text-center h3'>Transaction Completed</CardTitle>
                            <ManageOrder status={'Transaction Completed'} />
                        </CardBody>
                    </Card>
                </CardGroup>
                <CardGroup className='my-5'>
                    <Card>
                        <CardBody>
                            <CardTitle className='bg-danger text-center h3'>Transaction Declined</CardTitle>
                            <ManageOrder status={'Transaction Declined'} />
                        </CardBody>
                    </Card>
                </CardGroup>
            </div>
        )
    }


    render() {
        if (this.props.admin.username !== '') {
            if (this.state.checkout.length > 0) {
                return (
                    <div>
                        <HeaderAdmin />
                        <div className='container' style={{ marginTop: 80 }}>
                            {this.renderlistInput()}
                        </div>
                    </div>
                )
            }
            return (
                <div>
                    <HeaderAdmin />
                    <div class="container-fluid" style={{ marginTop: 80 }}>
                        <div class="row">
                            {this.renderlistInput()}
                        </div>
                    </div>
                </div>
            )
        }

        return <Redirect to='/admin/login' />
    }
}

const mapStateToProps = state => {
    return {
        admin: state.admin_auth
    }
}

export default connect(mapStateToProps)(Dashboard)