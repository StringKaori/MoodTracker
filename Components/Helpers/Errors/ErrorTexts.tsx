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

export function InvalidEmailError() {
    return(
        <Text style={ styles.errorLabel }>
            This is not a valid email!
        </Text>
    );
}

const styles = StyleSheet.create({
  errorLabel: {
    color: `red`
  }
})