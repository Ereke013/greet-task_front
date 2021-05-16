import React from "react";
import {Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography} from "@material-ui/core";
import axios from "axios";

function StudentsCard({id, firstName, lastName, age, ava_picture, classNum}) {
    // console.log("card")
    // console.log(id,firstName,lastName,age,ava_picture,classNum);
    return(
            <div className="col-3 mt-3">
                <Card style={{maxWidth:"100%"}}>
                    <CardActionArea>
                        <CardMedia
                            style={{height:140}}
                            image={ava_picture}
                            title="Contemplative Reptile"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="h2">
                                {firstName} {lastName}
                            </Typography>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {classNum} class, age: {age}
                            </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="medium" color="primary" >
                            Edit
                        </Button>
                        <Button size="medium" color="primary" onClick={() => {
                            // console.log(id);
                            let res = axios.delete("/api/deleteUser/" + id).then(ress => {
                                // setIsAdded(!isAdded);
                            });
                        }}>
                            Delete
                        </Button>
                    </CardActions>
                </Card>
            </div>
    );
}
export default StudentsCard;