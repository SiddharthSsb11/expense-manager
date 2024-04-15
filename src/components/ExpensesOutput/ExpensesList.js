import {View, Text, FlatList} from 'react-native';
import ExpenseItem from './ExpenseItem';

const ExpensesList = ({expenses}) => {
  const renderExpenseItem = ({item}) => {
    return <ExpenseItem {...item} />;
  };
  return (
    <FlatList
      data={expenses}
      renderItem={renderExpenseItem}
      key={item => item.id}
    />
  );
};

export default ExpensesList;
