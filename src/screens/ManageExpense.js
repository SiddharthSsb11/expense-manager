import {useContext} from 'react';
import {View} from 'react-native';
import {useLayoutEffect} from 'react';
import Button from '../components/UI/Button';
import IconButton from '../components/UI/IconButton';
import styles from './ManageExpense.styles';
import {GlobalStyles} from '../constants/customStyles';
import {ExpensesContext} from '../store/expenses-context';

const ManageExpense = ({route, navigation}) => {
  const expensesCtx = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = () => {
    expensesCtx.deleteExpense(expenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = () => {
    if (isEditing) {
      expensesCtx.updateExpense(expenseId, {
        description: 'Test!!!!',
        amount: 29.99,
        date: new Date('2024-03-20')
      });
    } else {
      expensesCtx.addExpense({
        description: 'Test Recent--',
        amount: 19.99,
        date: new Date('2024-04-15')
      });
    }
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? 'Update' : 'Add'}
        </Button>
      </View>
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            name="delete"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
};

export default ManageExpense;
