import React, { Component } from 'react';
import { Card, CardBody, CardImg, CardText, CardTitle,BreadcrumbItem,Breadcrumb,Button,Modal,ModalHeader,ModalBody,Form, FormGroup, Input, Label,Row,Col } from 'reactstrap';
// import {Label,} from 'reactstrap';
import {Control,Errors,LocalForm} from 'react-redux-form';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
export class CommentForm extends Component {
    constructor(props) {
        super(props);

        this.toggleModal = this.toggleModal.bind(this);
        this.state = {
            isModalOpen: false
        };
    }

    toggleModal() {
        this.setState({
            isModalOpen: !this.state.isModalOpen
        });
    }

    handleSubmit(values) {
        this.toggleModal();
        // this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
        // console.log("Current State is:"+JSON.stringify(values));
        // alert("Current State is:"+JSON.stringify(values));
        // this.props.postComment(this.props.dishId, values.rating, values.author, values.comment);
    }

    render() {
        return (
            <div>
                <Button color="secondary" outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg">Submit Comment</span>
                </Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label md={12} htmlFor="rating">Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={12} htmlFor="author">Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".author" id="author" name="author"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength: maxLength(15)
                                        }}
                                    />
                                    <Errors className="text-danger" model=".author" show="touched" 
                                        messages={{
                                            required: 'Required ',
                                            minLength: 'Must be greater than 3 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label md={12} htmlFor="comment">Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6" 
                                        className="form-control"
                                    />
                                </Col>
                            </Row>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>
            </div>
        );
    } 
}

function RenderDishDetail({dish}){
        return(
            <div className="col-12 col-md-5 m-1">
                <FadeTransform
                in
                transformProps={{
                    exitTransform: 'scale(0.5) translateY(-50%)'
                }}>
                <Card>
                    <CardImg width="100%" src={baseUrl+dish.image} alt={dish.name} />
                    <CardBody>
                        <CardTitle>
                            {dish.name}
                        </CardTitle>
                        <CardText>
                            {dish.description}
                        </CardText>
                    </CardBody>  
                </Card>
                </FadeTransform>
            </div>
        );
    }
function RenderComment({comments,postComment, dishId}){
    
        if(comments!=null){
            <Stagger in>
                        {comments.map((comment) => {
                            return (
                                <Fade in>
                                <li key={comment.id}>
                                <p>{comment.comment}</p>
                                <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                                </li>
                                </Fade>
                            );
                        })}
                        </Stagger>
            

            return(
               
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    {/* <ul className="list-unstyled">
                        {commentListItem}
                    </ul> */}
                    <CommentForm 
                        dishId={dishId}
                        // addComment={addComment}
                        postComment={postComment}/>
                    {/* <Button><span className="fa fa-pencil fa-lg"></span>&nbsp;Submit Comment</Button> */}
                </div>
            );
        }
        else{
            return(<div></div>);
        }
    }  

    
const DishDetails = (props) =>{
        if(props.isLoading){
            return(
                <div className="container">
                    <div className="row">
                        <Loading/>
                    </div>
                </div>
            );

        }
        else if(props.errMess){
            return(
                <div className="container">
                    <div className="row">
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );

        }
        else if(props.dish!=null){
        return(
            <div className="container">
                <div className="row mt-2">
                    <Breadcrumb>
                        <BreadcrumbItem>
                            <Link to="/menu">Menu</Link>
                        </BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div className="col-12">
                    <h3>{props.dish.name}</h3>
                    <hr/>
                </div>
                <div className="row">
                    <RenderDishDetail dish={props.dish}/>
                    <RenderComment comments={props.comments} 
                        // addComment={props.addComment}
                        dishId={props.dish.id}
                        postComment={props.postComment}/>
                </div>    
               
            </div>
        );
        }
        else{
            return(<div></div>); 
        }
}
export default DishDetails;