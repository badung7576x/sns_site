import {React} from "react";
import Topbar from "../../components/topbar/Topbar";
import './admin.css'
import { useSelector } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import {Table, Grid, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar, Button} from '@material-ui/core';
import moment from 'moment'
import 'moment/locale/ja';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }
}));

export default function Admin() {
  const classes = useStyles();
  let users = useSelector(state => state.data.users)
  const posts = useSelector((state) => state.data.posts);

  console.log(posts)

  return (
    <>
      <Topbar />
      <div className="admin">
        <div style={{ flex: 3 }}></div>
        <div className="adminWrapper">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <h3>ユーザ管理</h3>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{textAlign: 'center'}}>ニックネーム</TableCell>
                      <TableCell>メールアドレス</TableCell>
                      <TableCell >自己紹介</TableCell>
                      <TableCell ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { users.map((u) => (
                      <TableRow key={u.id}>
                        <TableCell width="150">
                          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Avatar alt={u.user.nickname} src={u.user.avatar} />
                            <span style={{marginLeft: '10px'}}>{u.user.nickname}</span>
                          </div>
                        </TableCell>
                        <TableCell>{u.user.email}</TableCell>
                        <TableCell>{u.user.jiko}</TableCell>
                        <TableCell width="150">
                          {/* <Button variant="outlined" color="primary">
                            Primary
                          </Button> */}
                          <Button variant="outlined" color="secondary">削除</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
              <h3>投稿管理</h3>
              <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{textAlign: 'center'}}>ニックネーム</TableCell>
                      <TableCell style={{textAlign: 'center'}}>投稿内容</TableCell>
                      <TableCell style={{textAlign: 'center'}}>時間</TableCell>
                      <TableCell ></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    { posts.map((p) => (
                      <TableRow key={p.id}>
                        <TableCell width="150">
                          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            <Avatar alt={users.filter((u) => u.id === p.post.userId)[0]?.user.nickname} 
                              src={users.filter((u) => u.id === p.post.userId)[0]?.user.avatar} />
                            <span style={{marginLeft: '10px'}}>{users.filter((u) => u.id === p.post.userId)[0]?.user.nickname}</span>
                          </div>
                        </TableCell>
                        <TableCell>{p.post.content}</TableCell>
                        <TableCell width="120">{moment(p.post.createdAt.toDate()).fromNow()}</TableCell>
                        <TableCell width="200">
                          <Button variant="outlined" color="primary" style={{marginRight: '10px'}}>詳細</Button>
                          <Button variant="outlined" color="secondary">削除</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              </Paper>
            </Grid>
          </Grid>
        </div>
        <div style={{ flex: 3 }}></div>
      </div>
    </>
  );
}
