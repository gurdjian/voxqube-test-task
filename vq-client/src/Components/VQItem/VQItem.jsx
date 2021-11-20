import { makeStyles } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles(() => ({
  root: {
    width: '99%',
    // maxWidth: 500,
    backgroundColor: 'rgb(0, 0, 0 , 0.24)',
    border: 'solid',
    borderColor: 'grey',
    borderRadius: '15px',
    margin: '1px',
  },
}));
function VQItem({item, index}) {
  const classes = useStyles();
  const text = <div>
       {index + 1}{'. '}
      <b>Name:</b> {item.name},
      <b> id:</b> {item.id}, 
      <b> Language:</b> {item.language},
      <b> Provider:</b> {item.provider},
      <b> Provider language:</b> {item.providerLanguage},
      <b> sex:</b> {item.sex},
      <b> flags:</b> {item.flags?.length > 0 ? item.flags.join(', ') : '-'}

  </div>
  ;
  
  return (
    <ListItem className={classes.root}>
      <ListItemText primary={text} />
    </ListItem>
  );
}

export default VQItem;
