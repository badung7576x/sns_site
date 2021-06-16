import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import {PersonAdd} from '@material-ui/icons';
import './style.css'
import { Button } from '@material-ui/core';
import { useSelector } from "react-redux";


export default function UserCard({user, canFollow}) {
  const me = useSelector(state => state.user)

  return (
    <Card className='card__contain'>
      <CardContent className="card__topBox">
        <Avatar alt={user.nickname} src={user?.avatar  || 'assets/no_avatar.png'} className='card__avatar' />
        <h3 className="card__username">{user.nickname}</h3>
      </CardContent>
      { canFollow && me.authenticated && (<CardActions>
        <Button
            variant="contained"
            color="secondary"
            className=""
            startIcon={<PersonAdd />}
        >Follow</Button>
      </CardActions>)}
    </Card>
  );
}