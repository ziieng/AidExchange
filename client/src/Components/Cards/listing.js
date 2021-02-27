import React from "react";
import { Card, Button, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Listing(props) {
  let post = props.value;
  let contentList = props.value.contents;
  return (
    <Card className="myList m-1">
      <h5 className="px-2 pt-2 pb-0">
        <img
          className="postIcon"
          src={post.postBy.avatar}
          alt={"user profile image for " + post.postBy.displayName}
        /> <Link className="linkStyle" to={"/listing/" + post._id}>
          {post.title}
        </Link>
        <br></br>
        <Badge variant="light">{post.status}</Badge>
      </h5>
      <ul className="pt-0">
        {contentList.length <= 3 ? (
          <>
            {contentList.map((line, index) => {
              return <li key={index}>{line.item}</li>;
            })}
          </>
        ) : (
          <>
            <li key={0}>{contentList[0].item}</li>
            <li key={1}>{contentList[1].item}</li>
            (and {contentList.length - 2} more)
          </>
        )}
        {post.userId === props.uid ? (
          <Button variant="dark" className="float-right" href={"/editlisting/" + post._id}>
            Edit
          </Button>
        ) : (
          " "
        )}
      </ul>
    </Card>
  );
}
