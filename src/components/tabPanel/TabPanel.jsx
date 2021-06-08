import Box from '@material-ui/core/Box';
import './style.css'

export default function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
        className="tabPanel__contain"
      >
        {value === index && (
          <Box className="box__contain">
            {children}
          </Box>
        )}
      </div>
    );
  }