import VQItem from '../VQItem/VQItem'
import {List} from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from "react";
import { getData } from '../../redux/actions/dataAC'

function VQList() {
  const langs = useSelector((state) => state.langs);
  const arr = useSelector((state) => state.data);
  const dispatch = useDispatch()
  useEffect(() =>{
    dispatch(getData(langs.filter( elem => elem.checked).map(elem => elem.lang)));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [langs])  

  return (
    <div>
      <h3>Список ({arr.length} записей):</h3>
      <List>
        {arr?.map((el, index) => <VQItem item={el} index={index} key={el._id}>)</VQItem> )}
      </List>
    </div>
  );
}

export default VQList;
