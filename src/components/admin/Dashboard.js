import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { Card, CardText, CardBody, Button } from 'reactstrap';

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
            <div className="col-md-10">
                <div className='container'>
                    <Card>
                        <CardBody>
                            <CardText>
                                <div>Order Pending</div>
                                <ManageOrder status={'Transaction Pending'} />
                            </CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardText>
                                Order Paid
                                <ManageOrder status={'Transaction Paid'} />
                            </CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardText>
                                Order Finish
                                <ManageOrder status={'Transaction Completed'} />
                            </CardText>
                        </CardBody>
                    </Card>
                    <Card>
                        <CardBody>
                            <CardText>
                                Order Decline
                                <ManageOrder status={'Transaksi Declined'} />
                            </CardText>
                        </CardBody>
                    </Card>
                </div >
            </div >
        )
    }


    render() {
        if (this.props.admin.username !== '') {
            if (this.state.checkout.length > 0) {
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