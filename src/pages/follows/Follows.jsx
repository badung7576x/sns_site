import {React, useState} from "react";
import Topbar from "../../components/topbar/Topbar";
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import TabPanel from "../../components/tabPanel/TabPanel";
import './follows.css'
import UserCard from "../../components/userCard/UserCard";
import { Users } from "../../dummyData";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

export default function Follows() {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  return (
    <>
      <Topbar />
      <div className="follow">
        <div style={{ flex: 3 }}></div>
        <div className="followWrapper">
          <Paper className={classes.root}>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="ユーザー" />
              <Tab label="フォロー中" />
              <Tab label="フォロワー" />
            </Tabs>
          </Paper>
          <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
          >
            <TabPanel value={value} index={0} dir={theme.direction}>
              {Users.map((u) => (
                 <UserCard key={u.id} user={u} canFollow={true} />
              ))}
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
              {Users.map((u) => (
                 <UserCard key={u.id} user={u} canFollow={false} />
              ))}
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
              {Users.map((u) => (
                 <UserCard key={u.id} user={u} canFollow={true} />
              ))}
            </TabPanel>
          </SwipeableViews>
        </div>
        <div style={{ flex: 3 }}></div>
      </div>
    </>
  );
}
