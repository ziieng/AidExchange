import React from 'react';
import { Card, Button, Badge } from 'react-bootstrap';
import { Link } from "react-router-dom";

export default function Reservation(props) {
    let post = props.value
    let contentList = post.replies.contents

    return (
        <Card className='listCard m-1'>
            <h5 className="px-2 pt-2 pb-0">
                <img
                    className="postIcon"
                    src={post.postBy.avatar}
                    alt={"user profile image for " + post.postBy.displayName}
                /> <Link className="linkStyle" to={"./listing/" + post._id}>{post.title}</Link>
                <br></br>
                <Badge variant="light">{post.status}</Badge>
            </h5>
            <ul className="pt-0">
                {contentList.map((line, index) => {
                    return (
                        <li key={index}>
                            {line.quantity} -- {line.item}
                        </li>
                    )
                })}
                {post.postBy.userId === props.uid ? (
                    <Card.Text>Contact via {post.replies.contactInfo.method}: {post.replies.contactInfo.detail}</Card.Text>
                ) : (
                        " "
                    )}
                <Button as={Link} variant="dark" to={"/reply/" + post._id} className="float-right">Edit</Button>
            </ul>
        </Card>
    )
}
