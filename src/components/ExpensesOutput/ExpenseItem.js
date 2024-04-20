import {Pressable, View, Text} from 'react-native';
import styles from './ExpenseItem.styles';
import {getFormattedDate} from '../../util/date';
import {useNavigation} from '@react-navigation/native';

const ExpenseItem = ({description, amount, date, id}) => {
  const navigation = useNavigation();

  const expensePressHandler = () => {
    navigation.navigate('ManageExpense', {
      expenseId: id
    });
  };

  return (
    <Pressable
      onPress={expensePressHandler}
      style={({pressed}) => pressed && styles.pressed}>
      <View style={styles.container}>
        <View>
          <Text style={[styles.textBase, styles.description]}>
            {description}
          </Text>
          <Text style={styles.textBase}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>₹ {amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default ExpenseItem;
