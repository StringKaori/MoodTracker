import { StyleSheet, Text } from 'react-native';

export function EmptyFieldError() {
    return(
        <Text style={ styles.errorLabel }>
            This field can't be empty!
        </Text>
    );
}

export function DifferentPasswordsError() {
    return(
        <Text style={ styles.errorLabel }>
            Password must be the same!
        </Text>
    )
}

const styles = StyleSheet.create({
  errorLabel: {
    color: `red`
  }
})