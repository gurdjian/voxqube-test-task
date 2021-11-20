import { useEffect } from 'react';
import { FormGroup, FormControlLabel, Switch } from '@material-ui/core';
import { useDispatch, useSelector,  } from 'react-redux'
import { getLangs, toggleLangs } from '../../redux/actions/langsAC';
import { getData } from '../../redux/actions/dataAC';

export default function FormFilterLang() {
  const langs = useSelector((state) => state.langs);
  const dispatch = useDispatch();
  useEffect(() =>{
    console.log('dispatch');
    dispatch(getLangs());
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) 
  const handleChange = (event) => {
    const {name, checked} = event.target;
    dispatch(toggleLangs(name, checked));
    dispatch(getData(langs.filter( elem => elem.checked).map(elem => elem.lang) ));
  };
  console.log(langs);
  return (
    <>
    <h3>Доступные языки:</h3>
    <FormGroup row>
    {langs?.map( (elem, index) => {
      return <FormControlLabel label={elem.lang} key={index} control={
            <Switch
              checked={elem.checked}
              onChange={handleChange}
              name={elem.lang}
              color="primary"
            />
          }
        />
      })
    }  
    </FormGroup>
    </>
  );
}
