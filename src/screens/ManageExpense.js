import {useContext, useState} from 'react';
import {View} from 'react-native';
import {useLayoutEffect} from 'react';
import IconButton from '../components/UI/IconButton';
import styles from './ManageExpense.styles';
import {GlobalStyles} from '../constants/customStyles';
import {ExpensesContext} from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import {storeExpense, updateExpense, deleteExpense} from '../util/http';
import LoadingOverlay from '../components/UI/LoadingOverlay';

const ManageExpense = ({route, navigation}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const expensesCtx = useContext(ExpensesContext);

  const expenseId = route.params?.expenseId;
  const isEditing = !!expenseId;

  const selectedExpense = expensesCtx.expenses.find(
    expense => expense.id === expenseId
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense'
    });
  }, [navigation, isEditing]);

  const deleteExpenseHandler = async () => {
    setIsSubmitting(true);
    await deleteExpense(expenseId);
    expensesCtx.deleteExpense(expenseId);
    navigation.goBack();
  };

  const cancelHandler = () => {
    navigation.goBack();
  };

  const confirmHandler = async expenseData => {
    setIsSubmitting(true);

    if (isEditing) {
      expensesCtx.updateExpense(expenseId, expenseData);
      await updateExpense(expenseId, expenseData);
    } else {
      const id = await storeExpense(expenseData);
      expensesCtx.addExpense({...expenseData, id: id});
    }
    navigation.goBack();
  };

  if (isSubmitting) {
    return <LoadingOverlay />;
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
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
