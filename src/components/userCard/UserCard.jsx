import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {PersonAdd} from '@material-ui/icons';
import './style.css'
import { Button } from '@material-ui/core';


export default function UserCard({user, canFollow}) {
  return (
    <Card className='card__contain'>
      <CardContent className="card__topBox">
        <Avatar alt={user.username} src={user.profilePicture} className='card__avatar' />
        <h3 className="card__username">{user.username}</h3>
      </CardContent>
      { canFollow ? (<CardActions>
        <Button
            variant="contained"
            color="secondary"
            className=""
            startIcon={<PersonAdd />}
        >Follow</Button>
      </CardActions>) : ''}
    </Card>
  );
}